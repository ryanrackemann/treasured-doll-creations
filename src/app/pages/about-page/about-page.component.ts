import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface AboutCard {
  title: string;
  description: string;
}

const ABOUT_CARDS: AboutCard[] = [
  {
    title: 'Collector-focused presentation',
    description:
      'Imagery, descriptive copy, and supporting details are organized to help collectors evaluate each piece quickly.'
  },
  {
    title: 'Marketplace-driven conversion',
    description:
      'The website is a discovery layer, so every item still links outward to the marketplace where the live listing exists.'
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
export class AboutPageComponent {
  readonly aboutCards = ABOUT_CARDS;
}
