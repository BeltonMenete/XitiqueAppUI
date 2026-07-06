import { createFileRoute } from "@tanstack/react-router";
import { ClientSidebar } from "#/components/ClientSidebar";
import NotFound from "#/components/NotFound";
import { RouteTransitionLayout } from "#/components/RouteTransitionLayout";

export const Route = createFileRoute("/client/_auth")({
	component: ClientAuthLayout,
	notFoundComponent: () => <NotFound />,
});

function ClientAuthLayout() {
	return <RouteTransitionLayout sidebar={ClientSidebar} />;
}
