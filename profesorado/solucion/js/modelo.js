"use strict";

Juego.crearParacaidistas = function () {
  let html = "";
  for (let id = 0; id < Juego.TOTAL; id++) {
    html +=
      '<button type="button" class="personaje" data-id="' + id + '" hidden disabled>' +
      '<img src="img/cayendo.gif" alt="" draggable="false">' +
      "</button>";
  }
  Juego.contenedor.innerHTML = html;

  const botones = Juego.contenedor.querySelectorAll(".personaje");
  Juego.paracaidistas = [];
  for (let id = 0; id < botones.length; id++) {
    Juego.paracaidistas.push({
      id,
      x: 0,
      y: -Juego.ALTO,
      velocidad: 0,
      estado: "esperando",
      elemento: botones[id]
    });
  }
};

Juego.actualizarContadores = function () {
  Juego.contadorSalvados.textContent = String(Juego.salvados).padStart(2, "0");
  Juego.contadorEstrellados.textContent = String(Juego.estrellados).padStart(2, "0");
  Juego.contadorResueltos.textContent = String(Juego.salvados + Juego.estrellados).padStart(2, "0");
};

Juego.limpiarTemporizadores = function () {
  clearInterval(Juego.intervalo);
  clearTimeout(Juego.aparicion);
  Juego.intervalo = null;
  Juego.aparicion = null;
  for (const temporizador of Juego.desapariciones) clearTimeout(temporizador);
  Juego.desapariciones.clear();
};

Juego.iniciarPartida = function () {
  Juego.enJuego = false;
  Juego.limpiarTemporizadores();
  Juego.dificultadActual = Object.hasOwn(Juego.DIFICULTADES, Juego.selectorDificultad.value)
    ? Juego.selectorDificultad.value
    : "normal";
  Juego.selectorDificultad.disabled = true;
  Juego.salvados = 0;
  Juego.estrellados = 0;
  Juego.siguiente = 0;
  Juego.partidaPendiente = null;
  Juego.partidaGuardada = false;
  Juego.nombre.value = "";
  Juego.nombre.disabled = false;
  Juego.guardar.disabled = false;
  Juego.estadoGuardado.textContent = "";
  Juego.verHistorial.disabled = true;
  Juego.panelInicio.hidden = true;
  Juego.panelFinal.hidden = true;
  Juego.crearParacaidistas();
  Juego.medirEscenario();
  Juego.actualizarContadores();
  Juego.enJuego = true;
  Juego.intervalo = setInterval(() => Juego.actualizarMovimiento(), 20);
  Juego.programarAparicion();
};

Juego.finalizarPartida = function () {
  if (!Juego.enJuego) return;
  Juego.enJuego = false;
  Juego.limpiarTemporizadores();
  for (const p of Juego.paracaidistas) p.elemento.disabled = true;
  const pendientes = Juego.TOTAL - Juego.salvados - Juego.estrellados;
  Juego.resultado.textContent =
    Juego.DIFICULTADES[Juego.dificultadActual].nombre + ": " +
    Juego.salvados + " a salvo · " + Juego.estrellados + " impactos · " +
    pendientes + " sin completar. " +
    (Juego.estrellados >= Juego.LIMITE_IMPACTOS
      ? "Se ha alcanzado el límite de impactos."
      : "Los 50 han terminado su descenso.");
  Juego.panelFinal.hidden = false;
  Juego.partidaPendiente = {
    fecha: new Date().toISOString(),
    puntuacion: Juego.salvados,
    estrellados: Juego.estrellados,
    dificultad: Juego.dificultadActual
  };
  Juego.verHistorial.disabled = false;
  Juego.selectorDificultad.disabled = false;
  Juego.nombre.focus();
};
