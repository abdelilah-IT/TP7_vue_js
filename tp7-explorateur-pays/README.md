# TP 7 – Explorateur d'API REST (Vue.js)

ENSA Safi – Génie Informatique

## Démarrage
```
npm install
npm run dev
```

## Contenu
- `/` : liste de tous les pays (REST Countries v3.1), recherche par nom insensible à la casse
- `/pays/:code` : fiche détail chargée séparément
- États gérés : chargement, erreur (avec bouton « Réessayer »), succès
- Vérification `reponse.ok` avant `reponse.json()`
- Détail : gère réponse objet unique ou tableau
- Bonus : `watch` sur `$route.params.code` + liens vers les pays voisins
