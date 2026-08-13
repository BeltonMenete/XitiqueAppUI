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

## Project structure

```text
src/
  components/        # shared UI and form components
  lib/               # constants and validation helpers
  routes/            # file-based TanStack Router pages
  main.tsx           # app entry point
  router.tsx         # router setup
  styles.css         # global styles
```

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

### CI/CD

Tests run automatically on the `main` branch via GitHub Actions. The workflow:
- Runs unit tests with Vitest
- Runs E2E tests with Playwright
- Uploads Playwright reports as artifacts

## Notes

The app uses file-based routing from the `src/routes` folder. New pages should be added there so the route tree stays consistent.
