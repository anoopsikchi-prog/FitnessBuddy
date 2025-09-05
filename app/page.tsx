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
            <Link href="/onboarding" className="btn-primary px-8 py-4 text-lg font-semibold">Start now — it's free</Link>
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

    </div>
  );
}