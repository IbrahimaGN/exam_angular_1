# Fit Track Pro — Module "Bilan Journalier"

Devoir Pratique · Angular 21 · Licence 3 Informatique

Nom : Ibrahima GNINGUE
---

## Lancement rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm start
```

Ouvrir **http://localhost:4200** dans le navigateur.

---

## Structure du projet

```
src/
├── main.ts                                   # Bootstrap standalone
├── index.html
├── styles.css                                # Styles globaux
└── app/
    ├── app.component.ts                      # Composant racine (TS)
    ├── app.component.html                    # Template racine (HTML)
    ├── app.component.css                     # Styles racine (CSS)
    │
    ├── models/
    │   └── activity.model.ts                 # Interface + type
    │
    ├── services/
    │   └── activity.service.ts               # Signals + computed + localStorage
    │
    └── components/
        └── bilan/
            ├── bilan.component.ts            # Logique (TS)
            ├── bilan.component.html          # Template (HTML)
            └── bilan.component.css          # Styles (CSS)
```

---

## Contraintes techniques respectées

| Contrainte | Implémentation |
|---|---|
| **Standalone** | `standalone: true` sur tous les composants, aucun `NgModule` |
| **Signals** | `signal<Activity[]>()` pour l'état principal |
| **computed()** | `totalCalories`, `totalEau`, `bilanCaloriesRestant`, `pourcentageCalories`, `pourcentageEau`, `alerteDeshydratation`, `objectifSanteAtteint` |
| **@for + track** | `@for (activite of service.activities(); track activite.id)` |
| **@if / @else** | Alertes santé, label valeur, bilan calorique |
| **Persistance** | `localStorage` — sauvegarde à chaque ajout/suppression, chargement au démarrage |
| **HTML/CSS séparés** | `templateUrl` et `styleUrl` sur chaque composant |
