# Enunciado del juego · ¡Salva a los paracaidistas!

**Tecnología:** JavaScript puro · **Entrega:** repositorio Git del equipo · **Modalidad:** 3 equipos compiten con el mismo juego; gana la mejor implementación.

## Misión

Completa la carpeta `inicio/` para rescatar a 50 paracaidistas. Pulsa un personaje en caída libre para abrir su paracaídas. La partida termina al llegar a 3 impactos o cuando los 50 hayan terminado su descenso.

Recibís HTML, CSS y cuatro GIF. No hace falta cambiar la maquetación. El JavaScript está partido en archivos para que cada persona pueda abrir un PR sin pisar al resto.

## Requisitos técnicos

### 1. Modelo de datos

Al iniciar, un array de **exactamente 50 objetos** con `id`, `x`, `y`, `velocidad`, `estado` y `elemento`. Estados: `esperando`, `cayendo`, `paracaidas`, `salvado`, `estrellado`. Cada `elemento` es un botón con imagen y `data-id`.

### 2. Aparición

Encadenad apariciones con `setTimeout()`. Entre un personaje y el siguiente, tiempos aleatorios del nivel (también el primero). `x` aleatoria dentro del ancho útil; `y` inicial negativa. Al aparecer: de `esperando` a `cayendo`.

Leed `#dificultad` al iniciar y bloquead el selector durante la partida. Intervalo de movimiento: 20 ms. Velocidad con paracaídas: 1 px en todos los niveles.

| Dificultad | Caída libre (px / actualización) | Tiempo entre apariciones |
|---|---|---|
| Fácil | 2–4 | 1.800–3.200 ms |
| Normal (por defecto) | 3–7 | 1.000–3.000 ms |
| Difícil | 5–10 | 450–1.200 ms |

### 3. Movimiento

Un único `setInterval()` (~20 ms). Actualizad `style.top`. Sin librerías, sin animaciones CSS, sin `transition` ni `transform` para el desplazamiento.

### 4. Interacción

Un único `click` en `#personajes` (delegación). Con `closest` y `data-id`, solo si está `cayendo`: pasar a `paracaidas`, velocidad 1, imagen `paracaidas.gif`.

### 5. Suelo

Cuando la base alcance el borde superior de `#suelo`:

- Con paracaídas → `salvado`, imagen, +1 salvado; permanece visible.
- Sin paracaídas → `estrellado`, imagen, +1 impacto; ocultar a los 2.000 ms.

Cada llegada se cuenta una sola vez.

### 6. Final y reinicio

Fin inmediato si `estrellados >= 3` o `salvados + estrellados === 50`. Parar temporizadores, bloquear interacción y mostrar el panel final. Reiniciar sin duplicar eventos ni temporizadores.

### 7. Pantallas distintas

Jugable sin scroll molesto en móvil y escritorio. Al redimensionar, reajustar posiciones sin volver a contar aterrizajes.

### 8. Registro e historial

Al finalizar, guardar con el formulario: `nombre` (trim, 1–40), `fecha` ISO, `puntuacion` (= salvados), `estrellados`, `dificultad`. Una sola vez por partida. `localStorage` + `JSON`. Validar datos; no borrar un historial corrupto. «Ver partidas» muestra y ordena por fecha o puntuación (descendente). Usar `textContent` para los nombres.

## Condiciones de entrega

- El juego debe abrirse con `index.html` (sin build obligatorio).
- Sin errores de consola en el flujo normal.
- Repositorio del equipo con historial de PR (ver `EQUIPOS.md`).
- `SEGUIMIENTO.md` completado.
