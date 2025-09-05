export type FitnessGoal =
  | "lose_weight"
  | "maintain_weight"
  | "gain_weight"
  | "gain_muscle"
  | "modify_diet"
  | "plan_meals"
  | "manage_stress"
  | "stay_active";

export const GOALS: { key: FitnessGoal; label: string; desc: string }[] = [
  { key: "lose_weight", label: "Lose Weight", desc: "Fat loss with healthy pace" },
  { key: "maintain_weight", label: "Maintain Weight", desc: "Stay steady & energized" },
  { key: "gain_weight", label: "Gain Weight", desc: "Build up gradually" },
  { key: "gain_muscle", label: "Gain Muscle", desc: "Strength & lean mass" },
  { key: "modify_diet", label: "Modify Diet", desc: "Clean up eating patterns" },
  { key: "plan_meals", label: "Plan Meals", desc: "Reduce decision fatigue" },
  { key: "manage_stress", label: "Manage Stress", desc: "Recover & feel balanced" },
  { key: "stay_active", label: "Stay Active", desc: "Move daily without pressure" },
];

export type ActivityLevel = "not_active" | "light" | "active" | "very_active";

export const ACTIVITY: { key: ActivityLevel; label: string; desc: string }[] = [
  { key: "not_active", label: "Not Very Active", desc: "Mostly sitting, minimal exercise" },
  { key: "light", label: "Lightly Active", desc: "1–3 workouts/week or lots of steps" },
  { key: "active", label: "Active", desc: "3–5 workouts/week or physical job" },
  { key: "very_active", label: "Very Active", desc: "6–7 workouts/week or athlete" },
];

export type Barrier =
  | "lack_time"
  | "hard_follow"
  | "lack_variety"
  | "food_stress"
  | "social_events"
  | "cravings"
  | "motivation"
  | "injury"
  | "budget"
  | "sleep";

export const BARRIERS: { key: Barrier; label: string }[] = [
  { key: "lack_time", label: "Lack of Time" },
  { key: "hard_follow", label: "Hard to Follow" },
  { key: "lack_variety", label: "Lack of Variety" },
  { key: "food_stress", label: "Food Stress" },
  { key: "social_events", label: "Social Events" },
  { key: "cravings", label: "Cravings" },
  { key: "motivation", label: "Low Motivation" },
  { key: "injury", label: "Injury/Recovery" },
  { key: "budget", label: "Tight Budget" },
  { key: "sleep", label: "Poor Sleep" },
];

export type Habit =
  | "eat_protein"
  | "eat_fiber"
  | "move_more"
  | "workout_more"
  | "plan_meals"
  | "meal_prep"
  | "track_nutrients"
  | "track_calories"
  | "drink_water"
  | "sleep_priority"
  | "eat_mindfully"
  | "stress_check";

export const HABITS: { key: Habit; label: string; cat: "Nutrition" | "Activity" | "Planning" | "Tracking" | "Wellness" }[] = [
  { key: "eat_protein", label: "Eat More Protein", cat: "Nutrition" },
  { key: "eat_fiber", label: "Eat More Fiber", cat: "Nutrition" },
  { key: "move_more", label: "Move More", cat: "Activity" },
  { key: "workout_more", label: "Work Out More", cat: "Activity" },
  { key: "plan_meals", label: "Plan Meals", cat: "Planning" },
  { key: "meal_prep", label: "Meal Prep & Cook", cat: "Planning" },
  { key: "track_nutrients", label: "Track Nutrients", cat: "Tracking" },
  { key: "track_calories", label: "Track Calories", cat: "Tracking" },
  { key: "drink_water", label: "Drink Water", cat: "Wellness" },
  { key: "sleep_priority", label: "Prioritize Sleep", cat: "Wellness" },
  { key: "eat_mindfully", label: "Eat Mindfully", cat: "Wellness" },
  { key: "stress_check", label: "Stress Check", cat: "Wellness" },
];

export type MealCoachPref = "yes" | "open" | "no";

export type Demographics = {
  gender?: string;
  ageGroup?: string; // required in UI
  exactAge?: number;
  location?: string;
  heightCm?: number;
  weightKg?: number;
  goalWeightKg?: number;
};

export type DashboardMetrics = {
  steps?: number;
  activeMinutes?: number;
  waterMl?: number;
  streakDays?: number;
};

export type FitBuddyState = {
  displayName: string; // derived from demographics later, editable
  onboarding: {
    goal?: FitnessGoal;
    activity?: ActivityLevel;
    barriers: Barrier[];
    habits: Habit[]; // max 4
    mealCoach?: MealCoachPref;
    demographics: Demographics;
    completed: boolean;
  };
  dashboard: {
    metrics: DashboardMetrics;
    recentActivity: string[];
  };
};