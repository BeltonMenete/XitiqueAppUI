# Xitique App UI

A React and TypeScript interface for a digital savings and group-management experience inspired by Xitique-style rotating savings groups.

## Overview

This project contains the UI for:

- public authentication flows
- client onboarding steps
- organization onboarding and payment flows
- shared layout and form components

## Scripts

Use the package manager already configured in the repository:

```bash
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm test:watch
pnpm test:e2e
pnpm test:e2e:ui
pnpm test:e2e:debug
pnpm check
```

## Main routes

- `/` — landing page
- `/login` — sign in
- `/signup` — account type selection
- `/forgot` — password recovery
- `/reset` — password reset
- `/terms` — terms and conditions

### Client flow

- `/client/_auth/step-0`
- `/client/_auth/step-1`
- `/client/_auth/step-2`
- `/client/_auth/step-3`
- `/client/_auth/step-4`
- `/client/_auth/step-5`

### Organization flow

- `/organization/_auth/step-1`
- `/organization/_auth/step-2`
- `/organization/_auth/step-3`
- `/organization/_auth/step-4`
- `/organization/_auth/step-5`
- `/organization/_auth/payments/bank`
- `/organization/_auth/payments/mobile`
- `/organization/_auth/payments/transfer-bank`
- `/organization/_auth/payments/success`

### Dashboard routes

- `/dashboard/overview` — Main organization dashboard
- `/dashboard/savers` — Savers management
- `/dashboard/collectors` — Collectors management
- `/dashboard/reports` — Reports and analytics
- `/dashboard/` — Super dashboard with tabs

## Project structure

```text
src/
  components/        # shared UI and form components
    ui/              # reusable UI components (Button, Card, KPICard, etc.)
    business/        # business logic components (modals, forms)
    layout/          # layout components (Header, Sidebar, DashboardLayout)
    interactive/     # interactive components (SplitView, TabBar, etc.)
  lib/               # constants and validation helpers
  routes/            # file-based TanStack Router pages
  hooks/             # custom React hooks
  main.tsx           # app entry point
  router.tsx         # router setup
  styles.css         # global styles
```

## UI Components

The project includes a comprehensive set of reusable UI components:

### Core Components
- **Button** - Versatile button with variants (primary, secondary, danger, ghost, outline)
- **Card** - Container component with header, content, and footer
- **KPICard** - Key performance indicator cards with expandable content
- **Modal** - Modal dialog component
- **DataTable** - Data table with sorting, filtering, and expandable rows

### Loading & Empty States
- **LoadingSkeleton** - Skeleton loading states for cards, text, avatars, and tables
- **EmptyState** - Empty state component with customizable messages and actions

### Feedback Components
- **StatusBadge** - Status badges (Active, Inactive, Pending, Debt, etc.)
- **NotificationToast** - Toast notifications for success, error, warning, and info
- **Badge** - Notification badge with dot or number variants

### Navigation & Filtering
- **Breadcrumbs** - Hierarchical navigation component
- **FilterChips** - Filter chips for selecting and removing filters
- **ProgressCircle** - Circular progress indicator

### Interactive Components
- **SplitView** - Split view component with master/detail panels
- **TabBar** - Tab navigation component
- **ExpandableCard** - Expandable card component
- **InlineEditor** - Inline text editor

### Layout Components
- **DashboardLayout** - Main dashboard layout wrapper
- **Header** - Page header with breadcrumbs, search, and actions
- **Sidebar** - Navigation sidebar

## Recent Improvements

### Dashboard Enhancements
- **Overview Page**: Added CSS-only chart placeholders, improved KPI cards with hover effects, better activity timeline
- **Savers Page**: Integrated FilterChips for status filtering, loading states, EmptyState for no results, improved DataTable with striped/hoverable rows
- **Collectors Page**: Consistent improvements matching Savers page
- **Reports Page**: Added CSS-only bar and pie chart placeholders, improved visualizations
- **Super Dashboard**: Added tab persistence using localStorage, improved navigation

### Performance Optimizations
- Added `React.memo` to KPICard to prevent unnecessary re-renders
- Created ErrorBoundary component for error handling
- Optimized imports and component structure

### Accessibility Improvements
- Added ARIA labels to buttons and interactive elements
- Implemented keyboard navigation support
- Added focus visible states
- Created NotificationToast with aria-live regions
- Implemented useKeyboardShortcuts hook for keyboard shortcuts

### UX Enhancements
- Added hover effects and transitions throughout
- Improved loading states with skeleton screens
- Better empty states with actionable messages
- Consistent visual patterns across all pages

## Stack

- React
- TypeScript
- TanStack Router
- Tailwind CSS
- Valibot
- Vitest
- Playwright
- Biome

## Testing

The project includes both unit/integration tests and end-to-end tests:

### Unit/Integration Tests (Vitest)

```bash
# Run all tests once
pnpm test

# Run tests in watch mode (development)
pnpm test:watch
```

Tests are located in `src/components/**/*.test.tsx` and use:
- Vitest as the test runner
- React Testing Library for component testing
- @testing-library/jest-dom for custom matchers

### End-to-End Tests (Playwright)

```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests with Playwright UI
pnpm test:e2e:ui

# Debug E2E tests
pnpm test:e2e:debug
```

E2E tests are located in `e2e/*.spec.ts` and test:
- Dashboard navigation
- Savers management flows
- Collectors management flows
- Page loading and content display

### CI/CD

Tests run automatically on the `main` branch via GitHub Actions. The workflow:
- Runs unit tests with Vitest
- Runs E2E tests with Playwright
- Uploads Playwright reports as artifacts

## Notes

The app uses file-based routing from the `src/routes` folder. New pages should be added there so the route tree stays consistent.
