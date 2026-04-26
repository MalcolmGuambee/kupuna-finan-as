import { useState } from "react";
import { AlertTriangle, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Category {
  name: string;
  amount: number;
  fixed: boolean;
  weight?: number; // elasticity weight (higher = more cuttable)
}

const baseCategories: Category[] = [
  { name: "Contas da Casa", amount: 8000, fixed: true },
  { name: "Pessoal Doméstico", amount: 7000, fixed: true },
  { name: "Impostos", amount: 8575, fixed: true },
  { name: "Mercearia", amount: 8000, fixed: false, weight: 3 },
  { name: "Transporte", amount: 6000, fixed: false, weight: 2 },
  { name: "Pessoal", amount: 1500, fixed: false, weight: 4 },
  { name: "Poupança", amount: 925, fixed: false, weight: 1 },
];

const fmt = (n: number) => new Intl.NumberFormat("pt-MZ", { maximumFractionDigits: 0 }).format(n);

export function CrisisManager() {
  const [emergency, setEmergency] = useState(12000);
  const [months, setMonths] = useState(3);
  const [result, setResult] = useState<Category[] | null>(null);

  const monthly = months > 0 ? emergency / months : 0;

  const calculate = () => {
    const variable = baseCategories.filter((c) => !c.fixed);
    // Weight × amount → portion of cut
    const weighted = variable.map((c) => ({ ...c, w: (c.weight || 1) * c.amount }));
    const totalW = weighted.reduce((s, c) => s + c.w, 0);

    const adjusted = baseCategories.map((c) => {
      if (c.fixed) return { ...c, newAmount: c.amount };
      const w = (c.weight || 1) * c.amount;
      let cut = (w / totalW) * monthly;
      const newAmount = Math.max(0, c.amount - cut);
      return { ...c, newAmount };
    });
    setResult(adjusted as any);
  };

  const totalBefore = baseCategories.reduce((s, c) => s + c.amount, 0);
  const totalAfter = result ? (result as any).reduce((s: number, c: any) => s + c.newAmount, 0) : totalBefore;

  return (
    <div className="space-y-6">
      <header className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-xl bg-accent text-accent-foreground grid place-items-center shrink-0">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestor de Choques Económicos</h2>
          <p className="text-sm text-muted-foreground">
            Distribua uma despesa de emergência pelas categorias variáveis usando elasticidade ponderada.
          </p>
        </div>
      </header>

      <section className="rounded-2xl bg-card p-5 sm:p-6 shadow-card border border-border">
        <div className="grid gap-4 sm:grid-cols-3 sm:items-end">
          <div>
            <Label htmlFor="amt">Valor da Emergência (MZN)</Label>
            <Input
              id="amt"
              type="number"
              value={emergency}
              onChange={(e) => setEmergency(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="months">Prazo de Pagamento (meses)</Label>
            <Input
              id="months"
              type="number"
              min={1}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="mt-1.5"
            />
          </div>
          <Button onClick={calculate} className="bg-primary hover:bg-primary/90 h-10">
            <Calculator className="h-4 w-4 mr-2" />
            Calcular Impacto
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="rounded-md bg-secondary px-3 py-2">
            <span className="text-muted-foreground">Sacrifício mensal: </span>
            <span className="font-semibold text-primary tabular-nums">{fmt(monthly)} MZN</span>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="rounded-2xl bg-card shadow-card border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Antes vs. Depois</h3>
          <p className="text-xs text-muted-foreground">
            As categorias fixas mantêm-se. Cortes proporcionais à elasticidade × valor.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-secondary-foreground">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Categoria</th>
                <th className="text-left px-4 py-3 font-medium">Tipo</th>
                <th className="text-right px-4 py-3 font-medium">Antes</th>
                <th className="text-right px-4 py-3 font-medium">Depois</th>
                <th className="text-right px-4 py-3 font-medium">Δ</th>
              </tr>
            </thead>
            <tbody>
              {baseCategories.map((c, i) => {
                const after = result ? (result as any)[i].newAmount : c.amount;
                const delta = after - c.amount;
                return (
                  <tr key={c.name} className="border-t border-border">
                    <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${c.fixed ? "bg-muted text-muted-foreground" : "bg-warning/20 text-warning-foreground"}`}>
                        {c.fixed ? "Fixo" : "Variável"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{fmt(c.amount)}</td>
                    <td className="px-4 py-3 text-right tabular-nums font-semibold">{fmt(after)}</td>
                    <td className={`px-4 py-3 text-right tabular-nums ${delta < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                      {delta < 0 ? "−" : ""}{fmt(Math.abs(delta))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-secondary/50">
              <tr className="border-t-2 border-border">
                <td className="px-4 py-3 font-semibold" colSpan={2}>Total</td>
                <td className="px-4 py-3 text-right font-bold tabular-nums">{fmt(totalBefore)}</td>
                <td className="px-4 py-3 text-right font-bold tabular-nums text-primary">{fmt(totalAfter)}</td>
                <td className="px-4 py-3 text-right font-bold tabular-nums text-destructive">
                  {result ? `−${fmt(totalBefore - totalAfter)}` : "—"}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
}
