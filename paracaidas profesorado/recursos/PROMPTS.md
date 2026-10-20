# Recursos gráficos

Herramienta utilizada: generación de imágenes integrada, con fondo transparente. La imagen adjunta del usuario se usó como referencia de estilo, no como imagen a editar.

Se generaron cuatro tiras independientes de tres fotogramas. Después se separaron en celdas y se montaron como GIF mediante Pillow, conservando la transparencia y usando 180 ms por fotograma. Las tiras originales se conservan en esta carpeta.

## Prompt común

Create a sprite animation strip for a classroom game. Input image is a STYLE REFERENCE ONLY: the attached simple dark charcoal stickman with large filled circular head, rounded thick dark lines, no face, no clothing. Keep this extremely simple silhouette style and body proportions. State: [STATE]. Output a horizontal strip of EXACTLY THREE equal square cells, full image aspect ratio 3:1, identical sprite size, each character fully contained and centered in its own cell. Transparent background, no grid, no borders, no text, no shadows. All three poses have identical ground baseline near bottom of cell. No extra figures. This strip will be split into three equal frames for a GIF.

## Valores de STATE

- **cayendo:** free falling, arms and legs spread, head upright, no parachute. Three slightly different poses, arms flutter
- **paracaidas:** descending with an OPEN semicircular muted orange parachute above the head, thin suspension lines to both raised hands, legs dangling. Three subtly different canopy and leg poses
- **salvado:** standing safely on the ground, waving one hand in celebration, no parachute. Three slightly different waving poses
- **estrellado:** harmless cartoon flattened stick figure lying sideways after falling, bent limbs, two tiny orange stars above the head. No blood, no violence, no wounds. Three subtle star movement poses
