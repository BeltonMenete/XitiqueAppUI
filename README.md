# Xitique App UI

A modern UI for a digital savings group app inspired by traditional Mozambican Xitique (ROSCAs), built for admin-managed commercial use.

**Live Demo:** https://xitique-app-ui.vercel.app/

## Quick Start

```bash
pnpm install
pnpm dev        # development
pnpm build      # production
pnpm test       # run tests
pnpm check      # lint & format
```

## Tech Stack

- **React 18** — UI library
- **TypeScript** — Type safety
- **TanStack Router** — File-based routing (add routes in `src/routes/`)
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **Lucide React** — Icons
- **ldrs** — Loading spinners
- **Vitest** — Testing
- **Biome** — Linting and formatting

## Project Structure

```
src/
├── routes/           # TanStack Router file-based routing
│   ├── __root.tsx    # Root layout
│   ├── index.tsx     # Home page
│   └── _auth/        # Auth routes
│       └── login.tsx
├── components/       # Reusable components
├── main.tsx          # Entry point
├── router.tsx        # Router config
└── styles.css        # Global styles
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for commit conventions, code standards, and PR guidelines.
