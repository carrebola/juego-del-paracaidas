"use strict";

Juego.leerPartidas = function () {
  const datos = JSON.parse(localStorage.getItem(Juego.CLAVE_PARTIDAS) || "[]");
  if (!Array.isArray(datos) || !datos.every((p) => p &&
    typeof p.nombre === "string" && p.nombre.trim().length > 0 && p.nombre.length <= 40 &&
    typeof p.fecha === "string" && Number.isFinite(Date.parse(p.fecha)) &&
    Number.isInteger(p.puntuacion) && p.puntuacion >= 0 && p.puntuacion <= Juego.TOTAL &&
    Number.isInteger(p.estrellados) && p.estrellados >= 0 && p.estrellados <= 10 &&
    (p.dificultad === undefined || Object.hasOwn(Juego.DIFICULTADES, p.dificultad)) &&
    p.puntuacion + p.estrellados <= Juego.TOTAL)) {
    throw new Error("Registro no válido");
  }
  return datos;
};

Juego.guardarPartida = function (event) {
  event.preventDefault();
  if (Juego.enJuego || !Juego.partidaPendiente || Juego.partidaGuardada) return;
  const jugador = Juego.nombre.value.trim();
  if (!jugador || jugador.length > 40) {
    Juego.estadoGuardado.textContent = "Escribe un nombre de entre 1 y 40 caracteres.";
    Juego.nombre.focus();
    return;
  }
  try {
    const partidas = Juego.leerPartidas();
    partidas.push({...Juego.partidaPendiente, nombre: jugador});
    localStorage.setItem(Juego.CLAVE_PARTIDAS, JSON.stringify(partidas));
    Juego.partidaGuardada = true;
    Juego.nombre.disabled = true;
    Juego.guardar.disabled = true;
    Juego.estadoGuardado.textContent = "Partida guardada: " + Juego.partidaPendiente.puntuacion + " puntos.";
  } catch {
    Juego.estadoGuardado.textContent =
      "No se ha podido guardar. El almacenamiento está bloqueado, lleno o contiene datos no válidos. Puedes volver a intentarlo.";
  }
};

Juego.mostrarPartidas = function () {
  const filas = document.querySelector("#filas-historial");
  const estado = document.querySelector("#estado-historial");
  filas.replaceChildren();
  try {
    const partidas = Juego.leerPartidas();
    partidas.sort((a, b) => {
      const porFecha = Date.parse(b.fecha) - Date.parse(a.fecha);
      return Juego.ordenHistorial.value === "puntuacion"
        ? b.puntuacion - a.puntuacion || porFecha
        : porFecha;
    });
    estado.textContent = partidas.length
      ? partidas.length + " partidas guardadas."
      : "Todavía no hay partidas guardadas.";
    for (const p of partidas) {
      const fila = document.createElement("tr");
      const nivel = p.dificultad ? Juego.DIFICULTADES[p.dificultad].nombre : "Anterior";
      for (const valor of [p.nombre, new Date(p.fecha).toLocaleString("es-ES"), p.puntuacion, p.estrellados, nivel]) {
        const celda = document.createElement("td");
        celda.textContent = String(valor);
        fila.append(celda);
      }
      filas.append(fila);
    }
  } catch {
    estado.textContent =
      "No se puede leer el historial. El almacenamiento está bloqueado o contiene datos no válidos.";
  }
};

Juego.abrirHistorial = function () {
  if (Juego.enJuego) return;
  Juego.mostrarPartidas();
  Juego.historial.showModal();
};
