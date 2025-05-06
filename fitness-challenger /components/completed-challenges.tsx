"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Trophy } from "lucide-react"
import { getUserCompletedChallenges } from "@/lib/api"
import { useUser } from "@/context/user-context"
import type { Challenge } from "@/types/challenge"

export default function CompletedChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    const fetchCompletedChallenges = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const data = await getUserCompletedChallenges()
        setChallenges(data)
      } catch (error) {
        console.error("Error fetching completed challenges:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompletedChallenges()
  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Sign in to view your completed challenges</p>
      </div>
    )
  }

  if (challenges.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No Completed Challenges Yet</h3>
          <p className="text-muted-foreground">Join and complete challenges to see them here.</p>
        </CardContent>
      </Card>
    )
  }

  // Mock completed challenges data
  const mockCompletedChallenges = [
    {
      id: "1",
      title: "30-Day Push-Up Challenge",
      category: "Strength",
      duration: 30,
      completedDate: "2023-04-15",
      image: null,
    },
    {
      id: "2",
      title: "Couch to 5K",
      category: "Cardio",
      duration: 60,
      completedDate: "2023-06-22",
      image: null,
    },
    {
      id: "3",
      title: "Yoga for Beginners",
      category: "Flexibility",
      duration: 14,
      completedDate: "2023-07-10",
      image: null,
    },
  ]

  return (
    <div className="space-y-4">
      {mockCompletedChallenges.map((challenge) => (
        <Card key={challenge.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center shrink-0">
                {challenge.image ? (
                  <img
                    src={challenge.image || "/placeholder.svg"}
                    alt={challenge.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <Trophy className="h-8 w-8 text-primary" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{challenge.title}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="secondary">{challenge.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="h-3 w-3" />
                    <span>{challenge.duration} days</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-primary">
                  Completed on {new Date(challenge.completedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
