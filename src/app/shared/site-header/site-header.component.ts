import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

interface NavLink {
  label: string;
  path: string;
  fragment?: string;
}

const NAV_LINKS: NavLink[] = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Catalog',
    path: '/catalog'
  },
  {
    label: 'About',
    path: '/about'
  }
];

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css'
})
export class SiteHeaderComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly menuOpen = signal(false);
  readonly navLinks = NAV_LINKS;

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.closeMenu());
  }

  toggleMenu(): void {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
