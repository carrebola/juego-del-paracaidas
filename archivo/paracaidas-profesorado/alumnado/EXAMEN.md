# PE · JavaScript · ¡Salva a los paracaidistas!

**Duración propuesta:** 4 sesiones de 55 minutos · **Modalidad:** equipos de 3–4 personas · **Tecnología:** JavaScript puro.

## Tu misión

Completa `js/juego.js` para rescatar a 50 paracaidistas. Pulsa un personaje en caída libre para abrir su paracaídas. La partida termina al llegar a 3 impactos o cuando los 50 hayan terminado su descenso, a salvo o estrellados.

Recibes HTML, CSS y cuatro GIF animados, basados en una figura de palo. No necesitas modificar la maquetación. Puedes consultar los comentarios del archivo inicial, que indican las tareas y los elementos disponibles.

## 1. Modelo de datos

Crea al iniciar un array de **exactamente 50 objetos**. Cada objeto tendrá `id`, `x`, `y`, `velocidad`, `estado` y `elemento`. Estados permitidos: `esperando`, `cayendo`, `paracaidas`, `salvado` y `estrellado`. Guarda en `elemento` la referencia a su botón HTML, que contendrá una imagen y un atributo `data-id`.

## 2. Aparición

Encadena las apariciones con `setTimeout()`. Entre un personaje y el siguiente transcurren los límites aleatorios del nivel seleccionado; también se aplica al primero. Calcula `x` con `Math.random()` dentro del ancho real del contenedor, descontando el ancho del personaje. La posición `y` inicial será negativa. Al aparecer, cambia de `esperando` a `cayendo`.

Selecciona la dificultad antes de empezar con `#dificultad`. Captura el nivel al iniciar y bloquea el selector mientras se juega; habilítalo al finalizar. El reinicio utiliza la nueva selección. El intervalo de movimiento sigue siendo de 20 ms y la velocidad con paracaídas sigue siendo 1 px en todos los niveles.

| Dificultad | Caída libre (px por actualización) | Tiempo entre apariciones |
|---|---|---|
| Fácil | 2–4 | 1.800–3.200 ms |
| Normal (por defecto) | 3–7 | 1.000–3.000 ms |
| Difícil | 5–10 | 450–1.200 ms |

Los tiempos y las velocidades son aleatorios dentro de cada rango. También se aplica al primer personaje.

## 3. Movimiento

Usa un único `setInterval()` de aproximadamente 20 ms. Recorre el array y, para los estados activos, suma la velocidad a `y` y actualiza `style.top`. Velocidades: caída libre, aleatoria dentro del rango del nivel para cada personaje, elegida mediante `Math.random()` al aparecer y conservada hasta abrir el paracaídas; paracaídas abierto, 1 px; estados terminales, 0 px. No uses librerías, frameworks, animaciones CSS, `transition`, `transform` ni otros mecanismos para desplazar los personajes.

## 4. Interacción

Registra **un único escuchador `click` en `#personajes`**. Usa `event.target.closest()` y `data-id` para localizar el objeto en el array. Solo si está `cayendo`, pasa a `paracaidas`, reduce la velocidad a 1 y cambia la imagen a `paracaidas.gif`. Los clics posteriores no deben tener efecto. No añadas escuchadores individuales a los personajes. El evento `click` permite jugar con ratón y con pulsación táctil.

## 5. Suelo

Obtén las dimensiones mediante JavaScript. Cuando la base del personaje alcance el borde superior de `#suelo`, fija su posición en ese límite y su velocidad en 0.

- Con paracaídas: estado `salvado`, imagen `salvado.gif`, suma 1 a salvados; permanece visible.
- Sin paracaídas: estado `estrellado`, imagen `estrellado.gif`, suma 1 a impactos; ocúltalo después de 2.000 ms mediante `setTimeout()`.

Cuenta cada llegada una sola vez. Los estados terminales no se mueven ni responden a clics.

## 6. Final y reinicio

Actualiza los contadores durante la partida. Finaliza inmediatamente si `estrellados >= 3` o `salvados + estrellados === 50`: detén el movimiento, cancela las apariciones y los temporizadores pendientes, impide las interacciones y muestra resultados en el panel final. Si quedan restos visibles al terminar, permanecerán congelados hasta el reinicio. El botón de reinicio debe comenzar de cero sin duplicar eventos ni temporizadores.

## 7. Pantallas diferentes

La partida debe poder jugarse sin desplazamiento en móvil y ordenador. Calcula los límites con las dimensiones reales del escenario. Al redimensionar, ajusta las posiciones al ancho y al suelo nuevos, sin volver a contar aterrizajes. Los personajes deben quedar completos dentro de los límites laterales.

## 8. Registro e historial de partidas

Al finalizar, pide el nombre mediante el formulario preparado. Al enviarlo, añade a `localStorage` un registro con `nombre`, `fecha` (cadena ISO del final), `puntuacion` (= salvados, 1 punto por salvado) y `estrellados`, además de `dificultad`. Valida el nombre con `trim()` y una longitud entre 1 y 40 caracteres. No guardes dos veces la misma partida ni registres resultados durante el juego. Confirma el guardado y permite reintentar si falla. Reiniciar sin guardar descarta ese resultado.

El botón «Ver partidas», disponible antes y después de jugar, abre el historial con todos los registros guardados. Muestra nombre, fecha y hora, puntos, impactos y dificultad. Los registros antiguos sin nivel se muestran como «Anterior» y se conservan, aunque tengan hasta 10 impactos. Permite ordenar por fecha descendente (más recientes primero) o puntuación descendente (mayor primero); en empate de puntos, la más reciente primero. Usa `textContent` para mostrar los nombres. Deshabilita el acceso al historial mientras se juega.

Usa `JSON.parse()` y `JSON.stringify()`, valida la estructura de los datos y captura los errores de lectura y escritura. No sobrescribas un historial corrupto con una lista vacía. Informa si no hay registros o no se puede acceder al almacenamiento. Los datos son locales al navegador; pueden no compartirse al mover el archivo o cambiar de navegador. Bajo `file://`, la disponibilidad depende del navegador: si deniega el almacenamiento, informa del error sin romper el juego.

## Entrega

Entregad un único ZIP por equipo con `index.html`, `css/`, `js/` e `img/`, además de `SEGUIMIENTO.md` completado. Debe funcionar sin conexión abriendo `index.html` directamente. Usa funciones, bucles, condicionales y nombres claros. La consola no debe mostrar errores.

## Organización y evaluación del equipo

Seguid `GUIA_EQUIPOS.md` para repartir programación y revisión. Completad `SEGUIMIENTO.md` con responsables, acuerdos, aportaciones y pruebas. Cada integrante debe poder explicar una función propia y una revisada. El nombre del formulario final identifica al jugador de esa partida; la autoría del proyecto se recoge en el seguimiento.

La nota propuesta es `0,70 × T + 0,20 × I + 0,10 × C`: T es la calidad técnica común del juego, I la comprensión individual y C la colaboración individual, todas sobre 10. Para I se valora explicar código propio (4), código revisado (3) y diagnosticar un cambio o error (3). Para C se valora cumplir y rotar tareas (3), registrar acuerdos y aportaciones (3) y revisar e integrar con el equipo (4). Se combinan seguimiento, observación y una conversación breve; no basta contar commits. El docente comunica los ajustes antes de comenzar.

## Rúbrica técnica del equipo sobre 10

| Apartado | Puntos |
|---|---:|
| Array de 50 objetos y creación DOM | 1 |
| Aparición progresiva, tiempos y posición aleatoria | 1 |
| Intervalo, velocidades y actualización de `top` | 1,5 |
| Delegación, identificación y apertura única | 1,5 |
| Suelo, estados, imágenes y contadores | 1,5 |
| Final, limpieza y reinicio | 1 |
| Adaptación a dimensiones y redimensionado | 0,75 |
| Organización y ejecución sin errores | 0,75 |
| Nombre, persistencia e historial ordenable | 1 |

El apartado que incumpla un requisito obligatorio se evalúa según las evidencias realmente demostradas: por ejemplo, eventos individuales no acreditan delegación. No hay penalizaciones globales ocultas. La habilidad jugando o la puntuación del jugador no forman parte de la nota.
