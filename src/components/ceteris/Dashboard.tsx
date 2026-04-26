import { BookOpen, Briefcase, AlertTriangle, Users, ArrowRight, Wallet, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Section } from "./Sidebar";

interface Props {
  go: (s: Section) => void;
  points: number;
}

const fmt = (n: number) => new Intl.NumberFormat("pt-MZ").format(n) + " MZN";

export function Dashboard({ go, points }: Props) {
  return (
    <div className="space-y-6">
      {/* Standing card */}
      <section className="rounded-2xl bg-gradient-primary text-primary-foreground p-6 sm:p-8 shadow-elevated">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide opacity-80 flex items-center gap-2">
              <Wallet className="h-4 w-4" /> Posição Actual
            </p>
            <p className="mt-2 text-4xl sm:text-5xl font-bold tabular-nums">{fmt(40000)}</p>
            <p className="mt-1 text-sm opacity-80">Saldo disponível este mês</p>
          </div>
          <div className="flex items-center gap-2 text-sm bg-primary-foreground/10 rounded-full px-3 py-1.5">
            <TrendingUp className="h-4 w-4" />
            +2,3% vs. mês anterior
          </div>
        </div>
      </section>

      {/* Learning points */}
      <section className="rounded-2xl bg-card p-5 shadow-card border border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-foreground">Pontos de Aprendizagem</h3>
            <p className="text-xs text-muted-foreground">Continue a aprender para subir de nível</p>
          </div>
          <span className="text-2xl font-bold text-primary tabular-nums">{points}<span className="text-sm text-muted-foreground">/500</span></span>
        </div>
        <Progress value={(points / 500) * 100} className="h-3" />
      </section>

      {/* 4 modules */}
      <section className="grid gap-4 sm:grid-cols-2">
        <ModuleCard
          icon={BookOpen}
          title="Aprender Finanças"
          subtitle="Educação financeira"
          links={["Como Poupar (How to Save)", "Orçamento Básico (Basic Budgeting)", "Inflação Explicada"]}
          onOpen={() => go("literacia")}
        />
        <ModuleCard
          icon={Briefcase}
          title="Ferramentas de Negócios"
          subtitle="Ferramentas para micro-empresários"
          links={["Calculadora de Preços", "Gestor de Stock", "Margem de Lucro"]}
          onOpen={() => go("negocios")}
        />
        <CrisisCard onOpen={() => go("crisis")} />
        <ModuleCard
          icon={Users}
          title="Comunidade"
          subtitle="Mentoria e rede de apoio"
          links={["Encontrar Mentor", "Grupos de Poupança", "Fóruns Locais"]}
          onOpen={() => go("comunidade")}
        />
      </section>
    </div>
  );
}

function ModuleCard({
  icon: Icon, title, subtitle, links, onOpen,
}: { icon: any; title: string; subtitle: string; links: string[]; onOpen: () => void }) {
  return (
    <article className="rounded-2xl bg-card p-5 shadow-card border border-border flex flex-col">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-secondary text-primary grid place-items-center shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <ul className="mt-4 space-y-1.5 flex-1">
        {links.map((l) => (
          <li key={l}>
            <button className="w-full text-left text-sm text-foreground hover:text-primary flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-secondary transition-colors">
              <span>{l}</span>
              <ArrowRight className="h-3.5 w-3.5 opacity-50" />
            </button>
          </li>
        ))}
      </ul>
      <Button variant="outline" className="mt-4 w-full" onClick={onOpen}>
        Abrir módulo
      </Button>
    </article>
  );
}

function CrisisCard({ onOpen }: { onOpen: () => void }) {
  return (
    <article className="rounded-2xl bg-card p-5 shadow-card border-2 border-accent/40 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 h-24 w-24 bg-accent/10 rounded-full -translate-y-8 translate-x-8" />
      <div className="flex items-start gap-3 relative">
        <div className="h-10 w-10 rounded-lg bg-accent text-accent-foreground grid place-items-center shrink-0 animate-pulse">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">Modo de Crise — Emergência</h3>
          <p className="text-xs text-muted-foreground">Otimizador de choque económico</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground flex-1">
        Distribua o sacrifício de uma despesa inesperada pelas categorias mais elásticas do seu orçamento.
      </p>
      <Button
        onClick={onOpen}
        className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90"
      >
        Iniciar Plano de Crise
      </Button>
    </article>
  );
}
