import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { PasswordInput } from "#/components/PasswordInput";
import { FormError } from "#/components/FormError";
import { LOGIN_SUBMIT_DELAY, APP_NAME } from "#/lib/constants";
import { Ring2 } from "ldrs/react";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_auth/reset-password")({
  component: ResetPassword,
});

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (password.length < 6) {
      newErrors.password = "A palavra-passe deve ter pelo menos 6 caracteres.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "As palavras-passe introduzidas não coincidem.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, LOGIN_SUBMIT_DELAY));
    console.log("Password reset successfully");
    setIsLoading(false);
    // Aqui podes redirecionar para o /login após o sucesso
  };

  return (
    <div className="login-bg min-h-screen flex items-center justify-center p-3 sm:p-4 overflow-hidden">
      <div className="relative w-full max-w-4xl">
        {/* Imagem Lateral (Desktop) */}
        <div className="hidden lg:block absolute inset-y-0 -left-6 w-3/5 rounded-2xl overflow-hidden opacity-100 translate-x-0">
          <img
            src="/xitique-left-panel.avif"
            alt="Promo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card do Formulário Otimizado para Baixa Resolução */}
        <div className="relative lg:ml-auto lg:w-1/2 bg-white rounded-2xl shadow-xl p-5 sm:p-6 lg:p-8 min-h-[420px] flex flex-col justify-between transition-all duration-500 ease-in-out">
          <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center space-y-3.5">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-0.5">
              <div className="flex items-center gap-2">
                <img
                  src="/xitique-logo.svg"
                  alt={APP_NAME}
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
                <span className="text-xl font-semibold text-gray-900">
                  {APP_NAME}
                </span>
              </div>
              <Link
                to="/login"
                className="flex items-center gap-1 text-xs font-medium text-(--color-sky-blue-600) transition-all duration-300 hover:text-(--color-sky-blue-700) hover:translate-x-[-2px]"
              >
                <ArrowLeft size={13} /> Voltar ao login
              </Link>
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-900 mb-0.5">
                Definir nova senha
              </h1>
              <p className="text-gray-500 text-[11px]">
                Escolha uma palavra-passe forte e segura para a sua conta.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col space-y-1"
            >
              {/* Campo Nova Palavra-passe */}
              <div className="flex flex-col">
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  showPassword={showPassword}
                  onToggleShow={() => setShowPassword(!showPassword)}
                  label="Nova palavra-passe"
                />
                <div className="h-4 flex items-center pl-1 mt-1">
                  <div
                    className={`text-[11px] transition-opacity duration-150 ${errors.password ? "opacity-100" : "opacity-0 invisible"}`}
                  >
                    <FormError message={errors.password || ""} />
                  </div>
                </div>
              </div>

              {/* Campo Confirmar Palavra-passe */}
              <div className="flex flex-col">
                <PasswordInput
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  showPassword={showConfirmPassword}
                  onToggleShow={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  label="Confirmar nova palavra-passe"
                />
                <div className="h-4 flex items-center pl-1 mt-1">
                  <div
                    className={`text-[11px] transition-opacity duration-150 ${errors.confirmPassword ? "opacity-100" : "opacity-0 invisible"}`}
                  >
                    <FormError message={errors.confirmPassword || ""} />
                  </div>
                </div>
              </div>

              {/* Botão de Submissão */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 mt-1 rounded-xl text-white font-semibold text-sm bg-(--color-mint-leaf-500) hover:bg-(--color-mint-leaf-600) transition-all duration-300 active:scale-[0.99] shadow-md disabled:opacity-70 cursor-pointer flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Ring2
                      size="14"
                      stroke="2.5"
                      strokeLength="0.20"
                      bgOpacity="0.1"
                      speed="0.4"
                      color="white"
                    />
                    <span>A atualizar senha...</span>
                  </div>
                ) : (
                  <span>Alterar palavra-passe</span>
                )}
              </button>
            </form>

            {/* Rodapé */}
            <p className="text-center text-[9px] text-gray-400 pt-2 border-t border-gray-100">
              © {new Date().getFullYear()} Xitique. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
