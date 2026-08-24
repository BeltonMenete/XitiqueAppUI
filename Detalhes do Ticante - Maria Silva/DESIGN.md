---
name: Xitique Digital System
colors:
  surface: '#f8faf6'
  surface-dim: '#d8dbd7'
  surface-bright: '#f8faf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f1'
  surface-container: '#eceeeb'
  surface-container-high: '#e7e9e5'
  surface-container-highest: '#e1e3e0'
  on-surface: '#191c1b'
  on-surface-variant: '#404944'
  inverse-surface: '#2e312f'
  inverse-on-surface: '#eff1ee'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#4f1f19'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b342d'
  on-tertiary-container: '#ea9e93'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4a9'
  on-tertiary-fixed: '#380d08'
  on-tertiary-fixed-variant: '#6e372f'
  background: '#f8faf6'
  on-background: '#191c1b'
  surface-variant: '#e1e3e0'
  accent-gold: '#F59E0B'
  accent-orange: '#EA580C'
  status-success: '#10B981'
  status-warning: '#FBBF24'
  status-error: '#EF4444'
  status-info: '#3B82F6'
  surface-off-white: '#F8FAFC'
  surface-light-gray: '#F1F5F9'
typography:
  display-hero:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-status:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  container-max: 1280px
---

## Brand & Style

The design system for the platform is built on the pillars of **Trust, Accountability, and Community**. It bridges the gap between traditional Mozambican financial practices ("Xitique") and modern fintech efficiency. The personality is professional and authoritative—to reassure users their life savings are secure—yet remains empathetic and motivational to encourage daily consistency.

The design style is **Corporate / Modern** with **Tactile** influences. It utilizes a clean, data-heavy layout common in high-tier finance apps, but incorporates rhythmic geometric patterns inspired by *Capulana* textiles to ground the technology in its local Mozambican context. Visual cues prioritize "Status over Style," ensuring that a user’s financial standing (debt, savings, or sync status) is unmistakable at a glance.

**Key Visual Principles:**
- **Transparency-First:** Every transaction has a visible digital trail.
- **Optimistic Gamification:** Progress is visualized through "mountain" charts and celebratory badges.
- **Offline-Aware:** Distinct visual treatments for synced vs. pending data.

## Colors

The palette is rooted in the Mozambican landscape and professional financial tropes.

- **Primary (Deep Green):** Represents growth, prosperity, and the "money" aspect of the platform. Used for primary actions and "Ativo" (Active) states.
- **Secondary (Navy Blue):** Represents stability and institutional trust. Used for navigation and structural elements.
- **Accents (Gold/Orange):** Used sparingly for highlights, "VIP" status, and energy-driven elements like commissions or rewards.
- **Semantic Colors:**
    - **Green (Success):** Paid days, successful syncs, positive cash closure.
    - **Red (Error/Debt):** Missing funds, overdue payments, and high-priority alerts.
    - **Yellow (Warning):** Pending syncs, retroactive marks (3-7 days), and minor cash discrepancies.
    - **Blue (Info):** Informational stamps and "X" marks for deposits.

## Typography

The typography strategy balances marketing impact with technical precision.

- **Montserrat (Headlines):** Used for large savings totals and module headers to provide a confident, modern geometric feel.
- **Inter (Body):** Used for all functional text, inputs, and descriptions to ensure maximum legibility at high densities.
- **JetBrains Mono (Data/Logs):** Specifically for "Hash Digital" codes, transaction IDs, and Audit logs to imply technical security and alignment.

Financial values (MZN) should always use **Bold** weights to ensure they are the first thing a user sees on any card or list.

## Layout & Spacing

This design system uses a **precise 4px/8px incremental grid** to accommodate data-heavy financial dashboards.

**Grid Models:**
- **Desktop (Organizadores):** 12-column fixed grid (1280px max-width) for high-density tables and multi-card dashboards.
- **Mobile (Collectors/Ticantes):** Single-column fluid layout with 16px side margins.
- **The Xitique Card:** A specialized 6x5 grid (30 slots) used to represent the monthly cycle. This grid must be consistent across all views.

**Density:**
- Use "Compact" density for Auditor tables (smaller padding, smaller text).
- Use "Comfortable" density for the Ticante's mobile view to prevent mis-taps during collection.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layering** and **Ambient Shadows** to create a structured, tactile feel.

- **Surface Levels:** The background uses `surface-off-white`. Primary content containers (Cards) use white with a very soft, low-opacity shadow (4% - 8% alpha) to appear slightly lifted.
- **Interactive Elements:** Buttons and selectable "X" slots use a subtle inner-shadow or "squishy" press effect to reinforce that they are tactile and responsive.
- **Modals:** Use a 40% opacity navy-tinted backdrop blur to keep the user focused on the action (e.g., approving a loan) without losing context.
- **Stamps (Carimbos):** Retroactive or System-calculated values are presented as "stamps"—flat, outlined badges that look as if they were physically pressed onto the page.

## Shapes

The shape language reflects **Stability**. While fully rounded "pills" are too casual for a financial auditor, sharp corners feel outdated and aggressive.

- **Standard Radius (8px):** Used for UI Cards, input fields, and standard buttons.
- **Large Radius (16px):** Used for parent containers and modals.
- **Circular:** Exclusively for avatars (Collectors) and the "O" (unpaid) markers in the 30-day grid.
- **Patterns:** Subtle geometric patterns derived from Mozambican textiles are used as low-opacity masks in the background of Hero sections or top-level Dashboard headers.

## Components

### Financial Cards (KPIs)
Cards display a primary value (MZN) in Montserrat Bold, a label in Inter, and a small trend indicator or progress bar. "Debt" cards must feature a 4px left-border of `status-error`.

### The 30-Day Grid
The core component of the system.
- **Unpaid:** An empty circle (`status-info` outline).
- **Paid:** A filled square or "X" mark in `status-info` or `status-success`.
- **Retroactive:** Marked with a "Stamp" icon and yellow tinting.

### Status Badges
Small, pill-shaped tags with high-contrast text. 
- *Success:* Green background, dark green text.
- *In Debt:* Red background, white text.
- *Offline:* Orange background, white text (critical for Collector visibility).

### Data Tables
High-density rows with alternating `surface-light-gray` backgrounds. Headers are sticky. The final column usually contains a "Ver Detalhe" (View Detail) action in Navy Blue.

### Buttons
- **Primary:** Solid Deep Green with white text.
- **Secondary:** Outlined Navy Blue.
- **Danger:** Solid Red (used for Reversals/Deletions).
- **Floating Action (FAB):** Specifically for WhatsApp Support (Bottom-Right) and Quick Collection on mobile.

### Modals & Steppers
Used for the 4-step Organization registration and loan approvals. Steppers use a Navy line with Green "completed" circles.