import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';

import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { SeoService } from '../../core/services/seo.service';
import { getMarketplaceEntries } from '../../core/utils/marketplace.utils';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { ProductGalleryComponent } from '../../shared/product-gallery/product-gallery.component';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent, ProductGalleryComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css'
})
export class ProductDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly seoService = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  readonly product = signal<Product | null>(null);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  readonly marketplaceEntries = computed(() => {
    const product = this.product();
    return product ? getMarketplaceEntries(product.marketplaceLinks) : [];
  });

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id') ?? ''),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading.set(true);
          this.errorMessage.set(null);
          this.product.set(null);
        }),
        switchMap((id) =>
          this.productService.getProductById(id).pipe(
            catchError((error: Error) => {
              this.errorMessage.set(error.message);
              return of(undefined);
            })
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((product) => {
        this.isLoading.set(false);

        if (product) {
          this.product.set(product);
          this.seoService.updatePage({
            title: `${product.title} | Treasured Doll Creations`,
            description: product.shortDescription,
            path: `/product/${product.id}`,
            type: 'product'
          });
          return;
        }

        if (!this.errorMessage()) {
          this.errorMessage.set('This collectible could not be found in the current catalog.');
        }

        this.seoService.updatePage({
          title: 'Item Not Found | Treasured Doll Creations',
          description:
            'The requested antique or vintage item could not be found in the Treasured Doll Creations catalog.',
          path: `/${this.route.snapshot.url.map((segment) => segment.path).join('/')}`,
          robots: 'noindex,follow'
        });
      });
  }
}
