# Treasured Doll Creations Antique & Vintage Collectibles Catalog

## Overview

The **Treasured Doll Creations Catalog Website** is a digital showcase designed to support and promote antique and vintage collectible items sold by Treasured Doll Creations (TeeDeeCee’s).

This platform serves as a centralized catalog where customers can browse curated inventory and seamlessly navigate to external marketplaces to complete purchases.

The primary goal is to **increase product visibility, streamline discovery, and drive traffic to sales channels** such as eBay, Poshmark, and Depop.

---

## Business Objectives

* Provide a visually engaging catalog of antique and vintage collectible items
* Improve product discoverability through filtering and structured data
* Drive conversions by linking directly to active marketplace listings
* Establish a consistent and professional online presence for the brand
* Enable easy updates to inventory through a centralized data source

---

## Key Features

### Landing Page

* Homepage introduces the company before visitors enter the catalog
* Includes a search bar that routes users into a filtered catalog view
* Provides clear entry points to the About view and Catalog view

### Product Catalog

* Organized listing of all available items
* Clean, image-forward browsing experience
* Mobile-optimized layout for on-the-go users

### Advanced Filtering

* Users can filter products based on key characteristics (e.g., material, category)
* Improves user experience and reduces time to find desired items

### Product Detail Pages

Each product includes:

* Title and detailed description
* Material information (when applicable)
* Image gallery with lightbox carousel for close inspection
* Pricing information
* Direct links to purchase on external marketplaces:

  * eBay
  * Poshmark
  * Depop

### Marketplace Integration

* Products are not sold directly on the site
* The site functions as a **discovery and redirection platform**
* Ensures flexibility and leverages existing trusted sales platforms

---

## User Experience

* **Mobile-first design** ensures accessibility across all devices
* Simple, intuitive navigation for all age groups
* Fast-loading, responsive interface
* Visual emphasis on product imagery to highlight collectible value

## HTML Template Guidelines

To reduce unnecessary whitespace nodes in rendered templates, pure text content in HTML should stay on the same line as its wrapping tag.

Bad:

```html
<p>
  Here is a bad sample
</p>
```

Good:

```html
<p>Here is a good sample</p>
```

## SEO Guidelines

The site should follow these SEO best practices as part of normal development:

* Use a unique page title and meta description for every public-facing view
* Keep heading structure semantic and hierarchical with one clear `h1` per page
* Prefer descriptive, human-readable routes such as `/about`, `/catalog`, and `/product/:id`
* Write alt text that describes the collectible or image content meaningfully
* Maintain internal links between the landing page, about page, catalog, and product detail views
* Keep performance strong because load speed affects discovery and user retention
* Add canonical URLs for public pages to reduce duplicate-content ambiguity
* Use Open Graph and Twitter metadata so shared links remain descriptive and branded
* Prefer crawlable public content over content that exists only after complex interactions
* Plan deployment with prerendering or SSR for the public catalog experience when production hosting is set up
* Generate a production `robots.txt` and sitemap once the live domain and final route structure are known
* Add structured data only when the underlying product and business details are accurate and stable

---

## Technology Overview

### Frontend

* Built as a **Single Page Application (SPA)** using Angular
* Enables fast navigation and a seamless browsing experience

### Data Integration

* Product data is retrieved via API
* Allows for dynamic updates without requiring site redeployment
* Supports scalability as inventory grows

---

## Value to the Business

* Centralizes product presentation across multiple marketplaces
* Reduces reliance on individual platform discovery algorithms
* Strengthens brand identity and customer trust
* Provides a foundation for future enhancements (e.g., direct checkout, user accounts, analytics)

---

## Future Opportunities

* Direct e-commerce integration
* Inventory management dashboard
* Customer accounts and wishlists
* Email marketing and product alerts
* Analytics and performance tracking

---

## Generated Project

This repository now includes a working Angular SPA starter aligned to the product requirements in `AGENTS.md`.

### Included in the scaffold

* Standalone Angular components and lazy-loaded routes
* Landing page with company summary and search-led navigation into catalog results
* Dedicated About page with business and browsing context
* Route-aware SEO metadata service for page titles, descriptions, canonical URLs, and social sharing tags
* Mobile-first top navigation with a full-screen hamburger menu on small screens
* Product catalog grid with filtering by search, category, material, and marketplace
* Product detail pages with image gallery and lightbox controls
* Service-layer data access with mock API-backed JSON data
* Pico CSS styling customized to the Treasured Doll Creations palette

### Project Structure

```text
src/
  app/
    core/
      models/
      services/
      tokens/
      utils/
    pages/
      about-page/
      catalog-page/
      landing-page/
      product-detail-page/
    shared/
      catalog-filters/
      loading-spinner/
      product-card/
      product-gallery/
      site-header/
  assets/
    data/
    images/
```

### Getting Started

```bash
npm install
npm start
```

### Build

```bash
npm run build
```

### Preview The Built App

Do not open `dist/.../index.html` directly with `file://`. Angular bundles must be served over HTTP.

```bash
npm run build
npm run preview
```

Then open `http://127.0.0.1:4173`.

### Mock Data Notes

The seeded catalog currently loads from `src/assets/data/products.json`. Replace that data source or the `PRODUCTS_API_URL` provider in `src/app/app.config.ts` when a live API becomes available.

### SEO Implementation Notes

The app now includes a lightweight SEO service in `src/app/core/services/seo.service.ts` that updates page titles, meta descriptions, canonical URLs, Open Graph tags, Twitter summary tags, and robots directives when needed.

For stronger SEO in production, plan to prerender or SSR the public-facing pages during deployment.
