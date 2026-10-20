# Material del proyecto de paracaidistas

Proyecto evaluable de JavaScript puro para equipos de 3–4 personas, en cuatro sesiones propuestas de 55 minutos. La interfaz y los GIF se facilitan para concentrar el trabajo en la programación. Para jugar basta abrir el HTML en un navegador.

## Qué abrir y qué entregar

| Archivo o carpeta | Uso |
|---|---|
| `profesorado/solucion/index.html` | Juego completo para el docente |
| `alumnado/` | Proyecto inicial autónomo, sin resolver |
| `alumnado/EXAMEN.md` | Enunciado técnico y condiciones de evaluación |
| `alumnado/GUIA_EQUIPOS.md` | Reparto para 3 o 4 personas, contratos y calendario |
| `alumnado/SEGUIMIENTO.md` | Plantilla que completa y entrega cada equipo |
| `profesorado/GUIA.md` | Corrección técnica y criterios individuales |
| `PLAN.md` | Secuencia docente y puntos de control |
| `REVISION_ARCHIVOS.md` | Revisión de duplicados |
| `alumnado.zip` | Único ZIP que se entrega a los equipos; sin solución |
| `profesorado.zip` | Paquete completo del docente; incluye solución |

Descomprimir los ZIP en una carpeta nueva y vacía fuera de esta carpeta de trabajo. No extraerlos dentro de `alumnado/` o `profesorado/`.

## Archivos que se conservan en ambos proyectos

La plantilla y la solución incluyen sus propios HTML, CSS y GIF para poder ejecutarse por separado sin conexión. Sus JavaScript son distintos. El enunciado tiene una única fuente en `alumnado/EXAMEN.md`.

## Comprobación y empaquetado

`node herramientas/comprobar.cjs` verifica la lógica con DOM y reloj simulados. La comprobación visual se realiza por separado en navegador.

`python herramientas/preparar.py` monta los GIF desde `recursos/tiras/`, sincroniza los recursos comunes y genera los dos ZIP. Solo la preparación necesita Python y Pillow. El generador usa una lista cerrada de archivos y no incorpora extracciones anidadas. No reemplaza la plantilla JavaScript ni los documentos de seguimiento.

Los personajes se generaron con la herramienta de imágenes integrada a partir de la figura de palo aportada. Las tiras, los prompts y la vista conjunta están en `recursos/`. Los GIF animan las poses; el desplazamiento real se programa mediante `top`.

Las dificultades, el límite de tres impactos y el historial se describen en el enunciado. Los registros se guardan en el navegador; bajo archivos locales, la disponibilidad de localStorage depende del navegador.
