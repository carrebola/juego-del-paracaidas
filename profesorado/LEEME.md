# Material del profesorado

No entregar esta carpeta a los equipos. Ellos solo reciben los enunciados (lectura) y la carpeta `inicio/`.

## Contenido

| Recurso | Uso |
|---|---|
| [`solucion/`](solucion/) | Juego completo modular (misma estructura que `inicio/`) |
| [`herramientas/comprobar.cjs`](herramientas/comprobar.cjs) | Pruebas de la solución (DOM y reloj simulados) |
| [`PLAN.md`](PLAN.md) | Sesiones y puntos de control |
| [`GUIA.md`](GUIA.md) | Corrección y valoración del concurso |

Desde la raíz del repositorio:

```sh
node profesorado/herramientas/comprobar.cjs
```

## Flujo con los equipos

1. Publicad o enlazad este repo plantilla (o solo `enunciados/` + `inicio/`).
2. Cada equipo crea **su propio repositorio** con el contenido de `inicio/`.
3. Seguimiento por PR en el repo de cada equipo.
4. Al final, comparad las tres entregas con la rúbrica de `enunciados/CONCURSO.md` y esta guía.

Para probar la referencia docente, abrid `solucion/index.html` en el navegador.
