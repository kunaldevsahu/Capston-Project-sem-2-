import StreakTracker from "@/components/streak-tracker"
import StatsChart from "@/components/stats-chart"
import BadgesSection from "@/components/badges-section"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Fitness Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Current Streak</h2>
          <StreakTracker />
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Activity Stats</h2>
          <StatsChart />
        </div>
      </div>

      <div className="bg-card rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
        <BadgesSection />
      </div>
    </div>
  )
}
