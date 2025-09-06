'use client'

import { useEffect, useState } from 'react'
import { testConnection, startAnonymously, getCurrentUser, signOut } from '@/src/lib/supabase'

interface User {
  id: string
  email?: string
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'failed'>('testing')
  const [currentPhase, setCurrentPhase] = useState<'welcome' | 'onboarding' | 'main'>('welcome')

  useEffect(() => {
    initializeApp()
  }, [])

  const initializeApp = async () => {
    console.log('🔍 Initializing FitnessBuddy...')
    
    // Test Supabase connection
    const connectionTest = await testConnection()
    
    if (connectionTest.success) {
      setConnectionStatus('connected')
      console.log('✅ Database connection established')
      
      // Check for existing user session
      const existingUser = await getCurrentUser()
      if (existingUser && existingUser !== undefined) {
        setUser(existingUser)
        setCurrentPhase('main')
        console.log('✅ Existing user found:', existingUser.id)
      }
    } else {
      setConnectionStatus('failed')
      console.error('❌ Connection failed:', connectionTest.error)
    }
    
    setLoading(false)
  }

  const handleGetStarted = async () => {
    setLoading(true)
    console.log('🚀 Starting FitnessBuddy session...')
    
    const result = await startAnonymously()
    if (result.success) {
      setUser(result.user)
      setCurrentPhase('onboarding')
      console.log('✅ User session created:', result.user.id)
    } else {
      console.error('❌ Failed to start session:', result.error)
      alert('Failed to start. Please refresh and try again.')
    }
    
    setLoading(false)
  }

  const handleSignOut = async () => {
    const result = await signOut()
    if (result.success) {
      setUser(null)
      setCurrentPhase('welcome')
    }
  }

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Starting FitnessBuddy...</h2>
          <p className="text-gray-600">Connecting to your fitness journey...</p>
          <div className="mt-4 text-4xl">⏳</div>
        </div>
      </div>
    )
  }

  // Connection failed screen
  if (connectionStatus === 'failed') {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center text-red-600 p-8">
          <h2 className="text-2xl font-bold mb-4">❌ Connection Issue</h2>
          <p className="mb-2">Unable to connect to FitnessBuddy services.</p>
          <p className="mb-4"><strong>Check:</strong> Your internet connection and Supabase configuration.</p>
          <button 
            onClick={initializeApp}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            🔄 Retry Connection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Debug Status Bar */}
      <div className="fixed top-0 right-0 bg-gray-800 text-white text-xs px-4 py-2 rounded-bl-lg z-50">
        <span>DB: {connectionStatus}</span>
        {user && <span> | User: {user.id.slice(0, 8)}...</span>}
        <span> | Phase: {currentPhase}</span>
      </div>

      {/* Main Content */}
      {currentPhase === 'welcome' && (
        <div className="pt-8">
          <div className="text-center py-16 px-8 max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your AI Fitness Buddy is here! 💪
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start in minutes — no login, no signup. Just a friendly onboarding that shapes a plan around your goals, barriers and preferences.
            </p>
            
            <button 
              onClick={handleGetStarted}
              disabled={loading}
              className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 mb-12"
            >
              {loading ? '⏳ Starting...' : '🚀 Get Started (No Login)'}
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-lg mb-2">Personalized Goals</h3>
                <p className="text-gray-600">Pick your goal and get a plan that fits your life.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="font-bold text-lg mb-2">AI Coach Support</h3>
                <p className="text-gray-600">Encouraging nudges, clear steps, and Plan B options.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="font-bold text-lg mb-2">Track Progress</h3>
                <p className="text-gray-600">Tiny daily wins and see progress at a glance.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="text-4xl mb-4">💚</div>
                <h3 className="font-bold text-lg mb-2">Sustainable Habits</h3>
                <p className="text-gray-600">Build routines that survive busy weeks.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPhase === 'onboarding' && (
        <div className="py-12 px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">🎯 Welcome to Your Fitness Journey!</h2>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <p className="text-green-800"><strong>✅ Phase 1 Complete!</strong></p>
            <p className="text-green-700">✅ Database connected successfully</p>
            <p className="text-green-700">✅ Anonymous session created</p>
            <p className="text-green-700">✅ User ID: <code className="bg-green-100 px-2 py-1 rounded">{user?.id}</code></p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            <h3 className="text-xl font-bold mb-4">📋 Ready for Phase 2: Onboarding Flow</h3>
            <p className="mb-4">Next, we'll add:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>✅ Goal selection (Weight loss, Muscle gain, General fitness)</li>
              <li>✅ Activity level assessment</li>
              <li>✅ Barrier identification</li>
              <li>✅ Workout preferences</li>
              <li>✅ Personalized plan generation</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setCurrentPhase('main')}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
            >
              🚀 Continue to Phase 2 Setup
            </button>
            
            <button 
              onClick={handleSignOut}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              🔙 Back to Welcome
            </button>
          </div>
        </div>
      )}

      {currentPhase === 'main' && (
        <div className="py-12 px-8 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">🏠 FitnessBuddy Dashboard</h2>
            <button 
              onClick={handleSignOut}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              👋 Sign Out
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg mb-4">🎯 Your Progress</h3>
              <div className="space-y-2 text-sm">
                <p>✅ Phase 1: Foundation - Complete!</p>
                <p>📋 Phase 2: Onboarding - Ready to build</p>
                <p>📊 Phase 3: Habit tracking - Coming next</p>
                <p>📈 Phase 4: Progress charts - Coming soon</p>
                <p>🤖 Phase 5: AI coach - Final phase</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg mb-4">📊 Session Info</h3>
              <div className="space-y-2 text-sm">
                <p><strong>User ID:</strong> {user?.id}</p>
                <p><strong>Session:</strong> Anonymous</p>
                <p><strong>Status:</strong> Active ✅</p>
                <p><strong>Database:</strong> Connected ✅</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg mb-4">🚀 Next Steps</h3>
              <p className="text-sm mb-2">Your FitnessBuddy foundation is solid!</p>
              <p className="text-sm mb-2">Ready to add:</p>
              <ul className="text-sm space-y-1">
                <li>• User onboarding flow</li>
                <li>• Fitness goal setting</li>
                <li>• Habit tracking system</li>
                <li>• Progress monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}