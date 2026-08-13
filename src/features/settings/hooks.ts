import { useState, useEffect } from "react";
import type {
	Settings,
	UpdateNotificationsInput,
	UpdateOrganizationInput,
	UpdatePaymentsInput,
} from "./types";

// Mock data
const mockSettings: Settings = {
	organization: {
		id: "org-1",
		name: "Xitique do Mercado Central",
		email: "contato@xitique-mercado.mz",
		phone: "+258 84 123 4567",
		province: "Maputo Cidade",
		district: "Maputo",
		monthlyFee: 100,
		cycleDay: 15,
	},
	notifications: {
		emailNotifications: true,
		smsNotifications: false,
		pushNotifications: true,
		monthlyReport: true,
		lowBalanceAlert: true,
		overdueLoanAlert: true,
	},
	payments: {
		acceptedMethods: ["bank", "mobile", "cash"],
		bankAccount: {
			bank: "BIM",
			accountNumber: "1234567890",
			accountHolder: "Xitique do Mercado Central",
		},
		mobileMoney: {
			provider: "mcel",
			phoneNumber: "+258 84 123 4567",
		},
	},
	team: {
		admins: [
			{
				id: "admin-1",
				name: "João Administrator",
				email: "joao@xitique-mercado.mz",
				role: "super_admin",
			},
		],
		collectors: [
			{
				id: "col-1",
				name: "Arsénio Matusse",
				phone: "+258 84 123 4567",
				active: true,
			},
			{
				id: "col-2",
				name: "Célia Mondlane",
				phone: "+258 82 987 6543",
				active: true,
			},
		],
	},
};

// Hooks for settings management
export function useSettings() {
	const [settings, setSettings] = useState<Settings | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Load from localStorage or use mock
		const saved = localStorage.getItem("settings");
		if (saved) {
			setSettings(JSON.parse(saved));
		} else {
			setSettings(mockSettings);
		}
		setIsLoading(false);
	}, []);

	const updateOrganization = (data: UpdateOrganizationInput) => {
		if (!settings) return;
		const updated = {
			...settings,
			organization: { ...settings.organization, ...data },
		};
		setSettings(updated);
		localStorage.setItem("settings", JSON.stringify(updated));
	};

	const updateNotifications = (data: UpdateNotificationsInput) => {
		if (!settings) return;
		const updated = {
			...settings,
			notifications: { ...settings.notifications, ...data },
		};
		setSettings(updated);
		localStorage.setItem("settings", JSON.stringify(updated));
	};

	const updatePayments = (data: UpdatePaymentsInput) => {
		if (!settings) return;
		const updated = {
			...settings,
			payments: { ...settings.payments, ...data },
		};
		setSettings(updated);
		localStorage.setItem("settings", JSON.stringify(updated));
	};

	const resetSettings = () => {
		setSettings(mockSettings);
		localStorage.setItem("settings", JSON.stringify(mockSettings));
	};

	return {
		settings,
		isLoading,
		updateOrganization,
		updateNotifications,
		updatePayments,
		resetSettings,
	};
}
