import fs from 'fs'
import path from 'path'

export function getContent<T = any>(locale: string, contentPath: string): T {
  const filePath = path.join(process.cwd(), 'content', locale, `${contentPath}.json`)

  // Fallback to NL if translation doesn't exist
  const fallbackPath = path.join(process.cwd(), 'content', 'nl', `${contentPath}.json`)

  const resolvedPath = fs.existsSync(filePath) ? filePath : fallbackPath
  return JSON.parse(fs.readFileSync(resolvedPath, 'utf-8')) as T
}
