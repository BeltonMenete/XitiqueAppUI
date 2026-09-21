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
	currentDebt: number; // Amount of unpaid loan
	daysInCycle: number;
	status: "active" | "inactive" | "in_debt"; // in_debt = has active unpaid loan
	organization?: {
		id: string;
		name: string;
	};
	paymentDays?: Array<{
		day: number;
		paid: boolean;
		amount?: number;
		collector?: string;
		isDebtPayment?: boolean; // true if this payment is repaying loan
		isInDebt?: boolean; // true if client has active loan
	}>;
	totalLoans?: number;
	totalInterest?: number;
	cycleHistory?: CycleClosure[];
	pendingDebtDays?: number[]; // Days marked for next cycle transfer
}

export interface CycleClosure {
	id: string;
	saverId: string;
	month: number;
	year: number;
	closedAt: string;
	closedBy: string;
	totalSaved: number;
	debtDaysTransferred: number;
	debtTransferred: number;
	rolloverToNextCycle: boolean;
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
	daysInDebt: number; // Days this loan has been unpaid
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
