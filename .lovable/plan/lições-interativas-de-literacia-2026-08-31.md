# Lições Interativas de Literacia

Tornar os itens do cartão "Aprender Finanças" clicáveis e criar três páginas de lição dedicadas, mantendo exactamente o design actual (teal/branco, mesma sidebar, tipografia, espaçamento, cartões arredondados).

## Novas rotas

- `/literacia/como-poupar` — Como Poupar Dinheiro
- `/literacia/orcamento-basico` — Orçamento Básico
- `/literacia/inflacao` — Inflação Explicada

Cada rota usa o mesmo layout da aplicação (sidebar + cabeçalho + rodapé), pelo que a navegação nunca "salta" para um visual diferente.

## Estrutura de cada página de lição

1. Breadcrumb: Painel > Literacia > [Lição]
2. Cabeçalho: título, subtítulo, etiquetas "Básico", "5 min", "+10 Pontos"
3. Objectivo de aprendizagem em destaque
4. Secções de conteúdo em cartões separados (exactamente o conteúdo e exemplos em MZN indicados no pedido)
5. Caixa "Dica Ceteris" destacada com a cor de acento
6. Mini quiz (1 pergunta, 4 opções) com feedback verde se correcto e explicação útil se errado
7. Botão "Concluir Lição" (activo apenas depois de responder ao quiz) e botão "Voltar para Literacia"
8. Ao concluir: cartão de sucesso "🎉 Lição concluída! Ganhou +10 Pontos de Aprendizagem — Continue a aprender para subir de nível."

## Sistema de progresso

- Estado partilhado de pontos e lições concluídas, acessível ao painel e às páginas de lição, guardado no navegador para não se perder ao recarregar.
- Pontos só são atribuídos uma vez por lição; ao revisitar uma lição concluída o botão mostra "Concluído" e não soma pontos.
- No painel, cada linha de "Aprender Finanças" fica clicável (linha inteira + seta), com hover suave, e mostra um visto e a etiqueta "Concluído" quando aplicável.
- A barra de "Pontos de Aprendizagem" no painel e na secção Literacia reflecte imediatamente os novos pontos (ex.: 205/500 → 215/500).

## Detalhes técnicos

- `src/context/ProgressContext.tsx`: provider com `points`, `completedLessons`, `completeLesson(id, pts)`; persistência em `localStorage`; montado em `App.tsx`.
- `src/App.tsx`: novas rotas acima do catch-all, envolvidas por um `AppLayout` extraído de `Index.tsx` (sidebar, header, footer) para reutilização; a secção activa da sidebar fica "Literacia" nas páginas de lição.
- `src/components/ceteris/lessons/LessonLayout.tsx`: componente partilhado com breadcrumb, cabeçalho, meta-etiquetas, `DicaCeteris`, `Quiz`, rodapé de acções — usado pelas três páginas.
- `src/pages/lessons/ComoPoupar.tsx`, `OrcamentoBasico.tsx`, `Inflacao.tsx`: apenas dados/conteúdo de cada lição.
- `Dashboard.tsx`: os `links` do cartão "Aprender Finanças" passam a ter `to` e estado de concluído; usa `Link` do react-router.
- `Index.tsx` e `Modules.tsx` passam a ler pontos do contexto em vez do `useState` local.
- Sem backend nesta fase; apenas estado local persistido.
