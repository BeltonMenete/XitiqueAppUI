import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

export type UserRole = "admin" | "collector" | "saver";

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	organizationId: string;
	organizationName: string;
	permissions: string[];
}

interface LoginCredentials {
	email: string;
	password: string;
}

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	login: (credentials: LoginCredentials) => Promise<void>;
	logout: () => void;
	hasPermission: (permission: string) => boolean;
	hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = useCallback(async (credentials: LoginCredentials) => {
		// TODO: Replace with actual API call
		// Mock login for development
		await new Promise((resolve) => setTimeout(resolve, 500));

		// Mock user based on email (for development)
		let mockUser: User;
		if (credentials.email === "admin@xitique.com") {
			mockUser = {
				id: "admin-1",
				name: "Admin User",
				email: credentials.email,
				role: "admin",
				organizationId: "org-1",
				organizationName: "Xitique Central",
				permissions: [
					"view_dashboard",
					"manage_savers",
					"manage_collectors",
					"approve_loans",
					"view_reports",
					"manage_settings",
				],
			};
		} else if (credentials.email === "cobrador@xitique.com") {
			mockUser = {
				id: "collector-1",
				name: "Cobrador User",
				email: credentials.email,
				role: "collector",
				organizationId: "org-1",
				organizationName: "Xitique Central",
				permissions: [
					"view_dashboard",
					"manage_savers",
					"register_deposits",
					"request_loans",
				],
			};
		} else if (credentials.email === "cliente@xitique.com") {
			mockUser = {
				id: "saver-1",
				name: "Ticante User",
				email: credentials.email,
				role: "saver",
				organizationId: "org-1",
				organizationName: "Xitique Central",
				permissions: [
					"view_own_balance",
					"view_own_deposits",
					"view_own_loans",
					"request_loans",
				],
			};
		} else {
			throw new Error("Invalid credentials");
		}

		setUser(mockUser);
		setIsAuthenticated(true);
		localStorage.setItem("user", JSON.stringify(mockUser));
	}, []);

	const logout = useCallback(() => {
		setUser(null);
		setIsAuthenticated(false);
		localStorage.removeItem("user");
	}, []);

	const hasPermission = useCallback(
		(permission: string) => {
			return user?.permissions.includes(permission) || false;
		},
		[user],
	);

	const hasRole = useCallback(
		(role: UserRole) => {
			return user?.role === role;
		},
		[user],
	);

	// Load user from localStorage on mount
	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			try {
				const parsedUser = JSON.parse(storedUser) as User;
				setUser(parsedUser);
				setIsAuthenticated(true);
			} catch (error) {
				console.error("Failed to parse stored user:", error);
				localStorage.removeItem("user");
			}
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				login,
				logout,
				hasPermission,
				hasRole,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
}
