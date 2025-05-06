import UserInfoCard from "@/components/user-info-card"
import CompletedChallenges from "@/components/completed-challenges"
import PhotoLog from "@/components/photo-log"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <UserInfoCard />
        </div>

        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Completed Challenges</h2>
            <CompletedChallenges />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Progress Photos</h2>
            <PhotoLog />
          </div>
        </div>
      </div>
    </div>
  )
}
