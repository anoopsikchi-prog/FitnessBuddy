'use client'

import { useEffect, useState } from 'react'
import { testConnection, startAnonymously, getCurrentUser, signOut } from '../src/lib/supabase.js'

interface User {
  id: string
  // Add other user properties as needed
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
      if (existingUser) {
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
      <div style={styles.loadingContainer}>
        <h2>🏋️ Starting FitnessBuddy...</h2>
        <p>Connecting to your fitness journey...</p>
        <div style={styles.loadingSpinner}>⏳</div>
      </div>
    )
  }

  // Connection failed screen
  if (connectionStatus === 'failed') {
    return (
      <div style={styles.errorContainer}>
        <h2>❌ Connection Issue</h2>
        <p>Unable to connect to FitnessBuddy services.</p>
        <p><strong>Check:</strong> Your internet connection and Supabase configuration.</p>
        <button onClick={initializeApp} style={styles.retryButton}>
          🔄 Retry Connection
        </button>
      </div>
    )
  }

  return (
    <div style={styles.appContainer}>
      {/* 🔍 Debug Status Bar (Remove in production) */}
      <div style={styles.statusBar}>
        <span>DB: {connectionStatus}</span>
        {user && <span> | User: {user.id.slice(0, 8)}...</span>}
        <span> | Phase: {currentPhase}</span>
      </div>

      {/* Main App Content */}
      {renderCurrentPhase()}
    </div>
  )

  function renderCurrentPhase() {
    switch (currentPhase) {
      case 'welcome':
        return (
          <div style={styles.welcomeContainer}>
            <div style={styles.heroSection}>
              <h1 style={styles.heroTitle}>
                🏋️ Your AI Fitness Buddy is here! 💪
              </h1>
              <p style={styles.heroSubtitle}>
                Start in minutes — no login, no signup. Just a friendly onboarding that shapes a plan around your goals, barriers and preferences.
              </p>
              
              <button 
                onClick={handleGetStarted}
                style={styles.primaryButton}
                disabled={loading}
              >
                {loading ? '⏳ Starting...' : '🚀 Get Started (No Login)'}
              </button>
              
              <div style={styles.featuresGrid}>
                <div style={styles.featureCard}>
                  <div style={styles.featureIcon}>🎯</div>
                  <h3>Personalized Goals</h3>
                  <p>Pick your goal and get a plan that fits your life.</p>
                </div>
                
                <div style={styles.featureCard}>
                  <div style={styles.featureIcon}>🤖</div>
                  <h3>AI Coach Support</h3>
                  <p>Encouraging nudges, clear steps, and Plan B options.</p>
                </div>
                
                <div style={styles.featureCard}>
                  <div style={styles.featureIcon}>📊</div>
                  <h3>Track Progress</h3>
                  <p>Tiny daily wins and see progress at a glance.</p>
                </div>
                
                <div style={styles.featureCard}>
                  <div style={styles.featureIcon}>💚</div>
                  <h3>Sustainable Habits</h3>
                  <p>Build routines that survive busy weeks.</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'onboarding':
        return (
          <div style={styles.onboardingContainer}>
            <h2>🎯 Welcome to Your Fitness Journey!</h2>
            <div style={styles.successMessage}>
              <p>✅ <strong>Phase 1 Complete!</strong></p>
              <p>✅ Database connected successfully</p>
              <p>✅ Anonymous session created</p>
              <p>✅ User ID: <code>{user?.id}</code></p>
            </div>
            
            <div style={styles.nextStepsCard}>
              <h3>📋 Ready for Phase 2: Onboarding Flow</h3>
              <p>Next, we&apos;ll add:</p>
              <ul style={styles.taskList}>
                <li>✅ Goal selection (Weight loss, Muscle gain, General fitness)</li>
                <li>✅ Activity level assessment</li>
                <li>✅ Barrier identification</li>
                <li>✅ Workout preferences</li>
                <li>✅ Personalized plan generation</li>
              </ul>
            </div>

            <div style={styles.buttonGroup}>
              <button 
                onClick={() => setCurrentPhase('main')}
                style={styles.primaryButton}
              >
                🚀 Continue to Phase 2 Setup
              </button>
              
              <button 
                onClick={handleSignOut}
                style={styles.secondaryButton}
              >
                🔙 Back to Welcome
              </button>
            </div>
          </div>
        )

      case 'main':
        return (
          <div style={styles.mainContainer}>
            <div style={styles.header}>
              <h2>🏠 FitnessBuddy Dashboard</h2>
              <button onClick={handleSignOut} style={styles.secondaryButton}>
                👋 Sign Out
              </button>
            </div>
            
            <div style={styles.dashboardGrid}>
              <div style={styles.dashboardCard}>
                <h3>🎯 Your Progress</h3>
                <p>✅ Phase 1: Foundation - Complete!</p>
                <p>📋 Phase 2: Onboarding - Ready to build</p>
                <p>📊 Phase 3: Habit tracking - Coming next</p>
                <p>📈 Phase 4: Progress charts - Coming soon</p>
                <p>🤖 Phase 5: AI coach - Final phase</p>
              </div>
              
              <div style={styles.dashboardCard}>
                <h3>📊 Session Info</h3>
                <p><strong>User ID:</strong> {user?.id}</p>
                <p><strong>Session:</strong> Anonymous</p>
                <p><strong>Status:</strong> Active ✅</p>
                <p><strong>Database:</strong> Connected ✅</p>
              </div>
              
              <div style={styles.dashboardCard}>
                <h3>🚀 Next Steps</h3>
                <p>Your FitnessBuddy foundation is solid!</p>
                <p>Ready to add:</p>
                <ul>
                  <li>User onboarding flow</li>
                  <li>Fitness goal setting</li>
                  <li>Habit tracking system</li>
                  <li>Progress monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return <div>Unknown phase: {currentPhase}</div>
    }
  }
}

// 🎨 Styles (can be moved to CSS modules later)
const styles = {
  appContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f8fafc'
  },
  
  statusBar: {
    position: 'fixed' as const,
    top: 0,
    right: 0,
    padding: '8px 16px',
    backgroundColor: '#1f2937',
    color: 'white',
    fontSize: '12px',
    zIndex: 1000,
    borderBottomLeftRadius: '8px'
  },
  
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center' as const,
    backgroundColor: '#f8fafc'
  },
  
  loadingSpinner: {
    fontSize: '2rem'
  },
  
  errorContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center' as const,
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '2rem'
  },
  
  welcomeContainer: {
    paddingTop: '2rem'
  },
  
  heroSection: {
    textAlign: 'center' as const,
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  
  heroSubtitle: {
    fontSize: '1.2rem',
    color: '#6b7280',
    marginBottom: '2rem',
    maxWidth: '600px',
    margin: '0 auto 2rem'
  },
  
  primaryButton: {
    padding: '16px 32px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#6366f1',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '3rem'
  },
  
  secondaryButton: {
    padding: '12px 24px',
    fontSize: '16px',
    color: '#6b7280',
    backgroundColor: 'white',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '3rem'
  },
  
  featureCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as const
  },
  
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  
  onboardingContainer: {
    padding: '3rem 2rem',
    maxWidth: '800px',
    margin: '0 auto'
  },
  
  successMessage: {
    backgroundColor: '#ecfdf5',
    border: '1px solid #10b981',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem'
  },
  
  nextStepsCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  },
  
  taskList: {
    textAlign: 'left' as const,
    paddingLeft: '1rem'
  },
  
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center'
  },
  
  mainContainer: {
    padding: '3rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  
  dashboardCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  
  retryButton: {
    padding: '12px 24px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#ef4444',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '1rem'
  }
}