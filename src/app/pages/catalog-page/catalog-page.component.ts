import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import {
  CatalogFilters,
  DEFAULT_CATALOG_FILTERS
} from '../../core/models/catalog-filters.model';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { SeoService } from '../../core/services/seo.service';
import { CatalogFiltersComponent } from '../../shared/catalog-filters/catalog-filters.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CatalogFiltersComponent,
    LoadingSpinnerComponent,
    ProductCardComponent
  ],
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.css'
})
export class CatalogPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly seoService = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  readonly products = signal<Product[]>([]);
  readonly filters = signal<CatalogFilters>({ ...DEFAULT_CATALOG_FILTERS });
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  readonly categoryOptions = computed(() =>
    [...new Set(this.products().map((product) => product.category))].sort((left, right) =>
      left.localeCompare(right)
    )
  );

  readonly materialOptions = computed(() =>
    [
      ...new Set(
        this.products()
          .map((product) => product.material)
          .filter((material): material is string => Boolean(material))
      )
    ].sort((left, right) => left.localeCompare(right))
  );

  readonly activeFilterCount = computed(() => {
    const filters = this.filters();

    return [
      filters.search.trim().length > 0,
      filters.category !== 'all',
      filters.material !== 'all',
      filters.marketplace !== 'all'
    ].filter(Boolean).length;
  });

  readonly filteredProducts = computed(() => {
    const filters = this.filters();
    const searchTerm = filters.search.trim().toLowerCase();

    return this.products().filter((product) => {
      const matchesSearch =
        !searchTerm ||
        `${product.title} ${product.shortDescription} ${product.description}`
          .toLowerCase()
          .includes(searchTerm);
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      const matchesMaterial = filters.material === 'all' || product.material === filters.material;
      const matchesMarketplace =
        filters.marketplace === 'all' || Boolean(product.marketplaceLinks[filters.marketplace]);

      return matchesSearch && matchesCategory && matchesMaterial && matchesMarketplace;
    });
  });

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const filters = filtersFromQuery(params);

      this.filters.set(filters);
      this.seoService.updatePage({
        title: filters.search
          ? `Catalog Results for "${filters.search}" | Treasured Doll Creations`
          : 'Catalog | Treasured Doll Creations Antique & Vintage Collectibles',
        description: filters.search
          ? `Browse catalog results for "${filters.search}" across antique and vintage collectibles, heirloom accents, nostalgic decor, and display-ready finds.`
          : 'Browse the Treasured Doll Creations catalog of antique and vintage collectibles, heirloom accents, nostalgic decor, and display-ready finds.',
        path: buildCatalogPath(filters)
      });
    });

    this.loadProducts();
  }

  updateFilters(filters: CatalogFilters): void {
    const normalizedFilters = normalizeFilters(filters);

    this.filters.set(normalizedFilters);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParamsFromFilters(normalizedFilters),
      replaceUrl: true
    });
  }

  clearFilters(): void {
    this.updateFilters({ ...DEFAULT_CATALOG_FILTERS });
  }

  reload(): void {
    this.loadProducts();
  }

  trackByProductId(_: number, product: Product): string {
    return product.id;
  }

  private loadProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.productService
      .getProducts()
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (products) => this.products.set(products),
        error: (error: Error) => this.errorMessage.set(error.message)
      });
  }
}

function filtersFromQuery(params: Pick<URLSearchParams, 'get'>): CatalogFilters {
  const search = params.get('search')?.trim() ?? '';
  const category = params.get('category')?.trim() ?? 'all';
  const material = params.get('material')?.trim() ?? 'all';
  const marketplace = params.get('marketplace')?.trim() ?? 'all';

  return {
    search,
    category: category || 'all',
    material: material || 'all',
    marketplace: isMarketplaceValue(marketplace) ? marketplace : 'all'
  };
}

function normalizeFilters(filters: CatalogFilters): CatalogFilters {
  return {
    search: filters.search.trim(),
    category: filters.category || 'all',
    material: filters.material || 'all',
    marketplace: filters.marketplace
  };
}

function queryParamsFromFilters(filters: CatalogFilters): Record<string, string | null> {
  return {
    search: filters.search || null,
    category: filters.category !== 'all' ? filters.category : null,
    material: filters.material !== 'all' ? filters.material : null,
    marketplace: filters.marketplace !== 'all' ? filters.marketplace : null
  };
}

function isMarketplaceValue(value: string): value is CatalogFilters['marketplace'] {
  return value === 'all' || value === 'ebay' || value === 'poshmark' || value === 'depop';
}

function buildCatalogPath(filters: CatalogFilters): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set('search', filters.search);
  }

  if (filters.category !== 'all') {
    params.set('category', filters.category);
  }

  if (filters.material !== 'all') {
    params.set('material', filters.material);
  }

  if (filters.marketplace !== 'all') {
    params.set('marketplace', filters.marketplace);
  }

  const query = params.toString();

  return query ? `/catalog?${query}` : '/catalog';
}
