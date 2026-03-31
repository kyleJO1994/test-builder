# Project Blueprint - Spring Cherry Blossom Recommendation Page

## Overview
A framework-less web application designed to showcase recommended products with a bright and airy "Spring Cherry Blossom" aesthetic. It features an interactive, infinitely scrolling affiliate notice at the top and a dynamic content management system for admins.

## Features & Design
- **Spring Cherry Blossom Theme:**
  - Color Palette: Soft Pink (#FFB7C5), Deep Pink (#FF6B81), White (#FFFFFF), and Mint Green (#A8E6CF).
  - Aesthetic: Clean, bright, and floral-inspired layout with interactive cherry blossom petals.
- **Infinite Scrolling Notice:**
  - A conveyor-belt style animation for the "paid advertisement" text.
- **Admin Dashboard (Vibe Coding Style):**
  - **Login:** A simple, elegant modal for admin access.
  - **Dynamic Blocks:** Add, edit, delete, and reorder (Move Up/Down) product links directly on the page.
  - **Persistence:** Uses `localStorage` to save changes locally.
- **Responsive Layout:**
  - Optimized for mobile viewing with modern, interactive buttons.

## Implementation Plan
1. **Infrastructure:**
   - Maintain external `style.css` and `main.js`.
2. **Styling (style.css):**
   - Design the Admin Login modal and control buttons (Add, Delete, Move).
   - Add animations for block reordering.
3. **Structure (index.html):**
   - Add a hidden login trigger (Footer icon).
   - Create a template for dynamic product items.
   - Add a "Login Modal" container.
4. **Interactivity (main.js):**
   - **Content Manager:** Logic to render items from `localStorage` or defaults.
   - **Admin Logic:** Password-protected access (simple hardcoded for prototype) and state management.
   - **CRUD Operations:** Functions to add, remove, and reorder items.
   - **Visuals:** Maintain the Cherry Blossom rain effect.
5. **Validation:**
   - Ensure "Vibe Coding" style interactions are smooth and intuitive.
