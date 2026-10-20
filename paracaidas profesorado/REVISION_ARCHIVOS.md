# Revisión de los archivos del proyecto

Se comparó cada copia con su archivo de referencia antes de retirarla. Los 35 archivos anidados eran idénticos: no contenían modificaciones exclusivas.

| Ubicación retirada | Archivos | Referencia conservada |
|---|---:|---|
| `alumnado/alumnado/` | 8 | `alumnado/` |
| `profesorado/alumnado/` | 8 | `alumnado/` |
| `profesorado/profesorado/` | 8 | `profesorado/` |
| `profesorado/herramientas/` | 2 | `herramientas/` |
| `profesorado/recursos/` | 6 | `recursos/` |
| `profesorado/EXAMEN.md`, `PLAN.md` y `LEEME.md` | 3 | Documentos principales |

La estructura es compatible con haber extraído los ZIP dentro de sus carpetas homónimas. El empaquetado anterior recorría árboles completos y podía volver a incluirlas.

También se consolidó el enunciado: la copia de la raíz era idéntica a `alumnado/EXAMEN.md` y se retiró. Ese último archivo es ahora la única fuente del enunciado.

## Repeticiones necesarias

La plantilla y la solución conservan sus propios HTML, CSS y GIF para ser autónomas. Se sincronizan al preparar los ZIP. Los JavaScript son distintos y no deben unificarse: el alumnado recibe tareas pendientes. Las tiras PNG son las fuentes de los GIF, no copias del mismo formato.

Los ZIP son entregables generados. No son una tercera versión que deba editarse. El generador utiliza ahora una lista cerrada de archivos y evita incorporar extracciones anidadas.

## Estructura de referencia

```text
alumnado/              Plantilla, enunciado, guía de equipos y seguimiento
profesorado/
  GUIA.md              Corrección y evaluación
  solucion/            Juego resuelto
herramientas/          Pruebas y preparación de los ZIP
recursos/              Fuentes gráficas y vista de los GIF
PLAN.md                Plan docente
LEEME.md               Índice de materiales
REVISION_ARCHIVOS.md   Esta revisión
alumnado.zip           Distribución a equipos
profesorado.zip        Distribución completa al docente
```

Para revisar un ZIP, extraerlo en una carpeta nueva y vacía fuera del proyecto. No extraerlo dentro de `alumnado/` o `profesorado/`.
