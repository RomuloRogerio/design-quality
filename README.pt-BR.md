[English](README.md) · [Español](README.es.md) · **Português (Brasil)** · [简体中文](README.zh-CN.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

---

![License](https://img.shields.io/github/license/RomuloRogerio/design-quality) ![Stars](https://img.shields.io/github/stars/RomuloRogerio/design-quality?style=flat) ![Translations](https://img.shields.io/badge/translations-8-blue) ![Funciona com qualquer IA](https://img.shields.io/badge/funciona%20com-qualquer%20IA-6366f1) ![Plugin para Claude Code](https://img.shields.io/badge/plugin-Claude%20Code-orange)

# design-quality

Uma skill de qualidade de design para assistentes de IA — Claude Code, Cursor, Codex, Copilot ou qualquer ferramenta que aceite instruções em markdown.

IA gera interfaces rápido, e sempre erradas do mesmo jeito. Gradientes roxo-azul, texto em gradiente, bordas com brilho colorido, emojis como ícones, grids de cards sem conteúdo real, tipografia só com Inter, headlines de herói gigantes em ferramentas operacionais. Esses são os sinais. Esta skill os detecta, pontua a interface em 8 dimensões e corrige passo a passo.

Funciona com React, Tailwind, HTML/CSS, Vue, Svelte, dashboards, apps, landing pages, componentes.

---

## Quick start

### Com Claude Code (CLI)

```bash
# Instalar globalmente
claude skills install https://github.com/RomuloRogerio/design-quality

# Ou copiar diretamente
cp -r skills/design-quality ~/.claude/skills/
```

Peça ao Claude para revisar, criticar ou construir uma UI.

<details>
<summary>Exemplo de output: Modo Review</summary>

```
$ claude review this design

🤖 [design-quality] Analyzing repository and screenshot context...
✨ Found 4 AI-slop indicators. Evaluating against 8-dimension scorecard.

## Slop Audit
❌ Purple-to-blue gradient background (P1) — App.css line 12
❌ Gradient text with background-clip (P1) — HeroTitle component
❌ Emoji in navigation label "🚀 Launch" (P1) — Navbar.tsx
❌ ALL CAPS tracked section header (P1) — features section

## Template Check
Could this UI belong to any other SaaS product? YES → P1
No World reference, no Signature detail found.

## Scorecard
Product fit:    4/10   generic SaaS applied
Hierarchy:      6/10   primary action visible but competing elements
Clarity:        7/10   labels readable, states missing
Taste:          3/10   templated
Restraint:      2/10   excessive decoration
Density:        6/10   appropriate for content
Craft:          5/10   grid inconsistent in footer
Responsiveness: 7/10   mobile layout works
Overall:        5/10

## Verdict
Best part: clear primary CTA, readable label
Worst part: gradient + gradient text. Maximum slop signal.
Required fix (P0): none
Quick wins (P1): remove gradient background, strip gradient text, replace emoji icons
```

</details>

### Com qualquer assistente de IA (Cursor, Codex, Copilot, Gemini…)

Cole o conteúdo do arquivo de skill diretamente no chat, ou adicione como contexto/system prompt:

```
# No chat do seu assistente de IA:
"Use esta skill para revisar minha UI: [cole o conteúdo de skills/design-quality/SKILL.md]"

# Ou referencie o arquivo na configuração do agente:
skills/design-quality/SKILL.md   → Revisão de UI
skills/ant-design.md              → Auditoria Ant Design
skills/system-design.md           → Planejamento de arquitetura
skills/all.md                     → Todas as três ao mesmo tempo
```

As skills são markdown puro — sem dependência do Claude Code. O plugin (slash commands) é exclusivo do Claude Code.

### Com Claude.ai Projects

Faça upload de `skills/design-quality/SKILL.md` e todos os arquivos em `skills/design-quality/references/` como conhecimento do projeto. O Claude aplicará a skill em pedidos relacionados a UI.

---

## Exemplos de uso

**Revisar uma UI em busca de slop e pontuar:**
```
revise este design
critique esta UI
isso parece gerado por IA?
remova o slop
```

**Começar uma nova UI com direção de produto primeiro:**
```
construa um dashboard para uma ferramenta de monitoramento de frota
design o fluxo de onboarding de um app de faturamento para freelancers
```

**Rodar passes de correção em código existente:**
```
corrija o espaçamento e as cores neste componente
rode um passe completo de correção em App.tsx
```

**Auditoria Ant Design:**
```
revise este painel React admin contra os padrões Ant Design
verifique se este componente segue as regras de tokens Ant Design
```

**Planejamento de arquitetura:**
```
projete um encurtador de URL que suporte 100M requisições/dia
como devo armazenar e servir vídeos enviados por usuários em escala?
```

---

## Skills neste repositório

| Skill | Arquivo | Para que serve |
|---|---|---|
| **design-quality** | [`skills/design-quality/SKILL.md`](skills/design-quality/SKILL.md) | Revisão geral de UI, detecção de slop, scorecard 8 dimensões, modos Create/Fix/Polish |
| **ant-design** | [`skills/ant-design.md`](skills/ant-design.md) | Revisão Ant Design v6: tokens, componentes, grid 4px, motion, elevação |
| **system-design** | [`skills/system-design.md`](skills/system-design.md) | Arquitetura escalável: framework 5 passos, seleção de BD, cache, filas, CAP |
| **all** | [`skills/all.md`](skills/all.md) | Carrega as três de uma vez; Claude escolhe a certa pelo contexto |

---

## Plugin (comandos slash do Claude Code)

A pasta `plugin/` dá ao Claude Code quatro comandos slash e um hint na barra de status.

| Comando | O que faz |
|---|---|
| `/dq-review` | Auditoria completa: detecção de slop, scorecard 8 dimensões, lista P0–P3 |
| `/direction` | Deriva direção de produto antes de qualquer código de UI |
| `/fix` | 10 passes sequenciais: Espaçamento → Cor → Ícones → Copy → Tipografia → Layout → Detalhes → A11y → Visuais → Motion |
| `/polish` | Percorre cada estado a 10% de velocidade: hover, focus, active, loading, empty, error |

Após editar qualquer arquivo `.tsx`, `.jsx`, `.css`, `.scss`, `.html`, `.vue` ou `.svelte`, a barra de status exibe `/dq-review · /fix · /polish` como lembrete.

**Instalar:**
```bash
# Clone o repositório
git clone https://github.com/RomuloRogerio/design-quality

# Inicie o Claude Code com o plugin
claude --plugin-dir ~/design-quality/plugin
```

**Ou carregar permanentemente:** adicione ao `~/.claude/settings.json`:
```json
{
  "pluginDirs": ["~/design-quality/plugin"]
}
```

---

## O problema que resolve

### Como são as UIs geradas por IA

Quando um LLM gera uma UI sem restrições, produz sempre a mesma interface. Ele viu milhares de shots do Dribbble, peças de portfólio e landing pages de SaaS. Otimiza para "impressionante à primeira vista" em vez de "útil na prática."

O resultado é sempre reconhecível:

**Cor:** Fundo em gradiente roxo-azul. Texto em gradiente com `background-clip: text`. Bordas com brilho colorido. Blobs radiais atrás do conteúdo.

**Tipografia:** Headlines de herói enormes em ferramentas operacionais. Labels em ALL CAPS com tracking em cada seção. Emojis misturados em labels ("🚀 Lançar", "Novo ✨"). Apenas Inter ou Roboto, sem outra decisão tipográfica.

**Layout:** Grid de três colunas de cards como preenchimento. Tudo centralizado. Tema escuro aplicado sem razão de produto. Todas as seções com o mesmo espaçamento.

**Copy:** "Revolucione Seu Fluxo de Trabalho Hoje." "Integrações poderosas." "Análise Avançada." Copy que poderia pertencer a qualquer produto da categoria.

**Identidade:** Se você trocar o nome do produto pelo de qualquer concorrente, a interface ainda se encaixa. Sem Mundo, sem Assinatura, sem Momentos: nada que só este produto teria.

### O que esta skill faz diferente

Detecta esses padrões sistematicamente, pontua o que está lá e corrige na ordem certa. Também previne esses problemas ao exigir uma direção de produto antes de escrever qualquer UI.

---

## Modos

### Modo Review

Entrada: screenshot, código HTML/CSS, pasta do projeto, URL ou link de artifact.

Saída:
```
## Auditoria de Slop
[cada achado com localização e severidade]

## Verificação de Template
[esta UI se encaixaria em qualquer produto da categoria?]

## Scorecard
Product fit:    X/10   [nota de uma linha]
Hierarchy:      X/10
Clarity:        X/10
Taste:          X/10
Restraint:      X/10
Density:        X/10
Craft:          X/10
Responsiveness: X/10
Overall:        X/10

## Veredicto
Melhor parte:
Pior parte:
Correção obrigatória (P0): [se houver]
Quick wins (P1): [top 3]
```

Escala de severidade:
- **P0:** quebra usabilidade ou legibilidade. Corrigir antes de qualquer outra coisa.
- **P1:** faz parecer claramente gerado por IA.
- **P2:** enfraquece o craft mas não quebra.
- **P3:** melhoria desejável mas não urgente.

### Modo Create

Antes de escrever qualquer UI, a skill exige:
1. **Tipo de contexto:** tela de app (densidade governa) vs. página (composição governa)
2. **Entendimento do produto:** o que faz, para quem, qual é a tarefa principal
3. **Direção:** cinco linhas derivadas do produto: Produto, Caráter, Mundo, Momentos, Assinatura
4. **Design Dials:** três ajustes como sinal rápido: Variância / Motion / Densidade (1–10 cada)

Após confirmação, cria um arquivo `PROJECT_DESIGN.md` na raiz do projeto que persiste a direção entre sessões. Sessões futuras leem este arquivo primeiro: a direção não deriva.

Exemplo de direção para uma ferramenta de controle de tempo:
```
Produto: Controle de tempo para freelancers que odeiam registrar tempo.
Caráter: calmo, exato, um pouco quente
Mundo: Relógios, ponteiros, sessões de foco silenciosas
Momentos: A visão semanal onde as horas se acumulam; o momento de geração da fatura
Assinatura: Uma animação sutil de segundo-ponteiro no timer ativo
```

### Modo Fix

Dez passes sequenciais: complete cada um antes de iniciar o próximo:

1. **Espaçamento:** alinhamento de grid 8px, ritmo, agrupamento
2. **Cor:** remover slop, construir a partir de uma rampa neutra
3. **Ícones:** uma biblioteca, um tamanho, um peso de traço, `currentColor`
4. **Copy:** remover labels com emoji, acalmar o exagero, tornar o copy específico ao produto
5. **Tipografia:** hierarquia, pesos, `text-wrap: balance` em headings
6. **Layout:** alinhamento, densidade
7. **Detalhes:** raios concêntricos, sombras (não sombra E borda juntas), bordas
8. **Acessibilidade & Touch:** estados de foco, `aria-label`, `touch-action: manipulation`, alvos de 44px
9. **Visuais:** ilustrações de estado vazio, consistência de ícones, aspect ratios de imagens
10. **Motion:** último passe, só onde adiciona significado

### Modo Polish

Para interfaces que estão quase bem mas parecem ligeiramente erradas.

Técnica: reduza para 10% de velocidade no DevTools (painel Animations). Percorra cada estado: hover, foco, ativo, carregando, vazio. O que parece errado a 10% é o que está sutilmente errado na velocidade normal.

---

## Dimensões do Scorecard

| Dimensão | A pergunta que faz |
|---|---|
| **Product fit** | A direção visual combina com o trabalho real do produto e sua audiência? |
| **Hierarchy** | O usuário consegue ver o que importa primeiro, segundo, terceiro? |
| **Clarity** | Labels, ações, dados e estados são fáceis de entender? |
| **Taste** | Parece intencional sem parecer templado? |
| **Restraint** | Sem decoração desnecessária, preenchimento ou estilo cosplay? |
| **Density** | A quantidade de informação é certa para a tarefa? |
| **Craft** | Espaçamento, tipo, alinhamento, contraste, estados de componentes: polidos? |
| **Responsiveness** | O design sobrevive a layouts mobile e estreitos? |

---

## Anti-padrões detectados

### Cor & Efeitos

| Padrão | Severidade |
|---|---|
| Gradiente roxo-azul em fundo, card ou botão | `P1` |
| Qualquer gradiente entre cores em uma superfície | `P1` |
| Texto em gradiente (`background-clip: text`) | `P1` |
| Borda com brilho colorido (`box-shadow` com cor saturada) | `P1` |
| Blob radial de cor / lavagem atmosférica atrás do conteúdo | `P1` |
| Fundo que parece uma cor (laranja, azul, verde) em uma tela de app | `P1` |
| Sombra colorida em cards ou botões | `P2` |
| Blur "Glassmorphism" sem razão de camadas significativa | `P2` |

### Tipografia

| Padrão | Severidade |
|---|---|
| Emoji em labels ou headings ("Novo ✨", "🚀 Lançar") | `P1` |
| Labels em ALL CAPS com tracking em todo cabeçalho de seção | `P1` |
| Headline de herói enorme em uma ferramenta operacional funcional | `P1` |
| Copy que grita ("Revolucione Seu Fluxo de Trabalho Hoje") | `P1` |
| Apenas Inter sem outra decisão tipográfica | `P2` |
| Sem diferença de peso visual entre heading e body | `P1` |

### Layout & Estrutura

| Padrão | Severidade |
|---|---|
| Grid de cards 3 colunas igualmente espaçados como preenchimento de conteúdo | `P1` |
| Cards de features duplicados (ícone + heading + duas frases cada) | `P1` |
| Dashboard escuro aplicado por padrão sem razão de produto | `P1` |
| Seção que existe apenas para preencher espaço (estatísticas fake, depoimentos inventados) | `P1` |
| Sem hierarquia visual: todo elemento com o mesmo peso | `P1` |
| Tudo centralizado, sem padrão de leitura alinhado à esquerda | `P2` |

### Ícones

| Padrão | Severidade |
|---|---|
| Emoji usado como ícones em navegação ou cards | `P1` |
| Duas ou mais bibliotecas de ícones misturadas em uma tela | `P2` |
| Ícones com suas próprias cores (não `currentColor`) | `P2` |
| Ícones decorativos antes de cada heading ou label | `P2` |

### Identidade de Template

| Padrão | Severidade |
|---|---|
| Trocar o nome do produto pelo de um concorrente: a UI ainda se encaixa | `P1` |
| Sem detalhe de Assinatura: nada que só este produto teria | `P1` |
| Sem referência de Mundo: neutros sem tinte em direção ao domínio do produto | `P2` |
| Ilustração de stock genérica que poderia pertencer a qualquer produto | `P2` |

### Acessibilidade & Técnico

| Padrão | Severidade |
|---|---|
| Contraste de texto abaixo de 4.5:1 (WCAG AA) | `P0` |
| Sem indicador de foco visível em elementos interativos | `P0` |
| Botão de ícone sem `aria-label` | `P1` |
| Input de formulário sem `<label>` associado | `P1` |
| `user-scalable=no` no viewport meta | `P1` |
| `prefers-reduced-motion` não respeitado | `P1` |
| `transition: all` em vez de propriedades específicas | `P2` |
| Labels de gráfico sobrepostos | `P0` |

### Mobile & Touch

| Padrão | Severidade |
|---|---|
| Alvos de toque menores que 44×44px | `P1` |
| Efeitos hover sem guarda `@media (hover: hover)` | `P2` |
| `touch-action: manipulation` faltando em botões | `P2` |
| `overscroll-behavior: contain` faltando em modais | `P2` |

---

## Framework de Direção

As cinco linhas que todo design precisa antes de escrever código:

**Produto:** o que faz e para quem, uma frase simples.

**Caráter:** 2–3 palavras concretas. `calmo, exato, um pouco quente` ou `rápido, técnico, brincalhão`.
Banidas: limpo, moderno, elegante, minimalista, premium. Essas descrevem todos os templates.

**Mundo:** o material ou lugar em que o produto naturalmente pertence.
- App de notas → papel e tinta
- Ferramenta de monitoramento → instrumentos e turnos noturnos
- App de viagens → mapas e luz de janela
- Ferramenta financeira → livros contábeis, colunas limpas, autoridade silenciosa

Isso tinta os neutros, o acento e os momentos visuais.

**Momentos:** 1–2 lugares na tela onde o design fica rico e específico.
Todo o resto fica silencioso para que esses se leiam imediatamente.

**Assinatura:** um pequeno detalhe que só este produto teria, repetido consistentemente.
- Ferramenta de monitoramento → ponto de status ao vivo
- Ferramenta de desenvolvedor → estética de teclas de teclado
- App de entrega → linha de rota

Um detalhe, não cinco.

---

## Valores de micro-polish

### Raio de borda concêntrico

O raio do elemento externo = raio do elemento interno + o padding entre eles.

```css
/* Errado */
.card { border-radius: 12px; padding: 16px; }
.card-inner { border-radius: 12px; } /* muito pequeno — cantos internos são rombos */

/* Correto */
.card { border-radius: 24px; padding: 12px; }
.card-inner { border-radius: 12px; } /* 24 - 12 = 12 ✓ */
```

### Animação de pressionar

```css
button {
  transition: transform 150ms ease-out;
}
button:active {
  transform: scale(0.96);
}
```

Sempre 0.96: nunca menor que 0.95.

### Transições

```css
/* Nunca */
transition: all 200ms ease;

/* Sempre especifique */
transition: transform 200ms ease-out, opacity 200ms ease-out;
```

---

## Checklist antes de entregar

- [ ] Sem emoji como ícones (use SVG: Heroicons / Lucide / Phosphor / Radix)
- [ ] `cursor-pointer` em todos os elementos clicáveis
- [ ] Contraste de texto ≥ 4.5:1 (WCAG AA)
- [ ] Estados de foco visíveis para navegação por teclado (`focus-visible`, não `outline` removido)
- [ ] `aria-label` em todo botão de ícone
- [ ] `<label>` associado com todo input de formulário
- [ ] `prefers-reduced-motion` respeitado
- [ ] `touch-action: manipulation` nos botões
- [ ] Estados hover usam `@media (hover: hover) and (pointer: fine)`
- [ ] Texto, chips e badges reflow em larguras estreitas sem corte
- [ ] Responsivo em 375px, 768px, 1024px, 1440px
- [ ] Sem achados P0 do Modo Review
- [ ] Estados vazio, carregando e erro todos tratados
- [ ] Números dinâmicos usam `font-variant-numeric: tabular-nums`
- [ ] Headings têm `text-wrap: balance`
- [ ] Sem `transition: all` em nenhum lugar

---

## Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para como adicionar sinais de slop, propor novas dimensões ou contribuir traduções.

---

## Licença

MIT: veja [LICENSE](LICENSE).
