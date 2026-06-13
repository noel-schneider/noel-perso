# Portfolio Noël — Design

Date: 2026-06-13
Statut: validé (brainstorming)

## Objectif

Site portfolio perso, très sobre et minimaliste, regroupant les projets de
Noël : théâtre, musique, blog, applications mobile, associatif, chaîne YouTube,
etc. Inspiration : le degré de sobriété de https://noel-schneider.framer.website/
(sans en copier le design).

Direction visuelle retenue : **Grille minimale** (sans-serif, cartes par
catégorie, monochrome, beaucoup de blanc/respiration).

## Stack & hébergement

- HTML statique + Tailwind CSS, buildé via le CLI Tailwind (pas de CDN) →
  un seul fichier `dist/styles.css`, site léger.
- Aucun framework JS, aucun Node au runtime. Node sert uniquement à builder le
  CSS en local.
- Hébergeable gratuitement (Netlify / GitHub Pages).
- Nom du dossier projet : `noel-perso/`.

## Thème

- Clair + sombre automatique, via la stratégie `media` de Tailwind
  (`prefers-color-scheme`). Pas de toggle manuel.
- Palette sobre :
  - Fond clair : presque-blanc ; texte : presque-noir.
  - Fond sombre : presque-noir ; texte : presque-blanc.
  - Un seul gris pour le texte secondaire. Aucune couleur d'accent criarde.
- Typo : pile sans-serif système (rapide, propre, neutre).

## Pages

### Accueil — `index.html` (page principale)

- Header léger : nom à gauche ; liens à droite (`blog` → lien Framer externe,
  ancre vers la grille).
- Intro courte : titre « Portfolio » + une ligne de sous-titre.
- Grille de cartes responsive : 2 colonnes desktop → 1 colonne mobile.
  Chaque carte = label catégorie (discret, uppercase) + titre du projet.
- Footer minimal : email + liens réseaux (Spotify, YouTube, Instagram, etc.).
  Le « contact » vit ici — pas de page dédiée (choix « rien d'autre »).

### Pages projet — `projets/<slug>.html`

- Uniquement pour les projets de type `page` (voir ci-dessous).
- Gabarit commun : titre, catégorie, année, description, médias (images /
  embeds), liens externes, retour à l'accueil.

## Données projets

- Source unique : `src/data/projects.js` (tableau d'objets).
- Champs par projet :
  - `title` — titre affiché
  - `category` — théâtre | musique | blog | mobile | associatif | youtube | …
  - `year` — année
  - `kind` — `external` ou `page`
  - `href` — URL externe (si `external`) ou chemin vers la page projet (si `page`)
- Comportement de la carte selon `kind` :
  - `external` → la carte est un lien direct (Spotify, YouTube, store, asso…).
  - `page` → la carte ouvre `projets/<slug>.html`.
- Ajouter un projet = une entrée dans `projects.js` (+ une page HTML si `page`).

Catégories prévues (extensible) : théâtre, musique, blog, mobile, associatif,
youtube.

## Structure fichiers

```
noel-perso/
├── index.html
├── projets/
│   └── les-heures.html        # gabarit page projet (exemple)
├── src/
│   ├── input.css              # directives Tailwind (@tailwind base/components/utilities)
│   └── data/projects.js       # liste des projets
├── dist/
│   └── styles.css             # CSS Tailwind buildé (généré)
├── tailwind.config.js
├── package.json               # scripts de build CSS
└── docs/superpowers/specs/    # ce design
```

## Rendu de la grille

- Deux options de mise en œuvre, à trancher en phase de plan :
  1. Cartes écrites en dur dans `index.html` (le plus simple, statique pur).
  2. Cartes générées au chargement par un petit script lisant `projects.js`.
- Recommandation : option 2 (un seul endroit pour éditer les projets), avec
  fallback gracieux si JS désactivé négligeable pour un portfolio perso.

## Hors périmètre (YAGNI)

- Pas de page « à propos » ni de page « contact » dédiées.
- Pas de blog intégré : lien vers le Framer existant.
- Pas de CMS, pas de back-end, pas de toggle de thème manuel.
- Pas de filtres/recherche au lancement (extension possible plus tard).

## Critères de succès

- Site statique buildable et ouvrable en local sans serveur.
- Accueil affiche la grille de projets depuis `projects.js`.
- Une carte `external` ouvre le lien ; une carte `page` ouvre sa page projet.
- Rendu clair et sombre corrects, responsive desktop/mobile.
- Ajout d'un projet réalisable en éditant un seul fichier (+ page si `page`).
