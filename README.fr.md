[English](README.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [简体中文](README.zh-CN.md) · **Français** · [Deutsch](README.de.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

---

![License](https://img.shields.io/github/license/RomuloRogerio/design-quality) ![Stars](https://img.shields.io/github/stars/RomuloRogerio/design-quality?style=flat) ![Translations](https://img.shields.io/badge/translations-8-blue) ![Fonctionne avec tout IA](https://img.shields.io/badge/fonctionne%20avec-tout%20IA-6366f1) ![Plugin pour Claude Code](https://img.shields.io/badge/plugin-Claude%20Code-orange)

# design-quality

Une skill de qualité de design pour les assistants IA — Claude Code, Cursor, Codex, Copilot ou tout outil acceptant des instructions en markdown.

L'IA génère des interfaces rapidement. Elle les génère aussi mal, toujours de la même façon. Dégradés violet-bleu, texte en dégradé, bordures lumineuses colorées, emojis comme icônes, grilles de cartes sans contenu, typographie uniquement Inter, grands titres héroïques sur des outils opérationnels. Ce sont les signes révélateurs. Cette skill les détecte, note l'interface sur 8 dimensions et les corrige étape par étape.

Fonctionne avec React, Tailwind, HTML/CSS, Vue, Svelte, dashboards, apps, landing pages, composants.


---

## Démarrage rapide

### Avec Claude Code (CLI)

```bash
# Installer globalement
claude skills install https://github.com/RomuloRogerio/design-quality

# Ou copier directement
cp -r skills/design-quality ~/.claude/skills/
```

Ensuite, dans toute session Claude Code, la skill se charge automatiquement quand vous demandez à Claude de revoir, critiquer ou construire une UI.

<details>
<summary>🔍 Exemple de sortie terminal: Mode Review</summary>

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
Worst part: gradient + gradient text — maximum slop signal
Required fix (P0): none
Quick wins (P1): remove gradient background, strip gradient text, replace emoji icons
```

</details>

### Avec n'importe quel assistant IA (Cursor, Codex, Copilot, Gemini…)

Collez le contenu du fichier skill directement dans votre chat, ou ajoutez-le comme contexte/system prompt :

```
# Dans votre chat IA :
"Utilise cette skill pour revoir mon interface : [colle le contenu de skills/design-quality/SKILL.md]"

# Ou référence le fichier dans la config de l'agent :
skills/design-quality/SKILL.md   → Revue d'interface
skills/ant-design.md              → Audit Ant Design
skills/system-design.md           → Planification d'architecture
skills/all.md                     → Les trois à la fois
```

Les skills sont en markdown pur — sans dépendance à Claude Code. Le plugin (slash commands) est exclusif à Claude Code.

### Avec Claude.ai Projects

Téléchargez `skills/design-quality/SKILL.md` et tous les fichiers dans `skills/design-quality/references/` comme connaissance du projet. Claude appliquera la skill aux demandes liées à l'UI.

---

## Exemples d'utilisation

**Revoir une UI et la noter :**
```
revoir ce design
critiquer cette UI
ça ressemble à du IA ?
enlever le générique
```

**Commencer une nouvelle UI avec une direction produit d'abord :**
```
construire un dashboard pour un outil de suivi de flotte
designer le flux d'onboarding d'une app de facturation pour freelances
```

**Appliquer des passes de correction sur du code existant :**
```
corriger l'espacement et les couleurs dans ce composant
exécuter une passe de correction complète sur App.tsx
```

**Audit Ant Design :**
```
revoir ce panneau d'administration React selon les standards Ant Design
vérifier si ce composant suit les règles de tokens Ant Design
```

**Planification d'architecture :**
```
concevoir un raccourcisseur d'URL gérant 100M requêtes/jour
comment stocker et servir des vidéos uploadées par des utilisateurs à l'échelle ?
```

---

## Skills dans ce dépôt

| Skill | Fichier | Pour quoi |
|---|---|---|
| **design-quality** | [`skills/design-quality/SKILL.md`](skills/design-quality/SKILL.md) | Revue générale d'UI, détection de générique IA, scorecard 8 dimensions, modes Create/Fix/Polish |
| **ant-design** | [`skills/ant-design.md`](skills/ant-design.md) | Revue Ant Design v6: tokens, composants, grille 4px, motion, élévation |
| **system-design** | [`skills/system-design.md`](skills/system-design.md) | Architecture scalable: framework 5 étapes, choix de BDD, cache, files de messages, CAP |
| **all** | [`skills/all.md`](skills/all.md) | Charge les trois à la fois ; Claude choisit la pertinente automatiquement |

---

## Plugin (commandes slash Claude Code)

Le dossier `plugin/` ajoute quatre commandes slash et un hint dans la barre de statut à toute session Claude Code.

| Commande | Ce qu'elle fait |
|---|---|
| `/dq-review` | Audit complet d'UI : détection générique, scorecard 8 dimensions, liste de corrections P0–P3 |
| `/direction` | Mode Create: dérive la direction (Caractère · Monde · Moments · Signature) avant tout code UI |
| `/fix` | Mode Fix: 10 passes séquentielles : Espacement → Couleur → Icônes → Copy → Typographie → Layout → Détails → A11y → Visuels → Motion |
| `/polish` | Mode Polish: parcourt chaque état à 10 % de vitesse (hover · focus · active · loading · empty · error) |

Après l'édition de tout fichier `.tsx`, `.jsx`, `.css`, `.scss`, `.html`, `.vue` ou `.svelte`, la barre de statut affiche `/dq-review · /fix · /polish` en rappel.

**Installer :**
```bash
# Cloner le dépôt
git clone https://github.com/RomuloRogerio/design-quality

# Démarrer Claude Code avec le plugin
claude --plugin-dir ~/design-quality/plugin
```

**Ou charger en permanence:** ajouter à `~/.claude/settings.json` :
```json
{
  "pluginDirs": ["~/design-quality/plugin"]
}
```

---

## Le problème résolu

### À quoi ressemblent les interfaces IA

Quand un LLM génère une UI sans contraintes, il produit la même interface à chaque fois. Il a vu des milliers de captures Dribbble, de portfolios et de landing pages SaaS. Il optimise pour "impressionnant au premier coup d'œil" plutôt que "utile en pratique."

Le résultat est toujours reconnaissable :

**Couleur :** Fond avec dégradé violet-bleu. Texte en dégradé avec `background-clip: text`. Bordures lumineuses colorées. Taches de couleur radiales derrière le contenu.

**Typographie :** Grands titres héroïques sur des outils opérationnels. Étiquettes en MAJUSCULES avec tracking sur chaque section. Emojis mélangés dans les étiquettes ("🚀 Lancer", "Nouveau ✨"). Seulement Inter ou Roboto sans autre décision typographique.

**Layout :** Grille de 3 colonnes de cartes utilisée comme remplissage. Tout centré. Thème sombre appliqué sans raison produit. Chaque section avec le même espacement.

**Copy :** "Révolutionnez Votre Flux de Travail Aujourd'hui." "Intégrations puissantes." "Analytics Avancés." Un copy qui pourrait appartenir à n'importe quel produit de la catégorie.

**Identité :** Si vous remplaciez le nom du produit par n'importe quel concurrent, l'interface s'adapterait toujours. Pas d'Univers, pas de Signature, pas de Moments: rien que seul ce produit aurait.

### Ce que cette skill fait différemment

Elle détecte ces patterns systématiquement, note ce qui est là et corrige dans le bon ordre. Elle les prévient aussi en amont en exigeant une direction produit avant d'écrire toute UI.

---

## Modes

### Mode Révision

Entrée : capture d'écran, code HTML/CSS, dossier du projet, URL ou lien d'artefact.

Sortie :
```
## Audit de Défauts IA
[chaque constat avec localisation et sévérité]

## Vérification Modèle
[ceci conviendrait-il à n'importe quel produit de la catégorie ?]

## Grille d'Évaluation
Adéquation produit:  X/10   [note en une ligne]
Hiérarchie:          X/10
Clarté:              X/10
Goût:                X/10
Retenue:             X/10
Densité:             X/10
Craft:               X/10
Réactivité:          X/10
Global:              X/10

## Verdict
Meilleure partie :
Pire partie :
Correction requise (P0) : [si applicable]
Victoires rapides (P1) : [top 3]
```

Échelle de sévérité :
- **P0:** brise l'utilisabilité ou la lisibilité. À corriger avant tout.
- **P1:** donne l'impression d'être clairement généré par IA.
- **P2:** affaiblit le craft sans le briser.
- **P3:** amélioration souhaitable.

### Mode Création

Avant d'écrire toute UI, la skill exige :
1. **Type de contexte:** écran d'app (la densité gouverne) vs. page (la composition gouverne)
2. **Compréhension produit:** ce qu'il fait, pour qui, quelle est la tâche principale
3. **Direction:** cinq lignes dérivées du produit : Produit, Caractère, Univers, Moments, Signature
4. **Cadrans de Design:** trois boutons comme signal rapide : Variance / Mouvement / Densité (1–10 chacun)

Après confirmation, crée un `PROJECT_DESIGN.md` à la racine du projet qui pérennise la direction entre les sessions. Les sessions futures lisent ce fichier en premier: la direction ne dérive pas.

Exemple de direction pour un outil de suivi du temps :
```
Produit : Suivi du temps pour les freelances qui détestent suivre leur temps.
Caractère : calme, précis, légèrement chaleureux
Univers : Montres, horloges, sessions de concentration tranquilles
Moments : La vue hebdomadaire où les heures s'accumulent ; le moment de génération de facture
Signature : Une légère animation de trotteuse sur le timer actif
```

### Mode Correction

Dix passes séquentielles: compléter chaque passe avant de commencer la suivante :

1. **Espacement:** alignement grille 8px, rythme, regroupement
2. **Couleur:** supprimer les éléments génériques, construire à partir d'une rampe neutre
3. **Icônes:** une bibliothèque, une taille, un poids de trait, `currentColor`
4. **Copy:** supprimer les étiquettes emoji, calmer les cris, rendre le copy spécifique au produit
5. **Typographie:** hiérarchie, graisses, `text-wrap: balance` sur les titres
6. **Layout:** alignement, densité
7. **Détails:** rayons concentriques, ombres (pas ombre ET bordure en même temps), bordures
8. **Accessibilité et Touch:** états de focus, `aria-label`, `touch-action: manipulation`, cibles 44px
9. **Visuels:** illustrations d'états vides, cohérence des icônes, ratios d'aspect des images
10. **Mouvement:** dernière passe, seulement là où ça apporte du sens

### Mode Polissage

Pour les interfaces globalement bien conçues mais légèrement incorrectes.

Technique : ralentir l'interface à 10% de vitesse dans DevTools (panneau Animations). Parcourir chaque état : hover, focus, active, loading, empty. Ce qui semble faux à 10% est ce qui ne va pas à vitesse normale.

---

## Dimensions de la grille d'évaluation

| Dimension | La question qu'elle pose |
|---|---|
| **Adéquation produit** | La direction visuelle correspond-elle au travail réel et à l'audience du produit ? |
| **Hiérarchie** | L'utilisateur peut-il voir ce qui compte en premier, deuxième, troisième ? |
| **Clarté** | Les étiquettes, actions, données et états sont-ils faciles à comprendre ? |
| **Goût** | Ça semble intentionnel sans ressembler à un modèle ? |
| **Retenue** | Pas de décoration inutile, remplissage ou cosplay de style ? |
| **Densité** | La quantité d'information est-elle adaptée à la tâche ? |
| **Craft** | Espacement, typographie, alignement, contraste, états des composants: soignés ? |
| **Réactivité** | Le design résiste-t-il sur mobile et dans les layouts étroits ? |

---

## Antipatterns détectés

### Couleur et Effets (100+ patterns)

| Pattern | Sévérité |
|---|---|
| Dégradé violet-bleu sur fond, carte ou bouton | `P1` |
| Tout dégradé de teinte à teinte sur une surface | `P1` |
| Texte en dégradé (`background-clip: text`) | `P1` |
| Bordure lumineuse (`box-shadow` avec couleur saturée) | `P1` |
| Tache de couleur radiale / lavis atmosphérique derrière le contenu | `P1` |
| Fond qui se lit comme une teinte sur un écran d'app | `P1` |
| Ombre colorée sur cartes ou boutons | `P2` |
| Blur "glassmorphisme" sans raison de superposition significative | `P2` |

### Typographie

| Pattern | Sévérité |
|---|---|
| Emojis dans les étiquettes ou titres ("Nouveau ✨", "🚀 Lancer") | `P1` |
| Étiquettes en MAJUSCULES avec tracking sur chaque en-tête de section | `P1` |
| Grand titre héroïque sur un outil opérationnel fonctionnel | `P1` |
| Copy qui crie ("Révolutionnez Votre Flux de Travail Aujourd'hui") | `P1` |
| Seulement Inter sans autre décision typographique | `P2` |
| Pas de différence de poids visuel entre titre et corps | `P1` |

### Layout et Structure

| Pattern | Sévérité |
|---|---|
| Grille de 3 colonnes équidistantes utilisée comme remplissage de contenu | `P1` |
| Cartes de fonctionnalités dupliquées (icône + titre + deux phrases chacune) | `P1` |
| Dashboard sombre appliqué par défaut sans raison produit | `P1` |
| Section qui existe uniquement pour remplir l'espace (stats fausses, témoignages inventés) | `P1` |
| Pas de hiérarchie visuelle: tous les éléments au même poids | `P1` |
| Tout centré, pas de pattern de lecture aligné à gauche | `P2` |

### Icônes

| Pattern | Sévérité |
|---|---|
| Emojis utilisés comme icônes dans la navigation ou les cartes | `P1` |
| Deux bibliothèques d'icônes ou plus mélangées sur un écran | `P2` |
| Icônes avec leurs propres couleurs (pas `currentColor`) | `P2` |
| Icônes décoratives avant chaque titre ou étiquette | `P2` |

### Identité de Modèle

| Pattern | Sévérité |
|---|---|
| Remplacer le nom du produit par un concurrent: l'UI s'adapte toujours | `P1` |
| Pas de détail Signature: rien que seul ce produit aurait | `P1` |
| Pas de référence à l'Univers: les neutres n'ont pas de teinte vers le domaine du produit | `P2` |
| Illustration générique qui pourrait appartenir à n'importe quel produit | `P2` |

### Accessibilité et Technique

| Pattern | Sévérité |
|---|---|
| Contraste de texte en dessous de 4.5:1 (WCAG AA) | `P0` |
| Pas d'indicateur de focus visible sur les éléments interactifs | `P0` |
| Bouton icône sans `aria-label` | `P1` |
| Input de formulaire sans `<label>` associé | `P1` |
| `user-scalable=no` dans le viewport meta | `P1` |
| `prefers-reduced-motion` non respecté | `P1` |
| `transition: all` au lieu de propriétés spécifiques | `P2` |
| Étiquettes de graphique qui se chevauchent | `P0` |

### Mobile et Touch

| Pattern | Sévérité |
|---|---|
| Cibles tactiles inférieures à 44×44px | `P1` |
| Effets hover sans garde `@media (hover: hover)` | `P2` |
| `touch-action: manipulation` manquant sur les boutons | `P2` |
| `overscroll-behavior: contain` manquant sur les modals | `P2` |

---

## Cadre de direction

Les cinq lignes que tout design nécessite avant d'écrire du code :

**Produit:** ce qu'il fait et pour qui, une phrase simple.

**Caractère:** 2–3 mots concrets. `calme, précis, légèrement chaleureux` ou `rapide, technique, ludique`.
Interdits : propre, moderne, élégant, minimal, premium. Ils décrivent chaque modèle.

**Univers:** le matériau ou lieu auquel le produit appartient naturellement.
- App de notes → papier et encre
- Outil de monitoring → instruments et quarts de nuit
- App de voyage → cartes et lumière de fenêtre
- Outil financier → livres de compte, colonnes épurées, autorité tranquille

Cela teinte les neutres, l'accent et les moments visuels.

**Moments:** 1–2 endroits sur l'écran où le design devient riche et spécifique.
Tout le reste reste tranquille pour que ceux-ci se lisent instantanément.

**Signature:** un petit détail que seul ce produit aurait, répété de façon cohérente.
- Outil de monitoring → point de statut en direct
- Outil développeur → esthétique keycap
- App de livraison → ligne de route

Un détail, pas cinq.

### Cadrans de Design

Trois boutons montrés pour chaque proposition de direction :

```
Variance   ░░░░░░░░░░  1–10   (1 = centré/minimal, 10 = audacieux/asymétrique)
Mouvement  ░░░░░░░░░░  1–10   (1 = statique, 10 = animé)
Densité    ░░░░░░░░░░  1–10   (1 = spacieux/éditorial, 10 = dashboard/dense)
```

---

## Principes de design appliqués

### Fondements Théoriques et Psychologie du Design

Cette skill évalue les interfaces en s'appuyant sur une psychologie comportementale solide et des cadres de design classiques, plutôt que sur des esthétiques passagères :

- **La Règle Pic-Fin (Daniel Kahneman) :** Les utilisateurs jugent les expériences par leurs moments de pic et de fin: pas par la moyenne. C'est pourquoi la skill accorde une attention particulière à l'interaction la plus intense et à l'écran final de chaque flux.
- **Le Cadre du Design Émotionnel (Don Norman) :** Les interfaces doivent adresser simultanément trois niveaux: viscéral (première impression), comportemental (facilité d'utilisation) et réflexif (sens et identité). Un score inférieur à 7 en Product Fit signale souvent un échec au niveau réflexif.
- **Les Affordances (James J. Gibson / Don Norman) :** Les éléments interactifs doivent communiquer leur fonction clairement sans nécessiter d'exploration. Les états de focus absents, les boutons icônes sans label et les cibles tactiles invisibles violent ce principe.

---

### Espacement
- Grille de 8px. Tous les marges, paddings, gaps sont des multiples de 4 ou 8.
- `mt-[13px]` est toujours faux. À corriger.
- L'espace montre le regroupement : gap interne < gap externe.

### Couleur
- Une rampe neutre, teintée vers l'Univers.
- Un accent, utilisé rarement : action primaire, sélection, le seul chiffre qui compte.
- Trois rôles de texte : principal, secondaire, atténué. Jamais dix gris légèrement différents.
- Préférer OKLCH pour les nouveaux tokens de couleur : `oklch(L% C H)`.
- Interdits : dégradés de teinte sur les surfaces, texte en dégradé, lueurs colorées, taches radiales, bordures néon.

### Typographie
- Associer une police d'affichage distinctive à une police de corps épurée. Maximiser le contraste de graisse.
- `text-wrap: balance` sur tous les titres. `text-wrap: pretty` sur le texte de corps.
- `-webkit-font-smoothing: antialiased` sur `:root`.
- Corps minimum 14px (préférer 16px). Un h1 par page.

### Composants
- Boutons : étiquettes avec verbe en premier. Un primaire par section.
- Pas d'emojis comme icônes. Une bibliothèque d'icônes, un poids de trait, seulement `currentColor`.
- Cartes : ombre OU bordure, pas les deux.
- États vides : illustration + titre + CTA. Jamais juste vide.
- Loading : écrans skeleton (pas de spinners) après 300ms de délai.

### Règle de l'Élément Brillant Unique
Chaque écran obtient un élément soigné et riche. Tout le reste reste tranquille.
Le chrome (navigation, boutons, fonds) ne concurrence jamais le contenu.

---

## Liste de vérification du polissage

Avant de marquer toute UI comme terminée :

- [ ] Pas d'emojis comme icônes (utiliser SVG : Heroicons / Lucide / Phosphor / Radix)
- [ ] `cursor-pointer` sur tous les éléments cliquables
- [ ] Contraste de texte ≥ 4.5:1 (WCAG AA)
- [ ] États de focus visibles pour la navigation clavier (`focus-visible`, pas `outline` supprimé)
- [ ] `aria-label` sur chaque bouton icône
- [ ] `<label>` associé à chaque input de formulaire
- [ ] `prefers-reduced-motion` respecté
- [ ] `touch-action: manipulation` sur les boutons
- [ ] États hover utilisent `@media (hover: hover) and (pointer: fine)`
- [ ] Texte, chips et badges se réorganisent aux largeurs étroites sans coupure
- [ ] Réactif à 375px, 768px, 1024px, 1440px
- [ ] Pas de constats P0 du Mode Révision
- [ ] États vide, loading et erreur tous gérés
- [ ] Les nombres dynamiques utilisent `font-variant-numeric: tabular-nums`
- [ ] Les titres ont `text-wrap: balance`
- [ ] Pas de `transition: all` nulle part

---

## Vérification de l'État Ressenti

Une vérification que la skill effectue durant le Mode Révision. Elle demande ce que l'utilisateur ressent à chaque état clé, puis vérifie si l'interface reconnaît ces sentiments.

Loading : anxieux ? Qui attend ?
État vide : perdu ? Première fois ?
Erreur : gêné ?

Signaler quand :
- Le copy de loading est "Chargement..." → P2 (devrait être "Récupération de vos données" ou similaire)
- Le message d'erreur blâme l'utilisateur pour une défaillance système → P1
- L'état vide n'offre rien: pas d'instruction, pas de CTA → P1
- Le succès est absorbé en silence (pas de reconnaissance) → P2

---

## Règle Pic-Fin

Pour les flux multi-étapes, la skill cartographie les deux moments qui dominent la façon dont le flux est mémorisé :

- **Pic** : le moment le plus intense émotionnellement (commande passée, formulaire soumis, premier résultat). Est-il bien conçu ?
- **Fin** : l'écran/état final. Confirme-t-il clairement et atterrit-il chaleureusement ?

Terminer sur un écran administratif, une page de statut confuse ou une erreur non résolue → P1.

---

## Valeurs de micro-polissage

### Rayon de bordure concentrique

Rayon de l'élément externe = rayon de l'élément interne + le padding entre eux.

```css
/* Faux */
.card { border-radius: 12px; padding: 16px; }
.card-inner { border-radius: 12px; }

/* Correct */
.card { border-radius: 24px; padding: 12px; }
.card-inner { border-radius: 12px; } /* 24 - 12 = 12 ✓ */
```

### Animation de pression

```css
button {
  transition: transform 150ms ease-out;
}
button:active {
  transform: scale(0.96);
}
```

Toujours 0.96: jamais inférieur à 0.95.

### Transitions

```css
/* Jamais */
transition: all 200ms ease;

/* Toujours spécifier */
transition: transform 200ms ease-out, opacity 200ms ease-out;
```

### Cibles tactiles

```css
.icon-button {
  width: 20px;
  height: 20px;
  position: relative;
}
.icon-button::before {
  content: '';
  position: absolute;
  inset: -12px;
}
```

---

## Principes de mouvement

Le mouvement est un budget. Se demander pour chaque animation : la supprimer rend-elle l'interface pire, ou juste moins tape-à-l'œil ? Si la réponse est "juste moins tape-à-l'œil," la supprimer.

**Interactions haute fréquence (utilisées >10×/jour) : pas d'animation personnalisée.**
Hover de ligne, feedback de frappe, changement d'onglet, toggle: réponse instantanée ou transition minimale à ≤150ms.

**Actions basse fréquence (utilisées rarement ou pour la première fois) : mériter l'animation.**
Étapes d'onboarding, état vide → premier élément, états de succès: 150–300ms avec ease-out simple.

**Transitions CSS plutôt que keyframes pour les éléments interactifs.**
Les transitions sont interruptibles. Si un utilisateur ouvre un drawer et le ferme en cours d'animation, une transition s'inverse en douceur. Une animation keyframe redémarre depuis le début.

---

## Structure du dépôt

```
design-quality/
├── README.md (+ 7 traductions)
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── plugin/                     ← commandes slash Claude Code
│   ├── .claude-plugin/
│   └── hooks/
└── skills/
    ├── all.md                  ← charger les trois skills à la fois
    ├── ant-design.md           ← Ant Design v6 — révision et correction
    ├── system-design.md        ← planification d'architecture évolutive
    └── design-quality/
        ├── SKILL.md
        └── references/
```

**Navigation rapide :**

| Fichier | Description |
|---|---|
| [README.md](README.md) | Ce fichier (+ [es](README.es.md) · [pt-BR](README.pt-BR.md) · [zh-CN](README.zh-CN.md) · [fr](README.fr.md) · [de](README.de.md) · [ja](README.ja.md) · [ko](README.ko.md)) |
| [CHANGELOG.md](CHANGELOG.md) | Historique des versions |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Comment contribuer |
| [LICENSE](LICENSE) | Licence MIT |
| **Skills** | |
| [skills/all.md](skills/all.md) | Charger les trois skills à la fois |
| [skills/design-quality/SKILL.md](skills/design-quality/SKILL.md) | Revue UI, détection générique, scorecard, Create/Fix/Polish |
| [skills/ant-design.md](skills/ant-design.md) | Revue tokens/composants Ant Design v6 |
| [skills/system-design.md](skills/system-design.md) | Planification d'architecture évolutive |
| **Plugin** | |
| [plugin/hooks/register.ts](plugin/hooks/register.ts) | Code source des hooks de commandes slash |
| [plugin/README.md](plugin/README.md) | Instructions d'installation du plugin |
| **Références** | |
| [slop-signs.md](skills/design-quality/references/slop-signs.md) | Catalogue complet des anti-patterns |
| [quality-dimensions.md](skills/design-quality/references/quality-dimensions.md) | Détails des dimensions du scorecard |
| [micro-polish.md](skills/design-quality/references/micro-polish.md) | Référence de micro-polissage |
| [passes-visuals.md](skills/design-quality/references/passes-visuals.md) | Passes de correction visuelle |
| [passes-motion.md](skills/design-quality/references/passes-motion.md) | Passes de correction du mouvement |
| [review-guide.md](docs/review-guide.md) | Guide du mode de révision |
| [fix-mode-walkthrough.md](docs/fix-mode-walkthrough.md) | Guide du mode de correction |
| [slop-field-guide.md](docs/slop-field-guide.md) | Guide de terrain du générique IA |

---

## Contribuer

Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour savoir comment ajouter des signes génériques IA, proposer de nouvelles dimensions ou contribuer des traductions.

---

## En lien

- [designer-skills](https://github.com/Owl-Listener/designer-skills): 111 skills de design ciblées que cette skill référence pour les analyses approfondies
- [impeccable](https://github.com/pbakaus/impeccable): standards de design pour les interfaces générées par IA

---

## Licence

MIT: voir [LICENSE](LICENSE).
