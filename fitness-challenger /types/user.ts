export interface User {
  id: string
  name: string
  email: string
  avatar: string | null
  bio?: string
  challengesCompleted?: number
  daysActive?: number
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  earnedDate: string | null
}

export interface Photo {
  id: string
  url: string
  date: string
  caption?: string
}
