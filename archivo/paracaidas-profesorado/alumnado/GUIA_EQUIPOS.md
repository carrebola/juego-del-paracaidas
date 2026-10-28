# Organización del proyecto por equipos

Construid el juego completo en equipos de 3 o 4 personas. Cada integrante debe programar, revisar código de otra persona y poder explicar el funcionamiento general. La propuesta se organiza en cuatro sesiones de 55 minutos; el docente puede ajustar el calendario al grupo.

## Acuerdo inicial

Durante los primeros 15 minutos, anotad los nombres del equipo, las tareas y los responsables en `SEGUIMIENTO.md`. Leed el enunciado y acordad los nombres de las funciones, las propiedades de los objetos y qué funciones pueden modificar cada dato. Elegid una única copia del proyecto como entrega final.

No repartáis el trabajo por HTML, CSS y JavaScript: la interfaz ya está preparada y la programación debe distribuirse entre todos. Tampoco asignéis a una persona únicamente documentación o pruebas.

## Reparto para cuatro personas

| Bloque | Programación principal | Revisión cruzada | Dependencias |
|---|---|---|---|
| A. Estado y ciclo | Array de 50 objetos, creación DOM, iniciar, finalizar, reiniciar y selector de dificultad | Revisa B | Acuerda el modelo antes de B y C; ofrece el resultado final a D |
| B. Aparición y movimiento | Dimensiones, posiciones aleatorias, apariciones, intervalo y reajuste al redimensionar | Revisa C | Usa el array de A; llama a la llegada definida por C |
| C. Interacción y llegadas | Delegación, paracaídas, suelo, estados terminales, contadores y desaparición a los 2 s | Revisa D | Usa el modelo de A y el límite de suelo de B; avisa al final de A |
| D. Registro e historial | Nombre, validación, localStorage, tabla, ordenación y errores de almacenamiento | Revisa A | Recibe de A una instantánea del resultado y la dificultad |

El responsable propone e implementa el bloque; otra persona lo revisa y ambas comprueban los casos asignados. Si un bloque se atasca, trabajad en pareja y registrad la colaboración. Quien termina antes ayuda a integrar y revisar un bloque distinto.

## Reparto para tres personas

- Persona A: modelo, creación DOM, dimensiones, dificultad e inicio/reinicio.
- Persona B: aparición, movimiento, delegación y apertura del paracaídas.
- Persona C: llegada al suelo, contadores y condiciones de final.
- Historial compartido: A programa la captura del resultado y el formulario; B, la lectura y escritura con errores; C, la tabla y la ordenación. A revisa B, B revisa C y C revisa A.

## Acuerdos para integrar

Estos nombres son una propuesta de contrato, no una solución implementada. Podéis cambiarlos si todos actualizan el acuerdo antes de continuar.

| Función o dato | Acuerdo |
|---|---|
| `paracaidistas` | Un único array compartido, con 50 objetos y los campos del enunciado. A lo crea; los demás no lo sustituyen. |
| `iniciarPartida()` | Restablece estado, captura dificultad, crea personajes y arranca los temporizadores. |
| `medirEscenario()` | Calcula ancho y límite del suelo; reajusta posiciones sin contar llegadas. |
| `programarAparicion()` | Programa solo la siguiente aparición y conserva la referencia del timeout. |
| `actualizarMovimiento()` | Recorre estados activos, modifica `top` y llama a `aterrizar(p)` si llega al suelo. |
| `abrirParacaidas(event)` | Un único escuchador delegado; solo cambia personajes en caída libre. |
| `aterrizar(p)` | Cuenta la llegada una vez, fija estado e imagen y comprueba las condiciones de final. |
| `finalizarPartida()` | Para todo inmediatamente al tercer impacto o al completar 50 descensos; crea una instantánea para guardar. |
| `guardarPartida(event)` | Guarda una sola vez nombre, fecha final, puntos, impactos y dificultad; no modifica contadores del juego. |
| `mostrarPartidas()` | Lee, valida, ordena y representa todas las partidas con `textContent`. |
| Temporizadores | A y B acuerdan dónde guardar sus identificadores; la limpieza cancela intervalo, aparición y desapariciones. |

Un solo bloque debe ser responsable de registrar los escuchadores, fuera de las funciones de reinicio. El nombre introducido al terminar es el del jugador de esa partida; los integrantes y sus aportaciones se registran en `SEGUIMIENTO.md`.

## Calendario y puntos de control

| Sesión | Trabajo | Evidencia al terminar |
|---|---|---|
| 1 · 55 min | 15 min de acuerdo; 30 de modelo y primeras funciones; 10 de integración | 50 objetos, elementos creados, dificultad capturada y primer personaje visible |
| 2 · 55 min | 5 min de reparto; 35 de movimiento e interacción; 15 de integración | Varios personajes caen a velocidades distintas; pulsar abre el paracaídas; una llegada se cuenta una vez |
| 3 · 55 min | 5 min de revisión; 35 de final e historial; 15 de integración | Tercer impacto detiene todo; reinicio limpio; una partida se guarda y se recupera |
| 4 · 55 min | 5 min de prioridades; 25 de revisión cruzada; 15 de corrección; 10 de entrega | Tres dificultades probadas, historial ordenado, móvil y casos límite comprobados, ZIP único |

En cada sesión rotad quién conduce la integración y quién registra acuerdos. Estas funciones de coordinación se suman a la programación. Haced una integración al menos al final de cada sesión; no esperéis al último día para juntar los bloques.

## Cómo compartir el código

Si conocéis Git, utilizad una rama por tarea, cambios pequeños y revisión de otra persona antes de integrar. Comprobad que el juego funciona al incorporar cada bloque. El número de commits no mide por sí solo la contribución.

Si no utilizáis Git, trabajad sobre una carpeta común con turnos de edición de `js/juego.js`. Quien trabaja fuera de esa copia entrega únicamente sus funciones y explica qué entradas y salidas espera. Una persona integra mientras la autora revisa, y después cambian los turnos. Evitad reemplazar el archivo completo con una copia antigua.

## Cuando hay un bloqueo

Anotad qué esperabais, qué ocurre y el error de consola. Dedicad hasta 10 minutos a resolverlo en pareja. Si continúa, consultad al docente con ese caso concreto y seguid con una tarea independiente. No creéis un segundo array ni otro temporizador de movimiento para evitar una dependencia pendiente.

## Criterio de tarea terminada

Una tarea está terminada cuando está integrada, funciona con la interfaz común, no introduce errores de consola, tiene una revisión de otra persona y sus pruebas están anotadas. Marcar «he escrito mi función» no equivale a terminar si el resto del juego aún no puede usarla.

## Pruebas que debéis repartir

- A comprueba tres dificultades, bloqueo del selector, tercer impacto y reinicios repetidos.
- B comprueba tiempos y velocidades de cada nivel, ancho lateral y cambio de tamaño.
- C comprueba clic sobre imagen y caja, apertura única, persistencia de salvados y ocultación de impactos a los 2 s.
- D comprueba nombre vacío, doble envío, recarga, orden por fecha y puntos, empate, nombre con signos de HTML y error de almacenamiento.
- Todo el equipo comprueba una partida completa, final por 50 descensos, móvil y apertura local sin dependencias. En equipos de tres, repartid D según las tareas del historial.

## Entrega y valoración

Entregad un único ZIP por equipo con el juego, el enunciado, esta guía y `SEGUIMIENTO.md` completado. Anotad los fallos pendientes con un ejemplo reproducible. Cada integrante debe poder explicar una función propia y una función revisada.

La propuesta de valoración combina 70 % de calidad técnica del juego, 20 % de comprensión individual y 10 % de trabajo en equipo. La rúbrica técnica está en el enunciado. El docente comunicará los ajustes antes de empezar. No se exige una cuenta externa ni un repositorio remoto.
