"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getDailyTasks, completeTask } from "@/lib/api"
import type { Task } from "@/types/challenge"
import { useUser } from "@/context/user-context"

interface DailyTaskListProps {
  challengeId: string
}

export default function DailyTaskList({ challengeId }: DailyTaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [activeDay, setActiveDay] = useState("1")
  const { user } = useUser()

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      try {
        const data = await getDailyTasks(challengeId)
        setTasks(data)
      } catch (error) {
        console.error("Error fetching tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [challengeId])

  const handleCompleteTask = async (taskId: string) => {
    if (!user) return

    try {
      await completeTask(challengeId, taskId)
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
    } catch (error) {
      console.error("Error completing task:", error)
    }
  }

  // Group tasks by day
  const tasksByDay = tasks.reduce(
    (acc, task) => {
      const day = task.day.toString()
      if (!acc[day]) {
        acc[day] = []
      }
      acc[day].push(task)
      return acc
    },
    {} as Record<string, Task[]>,
  )

  // Get unique days
  const days = Object.keys(tasksByDay).sort((a, b) => Number.parseInt(a) - Number.parseInt(b))

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Daily Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Daily Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8 text-muted-foreground">No tasks found for this challenge.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeDay} onValueChange={setActiveDay}>
          <TabsList className="mb-4 flex flex-wrap">
            {days.map((day) => (
              <TabsTrigger key={day} value={day}>
                Day {day}
              </TabsTrigger>
            ))}
          </TabsList>

          {days.map((day) => (
            <TabsContent key={day} value={day} className="space-y-4">
              {tasksByDay[day].map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-4 rounded-lg border">
                  <Checkbox
                    id={task.id}
                    checked={task.completed}
                    onCheckedChange={() => handleCompleteTask(task.id)}
                    disabled={!user}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={task.id}
                      className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {task.title}
                    </label>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                </div>
              ))}

              {!user && (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-2">Sign in to track your progress</p>
                  <Button>Sign In</Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
