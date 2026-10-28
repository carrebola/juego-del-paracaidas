"use strict";

/* Base compartida. No la modifiquéis en los PR de funcionalidad.
 * El resto de archivos añade funciones sobre el objeto Juego.
 */

const Juego = {
  TOTAL: 50,
  LIMITE_IMPACTOS: 3,
  ANCHO: 64,
  ALTO: 80,
  CLAVE_PARTIDAS: "paracaidistas.partidas.v1",
  DIFICULTADES: Object.freeze({
    facil: {nombre: "Fácil", velocidadMin: 2, velocidadMax: 4, esperaMin: 1800, esperaMax: 3200},
    normal: {nombre: "Normal", velocidadMin: 3, velocidadMax: 7, esperaMin: 1000, esperaMax: 3000},
    dificil: {nombre: "Difícil", velocidadMin: 5, velocidadMax: 10, esperaMin: 450, esperaMax: 1200}
  }),

  escenario: document.querySelector("#escenario"),
  contenedor: document.querySelector("#personajes"),
  suelo: document.querySelector("#suelo"),
  panelInicio: document.querySelector("#panel-inicio"),
  panelFinal: document.querySelector("#panel-final"),
  contadorSalvados: document.querySelector("#salvados"),
  contadorEstrellados: document.querySelector("#estrellados"),
  contadorResueltos: document.querySelector("#resueltos"),
  resultado: document.querySelector("#resultado"),
  nombre: document.querySelector("#nombre"),
  guardar: document.querySelector("#guardar"),
  estadoGuardado: document.querySelector("#estado-guardado"),
  verHistorial: document.querySelector("#ver-historial"),
  historial: document.querySelector("#historial"),
  ordenHistorial: document.querySelector("#orden-historial"),
  selectorDificultad: document.querySelector("#dificultad"),

  dificultadActual: "normal",
  partidaPendiente: null,
  partidaGuardada: false,
  paracaidistas: [],
  salvados: 0,
  estrellados: 0,
  siguiente: 0,
  enJuego: false,
  intervalo: null,
  aparicion: null,
  anchoDisponible: 0,
  limiteSuelo: 0,
  desapariciones: new Set()
};
