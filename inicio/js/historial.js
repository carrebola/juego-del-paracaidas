"use strict";

/* PR · Persona D · Archivo: historial.js
 * Persistencia en localStorage y dialog de partidas.
 * Puede desarrollarse y probarse con datos de prueba sin el resto del juego.
 */

Juego.leerPartidas = function () {
  // TODO D: JSON.parse, validar estructura; si es inválido, lanzar error (no borrar datos)
  console.warn("Pendiente: Juego.leerPartidas");
  return [];
};

Juego.guardarPartida = function (event) {
  event.preventDefault();
  // TODO D: validar nombre; guardar una vez partidaPendiente; informar éxito/error
  console.warn("Pendiente: Juego.guardarPartida");
};

Juego.mostrarPartidas = function () {
  // TODO D: leer, ordenar (fecha o puntuacion), rellenar #filas-historial con textContent
  console.warn("Pendiente: Juego.mostrarPartidas");
};

Juego.abrirHistorial = function () {
  // TODO D: si no hay partida en curso, mostrarPartidas + showModal
  console.warn("Pendiente: Juego.abrirHistorial");
};
