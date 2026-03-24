import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);

  searchTerm = '';

  ngOnInit(): void {
    this.seoService.updatePage({
      title: 'Treasured Doll Creations | Antique & Vintage Collectibles',
      description:
        'Antique and vintage items from a curated collection. Review the Treasured Doll Creations catalog to find the best product for you.',
      path: '/'
    });
  }

  submitSearch(): void {
    const trimmedSearch = this.searchTerm.trim();

    void this.router.navigate(['/catalog'], {
      queryParams: {
        search: trimmedSearch || null
      }
    });
  }
}
