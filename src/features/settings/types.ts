export interface OrganizationSettings {
	id: string;
	name: string;
	email: string;
	phone: string;
	province: string;
	district: string;
	logo?: string;
	monthlyFee: number;
	cycleDay: number;
}

export interface NotificationSettings {
	emailNotifications: boolean;
	smsNotifications: boolean;
	pushNotifications: boolean;
	monthlyReport: boolean;
	lowBalanceAlert: boolean;
	overdueLoanAlert: boolean;
}

export interface PaymentSettings {
	acceptedMethods: ("bank" | "mobile" | "cash")[];
	bankAccount?: {
		bank: string;
		accountNumber: string;
		accountHolder: string;
	};
	mobileMoney?: {
		provider: "mcel" | "vodacom" | "tmcel";
		phoneNumber: string;
	};
}

export interface TeamSettings {
	admins: Array<{
		id: string;
		name: string;
		email: string;
		role: "admin" | "super_admin";
	}>;
	collectors: Array<{
		id: string;
		name: string;
		phone: string;
		active: boolean;
	}>;
}

export interface Settings {
	organization: OrganizationSettings;
	notifications: NotificationSettings;
	payments: PaymentSettings;
	team: TeamSettings;
}

export interface UpdateOrganizationInput {
	name?: string;
	email?: string;
	phone?: string;
	province?: string;
	district?: string;
	logo?: string;
	monthlyFee?: number;
	cycleDay?: number;
}

export interface UpdateNotificationsInput {
	emailNotifications?: boolean;
	smsNotifications?: boolean;
	pushNotifications?: boolean;
	monthlyReport?: boolean;
	lowBalanceAlert?: boolean;
	overdueLoanAlert?: boolean;
}

export interface UpdatePaymentsInput {
	acceptedMethods?: ("bank" | "mobile" | "cash")[];
	bankAccount?: {
		bank: string;
		accountNumber: string;
		accountHolder: string;
	};
	mobileMoney?: {
		provider: "mcel" | "vodacom" | "tmcel";
		phoneNumber: string;
	};
}
