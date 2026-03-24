# AGENTS.md

## Purpose

This document defines the roles, responsibilities, and guidelines for contributors (human or AI agents) working on the Treasured Doll Creations Catalog Website.

The goal is to ensure consistency in development, maintain code quality, and align all contributions with business objectives.

---

## Core Principles

* **Business-first mindset**: All features should support product visibility and marketplace conversions
* **Simplicity over complexity**: Favor clear, maintainable solutions
* **Consistency**: Follow established patterns across UI, data, and architecture
* **Performance matters**: Optimize for fast load times and smooth navigation
* **Discoverability matters**: Treat SEO as a product requirement for public-facing pages
* **Mobile-first**: Design and validate for mobile before desktop

---

## Project Context

* Catalog website (not an e-commerce checkout platform)
* Products redirect users to external marketplaces for purchase
* Data-driven UI powered by an API
* Angular Single Page Application (SPA)

---

## Agent Roles

### 1. Product Agent

**Focus:** Business logic, feature alignment, and user value

**Responsibilities:**

* Ensure features align with business goals
* Define product requirements and acceptance criteria
* Validate that product data supports filtering and discovery
* Maintain clarity in product structure (title, description, material, etc.)
* Ensure public pages support meaningful metadata and search discoverability

---

### 2. Frontend Agent

**Focus:** UI/UX implementation using Angular

**Responsibilities:**

* Build reusable, modular Angular components
* Maintain responsive, mobile-first layouts
* Implement product listing, filtering, and detail views
* Ensure accessibility and usability standards
* Optimize rendering and performance
* Support SEO through semantic markup, internal linking, and metadata hooks

**Guidelines:**

* Prefer standalone, reusable components
* Avoid unnecessary state complexity
* Keep templates clean and readable
* Favor crawlable content and descriptive internal links on public views

---

### 3. Data/API Agent

**Focus:** Data structure and API integration

**Responsibilities:**

* Define and maintain product data schema
* Ensure API responses are consistent and predictable
* Handle data transformation for UI consumption
* Optimize API usage (minimize redundant calls)

**Product Model (Baseline):**

```ts
interface Product {
  id: string;
  title: string;
  description: string;
  material?: string;
  images: string[];
  price: number;
  marketplaceLinks: {
    ebay?: string;
    poshmark?: string;
    depop?: string;
  };
}
```

---

### 4. UX/Design Agent

**Focus:** Visual design and user experience

**Responsibilities:**

* Ensure strong visual hierarchy (image-first design)
* Maintain consistent spacing, typography, and layout
* Optimize product image presentation (carousel/lightbox)
* Improve filtering usability and discoverability

**Guidelines:**

* Prioritize clarity over decoration
* Keep interactions intuitive and minimal
* Design for collectors (detail-oriented users)

---

### 5. QA Agent

**Focus:** Quality assurance and validation

**Responsibilities:**

* Test product listing and filtering behavior
* Validate product detail page accuracy
* Ensure marketplace links function correctly
* Check responsiveness across devices
* Identify edge cases (missing data, empty states)
* Verify SEO basics such as page titles, meta descriptions, canonical tags, and heading structure

---

## Development Guidelines

### Code Standards

* Use consistent naming conventions
* Write self-documenting code where possible
* Avoid deeply nested logic
* Keep components focused and single-purpose
* In HTML templates, pure text content should stay on the same line as its wrapping tag so unnecessary whitespace text nodes are not introduced

**HTML formatting example:**

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

### Git Workflow

* Use feature-based branches
* Keep pull requests small and focused
* Provide clear PR descriptions:

  * What was changed
  * Why it was changed
  * How to test it

### Commit Message Format

```
type: short description

Examples:
feat: add product filtering by material
fix: correct lightbox image navigation bug
refactor: simplify product card component
```

---

## UI/UX Standards

* Mobile-first breakpoints
* Image-focused product cards
* Clear call-to-action for marketplace links
* Consistent spacing and alignment
* Fast, responsive interactions
* Data-dependent requests should be preceeded by a loading spinner to handle delayed requests
* Landing, about, catalog, and product detail views should each maintain clear page purpose and semantic heading structure

---

## Performance Considerations

* Minimize API calls
* Lazy load images where appropriate
* Optimize bundle size
* Avoid unnecessary re-renders
* Early fail and percolate issues to the front end accordingly

---

## Accessibility

* Use semantic HTML
* Ensure sufficient color contrast
* Support keyboard navigation
* Provide alt text for images

---

## SEO & Discoverability

Public-facing pages should follow these SEO best practices:

* Use a unique title and meta description for each public page
* Maintain one clear `h1` per page and a logical heading order beneath it
* Use descriptive URLs and keep route naming human-readable
* Add canonical URLs for public pages
* Ensure important content is available without requiring complex interaction
* Use descriptive image alt text that reflects the collectible or visual content
* Link important views together internally: landing page, about page, catalog, and item detail pages
* Keep copy aligned with the business as an antique and vintage collectibles catalog
* Use Open Graph and related social metadata for shareability
* Favor fast-loading pages, optimized images, and small bundles
* Plan for prerendering or SSR when production deployment is configured
* Add `robots.txt`, sitemap generation, and structured data when the live domain and production content are ready

---

## Future Expansion Considerations

* Direct checkout capability
* Admin dashboard for inventory management
* User accounts and saved items
* Analytics tracking
* Advanced SEO enhancements and production search indexing workflows

---

## Style guide

* Use Pico css (https://picocss.com/docs)
* Colors should include but not be limited to: #bdae9c, #949e94, #847d63, #192021
* Leverage modern CSS features like CSS Grid and Flexbox
* Prioritize visibility across mobile and desktop only for media queries. Tablet can be treated as mobile.

---

## Architecture

* Angular components should be reusable and simple in structure
* API calls should be abstracted to a service layer

---

## Site structure

The site should include the following structural elements:

- Landing page with business summary and search entry into the catalog
- About page describing the business and catalog purpose
- Top navigation (hamburger menu full screen display on mobile)
- Grid catalog of items with filter functionality

---

## Definition of Done

A task is considered complete when:

* It meets business requirements
* It is responsive and tested on mobile
* Code follows project standards
* Public-facing pages include appropriate SEO basics
* No console errors or warnings
* PR is reviewed and approved

---

## Notes

* This project prioritizes **catalog clarity and conversion**, not complex commerce logic
* External marketplace links are critical and must always be accurate
* Product imagery is the most important UI element—treat it accordingly
