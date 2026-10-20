# ¡Salva a los paracaidistas!

Proyecto educativo de **JavaScript puro** para equipos de 3–4 personas, organizado en cuatro sesiones propuestas de 55 minutos. Incluye una plantilla sin resolver para el alumnado, una solución docente, GIF animados y materiales para organizar y evaluar el trabajo.

## Índice de contenidos

- [Cómo empezar](#cómo-empezar)
- [Material del alumnado](#material-del-alumnado)
- [Material del profesorado](#material-del-profesorado)
- [Código y recursos](#código-y-recursos)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Pruebas y preparación de entregas](#pruebas-y-preparación-de-entregas)

## Cómo empezar

1. Descarga o clona el repositorio.
2. Para jugar con la solución, abre localmente [el HTML del juego completo](paracaidas%20profesorado/profesorado/solucion/index.html) en un navegador. No necesita servidor, instalaciones ni conexión.
3. Para realizar el proyecto, utiliza [la carpeta del alumnado](paracaidas%20alumnado/alumnado/) y comienza por el enunciado. Su JavaScript contiene tareas pendientes: el juego funcionará cuando el equipo las implemente.

Pulsa los personajes para abrir sus paracaídas. La partida termina al tercer impacto o cuando los 50 personajes hayan completado el descenso. Hay tres dificultades con velocidades e intervalos de aparición distintos. Al finalizar puedes guardar nombre y resultado en `localStorage` y consultar el historial por fecha o puntuación. Cada personaje salvado vale un punto.

El historial pertenece al navegador. La disponibilidad de `localStorage` al abrir archivos locales depende del navegador; el juego informa si no puede guardar.

## Material del alumnado

| Contenido | Para qué sirve |
|---|---|
| [Enunciado](paracaidas%20alumnado/alumnado/EXAMEN.md) | Reglas, requisitos técnicos, dificultades y evaluación |
| [Guía de equipos](paracaidas%20alumnado/alumnado/GUIA_EQUIPOS.md) | Reparto para tres o cuatro personas, contratos, calendario e integración |
| [Plantilla de seguimiento](paracaidas%20alumnado/alumnado/SEGUIMIENTO.md) | Responsables, aportaciones individuales, revisiones y pruebas |
| [Interfaz inicial](paracaidas%20alumnado/alumnado/index.html) | HTML preparado para conectar la lógica |
| [JavaScript sin resolver](paracaidas%20alumnado/alumnado/js/juego.js) | Tareas que debe implementar el equipo |
| [Estilos](paracaidas%20alumnado/alumnado/css/estilos.css) | Diseño adaptable a móvil y ordenador |
| [GIF del juego](paracaidas%20alumnado/alumnado/img/) | Caída libre, paracaídas, salvado e impacto |

## Material del profesorado

| Contenido | Para qué sirve |
|---|---|
| [Orientaciones generales](paracaidas%20profesorado/LEEME.md) | Uso del paquete docente y preparación de materiales |
| [Plan docente](paracaidas%20profesorado/PLAN.md) | Cuatro sesiones, puntos de control y entrega |
| [Guía de corrección](paracaidas%20profesorado/profesorado/GUIA.md) | Rúbrica técnica, pruebas manuales y valoración individual |
| [Solución completa](paracaidas%20profesorado/profesorado/solucion/) | Juego de referencia con todos los requisitos implementados |
| [Plantilla incluida en el paquete docente](paracaidas%20profesorado/alumnado/) | Copia distribuible sin resolver |
| [Revisión de archivos](paracaidas%20profesorado/REVISION_ARCHIVOS.md) | Duplicados retirados y criterios de organización |

La evaluación propuesta combina un 70 % de calidad técnica del equipo, un 20 % de comprensión individual y un 10 % de colaboración individual. Los criterios se detallan en el enunciado y la guía de corrección.

## Código y recursos

- [JavaScript de la solución](paracaidas%20profesorado/profesorado/solucion/js/juego.js): modelo, temporizadores, delegación, dificultad, final e historial.
- [Pruebas de lógica](paracaidas%20profesorado/herramientas/comprobar.cjs): DOM y reloj simulados, sin paquetes externos.
- [Preparación de los GIF y ZIP](paracaidas%20profesorado/herramientas/preparar.py): recursos comunes y entregas mediante una lista cerrada de archivos.
- [Vista conjunta de los personajes](paracaidas%20profesorado/recursos/vista-gifs.png).
- [Tiras originales](paracaidas%20profesorado/recursos/tiras/) y [prompts de las imágenes](paracaidas%20profesorado/recursos/PROMPTS.md).

## Estructura del repositorio

```text
README.md
paracaidas alumnado/
  alumnado/                  Proyecto inicial y documentación de equipos
paracaidas profesorado/
  LEEME.md                   Orientaciones del paquete docente
  PLAN.md                    Planificación de las sesiones
  REVISION_ARCHIVOS.md       Revisión de duplicados
  alumnado/                  Plantilla incluida en el paquete completo
  profesorado/
    GUIA.md                  Corrección y evaluación
    solucion/                HTML, CSS, JavaScript y GIF del juego resuelto
  herramientas/              Pruebas y generación de entregas
  recursos/                  Fuentes gráficas y previsualización
```

La plantilla se incluye tanto en la entrega del alumnado como en el paquete docente para que ambos sean autónomos. Para trabajar, escoge una sola copia. Dentro del paquete docente, el generador sincroniza el HTML, CSS y GIF de la solución con su plantilla, conservando el JavaScript sin resolver.

## Pruebas y preparación de entregas

Desde la raíz del repositorio, con Node.js instalado:

```sh
node "paracaidas profesorado/herramientas/comprobar.cjs"
```

Para generar las entregas, se necesitan Python y Pillow:

```sh
python "paracaidas profesorado/herramientas/preparar.py"
```

El script crea `alumnado.zip` y `profesorado.zip` dentro de `paracaidas profesorado/`. Entrega únicamente `alumnado.zip` a los equipos; el paquete docente contiene la solución. Para inspeccionar los ZIP, descomprímelos en una carpeta nueva y vacía fuera del proyecto.

Node.js, Python y Pillow son herramientas de comprobación o preparación. El juego y la plantilla se abren directamente en el navegador.
