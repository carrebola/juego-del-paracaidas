# Carpeta de inicio

Esta es la carpeta que cada equipo descarga (o copia) para crear **su propio repositorio**.

## Contenido

- `index.html`, `css/`, `img/` — interfaz lista
- `js/estado.js` y `js/nucleo.js` — base (no reescribir en los PR de funcionalidad)
- `js/modelo.js`, `aparicion.js`, `interaccion.js`, `historial.js` — **pendientes de implementar**
- `SEGUIMIENTO.md` — acuerdos y pruebas del equipo

Los enunciados están en el repo plantilla, carpeta `enunciados/` (juego, equipos/Git, concurso).

## Primeros pasos

1. Copiad todo el contenido de esta carpeta a un repositorio nuevo del equipo.
2. Haced el commit inicial y abrid el remoto.
3. Cada persona crea su rama (`feature/modelo`, etc.) y un PR de **un solo archivo** `js/`.
4. Abrid `index.html` en el navegador para probar. Hasta que existan las funciones, la consola mostrará avisos «Pendiente».

## Orden de los scripts

`estado` → `modelo` → `aparicion` → `interaccion` → `historial` → `nucleo`
