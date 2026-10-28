"use strict";

Juego.medirEscenario = function () {
  Juego.anchoDisponible = Math.max(0, Juego.escenario.clientWidth - Juego.ANCHO);
  Juego.limiteSuelo = Math.max(0, Juego.suelo.offsetTop - Juego.ALTO);
  for (const p of Juego.paracaidistas) {
    p.x = Math.min(p.x, Juego.anchoDisponible);
    p.elemento.style.left = p.x + "px";
    if (p.estado === "salvado" || p.estado === "estrellado") {
      p.y = Juego.limiteSuelo;
    } else if (p.estado !== "esperando") {
      p.y = Math.min(p.y, Juego.limiteSuelo);
    }
    p.elemento.style.top = p.y + "px";
  }
};

Juego.programarAparicion = function () {
  if (!Juego.enJuego || Juego.siguiente >= Juego.TOTAL) return;
  const nivel = Juego.DIFICULTADES[Juego.dificultadActual];
  const demora = nivel.esperaMin + Math.random() * (nivel.esperaMax - nivel.esperaMin);
  Juego.aparicion = setTimeout(() => {
    if (!Juego.enJuego) return;
    const p = Juego.paracaidistas[Juego.siguiente];
    p.x = Math.random() * Juego.anchoDisponible;
    p.y = -Juego.ALTO;
    p.velocidad = nivel.velocidadMin + Math.random() * (nivel.velocidadMax - nivel.velocidadMin);
    p.estado = "cayendo";
    p.elemento.style.left = p.x + "px";
    p.elemento.style.top = p.y + "px";
    p.elemento.setAttribute("aria-label", "Abrir paracaídas del personaje " + (p.id + 1));
    p.elemento.hidden = false;
    p.elemento.disabled = false;
    Juego.siguiente++;
    Juego.programarAparicion();
  }, demora);
};

Juego.actualizarMovimiento = function () {
  if (!Juego.enJuego) return;
  for (const p of Juego.paracaidistas) {
    if (!Juego.enJuego) break;
    if (p.estado !== "cayendo" && p.estado !== "paracaidas") continue;
    p.y += p.velocidad;
    if (p.y >= Juego.limiteSuelo) Juego.aterrizar(p);
    else p.elemento.style.top = p.y + "px";
  }
};
