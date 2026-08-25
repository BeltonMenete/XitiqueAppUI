export interface Saver {
	id: string;
	cardNumber: number;
	alphanumericId?: string;
	name: string;
	dailyAmount: number;
	organizationId: string;
	contact?: number;
	identityDocument?: string;
	pin?: string;
	occupation?: string;
	isActive: boolean;
	registrationDate: string;
	totalSaved: number;
	currentDebt: number;
	daysInCycle: number;
	status: "active" | "inactive" | "in_debt";
	organization?: {
		id: string;
		name: string;
	};
	paymentDays?: Array<{
		day: number;
		paid: boolean;
		amount?: number;
		collector?: string;
		isDebtPayment?: boolean;
		isInDebt?: boolean;
	}>;
}

export interface SaverDeposit {
	id: string;
	saverId: string;
	date: string;
	amount: number;
	status: "paid" | "partial" | "unpaid" | "deleted";
	day: number;
	collectorAgent?: string;
	deletionMotive?: string;
	createdAt: string;
	updatedAt: string;
}

export interface SaverLoan {
	id: string;
	saverId: string;
	amount: number;
	interest: number;
	daysInDebt: number;
	totalDays: number;
	status: "active" | "paid" | "defaulted";
	requestDate: string;
	dueDate: string;
	paidDate?: string;
}

export interface SaverHistory {
	id: string;
	saverId: string;
	action: string;
	details: string;
	performedBy: string;
	timestamp: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

export interface PaginationParams {
	page?: number;
	pageSize?: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	search?: string;
	status?: string;
	organizationId?: string;
}
