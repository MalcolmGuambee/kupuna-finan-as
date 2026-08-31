import {
  LessonLayout,
  LessonSection,
  Highlight,
  ValueCard,
  BulletList,
  DicaCeteris,
} from "@/components/ceteris/lessons/LessonLayout";

const rows = [
  ["Alimentação", "3 500 MZN"],
  ["Transporte", "2 000 MZN"],
  ["Energia/Água", "1 000 MZN"],
  ["Internet", "500 MZN"],
  ["Outras despesas", "2 000 MZN"],
];

const OrcamentoBasico = () => (
  <LessonLayout
    lessonId="orcamento-basico"
    title="Orçamento Básico"
    subtitle="Saiba para onde vai o seu dinheiro."
    objective="Aprender a organizar receitas, despesas e poupança."
    quiz={{
      question: "Se ganha 8 000 MZN e gasta 6 500 MZN, quanto sobra?",
      options: ["A. 500 MZN", "B. 1 000 MZN", "C. 1 500 MZN", "D. 2 500 MZN"],
      correctIndex: 2,
      explanation: "8 000 MZN − 6 500 MZN = 1 500 MZN. A resposta correcta é C.",
    }}
  >
    <LessonSection index={1} title="O que é um orçamento?">
      <p>Um orçamento é um plano que ajuda a organizar o dinheiro que entra e o dinheiro que sai.</p>
      <Highlight>Receitas − Despesas = Dinheiro Disponível</Highlight>
    </LessonSection>

    <LessonSection index={2} title="Receitas">
      <p>Receitas são o dinheiro que entra.</p>
      <BulletList
        items={["Salário", "Vendas", "Trabalho informal", "Pequenos negócios", "Outros rendimentos"]}
      />
    </LessonSection>

    <LessonSection index={3} title="Despesas">
      <p>Despesas são o dinheiro que sai.</p>
      <BulletList
        items={["Alimentação", "Transporte", "Energia", "Água", "Internet", "Renda", "Lazer"]}
      />
    </LessonSection>

    <LessonSection index={4} title="Poupança">
      <p>
        Poupança é a parte do dinheiro que decidimos guardar para o futuro ou para alcançar uma meta.
      </p>
    </LessonSection>

    <LessonSection index={5} title="Exemplo prático — Orçamento de Amina">
      <div className="grid gap-3 sm:grid-cols-2">
        <ValueCard label="Receita mensal" value="12 000 MZN" tone="primary" />
        <ValueCard label="Total de despesas" value="9 000 MZN" />
      </div>
      <div className="rounded-xl border border-border divide-y divide-border">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between px-4 py-2.5 text-sm">
            <span className="text-foreground">{k}</span>
            <span className="tabular-nums font-medium text-foreground">{v}</span>
          </div>
        ))}
        <div className="flex items-center justify-between px-4 py-2.5 text-sm bg-secondary rounded-b-xl">
          <span className="font-semibold text-foreground">Dinheiro restante</span>
          <span className="tabular-nums font-bold text-primary">3 000 MZN</span>
        </div>
      </div>
      <p>Possível distribuição do dinheiro restante:</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <ValueCard label="Poupança" value="1 500 MZN" tone="primary" />
        <ValueCard label="Disponível" value="1 500 MZN" />
      </div>
    </LessonSection>

    <DicaCeteris>
      Registe até as pequenas despesas. Muitas despesas pequenas podem transformar-se numa grande
      despesa no final do mês.
    </DicaCeteris>
  </LessonLayout>
);

export default OrcamentoBasico;
