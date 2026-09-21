# Arquitetura do Xitique App

Este documento descreve a arquitetura técnica do Xitique App, focando no sistema multitenant e controle de acesso baseado em roles.

## Visão Geral

O Xitique App é uma aplicação React/TypeScript multitenant que permite que múltiplas organizações operem de forma independente, cada uma com seus próprios usuários, permissões e dados isolados.

## Stack Tecnológico

- **Frontend**: React 18+ com TypeScript
- **Routing**: TanStack Router (file-based routing)
- **State Management**: React Context API para autenticação
- **Styling**: Tailwind CSS
- **Validação**: Valibot
- **Linting/Formatting**: Biome
- **Package Manager**: pnpm
- **Testes**: Vitest (unitários) e Playwright (E2E)

## Estrutura de Diretórios

```
src/
├── components/
│   ├── layout/           # Layout components (Header, Sidebar, ClientLayout)
│   ├── ui/               # Reusable UI components
│   ├── business/         # Business-specific modals and components
│   └── ProtectedRoute.tsx # Route protection component
├── contexts/
│   └── AuthContext.tsx   # Authentication context with role management
├── hooks/
│   └── useAuth.ts        # Custom hook for auth and permission checks
├── config/
│   └── dashboardSidebar.ts # Role-aware sidebar configuration
├── routes/
│   ├── _auth/            # Public authentication routes
│   ├── dashboard/        # Admin and collector dashboard routes
│   └── client/           # Client portal routes
├── features/             # Feature-specific hooks and logic
├── lib/                  # Utilities and helpers
└── main.tsx              # Application entry point
```

## Sistema de Autenticação e Autorização

### AuthContext

O `AuthContext` gerencia o estado de autenticação e informações do usuário em toda a aplicação.

**Localização**: `src/contexts/AuthContext.tsx`

**Funcionalidades**:
- Gerencia o estado do usuário atual
- Armazena o role do usuário (admin, collector, saver)
- Armazena informações da organização
- Fornece funções de login/logout
- Persiste estado no localStorage (mock implementation)

**Interface**:
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "collector" | "saver";
  organization?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}
```

### useAuth Hook

Hook customizado para consumir o AuthContext e fornecer helpers de permissão.

**Localização**: `src/hooks/useAuth.ts`

**Funcionalidades**:
- Acesso ao usuário atual e estado de autenticação
- Helpers para verificar roles específicos
- Helpers para verificar permissões de capacidade

**Exemplo de uso**:
```typescript
const { user, isAuthenticated, isAdmin, isCollector, canAccess } = useAuth();

if (isAdmin()) {
  // Render admin-only content
}

if (canAccess("approve_loans")) {
  // Show loan approval button
}
```

## Configuração de Sidebar Dinâmico

O sidebar é configurado dinamicamente baseado no role do usuário.

**Localização**: `src/config/dashboardSidebar.ts`

**Funcionalidades**:
- Aceita um parâmetro `role` opcional
- Retorna itens de navegação apropriados para cada role
- Mantém comportamento de active state para rotas aninhadas

**Estrutura de dados**:
```typescript
interface SidebarItem {
  icon: LucideIcon;
  label: string;
  to: string;
  isActive?: (currentPath: string) => boolean;
}

function getDashboardSidebar(
  currentPath: string,
  role?: "admin" | "collector" | "saver"
): SidebarItem[]
```

**Itens por Role**:

**Admin**:
- Visão Geral
- Gestão (ticantes)
- Cobradores
- Financeiro
- Relatórios
- Configurações

**Cobrador**:
- Visão Geral
- Gestão (ticantes atribuídos)
- Meus Cobradores (apenas dados próprios)

**Cliente/Ticante**:
- Dashboard
- Depósitos
- Empréstimos
- Perfil

## Componentes de Layout

### Header

**Localização**: `src/components/layout/Header.tsx`

**Funcionalidades**:
- Mostra nome do usuário atual
- Mostra role como badge colorido
- Mostra nome da organização
- Cores de badge por role:
  - Admin: `bg-blue-100 text-blue-800`
  - Cobrador: `bg-emerald-100 text-emerald-800`
  - Cliente: `bg-orange-100 text-orange-800`

### Sidebar

**Localização**: `src/components/layout/Sidebar.tsx`

**Funcionalidades**:
- Renderiza itens de navegação dinâmicos
- Destaca item ativo baseado no pathname
- Suporta roteamento aninhado
- Responsivo com toggle

### ClientLayout

**Localização**: `src/components/layout/ClientLayout.tsx`

**Funcionalidades**:
- Layout específico para o portal do cliente
- Header simplificado com navegação do cliente
- Badge de role "Cliente" (laranja)
- Botão de logout

## Proteção de Rotas

### ProtectedRoute Component

**Localização**: `src/components/ProtectedRoute.tsx`

**Funcionalidades**:
- Wrapper para proteger rotas que requerem autenticação
- Suporta restrição por roles específicos
- Redireciona para `/login` se não autenticado
- Redireciona para portal apropriado se role não autorizado

**Exemplo de uso**:
```typescript
<ProtectedRoute allowedRoles={["admin", "collector"]}>
  <DashboardPage />
</ProtectedRoute>
```

## Rotas e Redirecionamento

### Login Flow

**Localização**: `src/routes/_auth/login.tsx`

**Lógica de redirecionamento**:
```typescript
await login({ email, password });

const user = JSON.parse(localStorage.getItem("user") || "{}");
if (user.role === "saver") {
  navigate({ to: "/client/dashboard" });
} else {
  navigate({ to: "/dashboard/overview" });
}
```

### Rotas do Dashboard

Todas as rotas do dashboard (`/dashboard/*`) estão configuradas para usar o sidebar dinâmico:

```typescript
const { user } = useAuth();
const sidebarItems = getDashboardSidebar(location.pathname, user?.role);
```

Rotas atualizadas:
- `overview.tsx`
- `savers.tsx`
- `saver-details.tsx`
- `collectors.tsx`
- `collector-details.tsx`
- `financial.tsx`
- `reports.tsx`
- `settings.tsx`

### Rotas do Portal do Cliente

Rotas específicas para clientes (`/client/*`):
- `dashboard.tsx` - Visão geral com saldo, KPIs, histórico recente
- `deposits.tsx` - Histórico completo de depósitos
- `loans.tsx` - Histórico de empréstimos com status de pagamento
- `profile.tsx` - Perfil e configurações da conta

Todas usam `ClientLayout` para navegação consistente.

## Matriz de Permissões

| Funcionalidade | Admin | Cobrador | Cliente |
|--------------|-------|----------|---------|
| Visão geral da organização | ✅ | ❌ | ❌ |
| Gestão de todos os ticantes | ✅ | Atribuídos | ❌ |
| Gestão de cobradores | ✅ | ❌ | ❌ |
| Aprovar/rejeitar empréstimos | ✅ | ❌ | ❌ |
| Relatórios financeiros completos | ✅ | ❌ | ❌ |
| Configurações da organização | ✅ | ❌ | ❌ |
| Registar depósitos | ✅ | ✅ | ❌ |
| Ver histórico de coleções | ✅ | Próprias | ❌ |
| Dashboard pessoal | ❌ | ❌ | ✅ |
| Ver depósitos próprios | ❌ | ❌ | ✅ |
| Ver empréstimos próprios | ❌ | ❌ | ✅ |
| Solicitar empréstimos | ❌ | ❌ | ✅ |
| Editar perfil | ✅ | Próprio | Próprio |

## Dados Mock e Autenticação

A implementação atual usa dados mock para autenticação. Para produção, será necessário:

1. Integrar com backend real
2. Substituir localStorage por tokens JWT ou session cookies
3. Implementar validação de roles no backend
4. Adicionar refresh tokens
5. Implementar revogação de sessões

**Exemplo de mock user**:
```typescript
{
  id: "1",
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
  organization: "Organização Exemplo"
}
```

## Estado Atual e Próximos Passos

### Implementado ✅

- AuthContext com gerenciamento de usuário e role
- useAuth hook com helpers de permissão
- Sidebar dinâmico baseado em role
- Header com user info e badge de role
- Portal do cliente completo (dashboard, depósitos, empréstimos, perfil)
- Login com redirecionamento por role
- ProtectedRoute component
- Integração de role-aware sidebar em todas as rotas do dashboard
- ClientLayout para navegação do cliente
- Documentação em README.pt.md

### Pendente 🔄

- Integração com backend real
- Adicionar ProtectedRoute a rotas específicas do dashboard
- Implementar validação de permissões em componentes individuais
- Adicionar testes para auth e permissões
- Implementar logout em todas as áreas da aplicação
- Otimizar visual do client portal

## Considerações de Segurança

1. **Role Validation**: Roles devem sempre ser validados no backend, não apenas no frontend
2. **Data Isolation**: Implementar queries filtradas por organização e user ID no backend
3. **Token Security**: Usar HTTPS para tokens e cookies
4. **Session Management**: Implementar timeout e refresh de sessões
5. **Audit Logging**: Registrar ações sensíveis para auditoria

## Contribuindo

Ao adicionar novas funcionalidades:

1. Determine quais roles devem ter acesso
2. Adicione helpers de permissão em `useAuth.ts` se necessário
3. Atualize `dashboardSidebar.ts` para navegação se apropriado
4. Use `ProtectedRoute` para rotas restritas
5. Adicione indicadores visuais no Header se relevante
6. Atualize esta documentação com mudanças de arquitetura
