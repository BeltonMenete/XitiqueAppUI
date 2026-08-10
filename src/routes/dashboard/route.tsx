// /routes/dashboard/route.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/dashboard')({
    component: DashboardRedirect,
});

function DashboardRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate({ to: '/dashboard/overview' });
    }, [navigate]);

    return null;
}
