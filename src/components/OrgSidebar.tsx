import { Landmark, Shield } from "lucide-react";

interface AuthSidebarProps {
	/**
	 * Texto opcional para customizar a mensagem de segurança inferior.
	 * Se não for passado, usa o texto padrão dos passos 1-4.
	 */
	securityMessage?: string;
}

export function OrgSidebar({ securityMessage }: AuthSidebarProps) {
	return (
		<div className="hidden lg:flex lg:w-1/2 bg-emerald-900 text-white p-8 xl:p-12 flex-col justify-between h-full relative overflow-hidden">
			{/* Círculo decorativo de fundo */}
			<div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none" />

			{/* Topo com Logotipo e Nome do App alinhados */}
			<div className="flex items-center gap-3 relative z-10 select-none">
				<img
					src="/Xitique-logo-transparent-compressed.svg"
					alt="Xitique Logo"
					className="w-9 h-9 object-contain"
				/>
				<span className="text-xl font-bold tracking-wide text-white">
					Xitique
				</span>
			</div>

			{/* Mensagem Principal Centralizada */}
			<div className="space-y-4 my-auto relative z-10">
				<h1 className="text-3xl xl:text-4xl font-bold leading-tight text-white">
					Modernize a gestão das suas poupanças com segurança e transparência.
				</h1>
				<p className="text-emerald-100 text-sm xl:text-base leading-relaxed max-w-md opacity-90">
					Organize grupos, acompanhe contribuições e mantenha a confiança dos
					participantes com um fluxo financeiro mais claro e digital.
				</p>
			</div>

			{/* Badges Inferiores Estáticas (Sem efeitos de hover) */}
			<div className="grid grid-cols-2 gap-3 mt-auto relative z-10">
				<div className="border border-emerald-700/60 bg-emerald-950/20 rounded-xl p-3.5 cursor-default">
					<Shield className="text-emerald-400 mb-1.5 h-5 w-5" />
					<p className="font-bold text-xs tracking-wider text-white">
						SEGURANÇA TOTAL
					</p>
					<p className="text-emerald-300 text-xs mt-0.5">
						{securityMessage || "Dados encriptados"}
					</p>
				</div>

				<div className="border border-emerald-700/60 bg-emerald-950/20 rounded-xl p-3.5 cursor-default">
					<Landmark className="text-emerald-400 mb-1.5 h-5 w-5" />
					<p className="font-bold text-xs tracking-wider text-white">
						AUDITÁVEL
					</p>
					<p className="text-emerald-300 text-xs mt-0.5">Histórico completo</p>
				</div>
			</div>
		</div>
	);
}
