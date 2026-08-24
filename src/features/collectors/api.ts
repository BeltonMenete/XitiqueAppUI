import type {
	CollectionRecord,
	Collector,
	CollectorClient,
	CreateCollectorInput,
	PaginationParams,
	UpdateCollectorInput,
} from "./types";

// Mock data
const mockCollectors: Collector[] = [
	{
		id: "1",
		name: "Arsénio Matusse",
		phone: "+258 84 123 4567",
		email: "arsenio@example.com",
		clients: 47,
		monthlyVolume: 125400,
		difference: 1200,
		status: "active",
		district: "Nampula",
		province: "Nampula",
	},
	{
		id: "2",
		name: "Célia Mondlane",
		phone: "+258 82 987 6543",
		email: "celia@example.com",
		clients: 32,
		monthlyVolume: 84200,
		difference: -4500,
		status: "suspended",
		district: "Maputo",
		province: "Maputo Cidade",
	},
	{
		id: "3",
		name: "Filipe Nyusi Jr.",
		phone: "+258 87 555 0192",
		email: "filipe@example.com",
		clients: 58,
		monthlyVolume: 156000,
		difference: 0,
		status: "active",
		district: "Beira",
		province: "Sofala",
	},
	{
		id: "4",
		name: "Maria Machava",
		phone: "+258 86 444 5678",
		email: "maria@example.com",
		clients: 41,
		monthlyVolume: 105800,
		difference: 800,
		status: "active",
		district: "Xai-Xai",
		province: "Gaza",
	},
	{
		id: "5",
		name: "João Sitoe",
		phone: "+258 85 333 4455",
		email: "joao@example.com",
		clients: 35,
		monthlyVolume: 89000,
		difference: -1500,
		status: "suspended",
		district: "Quelimane",
		province: "Zambézia",
	},
];

const mockClients: CollectorClient[] = [
	{
		id: "c1",
		name: "Maria Silva",
		phone: "+258 84 111 2222",
		balance: 9000,
		status: "active",
	},
	{
		id: "c2",
		name: "João Machava",
		phone: "+258 82 333 4444",
		balance: 5000,
		status: "active",
	},
	{
		id: "c3",
		name: "Ana Santos",
		phone: "+258 87 555 6666",
		balance: 12000,
		status: "inactive",
	},
];

const mockCollectionRecords: CollectionRecord[] = [
	{
		id: "r1",
		date: "2024-05-15",
		amount: 500,
		clientId: "c1",
		clientName: "Maria Silva",
		status: "completed",
	},
	{
		id: "r2",
		date: "2024-05-15",
		amount: 500,
		clientId: "c2",
		clientName: "João Machava",
		status: "completed",
	},
	{
		id: "r3",
		date: "2024-05-14",
		amount: 500,
		clientId: "c3",
		clientName: "Ana Santos",
		status: "pending",
	},
];

// Collector API endpoints (mock)
export const collectorsApi = {
	// Get all collectors with pagination
	getAll: (params?: PaginationParams) => {
		const page = params?.page || 1;
		const pageSize = params?.pageSize || 10;
		const start = (page - 1) * pageSize;
		const end = start + pageSize;

		return Promise.resolve({
			data: mockCollectors.slice(start, end),
			total: mockCollectors.length,
			page,
			pageSize,
			totalPages: Math.ceil(mockCollectors.length / pageSize),
		});
	},

	// Get collector by ID
	getById: (id: string) => {
		const collector = mockCollectors.find((c) => c.id === id);
		return Promise.resolve(collector);
	},

	// Create new collector
	create: (data: CreateCollectorInput) => {
		const newCollector: Collector = {
			id: String(mockCollectors.length + 1),
			...data,
			clients: 0,
			monthlyVolume: 0,
			difference: 0,
			status: "active",
		};
		mockCollectors.push(newCollector);
		return Promise.resolve(newCollector);
	},

	// Update collector
	update: (id: string, data: UpdateCollectorInput) => {
		const index = mockCollectors.findIndex((c) => c.id === id);
		if (index !== -1) {
			mockCollectors[index] = { ...mockCollectors[index], ...data };
			return Promise.resolve(mockCollectors[index]);
		}
		return Promise.reject(new Error("Collector not found"));
	},

	// Delete collector
	delete: (id: string) => {
		const index = mockCollectors.findIndex((c) => c.id === id);
		if (index !== -1) {
			mockCollectors.splice(index, 1);
			return Promise.resolve(true);
		}
		return Promise.reject(new Error("Collector not found"));
	},

	// Get collector clients
	getClients: (_collectorId: string) => {
		return Promise.resolve(mockClients);
	},

	// Get collection records
	getCollectionRecords: (_collectorId: string) => {
		return Promise.resolve(mockCollectionRecords);
	},

	// Search collectors
	search: (query: string, params?: PaginationParams) => {
		const filtered = mockCollectors.filter(
			(c) =>
				c.name.toLowerCase().includes(query.toLowerCase()) ||
				c.phone.includes(query),
		);
		const page = params?.page || 1;
		const pageSize = params?.pageSize || 10;
		const start = (page - 1) * pageSize;
		const end = start + pageSize;

		return Promise.resolve({
			data: filtered.slice(start, end),
			total: filtered.length,
			page,
			pageSize,
			totalPages: Math.ceil(filtered.length / pageSize),
		});
	},
};
