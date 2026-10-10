import type { PhotoProcessor } from '../ports/PhotoProcessor'

export class PreparePhoto {
  private readonly processor: PhotoProcessor

  constructor(processor: PhotoProcessor) {
    this.processor = processor
  }

  execute(file: File): Promise<string> {
    return this.processor.toSquareDataUrl(file)
  }
}
