import { ShoppingBasket, PiggyBank, Briefcase } from "lucide-react";
import {
  LessonLayout,
  LessonSection,
  Highlight,
  ValueCard,
  DicaCeteris,
} from "@/components/ceteris/lessons/LessonLayout";

const impactos = [
  { icon: ShoppingBasket, title: "Compras", text: "Alguns produtos tornam-se mais caros." },
  { icon: PiggyBank, title: "Poupança", text: "O dinheiro pode perder poder de compra ao longo do tempo." },
  { icon: Briefcase, title: "Negócios", text: "Empreendedores podem pagar mais pelos produtos, transporte ou matérias-primas." },
];

const Inflacao = () => (
  <LessonLayout
    lessonId="inflacao"
    title="Inflação Explicada"
    subtitle="Porque é que os preços aumentam?"
    objective="Compreender o que é inflação e como ela pode afetar o nosso dinheiro e os pequenos negócios."
    quiz={{
      question: "Um produto custava 200 MZN e agora custa 220 MZN. O que aconteceu?",
      options: [
        "A. O preço diminuiu",
        "B. O preço aumentou 10%",
        "C. O preço aumentou 20%",
        "D. O preço não mudou",
      ],
      correctIndex: 1,
      explanation: "O aumento foi de 20 MZN sobre 200 MZN, ou seja 20 ÷ 200 = 10%. A resposta correcta é B.",
    }}
  >
    <LessonSection index={1} title="O que é inflação?">
      <p>Inflação é o aumento geral dos preços ao longo do tempo.</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <ValueCard label="Antes" value="100 MZN" />
        <ValueCard label="Depois" value="110 MZN" />
        <ValueCard label="Preço aumentou" value="10%" tone="accent" />
      </div>
    </LessonSection>

    <LessonSection index={2} title="Poder de compra">
      <p>
        Se o nosso rendimento continuar igual enquanto os preços aumentam, conseguimos comprar menos
        coisas com o mesmo dinheiro.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-secondary p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Antes</p>
          <p className="text-sm font-medium text-foreground mt-1">
            1 000 MZN compravam 10 produtos de 100 MZN
          </p>
        </div>
        <div className="rounded-xl bg-accent/10 border border-accent/30 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Depois</p>
          <p className="text-sm font-medium text-foreground mt-1">
            1 000 MZN compram cerca de 9 produtos de 110 MZN
          </p>
        </div>
      </div>
    </LessonSection>

    <LessonSection index={3} title="Como a inflação afeta a vida diária?">
      <div className="grid gap-4 sm:grid-cols-3">
        {impactos.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border border-border p-4">
            <div className="h-9 w-9 rounded-lg bg-secondary text-primary grid place-items-center">
              <Icon className="h-4 w-4" />
            </div>
            <h4 className="mt-3 font-semibold text-foreground text-sm">{title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{text}</p>
          </div>
        ))}
      </div>
    </LessonSection>

    <LessonSection index={4} title="Exemplo de pequeno negócio">
      <p className="font-medium text-foreground">Antes</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <ValueCard label="Custo do produto" value="500 MZN" />
        <ValueCard label="Preço de venda" value="650 MZN" />
        <ValueCard label="Lucro" value="150 MZN" tone="primary" />
      </div>
      <p className="font-medium text-foreground">Depois, o fornecedor aumenta o preço</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <ValueCard label="Novo custo" value="580 MZN" />
        <ValueCard label="Preço de venda" value="650 MZN" />
        <ValueCard label="Novo lucro" value="70 MZN" tone="accent" />
      </div>
      <Highlight>
        Se os custos aumentarem e o preço de venda continuar igual, a margem de lucro do negócio pode
        diminuir.
      </Highlight>
    </LessonSection>

    <DicaCeteris>
      Quando os seus custos mudam, reveja o seu orçamento e, se tiver um negócio, verifique novamente
      os seus preços e a sua margem de lucro.
    </DicaCeteris>
  </LessonLayout>
);

export default Inflacao;
