import { Outlet, useLocation } from "@tanstack/react-router";
import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";

interface RouteTransitionLayoutProps {
	sidebar: ComponentType;
}

export function RouteTransitionLayout({
	sidebar: Sidebar,
}: RouteTransitionLayoutProps) {
	const location = useLocation();
	const [displayLocation, setDisplayLocation] = useState(location);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		if (location.pathname === displayLocation.pathname) {
			return;
		}

		setIsTransitioning(true);
		const timer = window.setTimeout(() => {
			setDisplayLocation(location);
			setIsTransitioning(false);
		}, 300);

		return () => window.clearTimeout(timer);
	}, [location, displayLocation.pathname]);

	const contentKey = useMemo(
		() => displayLocation.pathname,
		[displayLocation.pathname],
	);

	return (
		<div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10 font-sans">
			<Sidebar />

			<div className="w-full lg:w-1/2 bg-slate-50 relative">
				<div
					className={`h-full transition-all duration-300 ease-in-out transform ${
						isTransitioning
							? "opacity-0 -translate-x-4"
							: "opacity-100 translate-x-0"
					}`}
				>
					<div key={contentKey} className="h-full">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
