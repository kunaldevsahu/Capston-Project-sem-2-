"use client"

import { useEffect } from "react"
import ChallengeCard from "./challenge-card"
import { Skeleton } from "@/components/ui/skeleton"
import { useChallenges } from "@/context/challenges-context"

interface ChallengeCardListProps {
  featured?: boolean
}

export default function ChallengeCardList({ featured = false }: ChallengeCardListProps) {
  const { challenges, loading, fetchChallenges } = useChallenges()

  useEffect(() => {
    fetchChallenges(featured)
  }, [featured, fetchChallenges])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-card rounded-lg shadow overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (challenges.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No challenges found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  )
}
