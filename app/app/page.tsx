"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/Providers";
import { Plus, Activity, Salad, Weight, Heart, CheckCircle2, Target, Calendar, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { state, resetAll } = useApp();
  const router = useRouter();
  useEffect(() => { if (!state.onboarding.completed) router.replace("/onboarding"); }, [state.onboarding.completed, router]);

  const habits = state.onboarding.habits;
  return (
    <div className="grid gap-6">
      <section className="card bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="card-body flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {state.displayName || "FitBuddy"} 👋</h1>
            <p className="text-indigo-100 mt-2 text-lg">Tiny 10‑minute win to try today: take a brisk walk or drink a full glass of water.</p>
          </div>
          <button className="btn bg-white/20 text-white hover:bg-white/30 border-white/20" onClick={resetAll}>Reset App</button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Activity, label: "Log Workout", color: "from-blue-500 to-blue-600", hover: "hover:from-blue-600 hover:to-blue-700" },
          { icon: Salad, label: "Add Meal", color: "from-green-500 to-green-600", hover: "hover:from-green-600 hover:to-green-700" },
          { icon: Weight, label: "Log Weight", color: "from-purple-500 to-purple-600", hover: "hover:from-purple-600 hover:to-purple-700" },
          { icon: Heart, label: "Stress Check", color: "from-pink-500 to-pink-600", hover: "hover:from-pink-600 hover:to-pink-700" },
        ].map(x => (
          <button key={x.label} className={`card text-left bg-gradient-to-r ${x.color} ${x.hover} text-white hover:scale-105 transition-all duration-200`}>
            <div className="card-body flex items-center gap-4">
              <x.icon className="h-6 w-6" />
              <span className="font-medium text-lg">{x.label}</span>
            </div>
          </button>
        ))}
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-5 w-5 text-indigo-600" />
              <b className="text-lg">Weekly Goals</b>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">Workouts</span>
                  <span className="text-indigo-600 font-bold">2/3</span>
                </div>
                <div className="progress">
                  <span style={{ width: "66%" }} className="bg-gradient-to-r from-indigo-500 to-purple-500" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">Daily Steps</span>
                  <span className="text-green-600 font-bold">6k/10k</span>
                </div>
                <div className="progress">
                  <span style={{ width: "60%" }} className="bg-gradient-to-r from-green-500 to-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-5 w-5 text-orange-600" />
              <b className="text-lg">Monthly Streak</b>
            </div>
            <p className="text-slate-600 mb-4">Keep building momentum. You got this!</p>
            <div className="progress">
              <span style={{ width: "40%" }} className="bg-gradient-to-r from-orange-500 to-red-500" />
            </div>
            <div className="mt-2 text-sm text-slate-600">12/30 days</div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <b className="text-lg">Today's Metrics</b>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-slate-600">Steps</span>
                <span className="font-medium">6,120</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-600">Active minutes</span>
                <span className="font-medium">24 min</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-600">Water</span>
                <span className="font-medium">1,100 ml</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <b className="text-lg">Priority Habits</b>
          </div>
          <div className="flex flex-wrap gap-3">
            {habits.length === 0 && <span className="text-slate-600 text-sm">No habits selected yet.</span>}
            {habits.map(h => (
              <span key={h} className="badge bg-indigo-100 text-indigo-700 border-indigo-200 px-3 py-2 font-medium">
                <CheckCircle2 className="h-4 w-4" /> 
                {h.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-body">
          <b className="text-lg mb-4 block">Recent Activity</b>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-800">Welcome to FitBuddy 🎉</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-800">Onboarding completed successfully</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-purple-800">Personalized plan generated</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}