import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-5xl font-bold mb-6 text-center">Health Analysis Predictor</h1>
      <p className="text-xl mb-8 text-center max-w-2xl text-gray-300">
        Discover insights about your health and receive personalized recommendations to improve your well-being.
      </p>
      <Link href="/form">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </Button>
      </Link>
    </div>
  )
}

