import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../core/models/product.model';
import { MarketplaceEntry, getMarketplaceEntries } from '../../core/utils/marketplace.utils';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  get marketplaces(): MarketplaceEntry[] {
    return getMarketplaceEntries(this.product.marketplaceLinks);
  }

  get primaryMarketplace(): MarketplaceEntry | undefined {
    return this.marketplaces[0];
  }
}
