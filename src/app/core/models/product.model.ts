export interface MarketplaceLinks {
  ebay?: string;
  poshmark?: string;
  depop?: string;
}

export type MarketplaceName = keyof MarketplaceLinks;

export interface Product {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  material?: string;
  condition: string;
  era?: string;
  dimensions?: string;
  tags: string[];
  images: string[];
  price: number;
  featured?: boolean;
  marketplaceLinks: MarketplaceLinks;
}
