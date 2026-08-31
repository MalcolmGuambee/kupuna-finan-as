import {
  LessonLayout,
  LessonSection,
  Highlight,
  ValueCard,
  BulletList,
  DicaCeteris,
} from "@/components/ceteris/lessons/LessonLayout";

const ComoPoupar = () => (
  <LessonLayout
    lessonId="como-poupar"
    title="Como Poupar Dinheiro"
    subtitle="Pequenas decisões podem fazer uma grande diferença."
    objective="Aprender formas simples de guardar dinheiro regularmente, mesmo quando o rendimento é limitado."
    quiz={{
      question: "João recebe 10 000 MZN por mês e decide poupar 10%. Quanto deve guardar?",
      options: ["A. 100 MZN", "B. 500 MZN", "C. 1 000 MZN", "D. 2 000 MZN"],
      correctIndex: 2,
      explanation: "10% de 10 000 MZN = 10 000 ÷ 10 = 1 000 MZN. A resposta correcta é C.",
    }}
  >
    <LessonSection index={1} title="O que significa poupar?">
      <p>
        Poupar significa separar uma parte do dinheiro que recebemos para utilizar no futuro, em vez
        de gastar tudo imediatamente.
      </p>
      <Highlight>Não é necessário começar com muito. O importante é criar o hábito.</Highlight>
    </LessonSection>

    <LessonSection index={2} title="Poupe primeiro">
      <p>Quando receber dinheiro, tente separar uma pequena parte antes de começar a gastar.</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <ValueCard label="Recebeu" value="5 000 MZN" />
        <ValueCard label="Poupar 10%" value="500 MZN" tone="primary" />
        <ValueCard label="Outras despesas" value="4 500 MZN" />
      </div>
    </LessonSection>

    <LessonSection index={3} title="Defina uma meta">
      <p>Poupar torna-se mais fácil quando existe uma razão clara para o fazer.</p>
      <BulletList
        items={[
          "Comprar material escolar",
          "Criar um fundo de emergência",
          "Comprar equipamento para o negócio",
          "Pagar um curso",
          "Fazer um investimento",
        ]}
      />
    </LessonSection>

    <LessonSection index={4} title="Necessidades vs. Desejos">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-4">
          <h4 className="font-semibold text-foreground mb-2 text-sm">Necessidades</h4>
          <BulletList items={["Alimentação", "Transporte", "Renda", "Educação", "Saúde"]} />
        </div>
        <div className="rounded-xl border border-border p-4">
          <h4 className="font-semibold text-foreground mb-2 text-sm">Desejos</h4>
          <BulletList
            items={[
              "Compras impulsivas",
              "Refeições desnecessárias fora de casa",
              "Produtos que podem esperar",
              "Entretenimento não essencial",
            ]}
          />
        </div>
      </div>
    </LessonSection>

    <DicaCeteris>
      Antes de comprar algo que não é essencial, espere algum tempo e pergunte: Eu realmente preciso
      disto?
    </DicaCeteris>

    <LessonSection index={5} title="Pequenos valores acumulam">
      <div className="grid gap-3 sm:grid-cols-2">
        <ValueCard label="50 MZN por dia × 30 dias" value="1 500 MZN / mês" />
        <ValueCard label="1 500 MZN × 12 meses" value="18 000 MZN / ano" tone="primary" />
      </div>
      <p>Valores pequenos, repetidos com disciplina, tornam-se um montante importante.</p>
    </LessonSection>
  </LessonLayout>
);

export default ComoPoupar;
