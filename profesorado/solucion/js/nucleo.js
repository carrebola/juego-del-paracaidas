"use strict";

/* Base compartida. Registra los escuchadores una sola vez.
 * No dupliquéis addEventListener dentro de iniciarPartida.
 */

Juego.contenedor.addEventListener("click", (event) => Juego.abrirParacaidas(event));
document.querySelector("#iniciar").addEventListener("click", () => Juego.iniciarPartida());
document.querySelector("#reiniciar").addEventListener("click", () => Juego.iniciarPartida());
window.addEventListener("resize", () => Juego.medirEscenario());
document.querySelector("#guardar-partida").addEventListener("submit", (event) => Juego.guardarPartida(event));
Juego.verHistorial.addEventListener("click", () => Juego.abrirHistorial());
document.querySelector("#cerrar-historial").addEventListener("click", () => Juego.historial.close());
Juego.ordenHistorial.addEventListener("change", () => Juego.mostrarPartidas());
