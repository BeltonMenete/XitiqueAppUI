export interface Collector {
	id: string;
	name: string;
	phone: string;
	email?: string;
	clients: number;
	monthlyVolume: number;
	difference: number;
	status: "active" | "suspended" | "inactive";
	avatar?: string;
	district?: string;
	province?: string;
}

export interface CollectorClient {
	id: string;
	name: string;
	phone: string;
	balance: number;
	status: "active" | "inactive";
}

export interface CollectionRecord {
	id: string;
	date: string;
	amount: number;
	clientId: string;
	clientName: string;
	status: "completed" | "pending" | "failed";
}

export interface CreateCollectorInput {
	name: string;
	phone: string;
	email?: string;
	district?: string;
	province?: string;
}

export interface UpdateCollectorInput {
	name?: string;
	phone?: string;
	email?: string;
	status?: Collector["status"];
}

export interface PaginationParams {
	page?: number;
	pageSize?: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}
