# Project Blueprint - Spring Cherry Blossom Recommendation Page

## Overview
A framework-less web application designed to showcase recommended products with a bright and airy "Spring Cherry Blossom" aesthetic. It features an interactive, infinitely scrolling affiliate notice at the top.

## Features & Design
- **Spring Cherry Blossom Theme:**
  - Color Palette: Soft Pink (#FFB7C5), Deep Pink (#FF6B81), White (#FFFFFF), and Mint Green (#A8E6CF).
  - Aesthetic: Clean, bright, and floral-inspired layout.
  - Interactive Elements: Floating cherry blossom petals (optional but planned).
- **Infinite Scrolling Notice:**
  - A conveyor-belt style animation for the "paid advertisement" text at the top of the page.
  - Smooth right-to-left loop.
- **Responsive Layout:**
  - Optimized for mobile viewing (max-width container).
  - Modern, rounded buttons for product links.

## Implementation Plan
1. **Infrastructure:**
   - Link external `style.css` and `main.js` in `index.html`.
   - Remove internal styles from `index.html`.
2. **Styling (style.css):**
   - Implement the "Spring Cherry Blossom" color scheme and typography.
   - Create the `@keyframes` animation for the scrolling notice.
   - Add hover effects and shadows to link buttons.
3. **Structure (index.html):**
   - Update the `.affiliate-notice` to support the scrolling animation.
   - Structure the content into semantic sections.
4. **Interactivity (main.js):**
   - Add a "Cherry Blossom Rain" effect using Web Components or simple DOM manipulation.
5. **Validation:**
   - Check for visual consistency and ensure the scrolling effect is seamless.
