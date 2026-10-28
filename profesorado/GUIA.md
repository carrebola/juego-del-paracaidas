# Guía de corrección

## Entrega válida

- Repo del equipo accesible; `main` abre `index.html` y se puede jugar.
- Cumple el comportamiento de `inicio/JUEGO.md` (la organización en archivos la decide el equipo).
- Al menos un PR fusionado por integrante.
- `SEGUIMIENTO.md` coherente con el historial Git.

## Rúbrica

Usad [`inicio/CONCURSO.md`](../inicio/CONCURSO.md). La [`solucion/`](solucion/) es referencia de comportamiento, no de copia literal.

### Comprobaciones rápidas por módulo

| Módulo | Mirar |
|---|---|
| modelo | 50 nodos, reinicio limpio, `partidaPendiente`, paneles |
| aparicion | Tiempos/velocidades por nivel, resize, un solo intervalo |
| interaccion | Un listener en `#personajes`, apertura única, ocultar estrellados |
| historial | Validación nombre, no doble guardado, orden, `textContent`, errores |

## Concurso

Tras puntuar a los tres equipos, aplicad el desempate de `CONCURSO.md` si hace falta. Comunicad el equipo ganador con la justificación breve (requisitos + robustez + claridad Git).

## Individual (opcional)

Si usáis nota individual: explicación de código propio, de código revisado en PR, y diagnóstico de un fallo. La colaboración se ve en revisiones y en el seguimiento.
