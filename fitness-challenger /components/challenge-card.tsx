import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Users } from "lucide-react"
import type { Challenge } from "@/types/challenge"

interface ChallengeCardProps {
  challenge: Challenge
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 bg-muted">
        {challenge.image ? (
          <img
            src={challenge.image || "/placeholder.svg"}
            alt={challenge.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
            <span className="text-white font-bold text-xl">{challenge.title.charAt(0)}</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary">{challenge.category}</Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle>{challenge.title}</CardTitle>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>

      <CardContent className="pb-2 flex-grow">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>{challenge.duration} days</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{challenge.participants} participants</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button asChild className="w-full">
          <Link href={`/challenges/${challenge.id}`}>View Challenge</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
