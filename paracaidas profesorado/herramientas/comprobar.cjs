// Pruebas del ciclo de juego con DOM y temporizadores controlados.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');

class Elemento {
  constructor() { this.style = {}; this.dataset = {}; this.children = []; this.events = {}; this.hidden = false; this.disabled = false; }
  append(e) { this.children.push(e); e.parent = this; }
  replaceChildren() { this.children = []; }
  querySelector() { return this.children[0]; }
  setAttribute(k, v) { this[k] = v; }
  addEventListener(k, fn) { (this.events[k] ??= []).push(fn); }
  contains(e) { return e === this || this.children.includes(e); }
  closest() { return this.className === 'personaje' ? this : this.parent?.closest(); }
  focus() {}
}
const nodes = {};
for (const id of ['escenario','personajes','suelo','panel-inicio','panel-final','salvados','estrellados','resueltos','resultado','iniciar','reiniciar','nombre','guardar','estado-guardado','ver-historial','historial','orden-historial','filas-historial','estado-historial','guardar-partida','cerrar-historial']) nodes['#'+id] = new Elemento();
const stored = new Map();
nodes['#dificultad'] = new Elemento();
nodes['#dificultad'].value = 'normal';
let storageBlocked = false;
const storage = {getItem(k) { if(storageBlocked) throw Error('Bloqueado'); return stored.get(k) ?? null; },setItem(k,v) { if(storageBlocked) throw Error('Bloqueado'); stored.set(k,v); }};
nodes['#historial'].showModal = function() { this.open = true; };
nodes['#historial'].close = function() { this.open = false; };
nodes['#escenario'].clientWidth = 390;
nodes['#suelo'].offsetTop = 530;
let now = 0, serial = 0;
const jobs = new Map();
function schedule(fn, delay, interval = false) { const id = ++serial; jobs.set(id, {fn, at:now+delay, delay, interval}); return id; }
function advance(ms) {
  const end = now + ms;
  for (;;) {
    const next = [...jobs].filter(([,j])=>j.at<=end).sort((a,b)=>a[1].at-b[1].at || a[0]-b[0])[0];
    if (!next) break;
    const [id,j] = next; now = j.at;
    if (j.interval) j.at += j.delay; else jobs.delete(id);
    j.fn();
  }
  now = end;
}
const context = vm.createContext({
  document:{querySelector:s=>nodes[s],createElement:()=>new Elemento()},
  window:new Elemento(), Math:Object.assign(Object.create(Math),{random:()=>0.5}),
  localStorage:storage,
  setTimeout:(f,d)=>schedule(f,d),clearTimeout:id=>jobs.delete(id),
  setInterval:(f,d)=>schedule(f,d,true),clearInterval:id=>jobs.delete(id),
});
const source = fs.readFileSync(path.join(__dirname,'../profesorado/solucion/js/juego.js'),'utf8');
vm.runInContext(source,context);
const run = s=>vm.runInContext(s,context);
let passed = 0;
function check(name, fn) { fn(); passed++; console.log('OK '+name); }
check('50 objetos en espera y DOM completo',()=>{
  run('iniciarPartida()'); assert.equal(run('paracaidistas.length'),50); assert.equal(run('paracaidistas.filter(p=>p.estado === "esperando").length'),50);
  assert.equal(nodes['#personajes'].children.length,50);
  assert.equal([...jobs.values()].find(j=>j.interval).delay,20);
});
check('primera aparición a 2 s y posición dentro del ancho',()=>{
  advance(1999); assert.equal(run('siguiente'),0); advance(1);
  assert.equal(run('siguiente'),1); assert.equal(run('paracaidistas[0].x'),163); assert.equal(run('paracaidistas[0].y'),-80);
});
check('caída aleatoria de 5 px y apertura delegada de una imagen',()=>{
  advance(20); assert.equal(run('paracaidistas[0].y'),-75);
  const p = run('paracaidistas[0]');
  nodes['#personajes'].events.click[0]({target:p.elemento.children[0]});
  assert.equal(p.estado,'paracaidas'); assert.equal(p.velocidad,1);
  assert.equal(p.elemento.children[0].src,'img/paracaidas.gif');
  advance(20); assert.equal(p.y,-74);
  nodes['#personajes'].events.click[0]({target:p.elemento}); assert.equal(p.velocidad,1);
});
check('salvado persistente y aterrizaje contado una vez',()=>{
  run('paracaidistas[0].y = limiteSuelo - 1; actualizarMovimiento()');
  assert.equal(run('salvados'),1); assert.equal(run('paracaidistas[0].velocidad'),0);
  run('aterrizar(paracaidistas[0])'); assert.equal(run('salvados'),1);
  advance(2200); assert.equal(run('paracaidistas[0].elemento.hidden'),false);
});
check('impacto desaparece a 2 s y cuenta una sola vez',()=>{
  run('limpiarTemporizadores(); paracaidistas[1].estado="cayendo"; aterrizar(paracaidistas[1])');
  assert.equal(run('estrellados'),1); advance(1999); assert.equal(run('paracaidistas[1].elemento.hidden'),false);
  advance(1); assert.equal(run('paracaidistas[1].elemento.hidden'),true);
  run('aterrizar(paracaidistas[1])'); assert.equal(run('estrellados'),1);
});
check('redimensionado sin doble conteo ni salida lateral',()=>{
  nodes['#escenario'].clientWidth=300; nodes['#suelo'].offsetTop=290;
  run('paracaidistas[0].x=800; medirEscenario()');
  assert.equal(run('paracaidistas[0].x'),236); assert.equal(run('paracaidistas[0].y'),210); assert.equal(run('salvados'),1);
});
check('tercer impacto detiene inmediatamente el mismo tick',()=>{
  run('iniciarPartida(); limpiarTemporizadores(); estrellados=2; for (const p of paracaidistas.slice(0,2)) { p.estado="cayendo"; p.velocidad=4; p.y=limiteSuelo; } actualizarMovimiento()');
  assert.equal(run('estrellados'),3); assert.equal(run('paracaidistas[1].estado'),'cayendo'); assert.equal(run('enJuego'),false);
  assert.equal(nodes['#panel-final'].hidden,false); assert.equal(jobs.size,0);
  const p=run('paracaidistas[1]'); nodes['#personajes'].events.click[0]({target:p.elemento}); assert.equal(p.estado,'cayendo');
});
check('reinicio limpia trabajos y no duplica delegación',()=>{
  run('iniciarPartida(); iniciarPartida(); iniciarPartida()');
  assert.equal(jobs.size,2); assert.equal(run('salvados+estrellados'),0); assert.equal(run('paracaidistas.length'),50);
  assert.equal(nodes['#personajes'].events.click.length,1); assert.equal(nodes['#panel-final'].hidden,true);
});
check('50 descensos completos finalizan incluso con impactos',()=>{
  run('limpiarTemporizadores(); for (const p of paracaidistas) { p.estado = p.id < 2 ? "cayendo" : "paracaidas"; aterrizar(p); }');
  assert.equal(run('salvados'),48); assert.equal(run('estrellados'),2); assert.equal(run('enJuego'),false); assert.equal(jobs.size,0);
});
check('50 salvados finalizan y no dejan temporizadores',()=>{
  run('iniciarPartida(); limpiarTemporizadores(); for (const p of paracaidistas) { p.estado="paracaidas"; aterrizar(p); }');
  assert.equal(run('salvados'),50); assert.equal(run('enJuego'),false); assert.equal(jobs.size,0);
});
check('tiempos extremos permanecen entre 1 y 3 segundos',()=>{
  run('Math.random=()=>0; iniciarPartida()');
  assert.equal([...jobs.values()].find(j=>!j.interval).delay,1000);
  run('Math.random=()=>0.999999; iniciarPartida()');
  const delay=[...jobs.values()].find(j=>!j.interval).delay;
  assert.ok(delay>=1000 && delay<=3000); run('limpiarTemporizadores()');
});
check('velocidades aleatorias diferentes entre 3 y 7 px',()=>{
  run('Math.random=()=>0; iniciarPartida()'); advance(1000);
  assert.equal(run('paracaidistas[0].velocidad'),3);
  run('Math.random=()=>0.999999'); advance(1000);
  const v=run('paracaidistas[1].velocidad'); assert.ok(v>6.99 && v<=7);
  run('limpiarTemporizadores()');
});
function terminar(puntos=10) {
  run('iniciarPartida(); limpiarTemporizadores(); salvados='+puntos+'; estrellados=3; finalizarPartida()');
}
function save(name) { nodes['#nombre'].value=name; run('guardarPartida({preventDefault(){}})'); }
check('historial vacío y nombre obligatorio',()=>{
  run('mostrarPartidas()'); assert.equal(nodes['#filas-historial'].children.length,0);
  terminar(); save('   '); assert.equal(stored.size,0);
});
check('guardar nombre, fecha y puntuación una sola vez',()=>{
  save('  Carlos  '); save('Duplicado');
  const data=JSON.parse(stored.values().next().value);
  assert.equal(data.length,1); assert.equal(data[0].nombre,'Carlos'); assert.equal(data[0].puntuacion,10);
  assert.ok(Number.isFinite(Date.parse(data[0].fecha))); assert.equal(nodes['#guardar'].disabled,true);
});
check('historial ordena por fecha y puntuación, con desempate reciente',()=>{
  const records=[
    {nombre:'Antiguo',fecha:'2026-10-01T10:00:00.000Z',puntuacion:30,estrellados:10},
    {nombre:'Reciente',fecha:'2026-10-20T10:00:00.000Z',puntuacion:5,estrellados:10},
    {nombre:'Mejor reciente',fecha:'2026-10-19T10:00:00.000Z',puntuacion:30,estrellados:10},
    {nombre:'<img onerror=alert(1)>',fecha:'2026-10-18T10:00:00.000Z',puntuacion:0,estrellados:10}];
  storage.setItem(run('CLAVE_PARTIDAS'),JSON.stringify(records));
  nodes['#orden-historial'].value='fecha'; run('abrirHistorial()');
  assert.equal(nodes['#historial'].open,true);
  assert.equal(nodes['#filas-historial'].children[0].children[0].textContent,'Reciente');
  assert.equal(nodes['#filas-historial'].children[2].children[0].textContent,'<img onerror=alert(1)>');
  nodes['#orden-historial'].value='puntuacion'; run('mostrarPartidas()');
  assert.equal(nodes['#filas-historial'].children[0].children[0].textContent,'Mejor reciente');
  assert.equal(nodes['#filas-historial'].children.length,4);
});
check('datos corruptos y almacenamiento bloqueado no pierden registros',()=>{
  const key=run('CLAVE_PARTIDAS'); storage.setItem(key,'corrupto'); terminar(); save('Carlos');
  assert.equal(storage.getItem(key),'corrupto'); assert.equal(run('partidaGuardada'),false);
  run('mostrarPartidas()'); assert.match(nodes['#estado-historial'].textContent,/No se puede/);
  storage.setItem(key,'[]'); storageBlocked=true; save('Carlos'); assert.equal(run('partidaGuardada'),false);
  storageBlocked=false; save('Carlos'); assert.equal(run('partidaGuardada'),true);
});
check('nueva partida se guarda sin arrastrar la anterior y bloquea historial en vuelo',()=>{
  terminar(20); save('Ana');
  assert.equal(JSON.parse(storage.getItem(run('CLAVE_PARTIDAS'))).length,2);
  run('iniciarPartida()'); assert.equal(nodes['#ver-historial'].disabled,true);
  save('Durante partida'); assert.equal(JSON.parse(storage.getItem(run('CLAVE_PARTIDAS'))).length,2);
  run('limpiarTemporizadores()');
});
check('los registros se recuperan desde una nueva ejecución',()=>{
  const nuevo = vm.createContext({document:context.document, window:new Elemento(), localStorage:storage});
  vm.runInContext(source,nuevo);
  assert.equal(vm.runInContext('leerPartidas().length',nuevo),2);
});
check('cada dificultad cambia tiempos y velocidades y queda fija durante la partida',()=>{
  for (const [nivel,minV,maxV,minT,maxT] of [['facil',2,4,1800,3200],['normal',3,7,1000,3000],['dificil',5,10,450,1200]]) {
    nodes['#dificultad'].value=nivel;
    run('Math.random=()=>0; iniciarPartida()');
    assert.equal(nodes['#dificultad'].disabled,true);
    assert.equal([...jobs.values()].find(j=>!j.interval).delay,minT);
    advance(minT); assert.equal(run('paracaidistas[0].velocidad'),minV);
    // Ni siquiera una alteración externa del selector cambia el nivel capturado.
    nodes['#dificultad'].value='normal';
    run('Math.random=()=>0.999999'); advance(minT);
    assert.ok(run('paracaidistas[1].velocidad')>maxV-0.001);
    const demora=[...jobs.values()].find(j=>!j.interval).delay;
    assert.ok(demora>=minT && demora<=maxT);
    run('finalizarPartida()'); assert.equal(nodes['#dificultad'].disabled,false);
    assert.equal(run('partidaPendiente.dificultad'),nivel);
  }
});
check('historial conserva partidas antiguas y registra el nivel nuevo',()=>{
  nodes['#dificultad'].value='dificil'; terminar(12); save('Difícil');
  const data=JSON.parse(storage.getItem(run('CLAVE_PARTIDAS')));
  assert.equal(data.at(-1).dificultad,'dificil');
  data.push({nombre:'Versión anterior',fecha:'2026-10-01T10:00:00.000Z',puntuacion:5,estrellados:10});
  storage.setItem(run('CLAVE_PARTIDAS'),JSON.stringify(data));
  run('mostrarPartidas()');
  const filas=nodes['#filas-historial'].children;
  assert.ok(filas.some(f=>f.children[4].textContent==='Anterior'));
  assert.ok(filas.some(f=>f.children[4].textContent==='Difícil'));
});
console.log(passed+' comprobaciones superadas.');
