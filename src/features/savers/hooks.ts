import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaginationParams, Saver } from "#/features/savers/types";
import type {
	CreateSaverInput,
	PatchSaverInput,
	RolloverToNextMonthInput,
	TerminateContractInput,
	UpdateSaverInput,
} from "#/features/savers/validation";
import { saversApi } from "./api";
import type { SaverDeposit, SaverHistory, SaverLoan } from "./types";

// Mock data functions for when API is not available
function getMockSaver(id: string): Saver {
	// Mock savers data matching the savers.tsx file
	const mockSavers: Record<string, Saver> = {
		"1": {
			id: "1",
			cardNumber: 1001,
			name: "Ana Chissano",
			contact: 841234567,
			dailyAmount: 235,
			totalSaved: 4230,
			currentDebt: 0,
			daysInCycle: 18,
			status: "active",
			registrationDate: "2024-01-15",
			alphanumericId: "A01",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(18),
		},
		"2": {
			id: "2",
			cardNumber: 1002,
			name: "Carlos Machava",
			contact: 842345678,
			dailyAmount: 500,
			totalSaved: 9000,
			currentDebt: 2200,
			daysInCycle: 18,
			status: "in_debt",
			registrationDate: "2024-01-16",
			alphanumericId: "A02",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(18),
		},
		"3": {
			id: "3",
			cardNumber: 1003,
			name: "Diana Mondlane",
			contact: 843456789,
			dailyAmount: 350,
			totalSaved: 6300,
			currentDebt: 0,
			daysInCycle: 18,
			status: "active",
			registrationDate: "2024-01-17",
			alphanumericId: "A03",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(18),
		},
		"4": {
			id: "4",
			cardNumber: 1004,
			name: "Eduardo Sitoe",
			contact: 844567890,
			dailyAmount: 120,
			totalSaved: 3000,
			currentDebt: 0,
			daysInCycle: 25,
			status: "in_debt",
			registrationDate: "2024-01-10",
			alphanumericId: "A04",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(25),
		},
		"5": {
			id: "5",
			cardNumber: 1005,
			name: "Fátima Machel",
			contact: 845678901,
			dailyAmount: 500,
			totalSaved: 12500,
			currentDebt: 3000,
			daysInCycle: 25,
			status: "in_debt",
			registrationDate: "2024-01-08",
			alphanumericId: "A05",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(25),
		},
		"6": {
			id: "6",
			cardNumber: 1006,
			name: "Graça Machel",
			contact: 846789012,
			dailyAmount: 220,
			totalSaved: 4400,
			currentDebt: 0,
			daysInCycle: 20,
			status: "in_debt",
			registrationDate: "2024-03-15",
			alphanumericId: "A06",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(20),
		},
		"7": {
			id: "7",
			cardNumber: 1007,
			name: "Henrique Chipande",
			contact: 847890123,
			dailyAmount: 175,
			totalSaved: 4200,
			currentDebt: 525,
			daysInCycle: 24,
			status: "in_debt",
			registrationDate: "2024-02-05",
			alphanumericId: "A07",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(24),
		},
		"8": {
			id: "8",
			cardNumber: 1008,
			name: "Isabel Muendane",
			contact: 848901234,
			dailyAmount: 300,
			totalSaved: 7500,
			currentDebt: 0,
			daysInCycle: 25,
			status: "in_debt",
			registrationDate: "2024-01-18",
			alphanumericId: "A08",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(25),
		},
		"9": {
			id: "9",
			cardNumber: 1009,
			name: "João Muwamba",
			contact: 849012345,
			dailyAmount: 275,
			totalSaved: 6600,
			currentDebt: 1375,
			daysInCycle: 24,
			status: "in_debt",
			registrationDate: "2024-02-25",
			alphanumericId: "A09",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(24),
		},
		"10": {
			id: "10",
			cardNumber: 1010,
			name: "Kátia Nhampossa",
			contact: 850123456,
			dailyAmount: 1500,
			totalSaved: 30000,
			currentDebt: 7500,
			daysInCycle: 20,
			status: "in_debt",
			registrationDate: "2024-01-22",
			alphanumericId: "A10",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(20),
		},
		"11": {
			id: "11",
			cardNumber: 1011,
			name: "Lídia Macamo",
			contact: 851234567,
			dailyAmount: 190,
			totalSaved: 5700,
			currentDebt: 0,
			daysInCycle: 30,
			status: "inactive",
			registrationDate: "2023-12-15",
			alphanumericId: "A11",
			organizationId: "org-1",
			isActive: false,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(30),
		},
		"12": {
			id: "12",
			cardNumber: 1012,
			name: "Moisés Nhleko",
			contact: 852345678,
			dailyAmount: 160,
			totalSaved: 3200,
			currentDebt: 480,
			daysInCycle: 20,
			status: "in_debt",
			registrationDate: "2024-02-28",
			alphanumericId: "A12",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(20),
		},
		"13": {
			id: "13",
			cardNumber: 1013,
			name: "Norberto Macuácua",
			contact: 853456789,
			dailyAmount: 235,
			totalSaved: 4700,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-03-25",
			alphanumericId: "A13",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(20),
		},
		"14": {
			id: "14",
			cardNumber: 1014,
			name: "Sofia Munguambe",
			contact: 854567890,
			dailyAmount: 500,
			totalSaved: 12500,
			currentDebt: 3000,
			daysInCycle: 25,
			status: "in_debt",
			registrationDate: "2024-01-08",
			alphanumericId: "A14",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(25),
		},
		"15": {
			id: "15",
			cardNumber: 1015,
			name: "Tomás Nhapule",
			contact: 855678901,
			dailyAmount: 220,
			totalSaved: 4400,
			currentDebt: 0,
			daysInCycle: 20,
			status: "in_debt",
			registrationDate: "2024-03-15",
			alphanumericId: "A15",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(20),
		},
		"16": {
			id: "16",
			cardNumber: 1016,
			name: "Ussene Sitoe",
			contact: 856789012,
			dailyAmount: 175,
			totalSaved: 4200,
			currentDebt: 525,
			daysInCycle: 24,
			status: "in_debt",
			registrationDate: "2024-02-05",
			alphanumericId: "A16",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(24),
		},
		"17": {
			id: "17",
			cardNumber: 1017,
			name: "Verónica Muale",
			contact: 857890123,
			dailyAmount: 300,
			totalSaved: 7500,
			currentDebt: 0,
			daysInCycle: 25,
			status: "in_debt",
			registrationDate: "2024-01-18",
			alphanumericId: "A17",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(25),
		},
		"18": {
			id: "18",
			cardNumber: 1018,
			name: "William Mujojo",
			contact: 858901234,
			dailyAmount: 275,
			totalSaved: 6600,
			currentDebt: 1375,
			daysInCycle: 24,
			status: "in_debt",
			registrationDate: "2024-02-25",
			alphanumericId: "A18",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(24),
		},
		"19": {
			id: "19",
			cardNumber: 1019,
			name: "Xavier Mondlane",
			contact: 859012345,
			dailyAmount: 1500,
			totalSaved: 30000,
			currentDebt: 7500,
			daysInCycle: 20,
			status: "in_debt",
			registrationDate: "2024-01-22",
			alphanumericId: "A19",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(20),
		},
		"20": {
			id: "20",
			cardNumber: 1020,
			name: "Yolanda Nkuna",
			contact: 860123456,
			dailyAmount: 190,
			totalSaved: 5700,
			currentDebt: 0,
			daysInCycle: 30,
			status: "inactive",
			registrationDate: "2023-12-15",
			alphanumericId: "A20",
			organizationId: "org-1",
			isActive: false,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(30),
		},
		"21": {
			id: "21",
			cardNumber: 1021,
			name: "Zacarias Mabjaia",
			contact: 861234567,
			dailyAmount: 160,
			totalSaved: 3200,
			currentDebt: 480,
			daysInCycle: 20,
			status: "in_debt",
			registrationDate: "2024-02-28",
			alphanumericId: "A21",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(20),
		},
		"22": {
			id: "22",
			cardNumber: 1022,
			name: "Amélia Júnior",
			contact: 862345678,
			dailyAmount: 235,
			totalSaved: 4700,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-03-25",
			alphanumericId: "A22",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(20),
		},
		"23": {
			id: "23",
			cardNumber: 1023,
			name: "Benedito Cossa",
			contact: 863456789,
			dailyAmount: 160,
			totalSaved: 3200,
			currentDebt: 480,
			daysInCycle: 20,
			status: "in_debt",
			registrationDate: "2024-02-28",
			alphanumericId: "A23",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(20),
		},
		"24": {
			id: "24",
			cardNumber: 1024,
			name: "Catarina Jóia",
			contact: 864567890,
			dailyAmount: 235,
			totalSaved: 4700,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-03-25",
			alphanumericId: "A24",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(20),
		},
		"25": {
			id: "25",
			cardNumber: 1025,
			name: "Domingos Mondlane",
			contact: 865678901,
			dailyAmount: 450,
			totalSaved: 11250,
			currentDebt: 2700,
			daysInCycle: 25,
			status: "in_debt",
			registrationDate: "2024-01-14",
			alphanumericId: "A25",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: generatePaymentDays(25),
		},
	};

	return (
		mockSavers[id] || {
			id: id,
			cardNumber: Number(id) || 1,
			name: "Maria Silva",
			contact: 841234567,
			dailyAmount: 100,
			totalSaved: 1800,
			currentDebt: 500,
			daysInCycle: 18,
			status: "in_debt",
			registrationDate: "2023-01-15",
			alphanumericId: "A01",
			organizationId: "1",
			isActive: true,
			organization: { id: "1", name: "Mercado Central, Maputo" },
			paymentDays: generatePaymentDays(18),
		}
	);
}

function getMockDeposits(id: string): SaverDeposit[] {
	return Array.from({ length: 18 }, (_, i) => ({
		id: `dep-${i + 1}`,
		saverId: id,
		date: `2023-10-${String(i + 1).padStart(2, "0")}`,
		amount: 100,
		status: i < 15 ? "paid" : i < 17 ? "partial" : "unpaid",
		day: i + 1,
		createdAt: "2023-10-18T14:30:00Z",
		updatedAt: "2023-10-18T14:30:00Z",
	}));
}

function getMockLoans(id: string): SaverLoan[] {
	return [
		{
			id: "loan-001",
			saverId: id,
			amount: 500,
			interest: 50,
			daysInDebt: 5,
			totalDays: 30,
			status: "active",
			requestDate: "2023-10-15",
			dueDate: "2023-11-14",
		},
	];
}

function getMockHistory(id: string): SaverHistory[] {
	return [
		{
			id: "hist-001",
			saverId: id,
			action: "Depósito registado",
			timestamp: "2023-10-18 14:30",
			details: "100 MZN",
			performedBy: "Admin",
		},
		{
			id: "hist-002",
			saverId: id,
			action: "Empréstimo solicitado",
			timestamp: "2023-10-15 10:00",
			details: "500 MZN",
			performedBy: "Admin",
		},
	];
}

// Utility functions for alphanumeric IDs
export function generateAlphanumericId(index: number): string {
	const letter = String.fromCharCode(65 + Math.floor(index / 99)); // A, B, C, etc.
	const number = (index % 99) + 1;
	return `${letter}${number.toString().padStart(2, "0")}`;
}

export function generatePaymentDays(daysInCycle: number): Array<{
	day: number;
	paid: boolean;
	amount?: number;
	collector?: string;
	isDebtPayment?: boolean;
	isInDebt?: boolean;
}> {
	const days = [];
	for (let i = 1; i <= 30; i++) {
		const paid = i <= daysInCycle && Math.random() > 0.3;
		days.push({
			day: i,
			paid,
			amount: paid ? 100 : 0,
			collector: paid ? "Arsénio Matusse" : undefined,
			isDebtPayment: paid && i <= 3,
			isInDebt: !paid && i <= daysInCycle + 5,
		});
	}
	return days;
}

export function enrichSaversWithAlphanumericIds(savers: Saver[]): Saver[] {
	return savers.map((saver, index) => ({
		...saver,
		alphanumericId: saver.alphanumericId || generateAlphanumericId(index),
		paymentDays: saver.paymentDays || generatePaymentDays(saver.daysInCycle),
	}));
}

// Query keys
export const SAVER_KEYS = {
	all: ["savers"] as const,
	lists: () => [...SAVER_KEYS.all, "list"] as const,
	list: (params: PaginationParams) => [...SAVER_KEYS.lists(), params] as const,
	details: () => [...SAVER_KEYS.all, "detail"] as const,
	detail: (id: string) => [...SAVER_KEYS.details(), id] as const,
	deposits: (id: string) => [...SAVER_KEYS.detail(id), "deposits"] as const,
	loans: (id: string) => [...SAVER_KEYS.detail(id), "loans"] as const,
	history: (id: string) => [...SAVER_KEYS.detail(id), "history"] as const,
};

// Queries
export function useSavers(
	params: PaginationParams = { page: 1, pageSize: 20 },
) {
	return useQuery({
		queryKey: SAVER_KEYS.list(params),
		queryFn: () => saversApi.getAll(params),
		staleTime: 5 * 60 * 1000, // 5 minutos
	});
}

export function useSaver(id: string) {
	return useQuery({
		queryKey: SAVER_KEYS.detail(id),
		queryFn: async () => {
			try {
				return await saversApi.getById(id);
			} catch (_error) {
				// Return mock data if API fails
				return getMockSaver(id);
			}
		},
		enabled: !!id,
		staleTime: 2 * 60 * 1000, // 2 minutos
	});
}

export function useSaverDeposits(id: string, month?: number, year?: number) {
	const params = month && year ? { month, year } : {};
	return useQuery({
		queryKey: SAVER_KEYS.deposits(id),
		queryFn: async () => {
			try {
				return await saversApi.getDeposits(id, params);
			} catch (_error) {
				// Return mock data if API fails
				return getMockDeposits(id);
			}
		},
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}

// Hook to get deposit for a specific day
export function useSaverDayDeposit(
	saverId: string,
	day: number,
	month: number,
	year: number,
) {
	return useQuery({
		queryKey: [...SAVER_KEYS.deposits(saverId), day, month, year],
		queryFn: async () => {
			try {
				const deposits = await saversApi.getDeposits(saverId, { month, year });
				return deposits.find((d) => d.day === day) || null;
			} catch (_error) {
				// Return mock data if API fails
				const mockDeposits = getMockDeposits(saverId);
				return mockDeposits.find((d) => d.day === day) || null;
			}
		},
		enabled: !!saverId && !!day && !!month && !!year,
		staleTime: 5 * 60 * 1000,
	});
}

export function useSaverLoans(id: string) {
	return useQuery({
		queryKey: SAVER_KEYS.loans(id),
		queryFn: async () => {
			try {
				return await saversApi.getLoans(id);
			} catch (_error) {
				// Return mock data if API fails
				return getMockLoans(id);
			}
		},
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}

export function useSaverHistory(id: string) {
	return useQuery({
		queryKey: SAVER_KEYS.history(id),
		queryFn: async () => {
			try {
				return await saversApi.getHistory(id);
			} catch (_error) {
				// Return mock data if API fails
				return getMockHistory(id);
			}
		},
		enabled: !!id,
		staleTime: 10 * 60 * 1000, // 10 minutos
	});
}

// Mutations
export function useCreateSaver() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateSaverInput) => saversApi.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.lists() });
		},
	});
}

export function useUpdateSaver(id: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdateSaverInput) => saversApi.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.detail(id) });
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.lists() });
		},
	});
}

export function usePatchSaver(id: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: PatchSaverInput) => saversApi.patch(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.detail(id) });
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.lists() });
		},
	});
}

export function useDeleteSaver() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => saversApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.lists() });
		},
	});
}

export function useRolloverToNextMonth(id: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: RolloverToNextMonthInput) =>
			saversApi.rollover(id, {
				month: data.Month,
				year: data.Year,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.detail(id) });
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.deposits(id) });
		},
	});
}

export function useTerminateContract(id: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: TerminateContractInput) =>
			saversApi.terminate(id, {
				month: data.Month,
				year: data.Year,
				terminationReason: data.TerminationReason,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.detail(id) });
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.lists() });
		},
	});
}
