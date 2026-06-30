import NotFound from '#/components/NotFound';
import { OrgSidebar } from '#/components/OrgSidebar';
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/organization/_auth')({
    component: AuthLayout,
    notFoundComponent: () => <NotFound />
})

function AuthLayout() {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (location.pathname !== displayLocation.pathname) {
            setIsTransitioning(true);
            // Wait for the exit animation to finish before swapping the route content
            const timer = setTimeout(() => {
                setDisplayLocation(location);
                setIsTransitioning(false);
            }, 300); // 300ms matches the Tailwind duration-300 below

            return () => clearTimeout(timer);
        }
    }, [location, displayLocation]);

    return (
        <div className='h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10 font-sans'>
            {/* Left Panel: Completely static, never unmounts */}
            <OrgSidebar />

            {/* Right Panel: Animated Container */}
            <div className='w-full lg:w-1/2 bg-slate-50 relative'>
                <div
                    className={`h-full transition-all duration-300 ease-in-out transform ${isTransitioning
                        ? 'opacity-0 -translate-x-4' // Exit state: fades out and slides slightly left
                        : 'opacity-100 translate-x-0' // Enter state: fully visible
                        }`}
                >
                    {/* The key prop forces React to treat the new route as a fresh component */}
                    <div key={displayLocation.pathname} className='h-full'>
                        {/* We render the delayed location so it doesn't instantly snap */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
