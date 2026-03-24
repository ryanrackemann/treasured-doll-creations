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
    title: 'Curated collection',
    description:
      'Our catalog includes antique and vintage items selected for style, quality, and interest.'
  },
  {
    title: 'Multiple marketplaces',
    description:
      'Our products are hosted across multiple marketplaces, so please review the link provided on each product page.'
  },
  {
    title: 'Simple browsing',
    description:
      'Use this website to explore more products, review item details, and find the best product for you.'
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
        'Learn about Treasured Doll Creations, a catalog of antique and vintage items from a curated collection with marketplace links on each product page.',
      path: '/about'
    });
  }
}
