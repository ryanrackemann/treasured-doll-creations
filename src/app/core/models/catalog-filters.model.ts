import { MarketplaceName } from './product.model';

export interface CatalogFilters {
  search: string;
  category: string;
  material: string;
  marketplace: MarketplaceName | 'all';
}

export const DEFAULT_CATALOG_FILTERS: CatalogFilters = {
  search: '',
  category: 'all',
  material: 'all',
  marketplace: 'all'
};
