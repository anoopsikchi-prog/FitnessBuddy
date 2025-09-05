"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/Providers";
import { GOALS, ACTIVITY, BARRIERS, HABITS, type Habit, type Demographics } from "@/lib/types";

const QUOTES = [
  "Small steps. Big change.",
  "Real talk: consistency beats intensity.",
  "Plan B is still progress.",
];

export default function OnboardingPage() {
  const { state, setGoal, setActivity, toggleBarrier, setHabits, setMealCoach, setDemographics, completeOnboarding, setDisplayName } = useApp();
  const router = useRouter();
  const [step, setStep] = useState(1);

  useEffect(() => { if (state.onboarding.completed) router.replace("/app"); }, [state.onboarding.completed, router]);
  const pct = useMemo(() => Math.round((step / 9) * 100), [step]);

  return (
    <div className="grid gap-6">
      <header className="flex items-center justify-between">
        <div className="stepper">
          <span className="badge bg-indigo-100 text-indigo-700 border-indigo-200">Step {step} / 9</span>
        </div>
        <div className="progress w-64">
          <span style={{ width: pct + "%" }} className="bg-gradient-to-r from-indigo-500 to-purple-500" />
        </div>
      </header>

      {step === 1 && (
        <section className="card">
          <div className="card-body">
            <h2 className="text-3xl font-semibold mb-2">Pick your primary goal</h2>
            <p className="text-slate-600 mb-6">Choose one to start — you can refine later.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {GOALS.map(g => (
                <button key={g.key} onClick={() => setGoal(g.key)} className={`card text-left transition-all duration-200 hover:scale-105 ${state.onboarding.goal===g.key?"ring-2 ring-indigo-600 bg-indigo-50": "hover:shadow-lg"}`}>
                  <div className="card-body">
                    <b className="text-lg">{g.label}</b>
                    <p className="text-sm text-slate-600 mt-2">{g.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button className="btn-primary px-6 py-3" onClick={()=> setStep(2)} disabled={!state.onboarding.goal}>
                Continue
              </button>
            </div>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="card">
          <div className="card-body">
            <h2 className="text-3xl font-semibold mb-2">Activity level — real talk</h2>
            <p className="text-slate-600 italic mb-6">{QUOTES[1]}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ACTIVITY.map(a => (
                <button key={a.key} onClick={() => setActivity(a.key)} className={`card text-left transition-all duration-200 hover:scale-105 ${state.onboarding.activity===a.key?"ring-2 ring-indigo-600 bg-indigo-50": "hover:shadow-lg"}`}>
                  <div className="card-body">
                    <b className="text-lg">{a.label}</b>
                    <p className="text-sm text-slate-600 mt-2">{a.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button className="btn-ghost px-6 py-3" onClick={()=> setStep(1)}>Back</button>
              <button className="btn-primary px-6 py-3" onClick={()=> setStep(3)} disabled={!state.onboarding.activity}>Continue</button>
            </div>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="card">
          <div className="card-body">
            <h2 className="text-3xl font-semibold mb-2">What gets in your way?</h2>
            <p className="text-slate-600 mb-6">Pick any that apply (optional). You can skip.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {BARRIERS.map(b => (
                <label key={b.key} className={`card cursor-pointer transition-all duration-200 hover:scale-105 ${state.onboarding.barriers.includes(b.key)?"ring-2 ring-indigo-600 bg-indigo-50":"hover:shadow-lg"}`}>
                  <div className="card-body flex items-center gap-3">
                    <input type="checkbox" className="scale-125 text-indigo-600" checked={state.onboarding.barriers.includes(b.key)} onChange={()=> toggleBarrier(b.key)} />
                    <span className="font-medium">{b.label}</span>
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button className="btn-ghost px-6 py-3" onClick={()=> setStep(2)}>Back</button>
              <div className="flex gap-2">
                <button className="btn-ghost px-6 py-3" onClick={()=> setStep(4)}>Skip</button>
                <button className="btn-primary px-6 py-3" onClick={()=> setStep(4)}>Continue</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="card">
          <div className="card-body">
            <h2 className="text-3xl font-semibold mb-2">We heard you 👂</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="card bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="card-body">
                  <b className="text-lg text-indigo-700">Goal</b>
                  <p className="text-slate-600 mt-1 capitalize">{state.onboarding.goal?.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="card bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="card-body">
                  <b className="text-lg text-purple-700">Activity</b>
                  <p className="text-slate-600 mt-1 capitalize">{state.onboarding.activity?.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="card bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="card-body">
                  <b className="text-lg text-green-700">Barriers</b>
                  <p className="text-slate-600 mt-1">{state.onboarding.barriers.length? state.onboarding.barriers.length + " selected" : "None"}</p>
                </div>
              </div>
            </div>
            <p className="mt-6 text-slate-700 text-center text-lg">We'll tailor a plan and promise simple steps + Plan‑B options.</p>
            <div className="mt-8 flex justify-between">
              <button className="btn-ghost px-6 py-3" onClick={()=> setStep(3)}>Back</button>
              <button className="btn-primary px-6 py-3" onClick={()=> setStep(5)}>Continue</button>
            </div>
          </div>
        </section>
      )}

      {step === 5 && (
        <HabitStep onNext={() => setStep(6)} onBack={() => setStep(4)} />
      )}

      {step === 6 && (
        <section className="card">
          <div className="card-body">
            <h2 className="text-3xl font-semibold mb-2">Meal Planning — Your kitchen, your rules</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { t: "Reduce decision fatigue", d: "Know what to eat before you're hungry.", icon: "🧠" },
                { t: "Smart grocery lists", d: "Shop once, cook twice.", icon: "🛒" },
                { t: "Prep tips", d: "Small prep = big consistency.", icon: "👨‍🍳" },
              ].map(x => (
                <div key={x.t} className="card bg-gradient-to-br from-orange-50 to-red-50">
                  <div className="card-body text-center">
                    <div className="text-3xl mb-3">{x.icon}</div>
                    <b className="text-lg">{x.t}</b>
                    <p className="text-slate-600 text-sm mt-2">{x.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button className="btn-ghost px-6 py-3" onClick={()=> setStep(5)}>Back</button>
              <button className="btn-primary px-6 py-3" onClick={()=> setStep(7)}>Continue</button>
            </div>
          </div>
        </section>
      )}

      {step === 7 && (
        <section className="card">
          <div className="card-body">
            <h2 className="text-3xl font-semibold mb-6">Meal Coach preference</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <button className="card hover:scale-105 transition-all duration-200 hover:shadow-lg" onClick={()=> { setMealCoach("yes"); setStep(8); }}>
                <div className="card-body text-center">
                  <div className="text-4xl mb-3">🙌</div>
                  <b className="text-lg">Yes, I'm in!</b>
                  <p className="text-slate-600 text-sm mt-2">Weekly plan, recipes & grocery lists.</p>
                </div>
              </button>
              <button className="card hover:scale-105 transition-all duration-200 hover:shadow-lg" onClick={()=> { setMealCoach("open"); setStep(8); }}>
                <div className="card-body text-center">
                  <div className="text-4xl mb-3">🤔</div>
                  <b className="text-lg">Open to trying</b>
                  <p className="text-slate-600 text-sm mt-2">Light suggestions. You stay in control.</p>
                </div>
              </button>
              <button className="card hover:scale-105 transition-all duration-200 hover:shadow-lg" onClick={()=> { setMealCoach("no"); setStep(8); }}>
                <div className="card-body text-center">
                  <div className="text-4xl mb-3">🚫</div>
                  <b className="text-lg">No thanks</b>
                  <p className="text-slate-600 text-sm mt-2">We'll focus on habits & Plan‑B routines.</p>
                </div>
              </button>
            </div>
            <div className="mt-8 flex justify-between">
              <button className="btn-ghost px-6 py-3" onClick={()=> setStep(6)}>Back</button>
            </div>
          </div>
        </section>
      )}

      {step === 8 && (
        <DemographicsStep onBack={() => setStep(7)} onNext={() => setStep(9)} onDisplayName={(name)=> setDisplayName(name)} onSave={(d)=> setDemographics(d)} />
      )}

      {step === 9 && (
        <section className="card">
          <div className="card-body text-center py-16">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Your Personalized Plan is Ready!</h2>
            <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">Daily habits, weekly targets, and meal support — tailored from your choices.</p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <button className="btn-primary px-8 py-4 text-lg font-semibold" onClick={()=> { completeOnboarding(); router.push("/app"); }}>Go to Dashboard</button>
              <button className="btn-ghost px-6 py-3" onClick={()=> setStep(8)}>Back</button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function HabitStep({ onNext, onBack }: { onNext: ()=>void; onBack: ()=>void }){
  const { state, setHabits } = useApp();
  const [selected, setSelected] = useState<Habit[]>(state.onboarding.habits);
  useEffect(()=> { setHabits(selected); }, [selected, setHabits]);

  const toggle = (h: Habit) => setSelected(s => s.includes(h) ? s.filter(x=>x!==h) : (s.length<4? [...s,h] : s));

  return (
    <section className="card">
      <div className="card-body">
        <h2 className="text-3xl font-semibold mb-2">Pick 2–4 focus habits</h2>
        <p className="text-slate-600 mb-6">Smart recommendations appear based on your goal & barriers.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HABITS.map(h => (
            <label key={h.key} className={`card cursor-pointer transition-all duration-200 hover:scale-105 ${selected.includes(h.key)?"ring-2 ring-indigo-600 bg-indigo-50":"hover:shadow-lg"}`}>
              <div className="card-body flex items-center gap-3">
                <input type="checkbox" className="scale-125 text-indigo-600" checked={selected.includes(h.key)} onChange={()=> toggle(h.key)} />
                <div>
                  <span className="font-medium">{h.label}</span>
                  <span className="text-xs text-slate-500 ml-2 px-2 py-1 bg-slate-100 rounded-full">{h.cat}</span>
                </div>
              </div>
            </label>
          ))}
        </div>
        <div className="mt-8 flex justify-between">
          <button className="btn-ghost px-6 py-3" onClick={onBack}>Back</button>
          <button className="btn-primary px-6 py-3" onClick={onNext} disabled={selected.length<2}>
            Continue ({selected.length}/4)
          </button>
        </div>
      </div>
    </section>
  );
}

function DemographicsStep({ onBack, onNext, onSave, onDisplayName }:{ onBack:()=>void; onNext:()=>void; onSave:(d:Demographics)=>void; onDisplayName:(n:string)=>void; }){
  const { state } = useApp();
  const [form, setForm] = useState<Demographics>(state.onboarding.demographics);
  const [name, setName] = useState(state.displayName || "");

  return (
    <section className="card">
      <div className="card-body">
        <h2 className="text-3xl font-semibold mb-2">About you</h2>
        <p className="text-slate-600 text-sm mb-6">Privacy‑first: stored only on your device</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Display Name</label>
            <input className="input" value={name} onChange={(e)=> setName(e.target.value)} placeholder="e.g., Alex" />
          </div>
          <div>
            <label className="label">Gender</label>
            <input className="input" value={form.gender ?? ""} onChange={e=> setForm({ ...form, gender: e.target.value })} placeholder="Optional" />
          </div>
          <div>
            <label className="label">Age Group *</label>
            <select className="input" value={form.ageGroup ?? ""} onChange={e=> setForm({ ...form, ageGroup: e.target.value })}>
              <option value="">Select…</option>
              <option value="18-24">18–24</option>
              <option value="25-34">25–34</option>
              <option value="35-44">35–44</option>
              <option value="45-54">45–54</option>
              <option value="55+">55+</option>
            </select>
          </div>
          <div>
            <label className="label">Exact Age</label>
            <input type="number" className="input" value={form.exactAge ?? ""} onChange={e=> setForm({ ...form, exactAge: Number(e.target.value) || undefined })} />
          </div>
          <div>
            <label className="label">Location</label>
            <input className="input" value={form.location ?? ""} onChange={e=> setForm({ ...form, location: e.target.value })} placeholder="City, Country" />
          </div>
          <div>
            <label className="label">Height (cm)</label>
            <input type="number" className="input" value={form.heightCm ?? ""} onChange={e=> setForm({ ...form, heightCm: Number(e.target.value) || undefined })} />
          </div>
          <div>
            <label className="label">Current Weight (kg)</label>
            <input type="number" className="input" value={form.weightKg ?? ""} onChange={e=> setForm({ ...form, weightKg: Number(e.target.value) || undefined })} />
          </div>
          <div>
            <label className="label">Goal Weight (kg)</label>
            <input type="number" className="input" value={form.goalWeightKg ?? ""} onChange={e=> setForm({ ...form, goalWeightKg: Number(e.target.value) || undefined })} />
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-sm flex items-center gap-2">
            <span>🔒</span>
            We never upload your info — it stays in your browser only.
          </p>
        </div>
        <div className="mt-8 flex justify-between">
          <button className="btn-ghost px-6 py-3" onClick={onBack}>Back</button>
          <button className="btn-primary px-6 py-3" onClick={()=> { if (!form.ageGroup) return; onSave(form); onDisplayName(name || "FitBuddy"); onNext(); }}>
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}