import ChallengeOverview from "@/components/challenge-overview"
import DailyTaskList from "@/components/daily-task-list"
import { getChallengeById } from "@/lib/api"

export default async function ChallengeDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const challenge = await getChallengeById(params.id)

  if (!challenge) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Challenge Not Found</h1>
        <p>The challenge you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ChallengeOverview challenge={challenge} />
      <DailyTaskList challengeId={params.id} />
    </div>
  )
}
