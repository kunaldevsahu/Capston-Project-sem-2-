"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getUserBadges } from "@/lib/api"
import { useUser } from "@/context/user-context"
import type { Badge as BadgeType } from "@/types/user"

export default function BadgesSection() {
  const [badges, setBadges] = useState<BadgeType[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    const fetchBadges = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const data = await getUserBadges()
        setBadges(data)
      } catch (error) {
        console.error("Error fetching badges:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBadges()
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
        <p className="text-muted-foreground">Sign in to view your badges</p>
      </div>
    )
  }

  // Mock badges data
  const mockBadges = [
    {
      id: "1",
      name: "First Challenge",
      description: "Completed your first challenge",
      icon: "🏆",
      earned: true,
      earnedDate: "2023-04-15",
    },
    {
      id: "2",
      name: "7-Day Streak",
      description: "Maintained a 7-day activity streak",
      icon: "🔥",
      earned: true,
      earnedDate: "2023-04-22",
    },
    {
      id: "3",
      name: "Challenge Creator",
      description: "Created your first custom challenge",
      icon: "✨",
      earned: true,
      earnedDate: "2023-05-01",
    },
    {
      id: "4",
      name: "30-Day Streak",
      description: "Maintained a 30-day activity streak",
      icon: "⚡",
      earned: false,
      earnedDate: null,
    },
    {
      id: "5",
      name: "Challenge Master",
      description: "Completed 10 challenges",
      icon: "👑",
      earned: false,
      earnedDate: null,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {mockBadges.map((badge) => (
        <Card key={badge.id} className={`text-center ${!badge.earned ? "opacity-50" : ""}`}>
          <CardContent className="p-4">
            <div className="text-4xl mb-2">{badge.icon}</div>
            <h3 className="font-medium text-sm">{badge.name}</h3>
            <p className="text-xs text-muted-foreground">{badge.description}</p>
            {badge.earned && (
              <div className="mt-2 text-xs text-primary">
                Earned on {new Date(badge.earnedDate!).toLocaleDateString()}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
