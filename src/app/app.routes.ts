import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Treasured Doll Creations | Antique & Vintage Collectibles',
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then(
        (module) => module.LandingPageComponent
      )
  },
  {
    path: 'about',
    title: 'Treasured Doll Creations | About',
    loadComponent: () =>
      import('./pages/about-page/about-page.component').then(
        (module) => module.AboutPageComponent
      )
  },
  {
    path: 'catalog',
    title: 'Treasured Doll Creations | Catalog',
    loadComponent: () =>
      import('./pages/catalog-page/catalog-page.component').then(
        (module) => module.CatalogPageComponent
      )
  },
  {
    path: 'product/:id',
    title: 'Treasured Doll Creations | Product Details',
    loadComponent: () =>
      import('./pages/product-detail-page/product-detail-page.component').then(
        (module) => module.ProductDetailPageComponent
      )
  },
  {
    path: '**',
    redirectTo: ''
  }
];
