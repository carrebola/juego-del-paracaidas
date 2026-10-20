"""Monta los GIF desde las tiras generadas y prepara los paquetes locales."""
from pathlib import Path
from PIL import Image, ImageDraw
import shutil
import zipfile

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r'C:\Users\Carlos Arrebola\.codex\generated_images\01a1599c-8fca-7652-991e-04fd7493cc6b')
STRIPS = {
    'cayendo': 'exec-41ad6470-38a6-4199-a9f9-e8aa88a3e6dd.png',
    'paracaidas': 'exec-4c7ba417-5b63-4c91-b8a9-49e2fd3da655.png',
    'salvado': 'exec-fdd1c0d6-0e30-443c-9df7-0acf5e66e354.png',
    'estrellado': 'exec-26bfcaaf-607a-4c87-9877-48d8fc622ef9.png',
}

def recursos():
    destino = ROOT / 'profesorado/solucion/img'
    destino.mkdir(parents=True, exist_ok=True)
    originales = ROOT / 'recursos/tiras'
    originales.mkdir(parents=True, exist_ok=True)
    preview = Image.new('RGB', (600, 4 * 180), '#dfeef1')
    draw = ImageDraw.Draw(preview)
    for row, (name, filename) in enumerate(STRIPS.items()):
        local = originales / (name + '.png')
        if not local.exists():
            shutil.copy2(SOURCE / filename, local)
        strip = Image.open(originales / (name + '.png')).convert('RGBA')
        frames = []
        for i in range(3):
            frame = strip.crop((round(i*strip.width/3), 0, round((i+1)*strip.width/3), strip.height))
            frame.thumbnail((190, 156), Image.Resampling.LANCZOS)
            # Mismo encuadre y base para los tres fotogramas; no recortar cada pose.
            canvas = Image.new('RGBA', (192, 240))
            canvas.alpha_composite(frame, ((192-frame.width)//2, 240-frame.height))
            thumb = canvas.copy()
            thumb.thumbnail((130, 145))
            preview.paste(thumb, (100+i*160, row*180+25), thumb)
            # GIF reserva el índice 255 para transparencia.
            quant = canvas.convert('RGB').quantize(colors=255)
            quant.paste(255, mask=canvas.getchannel('A').point(lambda a: 255 if a < 128 else 0))
            quant.info['transparency'] = 255
            frames.append(quant)
        frames[0].save(destino / (name+'.gif'), save_all=True, append_images=frames[1:], duration=180, loop=0, transparency=255, disposal=2, optimize=False)
        draw.text((8, row*180+10), name, fill='#243b3b')
    preview.save(ROOT / 'recursos/vista-gifs.png')

def paquetes():
    alumno = ROOT / 'alumnado'
    alumno.mkdir(exist_ok=True)
    for folder in ('css', 'img'):
        shutil.copytree(ROOT / 'profesorado/solucion' / folder, alumno / folder, dirs_exist_ok=True)
    shutil.copy2(ROOT / 'profesorado/solucion/index.html', alumno / 'index.html')
    # Lista cerrada: no incluir carpetas procedentes de ZIP extraídos.
    juego = ['index.html', 'css/estilos.css', 'js/juego.js'] + [f'img/{name}.gif' for name in STRIPS]
    entrega = [f'alumnado/{file}' for file in juego + ['EXAMEN.md', 'GUIA_EQUIPOS.md', 'SEGUIMIENTO.md']]
    docente = entrega + [f'profesorado/solucion/{file}' for file in juego] + [
        'profesorado/GUIA.md', 'PLAN.md', 'LEEME.md', 'REVISION_ARCHIVOS.md',
        'herramientas/preparar.py', 'herramientas/comprobar.cjs',
        'recursos/PROMPTS.md', 'recursos/vista-gifs.png'
    ] + [f'recursos/tiras/{name}.png' for name in STRIPS]
    for name, files in [('alumnado.zip', entrega), ('profesorado.zip', docente)]:
        for file in files:
            if not (ROOT / file).is_file():
                raise FileNotFoundError(file)
        with zipfile.ZipFile(ROOT / name, 'w', zipfile.ZIP_DEFLATED) as archive:
            for file in files:
                archive.write(ROOT / file, file)

if __name__ == '__main__':
    recursos()
    paquetes()
