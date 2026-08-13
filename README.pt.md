# Xitique App UI

Uma interface em React e TypeScript para uma experiência digital de poupança e gestão de grupos inspirada nos modelos de Xitique.

## Visão geral

Este projeto inclui a interface para:

- fluxos públicos de autenticação
- passos de onboarding para clientes
- onboarding e pagamentos para organizações
- componentes partilhados de layout e formulários

## Scripts

Utilize o gestor de pacote já configurado no repositório:

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

## Rotas principais

- `/` — página inicial
- `/login` — início de sessão
- `/signup` — escolha do tipo de conta
- `/forgot` — recuperação de palavra-passe
- `/reset` — redefinição de palavra-passe
- `/terms` — termos e condições

### Fluxo de cliente

- `/client/_auth/step-0`
- `/client/_auth/step-1`
- `/client/_auth/step-2`
- `/client/_auth/step-3`
- `/client/_auth/step-4`
- `/client/_auth/step-5`

### Fluxo de organização

- `/organization/_auth/step-1`
- `/organization/_auth/step-2`
- `/organization/_auth/step-3`
- `/organization/_auth/step-4`
- `/organization/_auth/step-5`
- `/organization/_auth/payments/bank`
- `/organization/_auth/payments/mobile`
- `/organization/_auth/payments/transfer-bank`
- `/organization/_auth/payments/success`

## Estrutura do projeto

```text
src/
  components/        # componentes visuais e formulários partilhados
  lib/               # constantes e helpers de validação
  routes/            # páginas baseadas em routing do TanStack Router
  main.tsx           # ponto de entrada da aplicação
  router.tsx         # configuração do router
  styles.css         # estilos globais
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

## Testes

O projeto inclui testes unitários/integração e testes end-to-end:

### Testes Unitários/Integração (Vitest)

```bash
# Executar todos os testes uma vez
pnpm test

# Executar testes em modo watch (desenvolvimento)
pnpm test:watch
```

Os testes estão localizados em `src/components/**/*.test.tsx` e utilizam:
- Vitest como executor de testes
- React Testing Library para testes de componentes
- @testing-library/jest-dom para matchers personalizados

### Testes End-to-End (Playwright)

```bash
# Executar testes E2E
pnpm test:e2e

# Executar testes E2E com interface do Playwright
pnpm test:e2e:ui

# Depurar testes E2E
pnpm test:e2e:debug
```

Os testes E2E estão localizados em `e2e/*.spec.ts` e testam:
- Navegação no dashboard
- Fluxos de gestão de poupadores
- Fluxos de gestão de cobradores

### CI/CD

Os testes são executados automaticamente no branch `main` via GitHub Actions. O workflow:
- Executa testes unitários com Vitest
- Executa testes E2E com Playwright
- Carrega relatórios do Playwright como artefactos

## Nota

A aplicação utiliza routing baseado em ficheiros a partir da pasta `src/routes`. Novas páginas devem ser adicionadas aí para manter a estrutura das rotas consistente.
