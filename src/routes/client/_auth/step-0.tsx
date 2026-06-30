// /routes/client/_auth/step-0.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, type FormEvent } from "react";
import {
  ArrowRight,
  HelpCircle,
  Globe,
  MapPin,
  Building2,
  Users,
  ShieldCheck,
  Landmark,
} from "lucide-react";
import { APP_NAME } from "#/lib/constants";

// Importação do ficheiro dedicado com os dados geográficos oficiais de Moçambique
import { PROVINCIAS_MZ } from "#/data/mozambique";

export const Route = createFileRoute("/client/_auth/step-0")({
  component: StepZeroLocation,
});

// Mock de organizações ativas mapeadas por distrito incluindo Chókwè
const MOCK_ORGANIZATIONS = [
  {
    id: "org-1",
    name: "Xitique do Mercado Central de Nampula",
    manager: "Albertina Chirindza",
    district: "Nampula",
  },
  {
    id: "org-2",
    name: "Associação Comercial de Angoche",
    manager: "Elena Muthemba",
    district: "Angoche",
  },
  {
    id: "org-3",
    name: "Cooperativa de Poupança das Manas de Monapo",
    manager: "Isabel dos Santos",
    district: "Monapo",
  },
  {
    id: "org-4",
    name: "Rede de Micro-crédito Unida de Nacala",
    manager: "Jafar Abdul",
    district: "Nacala",
  },

  // Placeholders dedicados para o distrito de Chókwè
  {
    id: "org-chokwe-1",
    name: "Associação de Regantes do Limpopo (Xitique)",
    manager: "Sérgio Langa",
    district: "Chókwè",
  },
  {
    id: "org-chokwe-2",
    name: "Cooperativa Agrícola de Poupança de Chókwè",
    manager: "Maria Macuácua",
    district: "Chókwè",
  },
];

function StepZeroLocation() {
  const navigate = useNavigate();
  const [selectedProvinceName, setSelectedProvinceName] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedOrgId, setSelectedOrgId] = useState<string>("");

  // Encontra o objeto da província selecionada para extrair os seus distritos
  const availableDistricts = useMemo(() => {
    if (!selectedProvinceName) return [];
    const province = PROVINCIAS_MZ.find((p) => p.nome === selectedProvinceName);
    return province ? province.distritos : [];
  }, [selectedProvinceName]);

  // Filtra as organizações associadas ao distrito que o utilizador escolheu
  const availableOrganizations = useMemo(() => {
    if (!selectedDistrict) return [];
    // Normalização leve para garantir que encontra o match mesmo com pequenas variações de acentuação
    return MOCK_ORGANIZATIONS.filter(
      (org) =>
        org.district.toLowerCase().trim() ===
        selectedDistrict.toLowerCase().trim(),
    );
  }, [selectedDistrict]);

  const handleProvinceChange = (provinceName: string) => {
    setSelectedProvinceName(provinceName);
    setSelectedDistrict("");
    setSelectedOrgId("");
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setSelectedOrgId("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProvinceName || !selectedDistrict || !selectedOrgId) return;

    console.log("Região e Organização definidas:", {
      province: selectedProvinceName,
      district: selectedDistrict,
      organizationId: selectedOrgId,
    });

    // Segue para o Passo 1 do registo
    navigate({ to: "/client/step-1" });
  };

  return (
    <div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10 font-sans">
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 bg-slate-50 h-full overflow-y-auto relative">
        {/* Cabeçalho Utilitário Superior */}
        <div className="flex justify-between items-center w-full max-w-md mx-auto">
          <div className="flex items-center gap-2 select-none">
            <img
              alt="Xitique Logo"
              className="w-7 h-7 object-contain"
              src="/xitique-logo.svg"
            />
            <span className="text-base font-bold text-gray-950 tracking-tight">
              {APP_NAME}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase bg-emerald-50 px-2 py-0.5 rounded-md select-none">
              PASSO 0 DE 5
            </span>
            <button
              type="button"
              className="text-gray-400 hover:text-emerald-700 transition-colors"
            >
              <HelpCircle size={18} />
            </button>
            <button
              type="button"
              className="text-gray-400 hover:text-emerald-700 transition-colors"
            >
              <Globe size={18} />
            </button>
          </div>
        </div>

        {/* Bloco Central - Seleção Geográfica e Organizador */}
        <div className="w-full max-w-md mx-auto my-auto py-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <header className="mb-6 select-none">
            <h1 className="text-xl font-bold text-gray-900 mb-1.5 tracking-tight">
              Selecione a sua Região
            </h1>
            <p className="text-xs text-gray-500 leading-relaxed">
              Diga-nos onde está localizado para localizarmos os grupos e
              gestores autorizados da sua zona.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Seletor: Província */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 select-none">
                <MapPin size={12} className="text-emerald-600" /> Província
              </label>
              <select
                value={selectedProvinceName}
                onChange={(e) => handleProvinceChange(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
              >
                <option value="">Selecione a província...</option>
                {PROVINCIAS_MZ.map((p) => (
                  <option key={p.nome} value={p.nome}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Seletor: Distrito (Reativo) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 select-none">
                <Building2 size={12} className="text-emerald-600" /> Distrito
              </label>
              <select
                value={selectedDistrict}
                disabled={!selectedProvinceName}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none disabled:opacity-50 disabled:bg-gray-100"
              >
                <option value="">Selecione o distrito...</option>
                {availableDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Lista de Organizadores Ativos na Zona */}
            {selectedDistrict && (
              <div className="flex flex-col gap-2 pt-2 animate-in fade-in duration-300">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 select-none">
                  <Users size={12} className="text-emerald-600" /> Organizadores
                  Disponíveis
                </label>

                {availableOrganizations.length > 0 ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {availableOrganizations.map((org) => {
                      const isSelected = selectedOrgId === org.id;
                      return (
                        <div
                          key={org.id}
                          onClick={() => setSelectedOrgId(org.id)}
                          className={`p-3 rounded-xl cursor-pointer transition-all flex flex-col gap-0.5 border ${isSelected
                            ? "bg-emerald-900 text-white border-transparent shadow-sm"
                            : "bg-white text-gray-900 border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-emerald-600/20"
                            }`}
                        >
                          <span className="text-xs font-bold tracking-tight">
                            {org.name}
                          </span>
                          <span
                            className={`text-[10px] ${isSelected ? "text-emerald-200" : "text-gray-400"
                              }`}
                          >
                            Gestor:{" "}
                            <strong
                              className={
                                isSelected ? "text-white" : "text-gray-600"
                              }
                            >
                              {org.manager}
                            </strong>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100/50 text-center select-none">
                    <p className="text-[11px] text-amber-800 leading-relaxed font-medium font-body">
                      De momento, não encontramos organizações ativas neste
                      distrito. Experimente selecionar uma cidade ou distrito
                      vizinho.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Botão de Submissão Espaçado */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={
                  !selectedProvinceName || !selectedDistrict || !selectedOrgId
                }
                className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/40 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-[0.99]"
              >
                <span>Continuar para os meus dados</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        </div>

        {/* Rodapé de Segurança e Credibilidade */}
        <div className="pt-4 border-t border-gray-200/50 text-center w-full max-w-sm mx-auto select-none space-y-3">
          <div className="flex justify-center gap-5 text-gray-400">
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider">
              <Landmark size={12} className="text-emerald-600" />
              Rede Oficial
            </div>
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider">
              <ShieldCheck size={12} className="text-emerald-600" />
              Parceiros Verificados
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
