// #/components/AuthImagePanel.tsx
import { useEffect, useRef, useState } from "react";

interface AuthImagePanelProps {
    src?: string;
    alt?: string;
}

/**
 * Painel lateral de imagem usado nas páginas de autenticação (login, forgot, etc).
 * Otimizado para carregamento rápido: fetchPriority alta + decoding assíncrono,
 * já que esta imagem é geralmente o maior elemento visível (LCP) na página.
 */
export function AuthImagePanel({
    src = "/xitique-left-panel.avif",
    alt = "Promo",
}: AuthImagePanelProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    const [status, setStatus] = useState<"loading" | "loaded" | "error">(
        "loading",
    );

    // Cobre o caso em que a imagem já vem do cache do browser e o evento
    // "load" dispara antes do React conseguir anexar o listener no JSX.
    useEffect(() => {
        if (imgRef.current?.complete) {
            setStatus("loaded");
        }
    }, []);

    return (
        <div className="hidden lg:block absolute inset-y-0 -left-6 w-3/5 rounded-2xl overflow-hidden bg-[#B7DDF0]">
            {/* Placeholder com shimmer enquanto a imagem carrega */}
            {status === "loading" && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#B7DDF0] via-[#9FD0E8] to-[#B7DDF0]" />
            )}

            {status !== "error" && (
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    // Prioridade máxima: esta imagem normalmente é o LCP (Largest Contentful Paint)
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    onLoad={() => setStatus("loaded")}
                    onError={() => setStatus("error")}
                    className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${status === "loaded" ? "opacity-100" : "opacity-0"
                        }`}
                />
            )}
        </div>
    );
}