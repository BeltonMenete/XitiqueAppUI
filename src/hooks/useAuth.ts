import type { UserRole } from "#/contexts/AuthContext";
import { useAuthContext } from "#/contexts/AuthContext";

export function useAuth() {
	const context = useAuthContext();
	return {
		...context,
		isAdmin: context.hasRole("admin"),
		isCollector: context.hasRole("collector"),
		isSaver: context.hasRole("saver"),
	};
}

export { useAuthContext };

export function usePermissions() {
	const { hasPermission, user } = useAuthContext();

	return {
		hasPermission,
		canManageSavers: hasPermission("manage_savers"),
		canManageCollectors: hasPermission("manage_collectors"),
		canApproveLoans: hasPermission("approve_loans"),
		canViewReports: hasPermission("view_reports"),
		canManageSettings: hasPermission("manage_settings"),
		canRegisterDeposits: hasPermission("register_deposits"),
		canRequestLoans: hasPermission("request_loans"),
		user,
	};
}

export function useRequireAuth(redirectPath: string = "/login") {
	const { isAuthenticated, user } = useAuthContext();

	// In a real implementation, this would redirect if not authenticated
	// For now, just return the status
	return {
		isAuthenticated,
		user,
		requireAuth: () => {
			if (!isAuthenticated) {
				window.location.href = redirectPath;
			}
		},
	};
}

export function useRequireRole(
	requiredRole: UserRole,
	redirectPath: string = "/login",
) {
	const { isAuthenticated, hasRole, user } = useAuthContext();

	return {
		isAuthenticated,
		hasRequiredRole: hasRole(requiredRole),
		user,
		requireRole: () => {
			if (!isAuthenticated || !hasRole(requiredRole)) {
				window.location.href = redirectPath;
			}
		},
	};
}
