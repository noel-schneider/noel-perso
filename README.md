# noel-perso

Portfolio perso de Noël Schneider. HTML statique + Tailwind CSS.

## Développement

```bash
npm install
npm run watch:css              # recompile le CSS à chaque changement
python3 -m http.server 8000    # sert le site (les ES modules ont besoin d'un serveur)
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

## Déploiement (Vercel)

Le repo est prêt pour Vercel (config dans `vercel.json`) :

- Build command : `npm run build:css`
- Output directory : `.` (racine)

Étapes :

1. Sur [vercel.com](https://vercel.com), « Add New… → Project » et importer le repo GitHub.
2. Vercel détecte `vercel.json` — laisser les réglages par défaut, « Deploy ».
3. Domaine perso : Project → Settings → Domains → ajouter `perso.noel-schneider.eu`,
   puis créer chez le registrar le `CNAME perso → cname.vercel-dns.com.` indiqué par Vercel.

> `netlify.toml` reste dispo comme alternative Netlify.
