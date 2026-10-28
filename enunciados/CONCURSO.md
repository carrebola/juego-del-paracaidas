# Concurso · Tres equipos, un mismo juego

Hay **tres equipos**. Todos implementan el juego de [`JUEGO.md`](JUEGO.md). **Gana la mejor propuesta** según la rúbrica.

Cada equipo tiene **su propio repositorio** Git. No se comparte código entre equipos durante el desarrollo.

## Qué se valora

Nota orientativa del equipo: calidad técnica del juego (misma base para todos) más el trabajo con Git/PR y la claridad del seguimiento.

### Rúbrica técnica (sobre 10)

| Apartado | Puntos |
|---|---:|
| Array de 50 objetos y creación DOM | 1 |
| Aparición progresiva, tiempos y posición aleatoria | 1 |
| Intervalo, velocidades y actualización de `top` | 1,5 |
| Delegación, identificación y apertura única | 1,5 |
| Suelo, estados, imágenes y contadores | 1,5 |
| Final, limpieza y reinicio | 1 |
| Adaptación a dimensiones y redimensionado | 0,75 |
| Organización, PR y ejecución sin errores | 0,75 |
| Nombre, persistencia e historial ordenable | 1 |

Un requisito incumplido se valora solo por lo demostrado (p. ej. un listener por personaje no acredita delegación).

### Desempate / “el mejor gana”

Si varios equipos cumplen lo obligatorio, se prioriza, en este orden:

1. Cumplimiento completo y robusto de los requisitos (casos límite, reinicios, errores de `localStorage`).
2. Claridad del código y de los mensajes de PR / revisiones.
3. Experiencia de juego (fluidez, feedback, pulido dentro de la interfaz dada).
4. `SEGUIMIENTO.md` completo y coherente con el historial Git.

La puntuación obtenida *jugando* no forma parte de la nota.

## Comprensión individual (si el docente la aplica)

Cada integrante debe poder explicar una función propia y una que haya revisado en un PR. Propuesta: parte de la nota individual por comprensión y colaboración (rotación de revisión, registro de acuerdos).

## Entrega del equipo

1. Enlace al repositorio (rama `main` fusionada y jugable).
2. `SEGUIMIENTO.md` relleno.
3. Al menos un PR fusionado por integrante responsable de módulo (o evidencia equivalente acordada con el docente).
