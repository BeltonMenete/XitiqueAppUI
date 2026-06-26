import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { EmailInput } from "#/components/EmailInput";
import { PasswordInput } from "#/components/PasswordInput";
import { FormError } from "#/components/FormError";
import { LOGIN_SUBMIT_DELAY, APP_NAME } from "#/lib/constants";
import { Ring2 } from "ldrs/react";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_auth/signup")({
  component: Signup,
});

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (!email || !email.includes("@")) {
      newErrors.email = "Introduza um e-mail válido.";
    }
    if (password.length < 6) {
      newErrors.password = "Mínimo de 6 caracteres.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }
    if (!agreedToTerms) {
      newErrors.terms = "Aceite os termos.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, LOGIN_SUBMIT_DELAY));
    console.log("Signup success:", { email });
    setIsLoading(false);
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

        {/* Card do Formulário Otimizado Verticalmente */}
        <div className="relative lg:ml-auto lg:w-1/2 bg-white rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6 min-h-[420px] flex flex-col justify-between transition-all duration-500 ease-in-out">
          <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center space-y-2.5">
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
                <ArrowLeft size={13} /> Voltar
              </Link>
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-900 mb-0.5">
                Criar Conta
              </h1>
              <p className="text-gray-500 text-[11px]">
                Registe-se para começar a poupar.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col space-y-0.5"
            >
              {/* Campo E-mail */}
              <div className="flex flex-col">
                <EmailInput
                  value={email}
                  onChange={setEmail}
                  placeholder="exemplo@email.com"
                />
                <div className="h-4 flex items-center pl-1 mt-0.5">
                  <div
                    className={`text-[11px] transition-opacity duration-150 ${errors.email ? "opacity-100" : "opacity-0 invisible"}`}
                  >
                    <FormError message={errors.email || ""} />
                  </div>
                </div>
              </div>

              {/* Campo Palavra-passe */}
              <div className="flex flex-col">
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  showPassword={showPassword}
                  onToggleShow={() => setShowPassword(!showPassword)}
                />
                <div className="h-4 flex items-center pl-1 mt-0.5">
                  <div
                    className={`text-[11px] transition-opacity duration-150 ${errors.password ? "opacity-100" : "opacity-0 invisible"}`}
                  >
                    <FormError message={errors.password || ""} />
                  </div>
                </div>
              </div>

              {/* Confirmar Palavra-passe */}
              <div className="flex flex-col">
                <PasswordInput
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  showPassword={showConfirmPassword}
                  onToggleShow={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  label="Confirmar palavra-passe"
                />
                <div className="h-4 flex items-center pl-1 mt-0.5">
                  <div
                    className={`text-[11px] transition-opacity duration-150 ${errors.confirmPassword ? "opacity-100" : "opacity-0 invisible"}`}
                  >
                    <FormError message={errors.confirmPassword || ""} />
                  </div>
                </div>
              </div>

              {/* Checkbox Termos e Condições */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-0.5">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-3.5 h-3.5 rounded cursor-pointer border border-gray-300 focus:ring-1 focus:ring-(--color-mint-leaf-500)"
                  />
                  <label
                    htmlFor="terms"
                    className="text-[11px] text-gray-600 cursor-pointer select-none"
                  >
                    Concordo com os{" "}
                    <Link
                      to="/terms"
                      className="text-(--color-sky-blue-600) font-medium hover:underline"
                    >
                      termos e condições
                    </Link>
                  </label>
                </div>
                <div className="h-4 flex items-center pl-1 mt-0.5">
                  <div
                    className={`text-[11px] transition-opacity duration-150 ${errors.terms ? "opacity-100" : "opacity-0 invisible"}`}
                  >
                    <FormError message={errors.terms || ""} />
                  </div>
                </div>
              </div>

              {/* Botão de Registo */}
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
                    <span>A criar conta...</span>
                  </div>
                ) : (
                  <span>Criar Conta</span>
                )}
              </button>
            </form>

            {/* Alternador Alternativo */}
            <div className="text-center pt-0.5">
              <p className="text-gray-500 text-[11px]">
                Já possui uma conta?{" "}
                <Link
                  to="/login"
                  className="text-(--color-sky-blue-600) font-semibold hover:underline"
                >
                  Iniciar sessão
                </Link>
              </p>
            </div>

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
