export type ActivityType = 'SPORT' | 'HYDRATATION';

export interface Activity {
  id: string;
  nom: string;
  type: ActivityType;
  valeur: number;
  heure: string;
}
