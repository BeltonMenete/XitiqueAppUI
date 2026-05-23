# Contributing

## Commit Convention

Use **Conventional Commits**. Messages may be in **Portuguese** or **English**.

```
<type>(<scope>): <description>
```

**Types:**

- `feat` / `funcionalidade` — New feature
- `fix` / `correção` — Bug fix
- `docs` / `documentação` — Documentation
- `style` / `estilo` — Formatting changes
- `refactor` — Code refactoring
- `perf` / `performance` — Performance improvements
- `test` / `testes` — Tests
- `chore` / `manutenção` — Build/tooling

**Examples:**

```bash
git commit -m "feat(auth): add login page"
git commit -m "fix: resolve button loading state"
git commit -m "funcionalidade(auth): adicionar página de login"
```

## Code Standards

- **Formatting:** Biome (run `pnpm check`)
- **Styling:** Tailwind CSS only
- **TypeScript:** Strict types—no `any`
- **Routing:** Use TanStack Router file-based system
- **Naming:** camelCase for variables/functions, PascalCase for components
- **DRY:** Extract repeated logic into reusable utilities, hooks, or components. Avoid code duplication.

## PR Guidelines

- Single feature/fix per PR aka Github flow
- Follow Conventional Commits in PR title
- Pass all tests: `pnpm test`
- Pass linting: `pnpm check`
- Reference related issues
- Include screenshots for UI changes

## Reporting Issues

Include:

- Clear description
- Reproduction steps
- Expected vs actual behavior
- Browser/OS info
- Screenshots (if applicable)
