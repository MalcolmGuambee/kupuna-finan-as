import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Section } from "@/components/ceteris/Sidebar";

export type LessonId = "como-poupar" | "orcamento-basico" | "inflacao";

const STORAGE_KEY = "ceteris-progress-v1";
const BASE_POINTS = 180;

interface Stored {
  points: number;
  completed: LessonId[];
}

interface Ctx {
  points: number;
  completed: LessonId[];
  isCompleted: (id: LessonId) => boolean;
  completeLesson: (id: LessonId, pts: number) => boolean;
  addPoints: (n: number) => void;
  section: Section;
  setSection: (s: Section) => void;
  mpesa: boolean;
  toggleMpesa: () => void;
}

const AppStateContext = createContext<Ctx | null>(null);

function load(): Stored {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Stored;
      if (typeof parsed.points === "number" && Array.isArray(parsed.completed)) return parsed;
    }
  } catch {
    /* ignore */
  }
  return { points: BASE_POINTS, completed: [] };
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Stored>(() => load());
  const [section, setSection] = useState<Section>("dashboard");
  const [mpesa, setMpesa] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const isCompleted = (id: LessonId) => state.completed.includes(id);

  const completeLesson = (id: LessonId, pts: number) => {
    let awarded = false;
    setState((prev) => {
      if (prev.completed.includes(id)) return prev;
      awarded = true;
      return {
        points: Math.min(500, prev.points + pts),
        completed: [...prev.completed, id],
      };
    });
    return awarded;
  };

  const addPoints = (n: number) =>
    setState((prev) => ({ ...prev, points: Math.min(500, prev.points + n) }));

  return (
    <AppStateContext.Provider
      value={{
        points: state.points,
        completed: state.completed,
        isCompleted,
        completeLesson,
        addPoints,
        section,
        setSection,
        mpesa,
        toggleMpesa: () => setMpesa((v) => !v),
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
