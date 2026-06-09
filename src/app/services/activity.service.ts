import { Injectable, signal, computed } from '@angular/core';
import { Activity, ActivityType } from '../models/activity.model';

const STORAGE_KEY        = 'fittrack_activities';
const OBJECTIF_CALORIES  = 2000;
const SEUIL_EAU          = 1500;
const SEUIL_CAL_SANTE    = 500;

@Injectable({ providedIn: 'root' })
export class ActivityService {

  // ── État principal ─────────────────────────────────────
  readonly activities = signal<Activity[]>(this.chargerDepuisStorage());

  // ── Valeurs dérivées (computed) ────────────────────────
  readonly totalCalories = computed(() =>
    this.activities()
      .filter(a => a.type === 'SPORT')
      .reduce((acc, a) => acc + a.valeur, 0)
  );

  readonly totalEau = computed(() =>
    this.activities()
      .filter(a => a.type === 'HYDRATATION')
      .reduce((acc, a) => acc + a.valeur, 0)
  );

  readonly bilanCaloriesRestant = computed(() =>
    OBJECTIF_CALORIES - this.totalCalories()
  );

  readonly pourcentageCalories = computed(() =>
    Math.min(100, Math.round((this.totalCalories() / OBJECTIF_CALORIES) * 100))
  );

  readonly pourcentageEau = computed(() =>
    Math.min(100, Math.round((this.totalEau() / SEUIL_EAU) * 100))
  );

  readonly alerteDeshydratation = computed(() =>
    this.totalEau() < SEUIL_EAU
  );

  readonly objectifSanteAtteint = computed(() =>
    this.totalEau() >= SEUIL_EAU && this.totalCalories() > SEUIL_CAL_SANTE
  );

  readonly objectifCalories = OBJECTIF_CALORIES;

  // ── Actions ────────────────────────────────────────────
  ajouterActivite(nom: string, type: ActivityType, valeur: number): void {
    const heure = new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit', minute: '2-digit'
    });

    const nouvelle: Activity = {
      id: crypto.randomUUID(),
      nom: nom.trim(),
      type,
      valeur,
      heure
    };

    const miseAJour = [...this.activities(), nouvelle];
    this.activities.set(miseAJour);
    this.sauvegarderDansStorage(miseAJour);
  }

  supprimerActivite(id: string): void {
    const miseAJour = this.activities().filter(a => a.id !== id);
    this.activities.set(miseAJour);
    this.sauvegarderDansStorage(miseAJour);
  }

  // ── Persistance localStorage ───────────────────────────
  private chargerDepuisStorage(): Activity[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private sauvegarderDansStorage(activities: Activity[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    } catch {
      console.error('Erreur localStorage');
    }
  }
}
