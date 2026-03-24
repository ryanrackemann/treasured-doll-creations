import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  private readonly router = inject(Router);

  searchTerm = '';

  submitSearch(): void {
    const trimmedSearch = this.searchTerm.trim();

    void this.router.navigate(['/catalog'], {
      queryParams: {
        search: trimmedSearch || null
      }
    });
  }
}
