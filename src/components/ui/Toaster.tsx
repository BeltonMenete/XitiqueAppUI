import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
	return (
		<SonnerToaster
			position="bottom-right"
			toastOptions={{
				classNames: {
					toast: "bg-white border border-slate-200 shadow-lg",
					title: "text-sm font-semibold text-slate-900",
					description: "text-xs text-slate-600",
					actionButton: "bg-emerald-500 text-white hover:bg-emerald-600",
					cancelButton: "bg-slate-100 text-slate-700 hover:bg-slate-200",
					error: "bg-red-50 border-red-200",
					success: "bg-emerald-50 border-emerald-200",
					warning: "bg-amber-50 border-amber-200",
					info: "bg-teal-50 border-teal-200",
				},
			}}
		/>
	);
}
