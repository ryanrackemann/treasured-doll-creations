import { MarketplaceLinks, MarketplaceName } from '../models/product.model';

export interface MarketplaceEntry {
  key: MarketplaceName;
  label: string;
  url: string;
}

export const MARKETPLACE_LABELS: Record<MarketplaceName, string> = {
  ebay: 'eBay',
  poshmark: 'Poshmark',
  depop: 'Depop'
};

export function getMarketplaceEntries(links: MarketplaceLinks): MarketplaceEntry[] {
  return (Object.entries(links) as [MarketplaceName, string | undefined][])
    .filter((entry): entry is [MarketplaceName, string] => Boolean(entry[1]))
    .map(([key, url]) => ({
      key,
      label: MARKETPLACE_LABELS[key],
      url
    }));
}
