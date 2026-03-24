import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';

import { Product } from '../models/product.model';
import { PRODUCTS_API_URL } from '../tokens/products-api.token';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly products$ = this.http.get<Product[]>(this.productsApiUrl).pipe(
    map((products) => products.map((product) => normalizeProduct(product))),
    map((products) => [...products].sort(sortFeaturedProducts)),
    shareReplay({ bufferSize: 1, refCount: true }),
    catchError(() =>
      throwError(
        () =>
          new Error(
            'The collection could not be loaded right now. Please refresh or try again in a moment.'
          )
      )
    )
  );

  constructor(
    private readonly http: HttpClient,
    @Inject(PRODUCTS_API_URL) private readonly productsApiUrl: string
  ) {}

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.products$.pipe(map((products) => products.find((product) => product.id === id)));
  }
}

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    tags: product.tags ?? [],
    images: product.images.length ? product.images : ['assets/images/fallback-card.svg'],
    marketplaceLinks: product.marketplaceLinks ?? {}
  };
}

function sortFeaturedProducts(left: Product, right: Product): number {
  if (left.featured === right.featured) {
    return left.title.localeCompare(right.title);
  }

  return left.featured ? -1 : 1;
}
