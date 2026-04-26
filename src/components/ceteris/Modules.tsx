import { useState } from "react";
import { BookOpen, Briefcase, Users, Smartphone, TrendingUp, PiggyBank, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { MpesaToggle } from "./MpesaToggle";

const fmt = (n: number) => new Intl.NumberFormat("pt-MZ", { maximumFractionDigits: 2 }).format(n);

export function Literacia({ points, addPoints }: { points: number; addPoints: (n: number) => void }) {
  const lessons = [
    { icon: PiggyBank, title: "Como Poupar", desc: "Estratégias práticas para construir reserva.", pts: 25 },
    { icon: BarChart3, title: "Orçamento Básico", desc: "Receita − despesa = liberdade.", pts: 30 },
    { icon: TrendingUp, title: "Inflação Explicada", desc: "Porque o seu metical perde valor.", pts: 35 },
    { icon: BookOpen, title: "Crédito e Juros", desc: "Diferença entre juro simples e composto.", pts: 40 },
  ];
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-foreground">Literacia Financeira</h2>
        <p className="text-sm text-muted-foreground">Lições curtas para fortalecer as suas decisões.</p>
      </header>
      <div className="rounded-2xl bg-card p-5 shadow-card border border-border">
        <div className="flex justify-between mb-2 text-sm">
          <span className="font-medium">Pontos de Aprendizagem</span>
          <span className="tabular-nums text-primary font-semibold">{points} / 500</span>
        </div>
        <Progress value={(points / 500) * 100} className="h-3" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {lessons.map((l) => {
          const Icon = l.icon;
          return (
            <article key={l.title} className="rounded-2xl bg-card p-5 shadow-card border border-border">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-secondary text-primary grid place-items-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{l.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{l.desc}</p>
                </div>
              </div>
              <Button
                size="sm"
                className="mt-4 bg-primary hover:bg-primary/90"
                onClick={() => addPoints(l.pts)}
              >
                Concluir lição (+{l.pts} pts)
              </Button>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function Negocios() {
  const [cost, setCost] = useState(150);
  const [margin, setMargin] = useState(35);
  const [tax, setTax] = useState(17);
  const subtotal = cost * (1 + margin / 100);
  const final = subtotal * (1 + tax / 100);

  return (
    <div className="space-y-6">
      <header className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-xl bg-secondary text-primary grid place-items-center">
          <Briefcase className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Ferramentas de Negócios</h2>
          <p className="text-sm text-muted-foreground">Calcule preços de venda com margem e imposto.</p>
        </div>
      </header>

      <section className="rounded-2xl bg-card p-5 sm:p-6 shadow-card border border-border">
        <h3 className="font-semibold mb-4">Calculadora de Preços</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="cost">Custo (MZN)</Label>
            <Input id="cost" type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="margin">Margem (%)</Label>
            <Input id="margin" type="number" value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="tax">IVA (%)</Label>
            <Input id="tax" type="number" value={tax} onChange={(e) => setTax(Number(e.target.value))} className="mt-1.5" />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="Subtotal" value={`${fmt(subtotal)} MZN`} />
          <Stat label="Imposto" value={`${fmt(final - subtotal)} MZN`} />
          <Stat label="Preço final" value={`${fmt(final)} MZN`} highlight />
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? "bg-gradient-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
      <p className="text-xs uppercase tracking-wide opacity-80">{label}</p>
      <p className="text-xl font-bold tabular-nums mt-1">{value}</p>
    </div>
  );
}

export function Comunidade() {
  const mentors = [
    { name: "Aida M.", focus: "Microcrédito · Maputo", rating: "4.9" },
    { name: "Júlio C.", focus: "Agricultura · Beira", rating: "4.8" },
    { name: "Esperança T.", focus: "Comércio informal · Nampula", rating: "4.7" },
  ];
  return (
    <div className="space-y-6">
      <header className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-xl bg-secondary text-primary grid place-items-center">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Comunidade & Mentoria</h2>
          <p className="text-sm text-muted-foreground">Conecte-se com mentores locais.</p>
        </div>
      </header>
      <div className="grid gap-4 sm:grid-cols-3">
        {mentors.map((m) => (
          <article key={m.name} className="rounded-2xl bg-card p-5 shadow-card border border-border">
            <div className="h-12 w-12 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center font-bold text-lg">
              {m.name[0]}
            </div>
            <h3 className="mt-3 font-semibold">{m.name}</h3>
            <p className="text-xs text-muted-foreground">{m.focus}</p>
            <p className="text-xs mt-1">⭐ {m.rating}</p>
            <Button size="sm" variant="outline" className="mt-3 w-full">Encontrar Mentor</Button>
          </article>
        ))}
      </div>
    </div>
  );
}

export function MpesaPage({ on, toggle }: { on: boolean; toggle: () => void }) {
  return (
    <div className="space-y-6 max-w-xl">
      <header className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-xl bg-secondary text-primary grid place-items-center">
          <Smartphone className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">M-Pesa Sync</h2>
          <p className="text-sm text-muted-foreground">Sincronize transações e receba alertas automáticos.</p>
        </div>
      </header>
      <section className="rounded-2xl bg-card p-6 shadow-card border border-border space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Estado da integração</span>
          <MpesaToggle on={on} onToggle={toggle} />
        </div>
        <p className="text-sm text-muted-foreground">
          {on
            ? "✓ A sua conta M-Pesa está ligada. As transações serão categorizadas automaticamente."
            : "Ative para sincronizar transações M-Pesa em tempo real (modo demonstração)."}
        </p>
      </section>
    </div>
  );
}
