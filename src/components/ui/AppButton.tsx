import type { ButtonHTMLAttributes, ReactNode } from "react";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary";
}

export function AppButton({
    children,
    className = "",
    variant = "primary",
    ...props
}: AppButtonProps) {
    const variantClasses =
        variant === "primary"
            ? "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-200"
            : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-200";

    return (
        <button
            className={`inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
