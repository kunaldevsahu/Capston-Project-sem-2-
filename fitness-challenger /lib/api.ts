import type { Challenge, Task } from "@/types/challenge"
import type { Badge, Photo } from "@/types/user"

// Mock data for challenges
const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "30-Day Push-Up Challenge",
    description: "Gradually increase your push-up count over 30 days to build upper body strength.",
    category: "Strength",
    duration: 30,
    image: null,
    participants: 1245,
    goal: "Complete all daily push-up sets",
    estimatedTime: 15,
    creator: {
      id: "creator1",
      name: "Fitness Coach",
      avatar: null,
    },
  },
  {
    id: "2",
    title: "Couch to 5K",
    description: "A beginner-friendly running program to help you run 5 kilometers in 8 weeks.",
    category: "Cardio",
    duration: 60,
    image: null,
    participants: 3567,
    goal: "Run 5K without stopping",
    estimatedTime: 30,
    creator: {
      id: "creator2",
      name: "Running Expert",
      avatar: null,
    },
  },
  {
    id: "3",
    title: "Yoga for Beginners",
    description: "Learn the basics of yoga with daily poses and breathing exercises.",
    category: "Flexibility",
    duration: 14,
    image: null,
    participants: 987,
    goal: "Master 10 basic yoga poses",
    estimatedTime: 20,
    creator: {
      id: "creator3",
      name: "Yoga Instructor",
      avatar: null,
    },
  },
  {
    id: "4",
    title: "Weight Loss Kickstart",
    description: "Combine cardio and strength training to jumpstart your weight loss journey.",
    category: "Weight Loss",
    duration: 30,
    image: null,
    participants: 2345,
    goal: "Lose 2-4 pounds and build healthy habits",
    estimatedTime: 45,
    creator: {
      id: "creator4",
      name: "Nutrition Coach",
      avatar: null,
    },
  },
  {
    id: "5",
    title: "Muscle Building Basics",
    description: "Focus on progressive overload to build muscle mass with this beginner program.",
    category: "Muscle Gain",
    duration: 90,
    image: null,
    participants: 1123,
    goal: "Increase strength in major lifts by 20%",
    estimatedTime: 60,
    creator: {
      id: "creator5",
      name: "Bodybuilding Pro",
      avatar: null,
    },
  },
  {
    id: "6",
    title: "Morning Stretching Routine",
    description: "Start your day with a 10-minute stretching routine to improve flexibility.",
    category: "Flexibility",
    duration: 14,
    image: null,
    participants: 756,
    goal: "Improve overall flexibility and morning energy",
    estimatedTime: 10,
    creator: {
      id: "creator6",
      name: "Mobility Specialist",
      avatar: null,
    },
  },
]

// Mock data for daily tasks
const mockTasks: Record<string, Task[]> = {
  "1": [
    {
      id: "task1",
      challengeId: "1",
      day: 1,
      title: "10 Push-Ups",
      description: "Complete 2 sets of 5 push-ups with 1-minute rest between sets.",
      completed: true,
    },
    {
      id: "task2",
      challengeId: "1",
      day: 1,
      title: "Plank",
      description: "Hold a plank position for 30 seconds.",
      completed: false,
    },
    {
      id: "task3",
      challengeId: "1",
      day: 2,
      title: "12 Push-Ups",
      description: "Complete 3 sets of 4 push-ups with 1-minute rest between sets.",
      completed: false,
    },
    {
      id: "task4",
      challengeId: "1",
      day: 2,
      title: "Plank",
      description: "Hold a plank position for 45 seconds.",
      completed: false,
    },
    {
      id: "task5",
      challengeId: "1",
      day: 3,
      title: "15 Push-Ups",
      description: "Complete 3 sets of 5 push-ups with 1-minute rest between sets.",
      completed: false,
    },
    {
      id: "task6",
      challengeId: "1",
      day: 3,
      title: "Plank",
      description: "Hold a plank position for 60 seconds.",
      completed: false,
    },
  ],
}

// API functions

// Get all challenges
export async function getChallenges(
  featured = false,
  filters: {
    search?: string
    category?: string | null
    duration?: number | null
  } = {},
): Promise<Challenge[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  let filteredChallenges = [...mockChallenges]

  // Apply filters
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredChallenges = filteredChallenges.filter(
      (challenge) =>
        challenge.title.toLowerCase().includes(searchTerm) || challenge.description.toLowerCase().includes(searchTerm),
    )
  }

  if (filters.category) {
    filteredChallenges = filteredChallenges.filter((challenge) => challenge.category === filters.category)
  }

  if (filters.duration) {
    filteredChallenges = filteredChallenges.filter((challenge) => challenge.duration === filters.duration)
  }

  // If featured, return only the first 3 challenges
  if (featured) {
    return filteredChallenges.slice(0, 3)
  }

  return filteredChallenges
}

// Get a challenge by ID
export async function getChallengeById(id: string): Promise<Challenge | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const challenge = mockChallenges.find((c) => c.id === id)
  return challenge || null
}

// Get daily tasks for a challenge
export async function getDailyTasks(challengeId: string): Promise<Task[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return mockTasks[challengeId] || []
}

// Complete a task
export async function completeTask(challengeId: string, taskId: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would update the database
  console.log(`Completing task ${taskId} for challenge ${challengeId}`)
}

// Get user streak
export async function getUserStreak(): Promise<{
  current: number
  longest: number
  lastActive: string
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    current: 5,
    longest: 14,
    lastActive: new Date().toISOString(),
  }
}

// Get user stats
export async function getUserStats(): Promise<{
  weekly: any[]
  monthly: any[]
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    weekly: [],
    monthly: [],
  }
}

// Get user badges
export async function getUserBadges(): Promise<Badge[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return []
}

// Get user completed challenges
export async function getUserCompletedChallenges(): Promise<Challenge[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return []
}

// Get user photos
export async function getUserPhotos(): Promise<Photo[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return []
}

// Upload a photo
export async function uploadPhoto(file: File): Promise<Photo> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // In a real app, this would upload the file to storage
  console.log(`Uploading file: ${file.name}`)

  return {
    id: Math.random().toString(36).substring(2, 9),
    url: URL.createObjectURL(file),
    date: new Date().toISOString(),
    caption: "",
  }
}
