import { comics } from '@/data/comics'
import type { Comic } from '@/data/comics'

export function getComicsCount(): number {
  return comics.length
}

export function getComicByIdx(idx: number): Comic {
  const count = comics.length
  return comics[((idx % count) + count) % count]
}

export function getComicById(id: string): Comic | undefined {
  return comics.find(c => c.id === id)
}

export function getRandomId(excludeId?: string): string {
  const count = comics.length
  if (count <= 1) return comics[0].id
  const candidates = comics.filter(c => c.id !== excludeId)
  return candidates[Math.floor(Math.random() * candidates.length)].id
}
