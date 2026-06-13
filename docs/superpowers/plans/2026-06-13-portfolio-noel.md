# Portfolio Noël Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire un site portfolio statique, sobre et minimaliste, en HTML + Tailwind CSS, présentant les projets de Noël via une grille de cartes par catégorie.

**Architecture:** Site statique pur. Tailwind CSS compilé en local via le CLI vers `dist/styles.css` (aucun CDN, aucun JS de framework). Les projets sont décrits dans un seul fichier `src/data/projects.js` ; un petit script vanilla génère la grille de l'accueil au chargement. Chaque projet est soit un lien externe (`external`), soit une page dédiée (`page`). Thème clair/sombre auto via `prefers-color-scheme`.

**Tech Stack:** HTML5, Tailwind CSS v3 (CLI), JavaScript vanilla (ES modules), Node uniquement pour builder le CSS.

> **Note méthodo :** projet front statique sans runner de tests unitaires. La boucle « test » est remplacée par : build CSS + ouverture dans le navigateur + vérification visuelle de comportements précis. Commits fréquents conservés.

---

## File Structure

```
noel-perso/
├── index.html                 # accueil : header, intro, grille, footer
├── projets/
│   └── les-heures.html         # exemple de page projet (gabarit)
├── src/
│   ├── input.css               # directives Tailwind + styles de base
│   ├── data/projects.js         # tableau des projets (source unique)
│   └── js/render-grid.js        # génère la grille depuis projects.js
├── dist/
│   └── styles.css              # CSS Tailwind buildé (généré, gitignored)
├── tailwind.config.js
├── package.json                # scripts build/watch CSS
├── .gitignore                  # (déjà créé)
└── docs/superpowers/…          # spec + ce plan
```

Responsabilités :
- `index.html` — structure de la page d'accueil, importe `styles.css` et les scripts.
- `src/data/projects.js` — données seules, aucune logique. Export d'un tableau `projects`.
- `src/js/render-grid.js` — lit `projects`, rend les cartes dans le conteneur de grille.
- `projets/<slug>.html` — gabarit de page projet, contenu en dur par projet.
- `tailwind.config.js` / `src/input.css` — config et entrée du build CSS.

---

## Task 1: Scaffolding & build Tailwind

**Files:**
- Create: `package.json`
- Create: `tailwind.config.js`
- Create: `src/input.css`
- Create: `index.html` (squelette minimal pour tester le build)

- [ ] **Step 1: Créer `package.json`**

```json
{
  "name": "noel-perso",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build:css": "tailwindcss -i ./src/input.css -o ./dist/styles.css --minify",
    "watch:css": "tailwindcss -i ./src/input.css -o ./dist/styles.css --watch"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0"
  }
}
```

- [ ] **Step 2: Créer `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './projets/**/*.html', './src/js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 3: Créer `src/input.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 4: Créer un `index.html` minimal pour valider le build**

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Noël Schneider</title>
    <link rel="stylesheet" href="./dist/styles.css" />
  </head>
  <body class="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
    <main class="mx-auto max-w-3xl px-6 py-24">
      <h1 class="text-2xl font-medium">Build OK</h1>
    </main>
  </body>
</html>
```

- [ ] **Step 5: Installer et builder**

Run: `cd /Users/noel/Documents/noel-perso && npm install && npm run build:css`
Expected: `dist/styles.css` créé, pas d'erreur.

- [ ] **Step 6: Vérifier dans le navigateur**

Run: `open /Users/noel/Documents/noel-perso/index.html`
Expected: page blanche en clair / quasi-noire en sombre, titre « Build OK ». Bascule le thème système pour vérifier les deux modes.

- [ ] **Step 7: Commit**

```bash
git add package.json tailwind.config.js src/input.css index.html
git commit -m "chore: scaffold Tailwind build and minimal index"
```

---

## Task 2: Données projets

**Files:**
- Create: `src/data/projects.js`

- [ ] **Step 1: Créer `src/data/projects.js`**

```js
export const projects = [
  {
    title: 'Les Heures',
    category: 'théâtre',
    year: '2025',
    kind: 'page',
    href: './projets/les-heures.html',
  },
  {
    title: 'Nocturne',
    category: 'musique',
    year: '2024',
    kind: 'external',
    href: 'https://open.spotify.com/',
  },
  {
    title: 'MangerDemain',
    category: 'mobile',
    year: '2024',
    kind: 'external',
    href: 'https://apps.apple.com/',
  },
  {
    title: 'La chaîne',
    category: 'youtube',
    year: '2023',
    kind: 'external',
    href: 'https://youtube.com/',
  },
  {
    title: 'Le blog',
    category: 'blog',
    year: '2022',
    kind: 'external',
    href: 'https://noel-schneider.framer.website/',
  },
]
```

> Données de départ avec placeholders d'URL réalistes ; Noël remplacera les `href` réels et ajoutera ses projets. Format figé : `title`, `category`, `year`, `kind` (`page` | `external`), `href`.

- [ ] **Step 2: Vérifier la syntaxe**

Run: `node --check /Users/noel/Documents/noel-perso/src/data/projects.js`
Expected: aucune sortie (syntaxe valide).

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.js
git commit -m "feat: add projects data source"
```

---

## Task 3: Rendu de la grille

**Files:**
- Create: `src/js/render-grid.js`

- [ ] **Step 1: Créer `src/js/render-grid.js`**

```js
import { projects } from '../data/projects.js'

function cardHTML(p) {
  const isExternal = p.kind === 'external'
  const targetAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
  const arrow = isExternal ? '↗' : '→'
  return `
    <a href="${p.href}"${targetAttrs}
       class="group flex min-h-[120px] flex-col justify-between rounded-lg border border-neutral-200 p-5 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600">
      <span class="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500">${p.category}</span>
      <span class="mt-6 flex items-end justify-between">
        <span class="text-lg font-medium">${p.title}</span>
        <span class="text-sm text-neutral-400 transition-transform group-hover:translate-x-0.5 dark:text-neutral-500">${arrow}</span>
      </span>
    </a>`
}

function renderGrid() {
  const grid = document.querySelector('[data-projects-grid]')
  if (!grid) return
  grid.innerHTML = projects.map(cardHTML).join('')
}

renderGrid()
```

- [ ] **Step 2: Vérifier la syntaxe**

Run: `node --check /Users/noel/Documents/noel-perso/src/js/render-grid.js`
Expected: aucune sortie.

> La vérif visuelle réelle se fait en Task 4 une fois le conteneur présent dans `index.html`.

- [ ] **Step 3: Commit**

```bash
git add src/js/render-grid.js
git commit -m "feat: render project grid from data"
```

---

## Task 4: Accueil complet (header, intro, grille, footer)

**Files:**
- Modify: `index.html` (remplacer le squelette de Task 1)

- [ ] **Step 1: Remplacer le contenu de `index.html`**

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Noël Schneider — Portfolio</title>
    <meta name="description" content="Projets de Noël Schneider : théâtre, musique, mobile, associatif, vidéo." />
    <link rel="stylesheet" href="./dist/styles.css" />
  </head>
  <body class="bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
    <div class="mx-auto max-w-3xl px-6">
      <header class="flex items-center justify-between py-8 text-sm">
        <span class="font-medium">Noël Schneider</span>
        <nav class="flex gap-6 text-neutral-500 dark:text-neutral-400">
          <a href="#projets" class="hover:text-neutral-900 dark:hover:text-neutral-100">projets</a>
          <a href="https://noel-schneider.framer.website/" target="_blank" rel="noopener noreferrer" class="hover:text-neutral-900 dark:hover:text-neutral-100">blog</a>
        </nav>
      </header>

      <section class="py-16">
        <h1 class="text-3xl font-medium tracking-tight">Portfolio</h1>
        <p class="mt-3 max-w-md text-neutral-500 dark:text-neutral-400">
          Théâtre, musique, code, associatif, vidéo. Une sélection de ce que je fabrique.
        </p>
      </section>

      <section id="projets" class="pb-24">
        <div data-projects-grid class="grid grid-cols-1 gap-4 sm:grid-cols-2"></div>
        <noscript>
          <p class="text-neutral-500">Active JavaScript pour voir la liste des projets.</p>
        </noscript>
      </section>

      <footer class="flex flex-col gap-4 border-t border-neutral-200 py-10 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
        <a href="mailto:noel.desvoyes@gmail.com" class="hover:text-neutral-900 dark:hover:text-neutral-100">noel.desvoyes@gmail.com</a>
        <nav class="flex gap-5">
          <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" class="hover:text-neutral-900 dark:hover:text-neutral-100">YouTube</a>
          <a href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer" class="hover:text-neutral-900 dark:hover:text-neutral-100">Spotify</a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" class="hover:text-neutral-900 dark:hover:text-neutral-100">Instagram</a>
        </nav>
      </footer>
    </div>

    <script type="module" src="./src/js/render-grid.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Rebuild CSS (nouvelles classes utilisées)**

Run: `cd /Users/noel/Documents/noel-perso && npm run build:css`
Expected: build sans erreur.

- [ ] **Step 3: Vérifier dans le navigateur via un serveur local**

> Les ES modules nécessitent un serveur (file:// bloque les imports). Lancer :

Run: `cd /Users/noel/Documents/noel-perso && python3 -m http.server 8000`
Puis ouvrir `http://localhost:8000/`.
Expected :
- Header avec nom + liens `projets`/`blog`.
- Grille 2 colonnes (desktop) affichant 5 cartes (Les Heures, Nocturne, MangerDemain, La chaîne, Le blog).
- Carte « Les Heures » → flèche `→` ; les autres → `↗` (lien externe, nouvel onglet).
- Footer avec email + réseaux.
- Bascule thème système : rendu clair et sombre cohérents.
- Réduire la fenêtre : grille passe à 1 colonne.

- [ ] **Step 4: Commit**

```bash
git add index.html dist/styles.css
git commit -m "feat: build homepage with header, intro, grid, footer"
```

---

## Task 5: Gabarit page projet

**Files:**
- Create: `projets/les-heures.html`

- [ ] **Step 1: Créer `projets/les-heures.html`**

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Les Heures — Noël Schneider</title>
    <link rel="stylesheet" href="../dist/styles.css" />
  </head>
  <body class="bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
    <div class="mx-auto max-w-3xl px-6">
      <header class="py-8 text-sm">
        <a href="../index.html" class="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">← retour</a>
      </header>

      <article class="py-12">
        <span class="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500">théâtre · 2025</span>
        <h1 class="mt-3 text-3xl font-medium tracking-tight">Les Heures</h1>
        <p class="mt-6 max-w-prose text-neutral-600 dark:text-neutral-300">
          Description du spectacle. Remplace ce texte par le pitch, le contexte,
          les dates, l'équipe, etc.
        </p>

        <div class="mt-10 aspect-video w-full rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"></div>

        <div class="mt-10 flex gap-5 text-sm">
          <a href="#" class="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">Voir la captation ↗</a>
        </div>
      </article>
    </div>
  </body>
</html>
```

- [ ] **Step 2: Rebuild CSS**

Run: `cd /Users/noel/Documents/noel-perso && npm run build:css`
Expected: build sans erreur.

- [ ] **Step 3: Vérifier dans le navigateur**

Ouvrir `http://localhost:8000/` puis cliquer sur la carte « Les Heures ».
Expected :
- La page `projets/les-heures.html` s'ouvre (même onglet).
- Lien « ← retour » ramène à l'accueil.
- Rendu clair/sombre cohérent, médias en placeholder.

- [ ] **Step 4: Commit**

```bash
git add projets/les-heures.html dist/styles.css
git commit -m "feat: add project page template"
```

---

## Task 6: README & déploiement

**Files:**
- Create: `README.md`
- Create: `netlify.toml`

- [ ] **Step 1: Créer `netlify.toml`**

```toml
[build]
  command = "npm run build:css"
  publish = "."
```

- [ ] **Step 2: Créer `README.md`**

```markdown
# noel-perso

Portfolio perso de Noël Schneider. HTML statique + Tailwind CSS.

## Développement

```bash
npm install
npm run watch:css   # recompile le CSS à chaque changement
python3 -m http.server 8000   # sert le site (les ES modules ont besoin d'un serveur)
```

Ouvrir http://localhost:8000/.

## Ajouter un projet

1. Ajouter une entrée dans `src/data/projects.js`.
2. Si `kind: 'page'`, créer la page dans `projets/<slug>.html` (copier `les-heures.html`).
3. Si `kind: 'external'`, mettre l'URL dans `href`.

## Build de production

```bash
npm run build:css
```

Déploiement : Netlify (config `netlify.toml`) ou GitHub Pages.
```

- [ ] **Step 3: Commit**

```bash
git add README.md netlify.toml
git commit -m "docs: add README and Netlify config"
```

---

## Self-Review

**Spec coverage :**
- Stack HTML + Tailwind CLI → Task 1. ✓
- Thème clair/sombre auto (`prefers-color-scheme` via classes `dark:`) → Tasks 1,4,5. ✓
- Accueil : header (nom + liens), intro, grille 2→1 colonnes, footer contact → Task 4. ✓
- Blog = lien externe Framer → header Task 4. ✓
- Données projets fichier unique `projects.js` (title/category/year/kind/href) → Task 2. ✓
- Grille générée depuis les données → Task 3. ✓
- Mix `external` / `page` → cards Task 3 + page Task 5. ✓
- Catégories théâtre/musique/blog/mobile/associatif/youtube → données Task 2 (extensible). ✓
- Hors périmètre (pas de about/contact dédié, pas de blog intégré, pas de toggle) → respecté. ✓
- Ajout d'un projet en éditant un fichier → README Task 6. ✓

**Placeholder scan :** URLs de départ explicitement marquées comme à remplacer (réaliste, pas un TODO de plan). Aucun « TBD » de logique.

**Type consistency :** champs projet `title/category/year/kind/href` identiques entre `projects.js` (Task 2) et `render-grid.js` (Task 3). `kind` ∈ {`page`,`external`} cohérent partout. Conteneur `[data-projects-grid]` identique entre `render-grid.js` et `index.html`.
