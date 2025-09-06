'use client'

import { useEffect, useState } from 'react'
import { useApp } from '@/components/Providers'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email?: string
}

export default function HomePage() {
  const { state } = useApp()
  const router = useRouter()

  useEffect(() => {
    // If onboarding is completed, show dashboard
    if (state.onboarding.completed) {
      // This is the main dashboard - we can add dashboard content here
    }
  }, [])


  return (
    <div className="grid gap-8">
      <section className="card">
        <div className="card-body py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Your Dashboard! 🎉
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-lg">
            {state.onboarding.completed 
              ? `Great job completing your onboarding, ${state.displayName}! Your personalized fitness plan is ready.`
              : "Complete your onboarding to unlock your personalized fitness dashboard."
            }
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            {!state.onboarding.completed ? (
              <button 
                onClick={() => router.push('/onboarding')}
                className="btn-primary px-6 py-3 text-lg"
              >
                Complete Onboarding
              </button>
            ) : (
              <div className="grid gap-4 md:grid-cols-3 w-full max-w-4xl">
                <div className="card bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="card-body text-center">
                    <h3 className="font-bold text-lg mb-2 text-indigo-700">Your Goal</h3>
                    <p className="text-slate-700 capitalize">{state.onboarding.goal?.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="card bg-gradient-to-br from-purple-50 to-pink-50">
                  <div className="card-body text-center">
                    <h3 className="font-bold text-lg mb-2 text-purple-700">Activity Level</h3>
                    <p className="text-slate-700 capitalize">{state.onboarding.activity?.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="card bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="card-body text-center">
                    <h3 className="font-bold text-lg mb-2 text-green-700">Focus Habits</h3>
                    <p className="text-slate-700">{state.onboarding.habits.length} selected</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}