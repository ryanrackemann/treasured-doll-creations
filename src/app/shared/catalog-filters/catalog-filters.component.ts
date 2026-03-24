import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  CatalogFilters,
  DEFAULT_CATALOG_FILTERS
} from '../../core/models/catalog-filters.model';
import { MarketplaceName } from '../../core/models/product.model';
import { MARKETPLACE_LABELS } from '../../core/utils/marketplace.utils';

interface MarketplaceOption {
  label: string;
  value: MarketplaceName | 'all';
}

@Component({
  selector: 'app-catalog-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog-filters.component.html',
  styleUrl: './catalog-filters.component.css'
})
export class CatalogFiltersComponent implements OnChanges {
  @Input({ required: true }) filters: CatalogFilters = { ...DEFAULT_CATALOG_FILTERS };
  @Input() categories: string[] = [];
  @Input() materials: string[] = [];
  @Output() readonly filterChange = new EventEmitter<CatalogFilters>();

  draftFilters: CatalogFilters = { ...DEFAULT_CATALOG_FILTERS };

  readonly marketplaceOptions: MarketplaceOption[] = [
    { label: 'All marketplaces', value: 'all' },
    { label: MARKETPLACE_LABELS.ebay, value: 'ebay' },
    { label: MARKETPLACE_LABELS.poshmark, value: 'poshmark' },
    { label: MARKETPLACE_LABELS.depop, value: 'depop' }
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      this.draftFilters = { ...DEFAULT_CATALOG_FILTERS, ...this.filters };
    }
  }

  get hasActiveFilters(): boolean {
    return JSON.stringify(this.draftFilters) !== JSON.stringify(DEFAULT_CATALOG_FILTERS);
  }

  updateFilters(partial: Partial<CatalogFilters>): void {
    this.draftFilters = { ...this.draftFilters, ...partial };
    this.filterChange.emit(this.draftFilters);
  }

  reset(): void {
    this.draftFilters = { ...DEFAULT_CATALOG_FILTERS };
    this.filterChange.emit(this.draftFilters);
  }
}
