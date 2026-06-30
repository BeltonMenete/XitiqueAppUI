// #/components/AuthImagePanel.tsx

interface AuthImagePanelProps {
    src?: string;
    alt?: string;
}


export function AuthImagePanel({
    src = "/xitique-left-panel.avif",
    alt = "Promo",
}: AuthImagePanelProps) {
    return (
        <div className="hidden lg:block absolute inset-y-0 -left-6 w-3/5 rounded-2xl overflow-hidden opacity-100 translate-x-0 bg-emerald-900">
            <img
                src={src}
                alt={alt}
                // Prioridade máxima: esta imagem normalmente é o LCP (Largest Contentful Paint)
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
            />
        </div>
    );
}