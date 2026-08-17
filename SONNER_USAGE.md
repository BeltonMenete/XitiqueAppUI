# Sonner Toast Documentation

## Instalação
O Sonner já está instalado no projeto via npm.

## Uso Básico

### Importar
```typescript
import { toast } from "sonner";
// Ou usar os helpers personalizados
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from "#/lib/toast";
```

### Exemplos de Uso

#### Success Toast
```typescript
import { toast } from "sonner";

toast.success("Operação realizada com sucesso!");
// ou
showSuccessToast("Depósito registrado com sucesso");
```

#### Error Toast
```typescript
toast.error("Erro ao realizar operação");
// ou
showErrorToast("Não foi possível conectar ao servidor");
```

#### Info Toast
```typescript
toast.info("Informação importante");
// ou
showInfoToast("Sessão expirada, faça login novamente");
```

#### Warning Toast
```typescript
toast.warning("Atenção");
// ou
showWarningToast("Você tem alterações não salvas");
```

#### Toast com Descrição
```typescript
toast.success("Depósito registrado", {
  description: "Valor: 500 MZN para Carlos Mondlane"
});
```

#### Toast com Ação
```typescript
toast.success("Depósito registrado", {
  action: {
    label: "Ver recibo",
    onClick: () => console.log("Ver recibo")
  }
});
```

#### Promise Toast (para operações assíncronas)
```typescript
import { showPromiseToast } from "#/lib/toast";

const promise = fetch("/api/deposit", { method: "POST" });

showPromiseToast(promise, {
  loading: "Registrando depósito...",
  success: "Depósito registrado com sucesso!",
  error: "Erro ao registrar depósito"
});
```

#### Toast Personalizado
```typescript
toast.message("Mensagem personalizada", {
  description: "Com descrição customizada",
  icon: <MyCustomIcon />,
  className: "my-custom-class"
});
```

## Localização de Toaster

O componente `<Toaster />` está configurado em `src/routes/__root.tsx` e renderiza globalmente em toda a aplicação.

## Cores e Estilos

Os toasts estão configurados com as cores do tema do projeto:
- **Success**: Verde (emerald)
- **Error**: Vermelho (red)
- **Warning**: Amarelo (amber)
- **Info**: Azul (blue)

## Exemplos de Implementação no Projeto

### Dashboard - Ações do Calendário
```typescript
// src/routes/dashboard/savers.tsx
import { toast } from "sonner";

onActionComplete={(action, data) => {
  if (action === "deposit") {
    toast.success(`Depósito de ${data.amount} MZN registrado com sucesso`);
  } else if (action === "delete") {
    toast.success("Depósito deletado com sucesso");
  }
}}
```

### Login
```typescript
// src/routes/_auth/login.tsx
import { toast } from "sonner";

toast.success("Sessão iniciada com sucesso!");
```

### Formulários em Geral
```typescript
import { showSuccessToast, showErrorToast } from "#/lib/toast";

try {
  await submitForm(data);
  showSuccessToast("Formulário enviado com sucesso");
} catch (error) {
  showErrorToast("Erro ao enviar formulário");
}
```

## Referência Completa

Para mais informações, consulte a documentação oficial do Sonner:
https://sonner.emilkowal.ski/
