# Organización · Git, PR y reparto

Equipos de **3 o 4 personas**. Cada equipo trabaja en **su propio repositorio**, creado a partir de la carpeta `inicio/` de este proyecto.

## Cómo empezar

1. Descargad o copiad la carpeta [`inicio/`](../inicio/).
2. Cread el repositorio del equipo (vacío) y subid el contenido de `inicio/` como commit inicial.
3. Leed [`JUEGO.md`](JUEGO.md) y [`CONCURSO.md`](CONCURSO.md).
4. Completad la tabla de integrantes en `SEGUIMIENTO.md`.
5. Acordad quién es responsable de cada archivo de `js/` (salvo los que ya vienen hechos).

## Archivos JavaScript

| Archivo | Quién lo toca | Contenido |
|---|---|---|
| `js/estado.js` | Nadie (base) | Constantes, DOM y estado compartido |
| `js/nucleo.js` | Nadie (base) | Escuchadores y arranque |
| `js/modelo.js` | Persona A | Crear 50 objetos, contadores, iniciar / finalizar / reiniciar |
| `js/aparicion.js` | Persona B | Medir escenario, apariciones, movimiento |
| `js/interaccion.js` | Persona C | Clic delegado, aterrizaje, imágenes de estado |
| `js/historial.js` | Persona D | Guardar partida, leer, mostrar y ordenar historial |

En equipos de **3**: A → `modelo.js`, B → `aparicion.js`, C → `interaccion.js` + `historial.js` (o repartid historial en dos PR pequeñas).

**Regla de oro:** cada PR modifica **un solo archivo** de lógica (el de su responsable), salvo correcciones menores acordadas en la revisión.

## Flujo Git dentro del equipo

```text
main
 ├── feature/modelo        → PR → revisión de B o C
 ├── feature/aparicion     → PR → revisión de C o D
 ├── feature/interaccion   → PR → revisión de D o A
 └── feature/historial    → PR → revisión de A o B
```

1. Rama desde `main` actualizado.
2. Commits pequeños con mensajes claros.
3. Abrir PR hacia `main`.
4. Otra persona revisa (comentarios + prueba manual).
5. Fusionar solo si cumple el enunciado de ese bloque y no rompe lo ya integrado.

Integrad pronto y a menudo. No esperéis al final para juntar los cuatro archivos.

## Contratos entre archivos

El estado vive en `estado.js` (`Juego.*`). Cada módulo implementa funciones que el resto ya espera:

| Función | Archivo | Notas |
|---|---|---|
| `Juego.crearParacaidistas()` | modelo | Rellena `Juego.paracaidistas` y el DOM |
| `Juego.actualizarContadores()` | modelo | |
| `Juego.iniciarPartida()` | modelo | Llama a crear, medir, apariciones y movimiento |
| `Juego.finalizarPartida()` | modelo | Limpia temporizadores y prepara el resultado |
| `Juego.limpiarTemporizadores()` | modelo | |
| `Juego.medirEscenario()` | aparicion | |
| `Juego.programarAparicion()` | aparicion | |
| `Juego.actualizarMovimiento()` | aparicion | Debe llamar a `Juego.aterrizar(p)` |
| `Juego.abrirParacaidas(event)` | interaccion | |
| `Juego.aterrizar(p)` | interaccion | Puede llamar a `Juego.finalizarPartida()` |
| `Juego.guardarPartida(event)` | historial | Usa `Juego.partidaPendiente` |
| `Juego.mostrarPartidas()` | historial | |
| `Juego.abrirHistorial()` | historial | |

No sustituyáis el objeto `Juego` ni creéis un segundo array de personajes.

## Criterio de tarea terminada

Integrada en `main`, funciona con la interfaz común, sin errores de consola en su flujo, con PR revisada por otra persona y prueba anotada en `SEGUIMIENTO.md`.
