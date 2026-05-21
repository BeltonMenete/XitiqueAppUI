# Contributing to Xitique App UI

Thank you for your interest in contributing to Xitique App UI! We welcome contributions from the community. Please follow these guidelines to ensure a smooth collaboration.

## Getting Started

1. **Clone the repository** locally:
   ```bash
   git clone https://github.com/zelto/XitiqueAppUI.git
   cd XitiqueAppUI
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Development Server
```bash
pnpm dev
```
The app will be available at `http://localhost:4000`

### Building for Production
```bash
pnpm build
```

### Running Tests
```bash
pnpm test
```

### Linting and Formatting
```bash
pnpm check
```
This runs both Biome linting and formatting checks.

## Code Style Guidelines

- **Format**: We use [Biome](https://biomejs.dev/) for linting and formatting
- **Styling**: Tailwind CSS for all styles - avoid inline styles
- **Components**: Keep components in `src/routes/` or `src/components/` as appropriate
- **TypeScript**: Use TypeScript - no `any` types unless absolutely necessary
- **Naming**: Use descriptive, camelCase names for variables and functions

## Project Structure

```
src/
├── routes/           # TanStack Router file-based routing
│   ├── __root.tsx    # Root layout
│   ├── index.tsx     # Home page
│   └── _auth/        # Auth-related routes
│       └── login.tsx # Login page
├── components/       # Reusable components
├── main.tsx          # App entry point
├── router.tsx        # Router configuration
└── styles.css        # Global styles
```

## Commit Convention

We use **Conventional Commits** for clear and consistent commit messages. Commits can be in **Portuguese** or **English**.

### Format
```
<type>(<scope>): <subject>
```

### Types
- `feat` / `funcionalidade` - New feature
- `fix` / `correção` - Bug fix
- `docs` / `documentação` - Documentation changes
- `style` / `estilo` - Code style changes (formatting, semicolons, etc.)
- `refactor` - Code refactoring
- `perf` / `performance` - Performance improvements
- `test` / `testes` - Adding or updating tests
- `chore` / `manutençao` - Build, dependencies, or tooling changes

### Examples
```bash
# English
git commit -m "feat: add login page authentication"
git commit -m "fix: resolve button loading state issue"

# Portuguese
git commit -m "funcionalidade: adicionar autenticação na página de login"
git commit -m "correção: resolver problema no estado de carregamento do botão"
```

## Submitting Changes

1. **Commit your changes** following the Conventional Commits format above

2. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear description of changes
   - Reference to any related issues
   - Screenshots for UI changes

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Follow Conventional Commits in PR title
- Ensure all tests pass: `pnpm test`
- Ensure code is properly formatted: `pnpm check`
- Add comments for complex logic
- Update documentation if needed

## Reporting Issues

When reporting bugs, please include:
- A clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots if applicable

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **TanStack Router** - Routing and navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **ldrs** - Loading spinners
- **Vitest** - Testing
- **Biome** - Linting and formatting

## Questions?

Feel free to open an issue on GitHub or reach out to the maintainers.

Happy coding! 🚀
