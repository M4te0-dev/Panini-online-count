# Mon Album Panini — FIFA World Cup 2026

Application React (Vite) avec comptes utilisateurs (Supabase Auth) et
sauvegarde cloud de la collection (table `collections`, une ligne par
utilisateur, protégée par Row Level Security).

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvre l'URL affichée (en général http://localhost:5173).

## Déployer sur Vercel

1. Pousse ce dossier sur un dépôt GitHub (public ou privé).
2. Va sur https://vercel.com → "Add New Project" → importe le dépôt.
3. Vercel détecte automatiquement Vite : laisse les réglages par défaut
   (Build Command: `npm run build`, Output Directory: `dist`).
4. Clique sur "Deploy". Après 1-2 minutes tu obtiens un lien public
   (ex: `https://ton-projet.vercel.app`) accessible depuis n'importe
   quel appareil.

## Configuration Supabase déjà incluse

Les clés dans `src/supabaseClient.js` (URL + clé publique "anon") ne
sont pas secrètes : elles sont faites pour être exposées côté
navigateur. La sécurité réelle est assurée par les policies Row Level
Security de la table `collections`, qui garantissent que chaque
utilisateur ne peut lire/écrire que sa propre collection.

## Structure

- `src/App.jsx` — gère la session (connecté / déconnecté), charge et
  sauvegarde la collection dans Supabase (avec un léger debounce pour
  limiter les écritures).
- `src/AuthScreen.jsx` — écran de connexion / inscription (email + mot
  de passe).
- `src/AppShell.jsx` — toute l'interface de l'album (accueil, album,
  doubles, ajouter), inchangée dans son fonctionnement, mais reçoit
  maintenant la collection et le "setter" en props au lieu de gérer
  localStorage elle-même.
- `src/supabaseClient.js` — connexion au projet Supabase.
