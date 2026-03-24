import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnChanges, SimpleChanges, signal } from '@angular/core';

import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.css'
})
export class ProductGalleryComponent implements OnChanges {
  @Input({ required: true }) product!: Product;

  readonly activeIndex = signal(0);
  readonly lightboxOpen = signal(false);

  get activeImage(): string {
    return this.product.images[this.activeIndex()] ?? this.product.images[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.activeIndex.set(0);
      this.lightboxOpen.set(false);
    }
  }

  select(index: number): void {
    this.activeIndex.set(index);
  }

  move(step: number): void {
    const imageCount = this.product.images.length;

    if (imageCount < 2) {
      return;
    }

    this.activeIndex.update((index) => (index + step + imageCount) % imageCount);
  }

  openLightbox(index = this.activeIndex()): void {
    this.activeIndex.set(index);
    this.lightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen()) {
      return;
    }

    if (event.key === 'Escape') {
      this.closeLightbox();
    }

    if (event.key === 'ArrowLeft') {
      this.move(-1);
    }

    if (event.key === 'ArrowRight') {
      this.move(1);
    }
  }
}
