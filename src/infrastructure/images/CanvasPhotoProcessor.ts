import type { PhotoProcessor } from '../../application/ports/PhotoProcessor'

const OUTPUT_SIZE_PX = 400
const JPEG_QUALITY = 0.85

export class CanvasPhotoProcessor implements PhotoProcessor {
  async toSquareDataUrl(file: File): Promise<string> {
    const image = await createImageBitmap(file)
    const side = Math.min(image.width, image.height)
    const offsetX = (image.width - side) / 2
    const offsetY = (image.height - side) / 2

    const canvas = document.createElement('canvas')
    canvas.width = OUTPUT_SIZE_PX
    canvas.height = OUTPUT_SIZE_PX
    const context = canvas.getContext('2d')
    if (!context) throw new Error('El navegador no permite procesar imágenes')

    context.drawImage(image, offsetX, offsetY, side, side, 0, 0, OUTPUT_SIZE_PX, OUTPUT_SIZE_PX)
    image.close()
    return canvas.toDataURL('image/jpeg', JPEG_QUALITY)
  }
}
