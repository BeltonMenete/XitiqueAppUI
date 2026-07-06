import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Building2,
  ChevronRight,
  CircleDollarSign,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { AuthPageShell } from "#/components/AuthPageShell";

export const Route = createFileRoute("/_auth/signup")({
  component: Signup,
});

type AccountType = "organization" | "individual" | null;

function Signup() {
  const [accountType, setAccountType] = useState<AccountType>("organization");
  const navigate = useNavigate();

  const handleSelectAccount = (type: AccountType) => {
    setAccountType(type);
    navigate({ to: "/terms" });
  };

  return (
    <AuthPageShell
      title="Criar conta"
      description="Escolha a forma de começar a poupar, receber e gerir os seus fundos com mais organização e segurança."
      headerAction={
        <Link
          to="/login"
          className="flex items-center gap-1 text-xs font-medium text-(--color-sky-blue-600) transition-all duration-300 hover:text-(--color-sky-blue-700) hover:translate-x-0.5"
        >
          <UserPlus size={14} /> Iniciar sessão
        </Link>
      }
      footer={
        <p className="text-center text-[10px] text-gray-400 pt-3 border-t border-gray-100">
          © {new Date().getFullYear()} Xitique. Todos os direitos reservados.
        </p>
      }
    >
      <div className="flex flex-col space-y-4 py-1">
        <button
          type="button"
          onClick={() => handleSelectAccount("organization")}
          className={`w-full border-2 rounded-2xl p-4 text-left cursor-pointer group transition-all duration-300 ${accountType === "organization"
            ? "border-(--color-mint-leaf-500) bg-gray-50/50 shadow-sm"
            : "border-gray-100 hover:border-gray-300 hover:bg-gray-50/30"
            }`}
        >
          <div className="flex items-start gap-3.5">
            <div
              className={`p-2.5 rounded-xl transition-colors ${accountType === "organization"
                ? "bg-(--color-mint-leaf-500) text-white"
                : "bg-gray-100 text-gray-700 group-hover:bg-(--color-mint-leaf-500) group-hover:text-white"
                }`}
            >
              <Building2 size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                Criar uma Organização
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                Para quem deseja gerir grupos de poupança, coordenadores e
                depósitos de terceiros com maior transparência.
              </p>
              <span className="mt-2 text-(--color-mint-leaf-500) text-xs font-medium flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                Começar como organizador
                <ChevronRight size={14} />
              </span>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleSelectAccount("individual")}
          className={`w-full border-2 rounded-2xl p-4 text-left cursor-pointer group transition-all duration-300 ${accountType === "individual"
            ? "border-(--color-mint-leaf-500) bg-gray-50/50 shadow-sm"
            : "border-gray-100 hover:border-gray-300 hover:bg-gray-50/30"
            }`}
        >
          <div className="flex items-start gap-3.5">
            <div
              className={`p-2.5 rounded-xl transition-colors ${accountType === "individual"
                ? "bg-(--color-mint-leaf-500) text-white"
                : "bg-gray-100 text-gray-700 group-hover:bg-(--color-mint-leaf-500) group-hover:text-white"
                }`}
            >
              <CircleDollarSign size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                Começar a poupar
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                Para quem deseja guardar dinheiro com regularidade e acompanhar
                os seus movimentos de forma simples.
              </p>
              <span className="mt-2 text-(--color-mint-leaf-500) text-xs font-medium flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                Começar como poupador
                <ChevronRight size={14} />
              </span>
            </div>
          </div>
        </button>
      </div>
    </AuthPageShell>
  );
}
