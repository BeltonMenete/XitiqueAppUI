import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PasswordInput } from "#/components/PasswordInput";
import { FormError } from "#/components/FormError";
import { LOGIN_SUBMIT_DELAY, APP_NAME } from "#/lib/constants";
import { Ring2 } from "ldrs/react";
import { ArrowLeft, CheckCircle2, User } from "lucide-react";
import { z } from "zod";

// Segurança de rota: Exige obrigatoriamente um token e permite receber opcionalmente o identificador
export const Route = createFileRoute("/_auth/reset")({
  validateSearch: z.object({
    token: z.string().catch(""),
    identifier: z.string().optional().catch(""), // Captura o email ou telefone (+258...)
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const { token, identifier } = Route.useSearch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    // Critérios de segurança fortes para proteção de contas
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8) {
      newErrors.password = "A palavra-passe deve ter pelo menos 8 caracteres.";
    } else if (!hasUpperCase || !hasNumber || !hasSpecialChar) {
      newErrors.password =
        "A senha deve conter maiúsculas, números e caracteres especiais.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "As palavras-passe introduzidas não coincidem.";
    }

    // Prevenção contra tentativas de contornar o formulário sem token na URL
    if (!token && password === confirmPassword && password.length >= 8) {
      newErrors.password =
        "Sessão de redefinição inválida ou expirada. Volte a solicitar o código.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsShaking(true);
      // Remove o efeito após o término da animação (400ms)
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    setIsLoading(true);

    try {
      // Simulação do envio dos novos dados à API
      await new Promise((r) => setTimeout(r, LOGIN_SUBMIT_DELAY));
      console.log(`Password reset for ${identifier} successfully.`);

      setIsLoading(false);
      setIsSuccess(true);

      // Redirecionamento fluído para o ecrã de entrada
      setTimeout(() => {
        navigate({ to: "/login" });
      }, 3500);
    } catch (error) {
      setIsLoading(false);
      setErrors({
        password: "Ocorreu um erro ao atualizar a senha. Tente novamente.",
      });
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
    }
  };

  return (
    <div className="login-bg min-h-screen flex items-center justify-center p-3 sm:p-4 overflow-hidden">
      {/* Estilo CSS Isolado para o Shake apenas das mensagens de erro */}
      <style>{`
        @keyframes shakeErrorText {
          0%, 100% { transform: translateX(0); }
          15%, 45%, 75% { transform: translateX(-4px); }
          30%, 60%, 90% { transform: translateX(4px); }
        }
        .animate-shake-error {
          animation: shakeErrorText 0.4s ease-in-out;
          display: inline-block;
        }
      `}</style>

      <div className="relative w-full max-w-4xl">
        {/* Imagem Lateral (Desktop) */}
        <div className="hidden lg:block absolute inset-y-0 -left-6 w-3/5 rounded-2xl overflow-hidden opacity-100 translate-x-0">
          <img
            src="/xitique-left-panel.avif"
            alt="Promo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card do Formulário */}
        <div className="relative lg:ml-auto lg:w-1/2 bg-white rounded-2xl shadow-xl p-5 sm:p-6 lg:p-8 min-h-105 flex flex-col justify-between transition-all duration-500 ease-in-out">
          <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center space-y-3.5">
            {isSuccess ? (
              /* ESTADO DE SUCESSO VISUAL */
              <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="flex justify-center">
                  <CheckCircle2 className="text-emerald-500 h-14 w-14 drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Senha Atualizada!
                </h1>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                  A senha para a conta{" "}
                  <strong className="text-gray-800 font-medium">
                    {identifier || "associada"}
                  </strong>{" "}
                  foi alterada com êxito. A redirecionar...
                </p>
                <div className="pt-2">
                  <Link
                    to="/login"
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
                  >
                    Ir para o login agora
                  </Link>
                </div>
              </div>
            ) : (
              /* FORMULÁRIO DE REDEFINIÇÃO */
              <>
                {/* Cabeçalho */}
                <div className="flex justify-between items-center mb-0.5">
                  <div className="flex items-center gap-2">
                    <img
                      loading="lazy"
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
                    className="flex items-center gap-1 text-xs font-medium text-(--color-sky-blue-600) transition-all duration-300 hover:text-(--color-sky-blue-700) hover:-translate-x-0.5"
                  >
                    <ArrowLeft size={13} /> Voltar ao login
                  </Link>
                </div>

                <div className="space-y-3">
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900 mb-0.5">
                      Definir nova senha
                    </h1>
                    <p className="text-gray-500 text-[11px]">
                      Escolha uma palavra-passe forte contendo letras
                      maiúsculas, números e caracteres especiais.
                    </p>
                  </div>

                  {/* Identificador da Conta em Edição */}
                  {identifier && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/60 rounded-xl text-slate-600 w-full animate-in fade-in duration-200">
                      <div className="p-1 bg-slate-200/50 rounded-lg text-slate-500 shrink-0">
                        <User size={14} className="stroke-[2.5]" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold leading-none mb-0.5">
                          A alterar dados de:
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-800 truncate tracking-wide">
                          {identifier}
                        </span>
                      </div>
                    </div>
                  )}
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
                      {/* Shake aplicado cirurgicamente apenas no texto de erro */}
                      <div
                        className={`text-[11px] transition-opacity duration-150 ${
                          errors.password
                            ? "opacity-100"
                            : "opacity-0 invisible"
                        } ${isShaking && errors.password ? "animate-shake-error" : ""}`}
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
                      {/* Shake aplicado cirurgicamente apenas no texto de erro */}
                      <div
                        className={`text-[11px] transition-opacity duration-150 ${
                          errors.confirmPassword
                            ? "opacity-100"
                            : "opacity-0 invisible"
                        } ${isShaking && errors.confirmPassword ? "animate-shake-error" : ""}`}
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
              </>
            )}

            {/* Rodapé */}
            <p className="text-center text-[9px] text-gray-400 pt-2 border-t border-gray-100">
              © {new Date().getFullYear()} {APP_NAME}. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
