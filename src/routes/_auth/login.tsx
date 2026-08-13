import { createFileRoute, Link } from "@tanstack/react-router";
import { Ring2 } from "ldrs/react";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthPageShell } from "#/components/AuthPageShell";
import { EmailInput } from "#/components/EmailInput";
import { FormError } from "#/components/FormError";
import { PasswordInput } from "#/components/PasswordInput";
import { NotificationToast } from "#/components/ui/NotificationToast";
import { LOGIN_SUBMIT_DELAY } from "#/lib/constants";
import { validateLoginForm } from "#/lib/validation";

export const Route = createFileRoute("/_auth/login")({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isShaking, setIsShaking] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("remembered_email");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateLoginForm(email, password);

    if (!validation.valid) {
      setErrors(validation.errors);
      setIsShaking(true);
      window.setTimeout(() => setIsShaking(false), 400);
      return;
    }

    setErrors({});
    setIsLoading(true);
    await new Promise((resolve) =>
      window.setTimeout(resolve, LOGIN_SUBMIT_DELAY),
    );
    setIsLoading(false);

    // Show success toast
    setToastMessage("Sessão iniciada com sucesso!");
    setToastType("success");
    setShowToast(true);

    // Save remember me preference
    if (rememberMe) {
      localStorage.setItem("remembered_email", email);
    } else {
      localStorage.removeItem("remembered_email");
    }
  };

  return (
    <AuthPageShell
      title="Iniciar sessão"
      description="Aceda à sua conta para gerir poupanças, depósitos e movimentos mensais."
      headerAction={
        <Link
          to="/signup"
          className="flex items-center gap-1 text-xs font-medium text-(--color-sky-blue-600) transition-all duration-300 hover:text-(--color-sky-blue-700) hover:translate-x-0.5"
        >
          <UserPlus size={14} /> Criar conta
        </Link>
      }
    >
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

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col space-y-1"
      >
        <div className="flex flex-col">
          <EmailInput
            value={email}
            onChange={setEmail}
            placeholder="exemplo@email.com"
          />
          <div className="h-5 flex items-center pl-1 mt-1.5">
            <div
              className={`text-xs transition-opacity duration-150 ${errors.email ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.email ? "animate-shake-error" : ""}`}
            >
              <FormError message={errors.email || ""} />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <PasswordInput
            value={password}
            onChange={setPassword}
            showPassword={showPassword}
            onToggleShow={() => setShowPassword((value) => !value)}
          />
          <div className="h-5 flex items-center pl-1 mt-1.5">
            <div
              className={`text-xs transition-opacity duration-150 ${errors.password ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.password ? "animate-shake-error" : ""}`}
            >
              <FormError message={errors.password || ""} />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-300 text-(--color-mint-leaf-500) focus:ring-(--color-mint-leaf-500)"
              aria-label="Lembrar-me"
            />
            <span className="text-xs text-slate-600">Lembrar-me</span>
          </label>
          <Link
            to="/forgot"
            className="text-xs text-(--color-sky-blue-600) font-medium hover:text-(--color-sky-blue-700) hover:underline transition-colors"
          >
            Esqueceu-se da palavra-passe?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-2xl text-white font-semibold text-base bg-(--color-mint-leaf-500) hover:bg-(--color-mint-leaf-600) transition-all duration-300 active:scale-[0.99] shadow-md hover:shadow-lg disabled:opacity-70 disabled:pointer-events-none cursor-pointer flex items-center justify-center"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Ring2
                size="16"
                stroke="3"
                strokeLength="0.20"
                bgOpacity="0.1"
                speed="0.4"
                color="white"
              />
              <span>A iniciar sessão...</span>
            </div>
          ) : (
            <span>Iniciar sessão</span>
          )}
        </button>
      </form>

      {showToast && (
        <NotificationToast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </AuthPageShell>
  );
}
