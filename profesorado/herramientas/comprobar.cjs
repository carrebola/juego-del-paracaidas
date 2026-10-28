// Pruebas del juego modular (objeto Juego) con DOM y temporizadores controlados.
const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const path = require("node:path");

const JS_DIR = path.join(__dirname, "../solucion/js");
const ARCHIVOS = [
  "estado.js",
  "modelo.js",
  "aparicion.js",
  "interaccion.js",
  "historial.js",
  "nucleo.js"
];

class Elemento {
  constructor() {
    this.style = {};
    this.dataset = {};
    this.children = [];
    this.events = {};
    this.hidden = false;
    this.disabled = false;
    this._innerHTML = "";
  }
  append(e) {
    this.children.push(e);
    e.parent = this;
  }
  replaceChildren() {
    this.children = [];
  }
  querySelector(sel) {
    if (sel === "img" || !sel) return this.children[0];
    return this.children.find((c) => c.className === sel.replace(".", "")) || this.children[0];
  }
  querySelectorAll(sel) {
    if (sel === ".personaje") return this.children.filter((c) => c.className === "personaje");
    return this.children;
  }
  setAttribute(k, v) {
    this[k] = v;
  }
  addEventListener(k, fn) {
    (this.events[k] ??= []).push(fn);
  }
  contains(e) {
    return e === this || this.children.includes(e);
  }
  closest() {
    return this.className === "personaje" ? this : this.parent?.closest();
  }
  focus() {}
  get innerHTML() {
    return this._innerHTML;
  }
  set innerHTML(value) {
    this._innerHTML = String(value);
    this.children = [];
    const ids = [...this._innerHTML.matchAll(/data-id="(\d+)"/g)].map((m) => Number(m[1]));
    for (const id of ids) {
      const boton = new Elemento();
      boton.className = "personaje";
      boton.dataset.id = id;
      boton.hidden = true;
      boton.disabled = true;
      const imagen = new Elemento();
      imagen.src = "img/cayendo.gif";
      boton.append(imagen);
      this.append(boton);
    }
  }
}

const nodes = {};
for (const id of [
  "escenario", "personajes", "suelo", "panel-inicio", "panel-final",
  "salvados", "estrellados", "resueltos", "resultado", "iniciar", "reiniciar",
  "nombre", "guardar", "estado-guardado", "ver-historial", "historial",
  "orden-historial", "filas-historial", "estado-historial", "guardar-partida",
  "cerrar-historial"
]) {
  nodes["#" + id] = new Elemento();
}
nodes["#dificultad"] = new Elemento();
nodes["#dificultad"].value = "normal";
nodes["#historial"].showModal = function () {
  this.open = true;
};
nodes["#historial"].close = function () {
  this.open = false;
};
nodes["#escenario"].clientWidth = 390;
nodes["#suelo"].offsetTop = 530;

const stored = new Map();
let storageBlocked = false;
const storage = {
  getItem(k) {
    if (storageBlocked) throw Error("Bloqueado");
    return stored.get(k) ?? null;
  },
  setItem(k, v) {
    if (storageBlocked) throw Error("Bloqueado");
    stored.set(k, v);
  }
};

let now = 0;
let serial = 0;
const jobs = new Map();
function schedule(fn, delay, interval = false) {
  const id = ++serial;
  jobs.set(id, {fn, at: now + delay, delay, interval});
  return id;
}
function advance(ms) {
  const end = now + ms;
  for (;;) {
    const next = [...jobs]
      .filter(([, j]) => j.at <= end)
      .sort((a, b) => a[1].at - b[1].at || a[0] - b[0])[0];
    if (!next) break;
    const [id, j] = next;
    now = j.at;
    if (j.interval) j.at += j.delay;
    else jobs.delete(id);
    j.fn();
  }
  now = end;
}

function cargarCodigo(contexto) {
  const fuente =
    ARCHIVOS.map((nombre) => fs.readFileSync(path.join(JS_DIR, nombre), "utf8")).join("\n") +
    "\nglobalThis.Juego = Juego;\n";
  vm.runInContext(fuente, contexto);
}

function crearContexto() {
  return vm.createContext({
    document: {querySelector: (s) => nodes[s], createElement: () => new Elemento()},
    window: new Elemento(),
    globalThis: undefined,
    Math: Object.assign(Object.create(Math), {random: () => 0.5}),
    localStorage: storage,
    setTimeout: (f, d) => schedule(f, d),
    clearTimeout: (id) => jobs.delete(id),
    setInterval: (f, d) => schedule(f, d, true),
    clearInterval: (id) => jobs.delete(id),
    Object,
    Number,
    Date,
    JSON,
    Array,
    String,
    Error,
    console
  });
}

const context = crearContexto();
context.globalThis = context;
cargarCodigo(context);
const run = (s) => vm.runInContext(s, context);

let passed = 0;
function check(name, fn) {
  fn();
  passed++;
  console.log("OK " + name);
}

check("50 objetos en espera y DOM completo", () => {
  run("Juego.iniciarPartida()");
  assert.equal(run("Juego.paracaidistas.length"), 50);
  assert.equal(run('Juego.paracaidistas.filter(p => p.estado === "esperando").length'), 50);
  assert.equal(nodes["#personajes"].children.length, 50);
  assert.equal([...jobs.values()].find((j) => j.interval).delay, 20);
});

check("primera aparición a 2 s y posición dentro del ancho", () => {
  advance(1999);
  assert.equal(run("Juego.siguiente"), 0);
  advance(1);
  assert.equal(run("Juego.siguiente"), 1);
  assert.equal(run("Juego.paracaidistas[0].x"), 163);
  assert.equal(run("Juego.paracaidistas[0].y"), -80);
});

check("caída aleatoria de 5 px y apertura delegada de una imagen", () => {
  advance(20);
  assert.equal(run("Juego.paracaidistas[0].y"), -75);
  const p = run("Juego.paracaidistas[0]");
  nodes["#personajes"].events.click[0]({target: p.elemento.children[0]});
  assert.equal(p.estado, "paracaidas");
  assert.equal(p.velocidad, 1);
  assert.equal(p.elemento.children[0].src, "img/paracaidas.gif");
  advance(20);
  assert.equal(p.y, -74);
  nodes["#personajes"].events.click[0]({target: p.elemento});
  assert.equal(p.velocidad, 1);
});

check("salvado persistente y aterrizaje contado una vez", () => {
  run("Juego.paracaidistas[0].y = Juego.limiteSuelo - 1; Juego.actualizarMovimiento()");
  assert.equal(run("Juego.salvados"), 1);
  assert.equal(run("Juego.paracaidistas[0].velocidad"), 0);
  run("Juego.aterrizar(Juego.paracaidistas[0])");
  assert.equal(run("Juego.salvados"), 1);
  advance(2200);
  assert.equal(run("Juego.paracaidistas[0].elemento.hidden"), false);
});

check("impacto desaparece a 2 s y cuenta una sola vez", () => {
  run('Juego.limpiarTemporizadores(); Juego.paracaidistas[1].estado = "cayendo"; Juego.aterrizar(Juego.paracaidistas[1])');
  assert.equal(run("Juego.estrellados"), 1);
  advance(1999);
  assert.equal(run("Juego.paracaidistas[1].elemento.hidden"), false);
  advance(1);
  assert.equal(run("Juego.paracaidistas[1].elemento.hidden"), true);
  run("Juego.aterrizar(Juego.paracaidistas[1])");
  assert.equal(run("Juego.estrellados"), 1);
});

check("redimensionado sin doble conteo ni salida lateral", () => {
  nodes["#escenario"].clientWidth = 300;
  nodes["#suelo"].offsetTop = 290;
  run("Juego.paracaidistas[0].x = 800; Juego.medirEscenario()");
  assert.equal(run("Juego.paracaidistas[0].x"), 236);
  assert.equal(run("Juego.paracaidistas[0].y"), 210);
  assert.equal(run("Juego.salvados"), 1);
});

check("tercer impacto detiene inmediatamente el mismo tick", () => {
  run(`Juego.iniciarPartida(); Juego.limpiarTemporizadores(); Juego.estrellados = 2;
    for (const p of Juego.paracaidistas.slice(0, 2)) { p.estado = "cayendo"; p.velocidad = 4; p.y = Juego.limiteSuelo; }
    Juego.actualizarMovimiento()`);
  assert.equal(run("Juego.estrellados"), 3);
  assert.equal(run('Juego.paracaidistas[1].estado'), "cayendo");
  assert.equal(run("Juego.enJuego"), false);
  assert.equal(nodes["#panel-final"].hidden, false);
  assert.equal(jobs.size, 0);
  const p = run("Juego.paracaidistas[1]");
  nodes["#personajes"].events.click[0]({target: p.elemento});
  assert.equal(p.estado, "cayendo");
});

check("reinicio limpia trabajos y no duplica delegación", () => {
  run("Juego.iniciarPartida(); Juego.iniciarPartida(); Juego.iniciarPartida()");
  assert.equal(jobs.size, 2);
  assert.equal(run("Juego.salvados + Juego.estrellados"), 0);
  assert.equal(run("Juego.paracaidistas.length"), 50);
  assert.equal(nodes["#personajes"].events.click.length, 1);
  assert.equal(nodes["#panel-final"].hidden, true);
});

check("50 descensos completos finalizan incluso con impactos", () => {
  run(`Juego.limpiarTemporizadores();
    for (const p of Juego.paracaidistas) {
      p.estado = p.id < 2 ? "cayendo" : "paracaidas";
      Juego.aterrizar(p);
    }`);
  assert.equal(run("Juego.salvados"), 48);
  assert.equal(run("Juego.estrellados"), 2);
  assert.equal(run("Juego.enJuego"), false);
  assert.equal(jobs.size, 0);
});

check("50 salvados finalizan y no dejan temporizadores", () => {
  run(`Juego.iniciarPartida(); Juego.limpiarTemporizadores();
    for (const p of Juego.paracaidistas) { p.estado = "paracaidas"; Juego.aterrizar(p); }`);
  assert.equal(run("Juego.salvados"), 50);
  assert.equal(run("Juego.enJuego"), false);
  assert.equal(jobs.size, 0);
});

check("tiempos extremos permanecen entre 1 y 3 segundos", () => {
  run("Math.random = () => 0; Juego.iniciarPartida()");
  assert.equal([...jobs.values()].find((j) => !j.interval).delay, 1000);
  run("Math.random = () => 0.999999; Juego.iniciarPartida()");
  const delay = [...jobs.values()].find((j) => !j.interval).delay;
  assert.ok(delay >= 1000 && delay <= 3000);
  run("Juego.limpiarTemporizadores()");
});

check("velocidades aleatorias diferentes entre 3 y 7 px", () => {
  run("Math.random = () => 0; Juego.iniciarPartida()");
  advance(1000);
  assert.equal(run("Juego.paracaidistas[0].velocidad"), 3);
  run("Math.random = () => 0.999999");
  advance(1000);
  const v = run("Juego.paracaidistas[1].velocidad");
  assert.ok(v > 6.99 && v <= 7);
  run("Juego.limpiarTemporizadores()");
});

function terminar(puntos = 10) {
  run(
    "Juego.iniciarPartida(); Juego.limpiarTemporizadores(); Juego.salvados = " +
      puntos +
      "; Juego.estrellados = 3; Juego.finalizarPartida()"
  );
}
function save(name) {
  nodes["#nombre"].value = name;
  run("Juego.guardarPartida({preventDefault(){}})");
}

check("historial vacío y nombre obligatorio", () => {
  run("Juego.mostrarPartidas()");
  assert.equal(nodes["#filas-historial"].children.length, 0);
  terminar();
  save("   ");
  assert.equal(stored.size, 0);
});

check("guardar nombre, fecha y puntuación una sola vez", () => {
  save("  Carlos  ");
  save("Duplicado");
  const data = JSON.parse(stored.values().next().value);
  assert.equal(data.length, 1);
  assert.equal(data[0].nombre, "Carlos");
  assert.equal(data[0].puntuacion, 10);
  assert.ok(Number.isFinite(Date.parse(data[0].fecha)));
  assert.equal(nodes["#guardar"].disabled, true);
});

check("historial ordena por fecha y puntuación, con desempate reciente", () => {
  const records = [
    {nombre: "Antiguo", fecha: "2026-10-01T10:00:00.000Z", puntuacion: 30, estrellados: 10},
    {nombre: "Reciente", fecha: "2026-10-20T10:00:00.000Z", puntuacion: 5, estrellados: 10},
    {nombre: "Mejor reciente", fecha: "2026-10-19T10:00:00.000Z", puntuacion: 30, estrellados: 10},
    {nombre: "<img onerror=alert(1)>", fecha: "2026-10-18T10:00:00.000Z", puntuacion: 0, estrellados: 10}
  ];
  storage.setItem(run("Juego.CLAVE_PARTIDAS"), JSON.stringify(records));
  nodes["#orden-historial"].value = "fecha";
  run("Juego.abrirHistorial()");
  assert.equal(nodes["#historial"].open, true);
  assert.equal(nodes["#filas-historial"].children[0].children[0].textContent, "Reciente");
  assert.equal(nodes["#filas-historial"].children[2].children[0].textContent, "<img onerror=alert(1)>");
  nodes["#orden-historial"].value = "puntuacion";
  run("Juego.mostrarPartidas()");
  assert.equal(nodes["#filas-historial"].children[0].children[0].textContent, "Mejor reciente");
  assert.equal(nodes["#filas-historial"].children.length, 4);
});

check("datos corruptos y almacenamiento bloqueado no pierden registros", () => {
  const key = run("Juego.CLAVE_PARTIDAS");
  storage.setItem(key, "corrupto");
  terminar();
  save("Carlos");
  assert.equal(storage.getItem(key), "corrupto");
  assert.equal(run("Juego.partidaGuardada"), false);
  run("Juego.mostrarPartidas()");
  assert.match(nodes["#estado-historial"].textContent, /No se puede/);
  storage.setItem(key, "[]");
  storageBlocked = true;
  save("Carlos");
  assert.equal(run("Juego.partidaGuardada"), false);
  storageBlocked = false;
  save("Carlos");
  assert.equal(run("Juego.partidaGuardada"), true);
});

check("nueva partida se guarda sin arrastrar la anterior y bloquea historial en vuelo", () => {
  terminar(20);
  save("Ana");
  assert.equal(JSON.parse(storage.getItem(run("Juego.CLAVE_PARTIDAS"))).length, 2);
  run("Juego.iniciarPartida()");
  assert.equal(nodes["#ver-historial"].disabled, true);
  save("Durante partida");
  assert.equal(JSON.parse(storage.getItem(run("Juego.CLAVE_PARTIDAS"))).length, 2);
  run("Juego.limpiarTemporizadores()");
});

check("los registros se recuperan desde una nueva ejecución", () => {
  const nuevo = crearContexto();
  nuevo.globalThis = nuevo;
  // Misma DOM simulada; solo se vuelve a cargar la lógica.
  cargarCodigo(nuevo);
  assert.equal(vm.runInContext("Juego.leerPartidas().length", nuevo), 2);
});

check("cada dificultad cambia tiempos y velocidades y queda fija durante la partida", () => {
  for (const [nivel, minV, maxV, minT, maxT] of [
    ["facil", 2, 4, 1800, 3200],
    ["normal", 3, 7, 1000, 3000],
    ["dificil", 5, 10, 450, 1200]
  ]) {
    nodes["#dificultad"].value = nivel;
    run("Math.random = () => 0; Juego.iniciarPartida()");
    assert.equal(nodes["#dificultad"].disabled, true);
    assert.equal([...jobs.values()].find((j) => !j.interval).delay, minT);
    advance(minT);
    assert.equal(run("Juego.paracaidistas[0].velocidad"), minV);
    nodes["#dificultad"].value = "normal";
    run("Math.random = () => 0.999999");
    advance(minT);
    assert.ok(run("Juego.paracaidistas[1].velocidad") > maxV - 0.001);
    const demora = [...jobs.values()].find((j) => !j.interval).delay;
    assert.ok(demora >= minT && demora <= maxT);
    run("Juego.finalizarPartida()");
    assert.equal(nodes["#dificultad"].disabled, false);
    assert.equal(run("Juego.partidaPendiente.dificultad"), nivel);
  }
});

check("historial conserva partidas antiguas y registra el nivel nuevo", () => {
  nodes["#dificultad"].value = "dificil";
  terminar(12);
  save("Difícil");
  const data = JSON.parse(storage.getItem(run("Juego.CLAVE_PARTIDAS")));
  assert.equal(data.at(-1).dificultad, "dificil");
  data.push({
    nombre: "Versión anterior",
    fecha: "2026-10-01T10:00:00.000Z",
    puntuacion: 5,
    estrellados: 10
  });
  storage.setItem(run("Juego.CLAVE_PARTIDAS"), JSON.stringify(data));
  run("Juego.mostrarPartidas()");
  const filas = nodes["#filas-historial"].children;
  assert.ok(filas.some((f) => f.children[4].textContent === "Anterior"));
  assert.ok(filas.some((f) => f.children[4].textContent === "Difícil"));
});

console.log(passed + " comprobaciones superadas.");
