# Guía de corrección

Distribuir únicamente `alumnado.zip`, que incluye el enunciado, la guía de equipos y la plantilla de seguimiento. `solucion/` contiene una referencia funcional; no es la única organización de código válida. Los GIF son recursos educativos originales generados a partir de la referencia de figura de palo; pueden sustituirse conservando nombres y dimensiones de presentación.

## Evidencias para la rúbrica

| Apartado | Evidencia esperada |
|---|---|
| Modelo · 1 | 50 objetos (0,5), propiedades y estados (0,25), referencias DOM e identificadores (0,25). |
| Aparición · 1 | `setTimeout` encadenado y rango correcto (0,5), posición aleatoria dentro de límites y `y < 0` (0,5). |
| Movimiento · 1,5 | Un intervalo de 20 ms y recorrido (0,5), velocidades según dificultad / 1 / 0 (0,5), actualización de `top` y estados activos (0,5). |
| Delegación · 1,5 | Único click en contenedor e identificación del objeto (1), apertura solo desde caída y cambio de imagen/velocidad (0,5). |
| Llegada · 1,5 | Detección y fijación al suelo (0,5), estados e imágenes (0,5), cuenta única y desaparición a 2 s (0,5). |
| Ciclo · 1 | Ambas condiciones de final y resultados (0,5), limpieza, bloqueo y reinicio (0,5). |
| Adaptación · 0,75 | Dimensiones reales (0,25), límites en móvil (0,25), reajuste sin doble conteo (0,25). |
| Calidad · 0,75 | Funciones y claridad (0,25), consola limpia (0,25), ejecución local y entrega completa (0,25). |
| Historial · 1 | Nombre y guardado único con fecha y puntos (0,5), listado seguro, ordenación y errores de almacenamiento (0,5). |

## Comprobación manual

1. Abrir el HTML localmente sin conexión. Probar cada nivel: el primer personaje y las apariciones siguientes respetan sus rangos de tiempo y velocidad. El selector se bloquea durante el juego y se habilita al terminar.
2. Pulsar imagen y espacio de la caja de un personaje: ambos deben abrir su paracaídas. Pulsar otra vez: no cambia ni acelera.
3. Dejar caer uno: cuenta 1 impacto, se detiene y desaparece a los 2 s. Esperar más: el contador no vuelve a subir.
4. Salvar uno: desciende más despacio, queda sobre la línea del suelo y permanece visible.
5. Dejar caer tres: termina exactamente en el tercero, congela el escenario y deja de generar personajes. Los clics no tienen efecto.
6. Reiniciar varias veces: contadores a cero, 50 objetos nuevos, sin aceleración ni apariciones duplicadas.
7. Abrir paracaídas a los 50 (se puede automatizar en una copia de pruebas): el final ocurre tras el último aterrizaje y muestra 50 salvados.
8. Probar a 390 × 844 y 1366 × 768, además de orientación horizontal: sin scroll, botones utilizables, personajes completos lateralmente.
9. Redimensionar con personajes en espera, en vuelo y en suelo: ajustar posiciones, sin doble contabilización.
10. Revisar el código para verificar restricciones que el comportamiento por sí solo no demuestra: array, delegación, temporizadores y ausencia de movimiento CSS.

La referencia usa botones por accesibilidad. Los personajes terminales se deshabilitan y pasan detrás de los activos para que los salvados no tapen la interacción con quienes aún caen. Al pasar la pestaña a segundo plano, los temporizadores pueden ralentizarse según el navegador: no se evalúa precisión de tiempo real en una pestaña inactiva.

## Comprobaciones de la ampliación

- Verificar distintas velocidades de caída dentro del rango del nivel, conservadas hasta abrir el paracaídas; el descenso abierto sigue a 1.
- Finalizar, introducir nombre y guardar: un único registro con fecha ISO, puntuación e impactos; el doble envío no duplica.
- Comprobar nombre vacío o de espacios, 40 caracteres y nombres con signos de HTML: deben mostrarse como texto.
- Jugar y guardar varias veces, recargar y abrir el historial: conservar todos los registros; ordenar por fecha o puntos, desempatar puntos por fecha reciente.
- Comprobar lista vacía, JSON corrupto y almacenamiento denegado o lleno: mostrar mensajes sin romper el juego ni sobrescribir registros.
- Probar el formulario y el historial en móvil y ventanas bajas: el panel y la tabla tienen desplazamiento interno si lo necesitan.
- Bajo archivos locales, comprobar el navegador utilizado para el examen: la persistencia de localStorage en file:// depende del navegador.

## Selector de dificultad y límite de impactos

| Nivel | Caída libre (px / 20 ms) | Aparición aleatoria |
|---|---|---|
| Fácil | 2–4 | 1,8–3,2 s |
| Normal (inicial) | 3–7 | 1–3 s |
| Difícil | 5–10 | 0,45–1,2 s |

El selector se bloquea al iniciar y se habilita al finalizar; el siguiente reinicio usa la nueva selección. El paracaídas siempre reduce la velocidad a 1 px. La partida termina inmediatamente al tercer impacto o tras 50 descensos completos. El historial incluye la dificultad y conserva registros antiguos sin nivel o con hasta 10 impactos.

## Evaluación de equipos y aportaciones individuales

La rúbrica técnica anterior produce T sobre 10, común al equipo. Calcular por persona `0,70 × T + 0,20 × I + 0,10 × C`, con I y C también sobre 10. Comunicar esta propuesta o sus ajustes antes de comenzar.

| Componente individual | Puntos | Evidencia |
|---|---:|---|
| Explicar función propia | 4 | Entradas, estados, decisiones y efecto sobre el DOM o los temporizadores |
| Explicar función revisada | 3 | Dependencias y una observación concreta de revisión |
| Diagnosticar cambio o error | 3 | Predice qué ocurre y propone una corrección coherente |

| Colaboración individual | Puntos | Evidencia |
|---|---:|---|
| Asumir tareas y rotar coordinación | 3 | Programación verificable y reparto actualizado |
| Registrar acuerdos y aportaciones | 3 | Seguimiento coherente con código y demostraciones |
| Revisar e integrar | 4 | Revisión cruzada y resolución compartida de dependencias |

Usar el seguimiento junto a la observación y una conversación de unos 3 minutos. Preguntar, por ejemplo: «¿Por qué esta llegada no se cuenta dos veces?», «¿Qué se cancela al reiniciar?» o «¿Cómo impides guardar una partida dos veces?». Aplicar preguntas de dificultad comparable y permitir señalar el código o mostrar un ejemplo.

Para valorar comprensión, puntuar cada criterio de forma proporcional: sin explicación observable, 0; explicación parcial o que requiere apoyo, aproximadamente la mitad; explicación correcta y autónoma, puntuación completa. Para colaboración, contrastar tareas y revisiones con el trabajo observado. No convertir una coevaluación aislada ni el número de commits en nota automática. Si falta evidencia, solicitar una demostración individual adicional.

Reservar un turno adicional si no cabe escuchar a todos durante la cuarta sesión. Registrar en una hoja docente: integrante, T, I, C, evidencia y nota calculada. No incluir notas individuales en el seguimiento compartido del equipo.
