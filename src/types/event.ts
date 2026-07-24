export type EventCategory = 'Koncert' | 'Sport' | 'Teatr' | 'Konferencja'

export type Event = {
  id: string
  title: string
  category: EventCategory
  date: string
  time: string
  venue: string
  city: string
  price: number
  totalSeats: number
  availableSeats: number
  image: string
  description: string
  artist?: string
}
