# ¡Salva a los paracaidistas!

Proyecto educativo de **JavaScript puro**. Tres equipos implementan el **mismo juego**; cada uno en **su propio repositorio** Git, con un PR por módulo. Gana la mejor implementación.

## Menú

### Para el alumnado

| Qué | Dónde |
|---|---|
| Enunciado del juego | [`enunciados/JUEGO.md`](enunciados/JUEGO.md) |
| Organización Git / PR / roles | [`enunciados/EQUIPOS.md`](enunciados/EQUIPOS.md) |
| Concurso y rúbrica | [`enunciados/CONCURSO.md`](enunciados/CONCURSO.md) |
| **Carpeta para descargar e iniciar** | [`inicio/`](inicio/) |

### Para el profesorado

| Qué | Dónde |
|---|---|
| Orientaciones | [`profesorado/LEEME.md`](profesorado/LEEME.md) |
| Plan de sesiones | [`profesorado/PLAN.md`](profesorado/PLAN.md) |
| Guía de corrección | [`profesorado/GUIA.md`](profesorado/GUIA.md) |
| Solución completa (modular) | [`profesorado/solucion/`](profesorado/solucion/) |
| Pruebas de la solución | [`profesorado/herramientas/comprobar.cjs`](profesorado/herramientas/comprobar.cjs) |

### Archivo

| Qué | Dónde |
|---|---|
| Material de la versión anterior | [`archivo/`](archivo/) |

## Cómo empezar (equipo)

1. Leed `enunciados/`.
2. Copiad **`inicio/`** a un repositorio nuevo del equipo.
3. Cada persona: una rama y un PR de **su** archivo en `js/`.
4. Entrega = `main` jugable + `SEGUIMIENTO.md`.

Abrid `inicio/index.html` o `profesorado/solucion/index.html` en el navegador (sin servidor).

Para comprobar la solución docente (Node.js):

```sh
node profesorado/herramientas/comprobar.cjs
```

## Estructura

```text
enunciados/     Reglas del juego, Git/PR y concurso
inicio/         Plantilla que descarga cada equipo
profesorado/    Solución, pruebas y guías docentes
archivo/        Versión previa (referencia histórica)
```
