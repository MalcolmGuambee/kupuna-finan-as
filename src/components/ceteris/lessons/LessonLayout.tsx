import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Clock,
  GraduationCap,
  Sparkles,
  Target,
  Award,
  CheckCircle2,
  Lightbulb,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AppLayout } from "@/components/ceteris/AppLayout";
import { LessonId, useAppState } from "@/context/AppState";

export const LESSON_POINTS = 10;

export function LessonSection({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-card p-5 sm:p-6 shadow-card border border-border">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-7 w-7 shrink-0 rounded-lg bg-secondary text-primary grid place-items-center text-xs font-bold">
          {index}
        </span>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-4 text-sm text-muted-foreground">{children}</div>
    </section>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl bg-secondary text-secondary-foreground px-4 py-3 text-sm font-medium">
      {children}
    </p>
  );
}

export function ValueCard({
  label,
  value,
  tone = "muted",
}: {
  label: string;
  value: string;
  tone?: "muted" | "primary" | "accent";
}) {
  return (
    <div
      className={cn(
        "rounded-xl p-4 border",
        tone === "primary" && "bg-gradient-primary text-primary-foreground border-transparent",
        tone === "accent" && "bg-accent/10 border-accent/30 text-foreground",
        tone === "muted" && "bg-secondary border-transparent text-foreground"
      )}
    >
      <p className="text-xs uppercase tracking-wide opacity-80">{label}</p>
      <p className="text-xl font-bold tabular-nums mt-1">{value}</p>
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-2">
          <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
          <span className="text-foreground text-sm">{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function DicaCeteris({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-2xl border-2 border-accent/40 bg-accent/10 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-accent text-accent-foreground grid place-items-center shrink-0">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Dica Ceteris</h3>
          <p className="mt-1 text-sm text-foreground/80">{children}</p>
        </div>
      </div>
    </section>
  );
}

export interface Quiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Props {
  lessonId: LessonId;
  title: string;
  subtitle: string;
  objective: string;
  quiz: Quiz;
  children: ReactNode;
}

export function LessonLayout({ lessonId, title, subtitle, objective, quiz, children }: Props) {
  const { isCompleted, completeLesson, setSection } = useAppState();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);
  const [justCompleted, setJustCompleted] = useState(false);
  const done = isCompleted(lessonId);

  const goLiteracia = () => {
    setSection("literacia");
    navigate("/");
  };

  const handleComplete = () => {
    const awarded = completeLesson(lessonId, LESSON_POINTS);
    if (awarded) setJustCompleted(true);
  };

  return (
    <AppLayout title={title} activeSection="literacia">
      <div className="space-y-6 max-w-3xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Painel</Link>
          <ChevronRight className="h-3 w-3" />
          <button onClick={goLiteracia} className="hover:text-primary transition-colors">Literacia</button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{title}</span>
        </nav>

        {/* Header */}
        <header className="rounded-2xl bg-gradient-primary text-primary-foreground p-6 shadow-elevated">
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 rounded-xl bg-primary-foreground/15 grid place-items-center shrink-0">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-sm opacity-85 mt-1">{subtitle}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Meta icon={Sparkles} label="Nível: Básico" />
            <Meta icon={Clock} label="5 min" />
            <Meta icon={Award} label={`+${LESSON_POINTS} Pontos de Aprendizagem`} />
            {done && <Meta icon={CheckCircle2} label="Concluído" />}
          </div>
        </header>

        {/* Objective */}
        <section className="rounded-2xl bg-card p-5 shadow-card border border-border">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-secondary text-primary grid place-items-center shrink-0">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Objectivo de aprendizagem</h3>
              <p className="text-sm text-muted-foreground mt-1">{objective}</p>
            </div>
          </div>
        </section>

        {children}

        {/* Quiz */}
        <section className="rounded-2xl bg-card p-5 sm:p-6 shadow-card border border-border">
          <h3 className="font-semibold text-foreground">Mini Quiz</h3>
          <p className="text-sm text-muted-foreground mt-1">{quiz.question}</p>
          <div className="mt-4 space-y-2">
            {quiz.options.map((opt, i) => {
              const isPicked = selected === i;
              const isRight = i === quiz.correctIndex;
              return (
                <button
                  key={opt}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "w-full text-left text-sm px-4 py-3 rounded-xl border transition-colors flex items-center justify-between gap-3",
                    selected === null && "border-border hover:bg-secondary hover:border-primary/40",
                    selected !== null && isRight && "border-success bg-success/10 text-foreground",
                    selected !== null && isPicked && !isRight && "border-destructive bg-destructive/10",
                    selected !== null && !isPicked && !isRight && "border-border opacity-60"
                  )}
                >
                  <span>{opt}</span>
                  {selected !== null && isRight && <CheckCircle2 className="h-4 w-4 text-success shrink-0" />}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <p
              className={cn(
                "mt-4 text-sm rounded-xl px-4 py-3",
                selected === quiz.correctIndex
                  ? "bg-success/10 text-success font-medium"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {selected === quiz.correctIndex
                ? "✓ Correcto! Muito bem."
                : `Ainda não. ${quiz.explanation}`}
            </p>
          )}
        </section>

        {/* Success */}
        {(justCompleted || done) && (
          <section className="rounded-2xl border-2 border-success/40 bg-success/10 p-5 sm:p-6 text-center">
            <p className="text-lg font-bold text-foreground">🎉 Lição concluída!</p>
            <p className="mt-1 text-sm font-medium text-success">
              Ganhou +{LESSON_POINTS} Pontos de Aprendizagem
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Continue a aprender para subir de nível.
            </p>
          </section>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pb-2">
          <Button
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={selected === null || done}
            onClick={handleComplete}
          >
            {done ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" /> Concluído
              </>
            ) : (
              "Concluir Lição"
            )}
          </Button>
          <Button variant="outline" className="flex-1" onClick={goLiteracia}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para Literacia
          </Button>
        </div>
        {selected === null && !done && (
          <p className="text-xs text-muted-foreground -mt-3">
            Responda ao mini quiz para poder concluir a lição.
          </p>
        )}
      </div>
    </AppLayout>
  );
}

function Meta({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1.5">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}
