import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface SeoConfig {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article' | 'product';
  robots?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  updatePage(config: SeoConfig): void {
    const canonicalUrl = this.buildCanonicalUrl(config.path);
    const type = config.type ?? 'website';
    const robots = config.robots ?? 'index,follow';

    this.title.setTitle(config.title);
    this.updateTag('name', 'description', config.description);
    this.updateTag('name', 'robots', robots);
    this.updateTag('property', 'og:title', config.title);
    this.updateTag('property', 'og:description', config.description);
    this.updateTag('property', 'og:type', type);
    this.updateTag('property', 'og:url', canonicalUrl);
    this.updateTag('property', 'og:site_name', 'Treasured Doll Creations');
    this.updateTag('name', 'twitter:card', 'summary');
    this.updateTag('name', 'twitter:title', config.title);
    this.updateTag('name', 'twitter:description', config.description);

    this.setCanonical(canonicalUrl);
  }

  private buildCanonicalUrl(path = ''): string {
    const location = this.document.location;
    const origin = location?.origin ?? '';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    return `${origin}${cleanPath === '/' ? '' : cleanPath}`;
  }

  private updateTag(attributeName: 'name' | 'property', attributeValue: string, content: string): void {
    this.meta.updateTag({
      [attributeName]: attributeValue,
      content
    });
  }

  private setCanonical(url: string): void {
    let canonicalLink = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', url);
  }
}
