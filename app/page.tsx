import Link from "next/link";
import { Dumbbell, Brain, BarChart3, Heart } from "lucide-react";

export default function Page() {
  const features = [
    { icon: Dumbbell, title: "Personalized Goals", desc: "Pick your goal and get a plan that fits your life." },
    { icon: Brain, title: "AI Coach Support", desc: "Encouraging nudges, clear steps, and Plan‑B options." },
    { icon: BarChart3, title: "Track Progress", desc: "Tiny daily wins add up. See progress at a glance." },
    { icon: Heart, title: "Sustainable Habits", desc: "Build routines that survive busy weeks." },
  ];

  return (
    <div className="grid gap-8">
      <section className="card">
        <div className="card-body py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Your AI Fitness Buddy is here! 💪</h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-lg">Start in minutes — no login, no signup. Just a friendly onboarding that shapes a plan around your goals, barriers and preferences.</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/onboarding" className="btn-primary px-6 py-3 text-lg">Get Started (No Login)</Link>
            <a href="#how" className="btn-ghost px-6 py-3 text-lg">How it works</a>
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="card group hover:scale-105 transition-transform duration-200">
            <div className="card-body">
              <f.icon className="h-8 w-8 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
              <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section id="how" className="card">
        <div className="card-body">
          <h2 className="text-3xl font-semibold text-center mb-8">How it works (3 steps)</h2>
          <ol className="mt-4 grid gap-6 sm:grid-cols-3">
            <li className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-indigo-500">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold">1</span>
                  <b className="text-lg">Onboard</b>
                </div>
                <p className="text-sm text-slate-600">Pick a goal, activity level, barriers & habits.</p>
              </div>
            </li>
            <li className="card bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full font-bold">2</span>
                  <b className="text-lg">Personalize</b>
                </div>
                <p className="text-sm text-slate-600">We generate daily habits, weekly targets & meal support.</p>
              </div>
            </li>
            <li className="card bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full font-bold">3</span>
                  <b className="text-lg">Track</b>
                </div>
                <p className="text-sm text-slate-600">Use the dashboard to log mini‑wins and build streaks.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <div className="flex justify-center">
        <Link href="/onboarding" className="btn-primary px-8 py-4 text-lg font-semibold">Start now — it's free</Link>
      </div>
    </div>
  );
}