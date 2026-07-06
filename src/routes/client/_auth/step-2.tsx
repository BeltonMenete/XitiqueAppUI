// /routes/client/_auth/step-2.tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
	ArrowLeft,
	ArrowRight,
	Landmark,
	ShieldCheck,
	User,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { ClientSidebar } from "#/components/ClientSidebar";
import { FormError } from "#/components/FormError";
import { APP_NAME } from "#/lib/constants";

export const Route = createFileRoute("/client/_auth/step-2")({
	component: StepTwoRegistration,
});

function StepTwoRegistration() {
	const navigate = useNavigate();

	// Estados do formulário (Dados do Perfil do Ticante)
	const [fullName, setFullName] = useState("");
	const [biNumber, setBiNumber] = useState("");
	const [gender, setGender] = useState("");

	// Estados de feedback visual e validação
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isShaking, setIsShaking] = useState(false);

	// Formatação e controle estrito em tempo real do BI (12 dígitos + 1 letra no final)
	const handleBiChange = (value: string) => {
		const cleaned = value.toUpperCase();

		// Se o comprimento for até 12, aceita apenas dígitos numéricos
		if (cleaned.length <= 12) {
			setBiNumber(cleaned.replace(/\D/g, ""));
		}
		// No 13º caractere, aceita apenas se o último caractere for uma letra (A-Z)
		else if (cleaned.length === 13) {
			const firstTwelve = cleaned.slice(0, 12).replace(/\D/g, "");
			const lastChar = cleaned.charAt(12).replace(/[^A-Z]/g, "");
			setBiNumber(firstTwelve + lastChar);
		}
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setErrors({});

		const newErrors: Record<string, string> = {};

		// Validação do Nome Completo
		if (!fullName.trim()) {
			newErrors.fullName = "O nome completo é obrigatório.";
		} else if (fullName.trim().split(/\s+/).length < 2) {
			newErrors.fullName = "Introduza pelo menos o seu nome e apelido.";
		}

		// Validação do BI (Opcional, mas se preenchido deve ser válido: 12 números + 1 letra)
		if (biNumber) {
			const biRegex = /^\d{12}[A-Z]$/;
			if (biNumber.length !== 13 || !biRegex.test(biNumber)) {
				newErrors.biNumber =
					"Formato de BI inválido. Deve conter 12 números e terminar com uma letra.";
			}
		}

		// Validação do Género
		if (!gender) {
			newErrors.gender = "Selecione o seu género.";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			setIsShaking(true);
			setTimeout(() => setIsShaking(false), 400);
			return;
		}

		console.log("Valores válidos do Passo 2:", { fullName, biNumber, gender });
		navigate({ to: "/client/step-3" });
	};

	return (
		<div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10 font-sans">
			{/* Estilos Globais CSS Inline Isolados do Efeito Shake */}
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

			<div className="w-full lg:w-1/2 flex flex-col justify-between p-4 sm:p-8 bg-gray-50/50 h-full overflow-y-auto relative">
				{/* Cabeçalho Utilitário Superior */}
				<div className="flex justify-between items-center w-full max-w-md mx-auto pt-1">
					<div className="flex items-center gap-2 select-none">
						<img
							alt="Xitique Logo"
							className="w-8 h-8 object-contain"
							src="/xitique-logo.svg"
						/>
						<span className="text-lg font-bold text-gray-900 tracking-tight">
							{APP_NAME}
						</span>
					</div>
					<button
						type="button"
						onClick={() => navigate({ to: "/client/step-1" })}
						className="text-xs font-semibold text-gray-500 hover:text-emerald-700 flex items-center gap-1 transition-all duration-300"
					>
						<ArrowLeft size={14} />
						Voltar
					</button>
				</div>

				{/* Bloco Centralizador do Formulário */}
				<div className="w-full max-w-md mx-auto my-auto py-2 transition-all ease-out animate-in fade-in slide-in-from-bottom-3 duration-500">
					{/* Indicador de Etapas (Stepper) */}
					<div className="flex items-center justify-between mb-1 select-none">
						<span className="text-[11px] font-extrabold text-emerald-700 tracking-wider">
							PASSO 2 DE 5
						</span>
						<span className="text-[11px] text-gray-400 font-medium">
							Perfil do Ticante
						</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-1 mb-4 overflow-hidden">
						<div
							className="bg-emerald-500 h-1 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
							style={{ width: "40%" }}
						/>
					</div>

					<h1 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">
						Dados Pessoais
					</h1>
					<div className="bg-emerald-50/50 rounded-xl p-3 border-l-4 border-emerald-600 mb-4">
						<p className="text-xs text-gray-600 font-body leading-relaxed">
							Preencha os seus dados para identificação e conformidade de
							segurança na plataforma.
						</p>
					</div>

					<form onSubmit={handleSubmit} noValidate className="space-y-3">
						{/* Campo de Nome Completo */}
						<div className="space-y-1">
							<label
								className="block text-xs font-semibold text-gray-700"
								htmlFor="fullName"
							>
								Nome Completo{" "}
								<span className="text-red-500 font-normal">*</span>
							</label>
							<div className="relative">
								<span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
									<User size={16} />
								</span>
								<input
									id="fullName"
									type="text"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									className={`w-full pl-11 pr-4 py-2.5 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm text-gray-900 ${
										errors.fullName
											? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
											: "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20"
									}`}
									placeholder="Ex: Albino Manuel"
								/>
							</div>
							<div className="h-3 flex items-center pl-1">
								<div
									className={`transition-opacity duration-150 ${errors.fullName ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.fullName ? "animate-shake-error" : ""}`}
								>
									<FormError message={errors.fullName || ""} />
								</div>
							</div>
						</div>

						{/* Campo do Número de BI */}
						<div className="space-y-1">
							<label
								className="block text-xs font-semibold text-gray-700"
								htmlFor="biNumber"
							>
								Número do BI{" "}
								<span className="text-gray-400 font-normal">(Opcional)</span>
							</label>
							<div className="relative">
								<span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 font-mono font-bold text-xs tracking-wider select-none">
									DOC
								</span>
								<input
									id="biNumber"
									type="text"
									maxLength={13}
									value={biNumber}
									onChange={(e) => handleBiChange(e.target.value)}
									className={`w-full pl-14 pr-4 py-2.5 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all font-mono text-sm tracking-wider text-gray-900 ${
										errors.biNumber
											? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
											: "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20"
									}`}
									placeholder="120101234567M"
								/>
							</div>
							<div className="h-3 flex items-center pl-1">
								<div
									className={`transition-opacity duration-150 ${errors.biNumber ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.biNumber ? "animate-shake-error" : ""}`}
								>
									<FormError message={errors.biNumber || ""} />
								</div>
							</div>
						</div>

						{/* Campo de Seleção de Gênero */}
						<div className="space-y-1">
							<label className="block text-xs font-semibold text-gray-700 select-none">
								Género <span className="text-red-500 font-normal">*</span>
							</label>
							<div className="grid grid-cols-2 gap-3">
								<label
									className={`flex items-center justify-center p-2.5 border rounded-xl cursor-pointer text-xs font-medium transition-all select-none ${
										gender === "M"
											? "border-emerald-500 bg-emerald-50/40 text-emerald-700 font-bold"
											: errors.gender
												? "border-red-300 bg-white text-gray-600 hover:bg-gray-50"
												: "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
									}`}
								>
									<input
										type="radio"
										name="gender"
										value="M"
										checked={gender === "M"}
										onChange={() => setGender("M")}
										className="sr-only"
									/>
									Masculino
								</label>
								<label
									className={`flex items-center justify-center p-2.5 border rounded-xl cursor-pointer text-xs font-medium transition-all select-none ${
										gender === "F"
											? "border-emerald-500 bg-emerald-50/40 text-emerald-700 font-bold"
											: errors.gender
												? "border-red-300 bg-white text-gray-600 hover:bg-gray-50"
												: "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
									}`}
								>
									<input
										type="radio"
										name="gender"
										value="F"
										checked={gender === "F"}
										onChange={() => setGender("F")}
										className="sr-only"
									/>
									Feminino
								</label>
							</div>
							<div className="h-3 flex items-center pl-1">
								<div
									className={`transition-opacity duration-150 ${errors.gender ? "opacity-100" : "opacity-0 invisible"} ${isShaking && errors.gender ? "animate-shake-error" : ""}`}
								>
									<FormError message={errors.gender || ""} />
								</div>
							</div>
						</div>

						{/* Botão Avançar */}
						<button
							type="submit"
							className="group/btn w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 mt-1 hover:shadow-lg hover:shadow-emerald-700/10"
						>
							<span>Continuar para Passo 3</span>
							<ArrowRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover/btn:translate-x-1" />
						</button>
					</form>
				</div>

				{/* Rodapé de Segurança Integrado */}
				<div className="pt-2 border-t border-gray-200/60 text-center w-full max-w-sm mx-auto">
					<div className="flex justify-center gap-x-6 gap-y-1 mb-2">
						<div className="flex items-center gap-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
							<ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
							Ambiente Seguro
						</div>
						<div className="flex items-center gap-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
							<Landmark className="h-3.5 w-3.5 text-emerald-500" />
							Banco Registrado
						</div>
					</div>
					<p className="text-[8px] text-gray-400 tracking-widest uppercase">
						© {new Date().getFullYear()} XITIQUE DIGITAL. TODOS OS DIREITOS
						RESERVADOS.
					</p>
				</div>
			</div>
		</div>
	);
}
