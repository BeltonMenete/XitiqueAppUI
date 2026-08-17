import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import "../styles.css";
import NotFound from "#/components/NotFound";
import { Toaster } from "#/components/ui/Toaster";

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: () => <NotFound />,
});
// ok

function RootComponent() {
	return (
		<>
			<Outlet />
			<Toaster />
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "TanStack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</>
	);
}
