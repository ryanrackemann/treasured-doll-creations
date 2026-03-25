import { MarketplaceLinks, MarketplaceName } from '../models/product.model';

export interface MarketplaceEntry {
  key: MarketplaceName;
  label: string;
  monogram: string;
  url: string;
}

export const MARKETPLACE_LABELS: Record<MarketplaceName, string> = {
  ebay: 'eBay',
  poshmark: 'Poshmark',
  depop: 'Depop'
};

export const MARKETPLACE_MONOGRAMS: Record<MarketplaceName, string> = {
  ebay: 'e',
  poshmark: 'P',
  depop: 'D'
};

export function getMarketplaceEntries(links: MarketplaceLinks): MarketplaceEntry[] {
  return (Object.entries(links) as [MarketplaceName, string | undefined][])
    .filter((entry): entry is [MarketplaceName, string] => Boolean(entry[1]))
    .map(([key, url]) => ({
      key,
      label: MARKETPLACE_LABELS[key],
      monogram: MARKETPLACE_MONOGRAMS[key],
      url
    }));
}
