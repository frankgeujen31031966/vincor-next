import { contentRegistry } from './content-registry'

export async function getContent<T = any>(locale: string, contentPath: string): Promise<T> {
  const localeContent = contentRegistry[locale]
  if (localeContent && localeContent[contentPath]) {
    return localeContent[contentPath] as T
  }
  // Fallback to NL
  return contentRegistry.nl[contentPath] as T
}
