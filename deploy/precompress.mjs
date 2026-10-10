import { readdir, readFile, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { brotliCompressSync, constants, gzipSync } from 'node:zlib'

const COMPRESSIBLE_EXTENSIONS = new Set(['.html', '.js', '.css', '.svg', '.json', '.txt'])
const MIN_SIZE_BYTES = 512
const outputDirectory = process.argv[2] ?? 'dist'

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name)
      return entry.isDirectory() ? listFiles(path) : [path]
    }),
  )
  return nested.flat()
}

async function precompress(path) {
  const content = await readFile(path)
  if (content.length < MIN_SIZE_BYTES) return
  await Promise.all([
    writeFile(`${path}.gz`, gzipSync(content, { level: 9 })),
    writeFile(
      `${path}.br`,
      brotliCompressSync(content, { params: { [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY } }),
    ),
  ])
}

const files = await listFiles(outputDirectory)
const compressibleFiles = files.filter((path) => COMPRESSIBLE_EXTENSIONS.has(extname(path)))
await Promise.all(compressibleFiles.map(precompress))
console.log(`Precompressed ${compressibleFiles.length} files in ${outputDirectory}`)
