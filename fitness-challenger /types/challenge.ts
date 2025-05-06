export interface Challenge {
  id: string
  title: string
  description: string
  category: string
  duration: number
  image: string | null
  participants: number
  goal: string
  estimatedTime: number
  creator: {
    id: string
    name: string
    avatar: string | null
  }
}

export interface Task {
  id: string
  challengeId: string
  day: number
  title: string
  description: string
  completed: boolean
}
