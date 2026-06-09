import { Component } from '@angular/core';
import { BilanComponent } from './components/bilan/bilan.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BilanComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly aujourdhui = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
