"use strict";

Juego.abrirParacaidas = function (event) {
  if (!Juego.enJuego) return;
  const elemento = event.target.closest(".personaje");
  if (!elemento || !Juego.contenedor.contains(elemento)) return;
  const p = Juego.paracaidistas.find((personaje) => personaje.id === Number(elemento.dataset.id));
  if (!p || p.estado !== "cayendo") return;
  p.estado = "paracaidas";
  p.velocidad = 1;
  p.elemento.querySelector("img").src = "img/paracaidas.gif";
  p.elemento.setAttribute("aria-label", "Paracaídas abierto del personaje " + (p.id + 1));
};

Juego.aterrizar = function (p) {
  if (p.estado !== "cayendo" && p.estado !== "paracaidas") return;
  const aSalvo = p.estado === "paracaidas";
  p.y = Juego.limiteSuelo;
  p.velocidad = 0;
  p.estado = aSalvo ? "salvado" : "estrellado";
  p.elemento.style.top = p.y + "px";
  p.elemento.querySelector("img").src = "img/" + p.estado + ".gif";
  p.elemento.disabled = true;
  p.elemento.setAttribute("aria-label", "Personaje " + (p.id + 1) + ": " + p.estado);
  if (aSalvo) {
    Juego.salvados++;
  } else {
    Juego.estrellados++;
    const temporizador = setTimeout(() => {
      p.elemento.hidden = true;
      Juego.desapariciones.delete(temporizador);
    }, 2000);
    Juego.desapariciones.add(temporizador);
  }
  Juego.actualizarContadores();
  if (Juego.estrellados >= Juego.LIMITE_IMPACTOS || Juego.salvados + Juego.estrellados === Juego.TOTAL) {
    Juego.finalizarPartida();
  }
};
