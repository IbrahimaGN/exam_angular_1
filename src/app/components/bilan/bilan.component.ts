import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivityService } from '../../services/activity.service';
import { ActivityType } from '../../models/activity.model';

@Component({
  selector: 'app-bilan',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bilan.component.html',
  styleUrl: './bilan.component.css'
})
export class BilanComponent {

  // ── Injection du service ───────────────────────────────
  readonly service = inject(ActivityService);

  // ── État local du formulaire ───────────────────────────
  nomActivite    = '';
  typeActivite: ActivityType = 'SPORT';
  valeurActivite: number | null = null;

  // ── Soumission du formulaire ───────────────────────────
  soumettre(): void {
    if (!this.nomActivite.trim() || !this.valeurActivite || this.valeurActivite < 1) {
      return;
    }

    this.service.ajouterActivite(
      this.nomActivite,
      this.typeActivite,
      this.valeurActivite
    );

    // Réinitialisation du formulaire
    this.nomActivite    = '';
    this.valeurActivite = null;
    this.typeActivite   = 'SPORT';
  }

  // ── Suppression d'une activité ─────────────────────────
  supprimerActivite(id: string): void {
    this.service.supprimerActivite(id);
  }
}
