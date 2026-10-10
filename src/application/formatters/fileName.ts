export function resumeFileName(fullName: string): string {
  const slug = fullName
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .split(/\s+/)
    .join('_')
  return `CV_${slug}`
}
