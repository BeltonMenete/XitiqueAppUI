import type { ReactNode } from "react";
import { AuthImagePanel } from "#/components/AuthImagePanel";
import { APP_NAME } from "#/lib/constants";

interface AuthPageShellProps {
    title: string;
    description: string;
    headerAction?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
}

export function AuthPageShell({
    title,
    description,
    headerAction,
    footer,
    children,
}: AuthPageShellProps) {
    return (
        <div className="login-bg min-h-screen flex items-center justify-center p-4 overflow-hidden">
            <div className="relative w-full max-w-4xl">
                <AuthImagePanel />

                <div className="relative lg:ml-auto lg:w-1/2 bg-white/95 rounded-2xl shadow-xl p-6 lg:p-10 min-h-125 flex flex-col justify-between transition-all duration-500 ease-in-out">
                    <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center space-y-5">
                        <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                                <img
                                    loading="lazy"
                                    src="/xitique-logo.svg"
                                    alt={APP_NAME}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8"
                                />
                                <span className="text-2xl font-semibold text-gray-900">
                                    {APP_NAME}
                                </span>
                            </div>

                            {headerAction}
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 mb-0.5">
                                {title}
                            </h1>
                            <p className="text-gray-500 text-xs">{description}</p>
                        </div>

                        {children}

                        {footer ?? (
                            <p className="text-center text-[10px] text-gray-400 pt-3 border-t border-gray-100">
                                © {new Date().getFullYear()} {APP_NAME}. Todos os direitos
                                reservados.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
