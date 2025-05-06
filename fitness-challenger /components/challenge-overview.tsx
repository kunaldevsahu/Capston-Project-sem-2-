import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, Share2, Trophy, Users } from "lucide-react"
import type { Challenge } from "@/types/challenge"

interface ChallengeOverviewProps {
  challenge: Challenge
}

export default function ChallengeOverview({ challenge }: ChallengeOverviewProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{challenge.category}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>{challenge.duration} days</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{challenge.participants} participants</span>
              </div>
            </div>
            <p className="text-muted-foreground">{challenge.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Challenge Goal</h3>
                  <p className="text-sm text-muted-foreground">{challenge.goal}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Estimated Time</h3>
                  <p className="text-sm text-muted-foreground">{challenge.estimatedTime} minutes per day</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4">
            <Button size="lg">Join Challenge</Button>
            <Button size="lg" variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-card rounded-lg overflow-hidden shadow">
            {challenge.image ? (
              <img
                src={challenge.image || "/placeholder.svg"}
                alt={challenge.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
                <span className="text-white font-bold text-2xl">{challenge.title.charAt(0)}</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold mb-2">Challenge Creator</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  {challenge.creator?.avatar ? (
                    <img
                      src={challenge.creator.avatar || "/placeholder.svg"}
                      alt={challenge.creator.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-medium">{challenge.creator?.name.charAt(0) || "U"}</span>
                  )}
                </div>
                <div>
                  <p className="font-medium">{challenge.creator?.name || "Unknown"}</p>
                  <p className="text-sm text-muted-foreground">Fitness Coach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
