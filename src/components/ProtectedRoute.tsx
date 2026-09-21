import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "#/hooks/useAuth";

interface ProtectedRouteProps {
	children: React.ReactNode;
	allowedRoles?: ("admin" | "collector" | "saver")[];
}

export function ProtectedRoute({
	children,
	allowedRoles,
}: ProtectedRouteProps) {
	const { user, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate({ to: "/login" });
			return;
		}

		if (allowedRoles && user && !allowedRoles.includes(user.role)) {
			// Redirect to appropriate dashboard based on role
			if (user.role === "saver") {
				navigate({ to: "/client/dashboard" });
			} else {
				navigate({ to: "/dashboard/overview" });
			}
		}
	}, [isAuthenticated, user, allowedRoles, navigate]);

	if (!isAuthenticated) {
		return null;
	}

	if (allowedRoles && user && !allowedRoles.includes(user.role)) {
		return null;
	}

	return <>{children}</>;
}
