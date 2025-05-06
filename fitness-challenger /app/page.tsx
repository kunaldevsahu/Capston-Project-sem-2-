import ChallengeFilterBar from "@/components/challenge-filter-bar"
import ChallengeCardList from "@/components/challenge-card-list"
import CreateChallengeButton from "@/components/create-challenge-button"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Transform Your Fitness Journey</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Join challenges, track your progress, and achieve your fitness goals with our structured approach.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Challenges</h2>
          <ChallengeFilterBar />
        </div>
        <ChallengeCardList featured={true} />
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Challenges</h2>
          <CreateChallengeButton />
        </div>
        <ChallengeCardList />
      </section>
    </div>
  )
}
