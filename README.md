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

Déploiement : Netlify (config `netlify.toml`) ou GitHub Pages.
