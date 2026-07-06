import { createFileRoute } from "@tanstack/react-router";
import NotFound from "#/components/NotFound";
import { OrgSidebar } from "#/components/OrgSidebar";
import { RouteTransitionLayout } from "#/components/RouteTransitionLayout";

export const Route = createFileRoute("/organization/_auth")({
	component: OrganizationAuthLayout,
	notFoundComponent: () => <NotFound />,
});

function OrganizationAuthLayout() {
	return <RouteTransitionLayout sidebar={OrgSidebar} />;
}
