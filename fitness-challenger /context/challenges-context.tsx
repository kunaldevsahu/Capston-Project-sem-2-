"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Challenge } from "@/types/challenge"
import { getChallenges } from "@/lib/api"

interface ChallengesContextType {
  challenges: Challenge[]
  loading: boolean
  filters: {
    search: string
    category: string | null
    duration: number | null
  }
  setFilters: (filters: {
    search?: string
    category?: string | null
    duration?: number | null
  }) => void
  fetchChallenges: (featured?: boolean) => Promise<void>
  createChallenge: (challenge: Partial<Challenge>) => Promise<void>
}

const ChallengesContext = createContext<ChallengesContextType | undefined>(undefined)

export function ChallengesProvider({ children }: { children: ReactNode }) {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: "",
    category: null as string | null,
    duration: null as number | null,
  })

  const fetchChallenges = useCallback(
    async (featured = false) => {
      setLoading(true)
      try {
        const data = await getChallenges(featured, filters)
        setChallenges(data)
      } catch (error) {
        console.error("Error fetching challenges:", error)
      } finally {
        setLoading(false)
      }
    },
    [filters],
  )

  const createChallenge = async (challenge: Partial<Challenge>) => {
    // In a real app, this would make an API call
    console.log("Creating challenge:", challenge)

    // Mock implementation
    const newChallenge: Challenge = {
      id: Math.random().toString(36).substring(2, 9),
      title: challenge.title || "New Challenge",
      description: challenge.description || "",
      category: challenge.category || "Other",
      duration: challenge.duration || 30,
      image: challenge.image || null,
      participants: 0,
      goal: "Complete all daily tasks",
      estimatedTime: 20,
      creator: {
        id: "user1",
        name: "Current User",
        avatar: null,
      },
    }

    setChallenges([newChallenge, ...challenges])
  }

  const updateFilters = (newFilters: {
    search?: string
    category?: string | null
    duration?: number | null
  }) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }))
  }

  return (
    <ChallengesContext.Provider
      value={{
        challenges,
        loading,
        filters,
        setFilters: updateFilters,
        fetchChallenges,
        createChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}

export function useChallenges() {
  const context = useContext(ChallengesContext)
  if (context === undefined) {
    throw new Error("useChallenges must be used within a ChallengesProvider")
  }
  return context
}
