"use strict";

const TOTAL = 50;
const LIMITE_IMPACTOS = 3;
const ANCHO = 64;
const ALTO = 80;
const DIFICULTADES = Object.freeze({
  facil: {nombre: "Fácil", velocidadMin: 2, velocidadMax: 4, esperaMin: 1800, esperaMax: 3200},
  normal: {nombre: "Normal", velocidadMin: 3, velocidadMax: 7, esperaMin: 1000, esperaMax: 3000},
  dificil: {nombre: "Difícil", velocidadMin: 5, velocidadMax: 10, esperaMin: 450, esperaMax: 1200}
});
const CLAVE_PARTIDAS = "paracaidistas.partidas.v1";
const escenario = document.querySelector("#escenario");
const contenedor = document.querySelector("#personajes");
const suelo = document.querySelector("#suelo");
const panelInicio = document.querySelector("#panel-inicio");
const panelFinal = document.querySelector("#panel-final");
const contadorSalvados = document.querySelector("#salvados");
const contadorEstrellados = document.querySelector("#estrellados");
const contadorResueltos = document.querySelector("#resueltos");
const resultado = document.querySelector("#resultado");
const nombre = document.querySelector("#nombre");
const guardar = document.querySelector("#guardar");
const estadoGuardado = document.querySelector("#estado-guardado");
const verHistorial = document.querySelector("#ver-historial");
const historial = document.querySelector("#historial");
const ordenHistorial = document.querySelector("#orden-historial");
const selectorDificultad = document.querySelector("#dificultad");
let dificultadActual = "normal";
let partidaPendiente = null;
let partidaGuardada = false;

let paracaidistas = [];
let salvados = 0;
let estrellados = 0;
let siguiente = 0;
let enJuego = false;
let intervalo = null;
let aparicion = null;
let anchoDisponible = 0;
let limiteSuelo = 0;
const desapariciones = new Set();

function medirEscenario() {
  anchoDisponible = Math.max(0, escenario.clientWidth - ANCHO);
  limiteSuelo = Math.max(0, suelo.offsetTop - ALTO);
  for (const p of paracaidistas) {
    p.x = Math.min(p.x, anchoDisponible);
    p.elemento.style.left = p.x + "px";
    if (p.estado === "salvado" || p.estado === "estrellado") {
      p.y = limiteSuelo;
    } else if (p.estado !== "esperando") {
      p.y = Math.min(p.y, limiteSuelo);
    }
    p.elemento.style.top = p.y + "px";
  }
}

function crearParacaidistas() {
  paracaidistas = [];
  contenedor.replaceChildren();
  for (let id = 0; id < TOTAL; id++) {
    const elemento = document.createElement("button");
    elemento.type = "button";
    elemento.className = "personaje";
    elemento.dataset.id = id;
    elemento.hidden = true;
    elemento.disabled = true;
    const imagen = document.createElement("img");
    imagen.src = "img/cayendo.gif";
    imagen.alt = "";
    imagen.draggable = false;
    elemento.append(imagen);
    contenedor.append(elemento);
    paracaidistas.push({id, x: 0, y: -ALTO, velocidad: 0, estado: "esperando", elemento});
  }
}

function actualizarContadores() {
  contadorSalvados.textContent = String(salvados).padStart(2, "0");
  contadorEstrellados.textContent = String(estrellados).padStart(2, "0");
  contadorResueltos.textContent = String(salvados + estrellados).padStart(2, "0");
}

function limpiarTemporizadores() {
  clearInterval(intervalo);
  clearTimeout(aparicion);
  intervalo = null;
  aparicion = null;
  for (const temporizador of desapariciones) clearTimeout(temporizador);
  desapariciones.clear();
}

function programarAparicion() {
  if (!enJuego || siguiente >= TOTAL) return;
  const nivel = DIFICULTADES[dificultadActual];
  const demora = nivel.esperaMin + Math.random() * (nivel.esperaMax - nivel.esperaMin);
  aparicion = setTimeout(() => {
    if (!enJuego) return;
    const p = paracaidistas[siguiente];
    p.x = Math.random() * anchoDisponible;
    p.y = -ALTO;
    // Se elige al aparecer y se conserva hasta abrir el paracaídas.
    p.velocidad = nivel.velocidadMin + Math.random() * (nivel.velocidadMax - nivel.velocidadMin);
    p.estado = "cayendo";
    p.elemento.style.left = p.x + "px";
    p.elemento.style.top = p.y + "px";
    p.elemento.setAttribute("aria-label", "Abrir paracaídas del personaje " + (p.id + 1));
    p.elemento.hidden = false;
    p.elemento.disabled = false;
    siguiente++;
    programarAparicion();
  }, demora);
}

function abrirParacaidas(event) {
  if (!enJuego) return;
  const elemento = event.target.closest(".personaje");
  if (!elemento || !contenedor.contains(elemento)) return;
  const p = paracaidistas.find(personaje => personaje.id === Number(elemento.dataset.id));
  if (!p || p.estado !== "cayendo") return;
  p.estado = "paracaidas";
  p.velocidad = 1;
  p.elemento.querySelector("img").src = "img/paracaidas.gif";
  p.elemento.setAttribute("aria-label", "Paracaídas abierto del personaje " + (p.id + 1));
}

function aterrizar(p) {
  if (p.estado !== "cayendo" && p.estado !== "paracaidas") return;
  const aSalvo = p.estado === "paracaidas";
  p.y = limiteSuelo;
  p.velocidad = 0;
  p.estado = aSalvo ? "salvado" : "estrellado";
  p.elemento.style.top = p.y + "px";
  p.elemento.querySelector("img").src = "img/" + p.estado + ".gif";
  p.elemento.disabled = true;
  p.elemento.setAttribute("aria-label", "Personaje " + (p.id + 1) + ": " + p.estado);
  if (aSalvo) {
    salvados++;
  } else {
    estrellados++;
    const temporizador = setTimeout(() => {
      p.elemento.hidden = true;
      desapariciones.delete(temporizador);
    }, 2000);
    desapariciones.add(temporizador);
  }
  actualizarContadores();
  if (estrellados >= LIMITE_IMPACTOS || salvados + estrellados === TOTAL) finalizarPartida();
}

function actualizarMovimiento() {
  if (!enJuego) return;
  for (const p of paracaidistas) {
    // El tercer impacto debe detener también el resto de esta actualización.
    if (!enJuego) break;
    if (p.estado !== "cayendo" && p.estado !== "paracaidas") continue;
    p.y += p.velocidad;
    if (p.y >= limiteSuelo) aterrizar(p);
    else p.elemento.style.top = p.y + "px";
  }
}

function iniciarPartida() {
  enJuego = false;
  limpiarTemporizadores();
  dificultadActual = Object.hasOwn(DIFICULTADES, selectorDificultad.value) ? selectorDificultad.value : "normal";
  selectorDificultad.disabled = true;
  salvados = 0;
  estrellados = 0;
  siguiente = 0;
  partidaPendiente = null;
  partidaGuardada = false;
  nombre.value = "";
  nombre.disabled = false;
  guardar.disabled = false;
  estadoGuardado.textContent = "";
  verHistorial.disabled = true;
  panelInicio.hidden = true;
  panelFinal.hidden = true;
  crearParacaidistas();
  medirEscenario();
  actualizarContadores();
  enJuego = true;
  intervalo = setInterval(actualizarMovimiento, 20);
  programarAparicion();
}

function finalizarPartida() {
  if (!enJuego) return;
  enJuego = false;
  limpiarTemporizadores();
  for (const p of paracaidistas) p.elemento.disabled = true;
  const pendientes = TOTAL - salvados - estrellados;
  resultado.textContent = DIFICULTADES[dificultadActual].nombre + ": " + salvados + " a salvo · " + estrellados + " impactos · " + pendientes + " sin completar. " +
    (estrellados >= LIMITE_IMPACTOS ? "Se ha alcanzado el límite de impactos." : "Los 50 han terminado su descenso.");
  panelFinal.hidden = false;
  partidaPendiente = {fecha: new Date().toISOString(), puntuacion: salvados, estrellados, dificultad: dificultadActual};
  verHistorial.disabled = false;
  selectorDificultad.disabled = false;
  nombre.focus();
}

function leerPartidas() {
  const datos = JSON.parse(localStorage.getItem(CLAVE_PARTIDAS) || "[]");
  // Si los datos no son válidos, no sobrescribir registros anteriores.
  if (!Array.isArray(datos) || !datos.every(p => p &&
    typeof p.nombre === "string" && p.nombre.trim().length > 0 && p.nombre.length <= 40 &&
    typeof p.fecha === "string" && Number.isFinite(Date.parse(p.fecha)) &&
    Number.isInteger(p.puntuacion) && p.puntuacion >= 0 && p.puntuacion <= TOTAL &&
    // Se conservan registros anteriores, que permitían hasta diez impactos.
    Number.isInteger(p.estrellados) && p.estrellados >= 0 && p.estrellados <= 10 &&
    (p.dificultad === undefined || Object.hasOwn(DIFICULTADES, p.dificultad)) &&
    p.puntuacion + p.estrellados <= TOTAL)) {
    throw new Error("Registro no válido");
  }
  return datos;
}

function guardarPartida(event) {
  event.preventDefault();
  if (enJuego || !partidaPendiente || partidaGuardada) return;
  const jugador = nombre.value.trim();
  if (!jugador || jugador.length > 40) {
    estadoGuardado.textContent = "Escribe un nombre de entre 1 y 40 caracteres.";
    nombre.focus();
    return;
  }
  try {
    const partidas = leerPartidas();
    partidas.push({...partidaPendiente, nombre: jugador});
    localStorage.setItem(CLAVE_PARTIDAS, JSON.stringify(partidas));
    partidaGuardada = true;
    nombre.disabled = true;
    guardar.disabled = true;
    estadoGuardado.textContent = "Partida guardada: " + partidaPendiente.puntuacion + " puntos.";
  } catch {
    estadoGuardado.textContent = "No se ha podido guardar. El almacenamiento está bloqueado, lleno o contiene datos no válidos. Puedes volver a intentarlo.";
  }
}

function mostrarPartidas() {
  const filas = document.querySelector("#filas-historial");
  const estado = document.querySelector("#estado-historial");
  filas.replaceChildren();
  try {
    const partidas = leerPartidas();
    partidas.sort((a, b) => {
      const porFecha = Date.parse(b.fecha) - Date.parse(a.fecha);
      return ordenHistorial.value === "puntuacion" ? b.puntuacion - a.puntuacion || porFecha : porFecha;
    });
    estado.textContent = partidas.length ? partidas.length + " partidas guardadas." : "Todavía no hay partidas guardadas.";
    for (const p of partidas) {
      const fila = document.createElement("tr");
      const nivel = p.dificultad ? DIFICULTADES[p.dificultad].nombre : "Anterior";
      for (const valor of [p.nombre, new Date(p.fecha).toLocaleString("es-ES"), p.puntuacion, p.estrellados, nivel]) {
        const celda = document.createElement("td");
        celda.textContent = String(valor);
        fila.append(celda);
      }
      filas.append(fila);
    }
  } catch {
    estado.textContent = "No se puede leer el historial. El almacenamiento está bloqueado o contiene datos no válidos.";
  }
}

function abrirHistorial() {
  if (enJuego) return;
  mostrarPartidas();
  historial.showModal();
}

// Se registran una sola vez, fuera del ciclo de inicio/reinicio.
contenedor.addEventListener("click", abrirParacaidas);
document.querySelector("#iniciar").addEventListener("click", iniciarPartida);
document.querySelector("#reiniciar").addEventListener("click", iniciarPartida);
window.addEventListener("resize", medirEscenario);
document.querySelector("#guardar-partida").addEventListener("submit", guardarPartida);
verHistorial.addEventListener("click", abrirHistorial);
document.querySelector("#cerrar-historial").addEventListener("click", () => historial.close());
ordenHistorial.addEventListener("change", mostrarPartidas);
