import ReactDOM from "react-dom/client";
import "ldrs/react/Ring2.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "#/router";
import { queryClient } from "#/lib/query-client";
import { ErrorBoundary } from "#/components/ErrorBoundary";
import "#/styles.css";

const router = getRouter();
const rootElement = document.getElementById("app");

if (!rootElement) {
	throw new Error("Root element #app was not found.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
	<QueryClientProvider client={queryClient}>
		<ErrorBoundary>
			<RouterProvider router={router} />
		</ErrorBoundary>
	</QueryClientProvider>,
);
