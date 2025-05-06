"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { User } from "@/types/user"

interface UserContextType {
  user: User | null
  updateUser: (userData: Partial<User>) => void
  signIn: (userData: User) => void
  signOut: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  // Mock user data - in a real app, this would come from authentication
  const [user, setUser] = useState<User | null>({
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
    bio: "Fitness enthusiast trying to stay consistent with my workouts.",
    challengesCompleted: 3,
    daysActive: 45,
  })

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const signIn = (userData: User) => {
    setUser(userData)
  }

  const signOut = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
