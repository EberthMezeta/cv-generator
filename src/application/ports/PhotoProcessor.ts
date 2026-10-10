export interface PhotoProcessor {
  toSquareDataUrl(file: File): Promise<string>
}
