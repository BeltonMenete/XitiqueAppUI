import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, ArrowRight, Shield, Landmark } from "lucide-react";
import { PROVINCIAS_MZ } from "../../../data/mozambique";

export const Route = createFileRoute("/organization/_auth/step-1")({
  component: StepOne,
});

function StepOne() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    provincia: "",
    distrito: "",
    telefone: "",
  });

  const distritos =
    PROVINCIAS_MZ.find((p) => p.nome === form.provincia)?.distritos || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: save to Zustand/Context
    console.log("Step 1 data:", form);
    navigate({ to: "/organization/step-2" });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-900 text-white p-12 flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-8">Xitique</h2>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Digitalize o seu Xitique com segurança e transparência.
          </h1>
          <p className="text-emerald-100 text-lg">
            Modernize a gestão da sua comunidade financeira. Unimos tradição
            Moçambicana com a eficiência da tecnologia moderna.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border border-emerald-700 rounded-lg p-4">
            <Shield className="text-amber-400 mb-2" />
            <p className="font-bold text-sm">SEGURANÇA TOTAL</p>
            <p className="text-emerald-200 text-sm">Dados encriptados</p>
          </div>
          <div className="border border-emerald-700 rounded-lg p-4">
            <Landmark className="text-amber-400 mb-2" />
            <p className="font-bold text-sm">AUDITÁVEL</p>
            <p className="text-emerald-200 text-sm">Histórico completo</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Stepper */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              PASSO 1 DE 4
            </span>
            <span className="text-sm text-gray-500">Dados Iniciais</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-emerald-500 h-2 rounded-full"
              style={{ width: "25%" }}
            ></div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Criar Conta da Organização
          </h2>
          <p className="text-gray-600 mb-8">
            Comece a organizar os seus grupos financeiros hoje mesmo.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Organização
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder="Ex: Cooperativa de Poupança Mavalane"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Província
                </label>
                <select
                  value={form.provincia}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      provincia: e.target.value,
                      distrito: "",
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">Selecionar...</option>
                  {PROVINCIAS_MZ.map((p) => (
                    <option key={p.nome} value={p.nome}>
                      {p.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade / Distrito
                </label>
                <select
                  value={form.distrito}
                  onChange={(e) =>
                    setForm({ ...form, distrito: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
                  disabled={!form.provincia}
                  required
                >
                  <option value="">Selecionar...</option>
                  {distritos.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  +258
                </span>
                <input
                  type="tel"
                  value={form.telefone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      telefone: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  placeholder="84 XXX XXXX"
                  maxLength={9}
                  pattern="[82|83|84|85|86|87][0-9]{7}"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Enviaremos um código SMS para validação no passo seguinte.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition"
            >
              Próximo <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
            Já tem uma conta?{" "}
            <a
              href="/login"
              className="font-bold text-emerald-600 hover:underline"
            >
              Entrar agora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
