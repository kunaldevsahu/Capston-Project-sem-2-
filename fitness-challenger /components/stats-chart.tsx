"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserStats } from "@/lib/api"
import { useUser } from "@/context/user-context"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

export default function StatsChart() {
  const [stats, setStats] = useState({
    weekly: [],
    monthly: [],
  })
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const data = await getUserStats()
        setStats(data)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
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
        <p className="text-muted-foreground">Sign in to view your stats</p>
      </div>
    )
  }

  // Mock data for the charts
  const weeklyData = [
    { name: "Mon", workouts: 2, minutes: 45 },
    { name: "Tue", workouts: 1, minutes: 30 },
    { name: "Wed", workouts: 3, minutes: 60 },
    { name: "Thu", workouts: 0, minutes: 0 },
    { name: "Fri", workouts: 2, minutes: 40 },
    { name: "Sat", workouts: 1, minutes: 25 },
    { name: "Sun", workouts: 2, minutes: 50 },
  ]

  const monthlyData = [
    { name: "Week 1", workouts: 8, minutes: 180 },
    { name: "Week 2", workouts: 10, minutes: 220 },
    { name: "Week 3", workouts: 7, minutes: 150 },
    { name: "Week 4", workouts: 12, minutes: 240 },
  ]

  return (
    <Tabs defaultValue="weekly">
      <TabsList className="mb-4">
        <TabsTrigger value="weekly">Weekly</TabsTrigger>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
      </TabsList>

      <TabsContent value="weekly">
        <div className="h-[200px]">
          <Chart>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="workouts" name="Workouts" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Chart>
        </div>
      </TabsContent>

      <TabsContent value="monthly">
        <div className="h-[200px]">
          <Chart>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="minutes"
                    name="Minutes"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Chart>
        </div>
      </TabsContent>
    </Tabs>
  )
}
