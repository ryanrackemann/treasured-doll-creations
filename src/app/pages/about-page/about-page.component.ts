import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/services/seo.service';

interface AboutCard {
  title: string;
  description: string;
}

const ABOUT_CARDS: AboutCard[] = [
  {
    title: 'Vintage-first presentation',
    description:
      'Imagery, descriptive copy, and supporting details are organized to help visitors evaluate antique and vintage pieces quickly.'
  },
  {
    title: 'Catalog-led conversion',
    description:
      'The website is built for browsing and discovery, while each item still links outward to the marketplace where the live listing exists.'
  },
  {
    title: 'Simple, scalable architecture',
    description:
      'The Angular app is structured so future API integration and catalog updates can be introduced without rebuilding the browsing flow.'
  }
];

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly aboutCards = ABOUT_CARDS;

  ngOnInit(): void {
    this.seoService.updatePage({
      title: 'About Treasured Doll Creations | Antique & Vintage Collectibles',
      description:
        'Learn about Treasured Doll Creations and its focus on curated antique and vintage collectibles, heirloom accents, and a catalog-first browsing experience.',
      path: '/about'
    });
  }
}
