import type { ReactNode } from "react";

interface PageSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export function PageSection({ title, description, children }: PageSectionProps) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 space-y-1">
                <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                {description ? <p className="text-sm text-slate-500">{description}</p> : null}
            </div>
            {children}
        </section>
    );
}
