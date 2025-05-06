"use client"

import { useEffect, useState } from "react"
import { Flame } from "lucide-react"
import { getUserStreak } from "@/lib/api"
import { useUser } from "@/context/user-context"

export default function StreakTracker() {
  const [streak, setStreak] = useState({
    current: 0,
    longest: 0,
    lastActive: "",
  })
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    const fetchStreak = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const data = await getUserStreak()
        setStreak(data)
      } catch (error) {
        console.error("Error fetching streak:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStreak()
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
        <p className="text-muted-foreground">Sign in to track your streak</p>
      </div>
    )
  }

  // Generate last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split("T")[0]
  }).reverse()

  // Mock active days (in a real app, this would come from the API)
  const activeDays = [last7Days[1], last7Days[2], last7Days[3], last7Days[5]]

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary/10 p-3 rounded-full">
          <Flame className="h-8 w-8 text-primary" />
        </div>
        <div>
          <div className="text-3xl font-bold">{streak.current} Days</div>
          <div className="text-sm text-muted-foreground">Current Streak</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-2">Last 7 Days</div>
        <div className="grid grid-cols-7 gap-1">
          {last7Days.map((day, index) => {
            const isActive = activeDays.includes(day)
            const dayName = new Date(day).toLocaleDateString("en-US", { weekday: "short" }).charAt(0)

            return (
              <div key={day} className="flex flex-col items-center">
                <div className="text-xs text-muted-foreground mb-1">{dayName}</div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {new Date(day).getDate()}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="text-sm">
        <div className="flex justify-between mb-1">
          <span>Longest Streak</span>
          <span className="font-medium">{streak.longest} Days</span>
        </div>
        <div className="flex justify-between">
          <span>Last Active</span>
          <span className="font-medium">
            {streak.lastActive ? new Date(streak.lastActive).toLocaleDateString() : "Today"}
          </span>
        </div>
      </div>
    </div>
  )
}
