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
			name: "Carlos Mondlane",
			contact: 841234567,
			dailyAmount: 500,
			totalSaved: 7500,
			currentDebt: 0,
			daysInCycle: 15,
			status: "active",
			registrationDate: "2024-09-15",
			alphanumericId: "A01",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 5000,
			totalInterest: 750,
			paymentDays: Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 8;
				return {
					day,
					paid,
					amount: paid ? 500 : 0,
					collector: paid ? "Arsénio Matusse" : undefined,
				};
			}),
		},
		"2": {
			id: "2",
			cardNumber: 1002,
			name: "Ana Vilanculos",
			contact: 842345678,
			dailyAmount: 250,
			totalSaved: 2500,
			currentDebt: 1500,
			daysInCycle: 5,
			status: "in_debt",
			registrationDate: "2024-10-01",
			alphanumericId: "A02",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 3000,
			totalInterest: 450,
			paymentDays: Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 5 && i % 2 === 0;
				const isDebtPayment = i === 2;
				const isInDebt = true;
				return {
					day,
					paid,
					amount: paid ? 250 : 0,
					collector: paid ? "Célia Mondlane" : undefined,
					isDebtPayment,
					isInDebt,
				};
			}),
		},
		"3": {
			id: "3",
			cardNumber: 1003,
			name: "Bento Sitoe",
			contact: 843456789,
			dailyAmount: 300,
			totalSaved: 6600,
			currentDebt: 0,
			daysInCycle: 22,
			status: "active",
			registrationDate: "2024-11-10",
			alphanumericId: "A03",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 22,
				amount: i < 22 ? 300 : 0,
				collector: i < 22 ? "Filipe Nyusi Jr." : undefined,
			})),
		},
		"4": {
			id: "4",
			cardNumber: 1004,
			name: "Eduarda Langa",
			contact: 844567890,
			dailyAmount: 1000,
			totalSaved: 12000,
			currentDebt: 0,
			daysInCycle: 12,
			status: "active",
			registrationDate: "2024-09-10",
			alphanumericId: "A04",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 8000,
			totalInterest: 1200,
			paymentDays: Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 12;
				return {
					day,
					paid,
					amount: paid ? 1000 : 0,
					collector: paid ? "Arsénio Matusse" : undefined,
				};
			}),
		},
		"5": {
			id: "5",
			cardNumber: 1005,
			name: "Geraldo Mucavele",
			contact: 845678901,
			dailyAmount: 150,
			totalSaved: 4500,
			currentDebt: 0,
			daysInCycle: 30,
			status: "active",
			registrationDate: "2024-12-05",
			alphanumericId: "A05",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 28,
				amount: i < 28 ? 150 : 0,
				collector: i < 28 ? "Célia Mondlane" : undefined,
			})),
		},
		"6": {
			id: "6",
			cardNumber: 1006,
			name: "Isabel Tembe",
			contact: 846789012,
			dailyAmount: 200,
			totalSaved: 5000,
			currentDebt: 0,
			daysInCycle: 25,
			status: "active",
			registrationDate: "2024-10-15",
			alphanumericId: "A06",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 25,
				amount: i < 25 ? 200 : 0,
				collector: i < 25 ? "Filipe Nyusi Jr." : undefined,
			})),
		},
		"7": {
			id: "7",
			cardNumber: 1007,
			name: "João Machava",
			contact: 847890123,
			dailyAmount: 400,
			totalSaved: 8000,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-09-20",
			alphanumericId: "A07",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 6000,
			totalInterest: 900,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 12,
				amount: i < 12 ? 400 : 0,
				collector: i < 12 ? "Arsénio Matusse" : undefined,
			})),
		},
		"8": {
			id: "8",
			cardNumber: 1008,
			name: "Luisa Macamo",
			contact: 848901234,
			dailyAmount: 150,
			totalSaved: 3600,
			currentDebt: 0,
			daysInCycle: 24,
			status: "active",
			registrationDate: "2024-11-01",
			alphanumericId: "A08",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 24,
				amount: i < 24 ? 150 : 0,
				collector: i < 24 ? "Célia Mondlane" : undefined,
			})),
		},
		"9": {
			id: "9",
			cardNumber: 1009,
			name: "Mário Macie",
			contact: 849012345,
			dailyAmount: 750,
			totalSaved: 15000,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-09-12",
			alphanumericId: "A09",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 10000,
			totalInterest: 1500,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 15,
				amount: i < 15 ? 750 : 0,
				collector: i < 15 ? "Filipe Nyusi Jr." : undefined,
			})),
		},
		"10": {
			id: "10",
			cardNumber: 1010,
			name: "Noémia Macuácua",
			contact: 850123456,
			dailyAmount: 180,
			totalSaved: 3600,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-10-20",
			alphanumericId: "A10",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 2000,
			totalInterest: 300,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 15,
				amount: i < 15 ? 180 : 0,
				collector: i < 15 ? "Arsénio Matusse" : undefined,
			})),
		},
		"11": {
			id: "11",
			cardNumber: 1011,
			name: "Paulo Bila",
			contact: 851234567,
			dailyAmount: 250,
			totalSaved: 6250,
			currentDebt: 0,
			daysInCycle: 25,
			status: "active",
			registrationDate: "2024-11-05",
			alphanumericId: "A11",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 25,
				amount: i < 25 ? 250 : 0,
				collector: i < 25 ? "Célia Mondlane" : undefined,
			})),
		},
		"12": {
			id: "12",
			cardNumber: 1012,
			name: "Quiteria Zunguza",
			contact: 852345678,
			dailyAmount: 350,
			totalSaved: 8750,
			currentDebt: 0,
			daysInCycle: 25,
			status: "active",
			registrationDate: "2024-09-25",
			alphanumericId: "A12",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 4000,
			totalInterest: 600,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 20,
				amount: i < 20 ? 350 : 0,
				collector: i < 20 ? "Filipe Nyusi Jr." : undefined,
			})),
		},
		"13": {
			id: "13",
			cardNumber: 1013,
			name: "Rui Chambule",
			contact: 853456789,
			dailyAmount: 120,
			totalSaved: 3000,
			currentDebt: 0,
			daysInCycle: 25,
			status: "active",
			registrationDate: "2024-10-10",
			alphanumericId: "A13",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 25,
				amount: i < 25 ? 120 : 0,
				collector: i < 25 ? "Arsénio Matusse" : undefined,
			})),
		},
		"14": {
			id: "14",
			cardNumber: 1014,
			name: "Sofia Munguambe",
			contact: 854567890,
			dailyAmount: 500,
			totalSaved: 12500,
			currentDebt: 0,
			daysInCycle: 25,
			status: "active",
			registrationDate: "2024-09-08",
			alphanumericId: "A14",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 7000,
			totalInterest: 1050,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 19,
				amount: i < 19 ? 500 : 0,
				collector: i < 19 ? "Célia Mondlane" : undefined,
			})),
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
			status: "active",
			registrationDate: "2024-11-15",
			alphanumericId: "A15",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 20,
				amount: i < 20 ? 220 : 0,
				collector: i < 20 ? "Filipe Nyusi Jr." : undefined,
			})),
		},
		"16": {
			id: "16",
			cardNumber: 1016,
			name: "Ussene Sitoe",
			contact: 856789012,
			dailyAmount: 175,
			totalSaved: 4200,
			currentDebt: 0,
			daysInCycle: 24,
			status: "active",
			registrationDate: "2024-10-05",
			alphanumericId: "A16",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 1000,
			totalInterest: 150,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 18,
				amount: i < 18 ? 175 : 0,
				collector: i < 18 ? "Arsénio Matusse" : undefined,
			})),
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
			status: "active",
			registrationDate: "2024-09-18",
			alphanumericId: "A17",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 25,
				amount: i < 25 ? 300 : 0,
				collector: i < 25 ? "Célia Mondlane" : undefined,
			})),
		},
		"18": {
			id: "18",
			cardNumber: 1018,
			name: "William Mujojo",
			contact: 858901234,
			dailyAmount: 275,
			totalSaved: 6600,
			currentDebt: 0,
			daysInCycle: 24,
			status: "active",
			registrationDate: "2024-10-25",
			alphanumericId: "A18",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 2500,
			totalInterest: 375,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 18,
				amount: i < 18 ? 275 : 0,
				collector: i < 18 ? "Filipe Nyusi Jr." : undefined,
			})),
		},
		"19": {
			id: "19",
			cardNumber: 1019,
			name: "Xavier Massingue",
			contact: 859012345,
			dailyAmount: 225,
			totalSaved: 4500,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-11-20",
			alphanumericId: "A19",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 20,
				amount: i < 20 ? 225 : 0,
				collector: i < 20 ? "Arsénio Matusse" : undefined,
			})),
		},
		"20": {
			id: "20",
			cardNumber: 1020,
			name: "Yolanda Zongo",
			contact: 860123456,
			dailyAmount: 125,
			totalSaved: 3125,
			currentDebt: 0,
			daysInCycle: 25,
			status: "active",
			registrationDate: "2024-09-30",
			alphanumericId: "A20",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 25,
				amount: i < 25 ? 125 : 0,
				collector: i < 25 ? "Célia Mondlane" : undefined,
			})),
		},
		"21": {
			id: "21",
			cardNumber: 1021,
			name: "Zacarias Mabjaia",
			contact: 861234567,
			dailyAmount: 1500,
			totalSaved: 30000,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-09-22",
			alphanumericId: "A21",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 15000,
			totalInterest: 2250,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 15,
				amount: i < 15 ? 1500 : 0,
				collector: i < 15 ? "Filipe Nyusi Jr." : undefined,
			})),
		},
		"22": {
			id: "22",
			cardNumber: 1022,
			name: "Amélia Júnior",
			contact: 862345678,
			dailyAmount: 190,
			totalSaved: 5700,
			currentDebt: 0,
			daysInCycle: 30,
			status: "inactive",
			registrationDate: "2024-09-15",
			alphanumericId: "A22",
			organizationId: "org-1",
			isActive: false,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 30,
				amount: i < 30 ? 190 : 0,
				collector: i < 30 ? "Arsénio Matusse" : undefined,
			})),
		},
		"23": {
			id: "23",
			cardNumber: 1023,
			name: "Benedito Cossa",
			contact: 863456789,
			dailyAmount: 160,
			totalSaved: 3200,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-10-28",
			alphanumericId: "A23",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 17,
				amount: i < 17 ? 160 : 0,
				collector: i < 17 ? "Célia Mondlane" : undefined,
			})),
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
			registrationDate: "2024-11-25",
			alphanumericId: "A24",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 20,
				amount: i < 20 ? 235 : 0,
				collector: i < 20 ? "Filipe Nyusi Jr." : undefined,
			})),
		},
		"25": {
			id: "25",
			cardNumber: 1025,
			name: "Domingos Mondlane",
			contact: 865678901,
			dailyAmount: 450,
			totalSaved: 11250,
			currentDebt: 0,
			daysInCycle: 25,
			status: "active",
			registrationDate: "2024-09-14",
			alphanumericId: "A25",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 20,
				amount: i < 20 ? 450 : 0,
				collector: i < 20 ? "Arsénio Matusse" : undefined,
			})),
		},
		"26": {
			id: "26",
			cardNumber: 1026,
			name: "Esther Nhleko",
			contact: 866789012,
			dailyAmount: 1800,
			totalSaved: 36000,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-12-01",
			alphanumericId: "A26",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 20000,
			totalInterest: 3000,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 16,
				amount: i < 16 ? 1800 : 0,
				collector: i < 16 ? "Célia Mondlane" : undefined,
			})),
		},
		"27": {
			id: "27",
			cardNumber: 1027,
			name: "Francisco Nkuna",
			contact: 867890123,
			dailyAmount: 320,
			totalSaved: 6400,
			currentDebt: 1600,
			daysInCycle: 20,
			status: "in_debt",
			registrationDate: "2024-09-28",
			alphanumericId: "A27",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 5000,
			totalInterest: 750,
			paymentDays: Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 12 && i % 3 === 0;
				const isDebtPayment = i < 5;
				const isInDebt = true;
				return {
					day,
					paid,
					amount: paid ? 320 : 0,
					collector: paid ? "Arsénio Matusse" : undefined,
					isDebtPayment,
					isInDebt,
				};
			}),
		},
		"28": {
			id: "28",
			cardNumber: 1028,
			name: "Graça Machel",
			contact: 868901234,
			dailyAmount: 450,
			totalSaved: 11250,
			currentDebt: 0,
			daysInCycle: 25,
			status: "active",
			registrationDate: "2024-10-12",
			alphanumericId: "A28",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 23,
				amount: i < 23 ? 450 : 0,
				collector: i < 23 ? "Filipe Nyusi Jr." : undefined,
			})),
		},
		"29": {
			id: "29",
			cardNumber: 1029,
			name: "Henrique Chipande",
			contact: 869012345,
			dailyAmount: 175,
			totalSaved: 4200,
			currentDebt: 0,
			daysInCycle: 24,
			status: "active",
			registrationDate: "2024-11-08",
			alphanumericId: "A29",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 800,
			totalInterest: 120,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 18,
				amount: i < 18 ? 175 : 0,
				collector: i < 18 ? "Célia Mondlane" : undefined,
			})),
		},
		"30": {
			id: "30",
			cardNumber: 1030,
			name: "Ilda Moiane",
			contact: 870123456,
			dailyAmount: 2000,
			totalSaved: 40000,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-09-05",
			alphanumericId: "A30",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 25000,
			totalInterest: 3750,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 14,
				amount: i < 14 ? 2000 : 0,
				collector: i < 14 ? "Arsénio Matusse" : undefined,
			})),
		},
		"31": {
			id: "31",
			cardNumber: 1031,
			name: "Jorge Macamo",
			contact: 871234567,
			dailyAmount: 280,
			totalSaved: 5600,
			currentDebt: 1400,
			daysInCycle: 20,
			status: "in_debt",
			registrationDate: "2024-12-10",
			alphanumericId: "A31",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 3500,
			totalInterest: 525,
			paymentDays: Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 10 && i % 2 === 0;
				const isDebtPayment = i < 4;
				const isInDebt = true;
				return {
					day,
					paid,
					amount: paid ? 280 : 0,
					collector: paid ? "Filipe Nyusi Jr." : undefined,
					isDebtPayment,
					isInDebt,
				};
			}),
		},
		"32": {
			id: "32",
			cardNumber: 1032,
			name: "Kátia Nhampossa",
			contact: 872345678,
			dailyAmount: 1500,
			totalSaved: 30000,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-09-22",
			alphanumericId: "A32",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 12000,
			totalInterest: 1800,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 18,
				amount: i < 18 ? 1500 : 0,
				collector: i < 18 ? "Célia Mondlane" : undefined,
			})),
		},
		"33": {
			id: "33",
			cardNumber: 1033,
			name: "Lídia Sitoe",
			contact: 873456789,
			dailyAmount: 190,
			totalSaved: 5700,
			currentDebt: 0,
			daysInCycle: 30,
			status: "inactive",
			registrationDate: "2024-09-18",
			alphanumericId: "A33",
			organizationId: "org-1",
			isActive: false,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 30,
				amount: i < 30 ? 190 : 0,
				collector: i < 30 ? "Arsénio Matusse" : undefined,
			})),
		},
		"34": {
			id: "34",
			cardNumber: 1034,
			name: "Moisés Muendane",
			contact: 874567890,
			dailyAmount: 160,
			totalSaved: 3200,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-10-30",
			alphanumericId: "A34",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 15,
				amount: i < 15 ? 160 : 0,
				collector: i < 15 ? "Filipe Nyusi Jr." : undefined,
			})),
		},
		"35": {
			id: "35",
			cardNumber: 1035,
			name: "Norberto Macuácua",
			contact: 875678901,
			dailyAmount: 235,
			totalSaved: 4700,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-11-03",
			alphanumericId: "A35",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 1500,
			totalInterest: 225,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 16,
				amount: i < 16 ? 235 : 0,
				collector: i < 16 ? "Célia Mondlane" : undefined,
			})),
		},
		"36": {
			id: "36",
			cardNumber: 1036,
			name: "Olívia Chissano",
			contact: 876789012,
			dailyAmount: 1200,
			totalSaved: 24000,
			currentDebt: 6000,
			daysInCycle: 20,
			status: "in_debt",
			registrationDate: "2024-09-11",
			alphanumericId: "A36",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 15000,
			totalInterest: 2250,
			paymentDays: Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 12;
				const isDebtPayment = i < 6;
				const isInDebt = true;
				return {
					day,
					paid,
					amount: paid ? 1200 : 0,
					collector: paid ? "Arsénio Matusse" : undefined,
					isDebtPayment,
					isInDebt,
				};
			}),
		},
		"37": {
			id: "37",
			cardNumber: 1037,
			name: "Pedro Munguambe",
			contact: 877890123,
			dailyAmount: 375,
			totalSaved: 7500,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-12-15",
			alphanumericId: "A37",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 19,
				amount: i < 19 ? 375 : 0,
				collector: i < 19 ? "Filipe Nyusi Jr." : undefined,
			})),
		},
		"38": {
			id: "38",
			cardNumber: 1038,
			name: "Quitéria Nkuna",
			contact: 878901234,
			dailyAmount: 250,
			totalSaved: 6250,
			currentDebt: 0,
			daysInCycle: 25,
			status: "active",
			registrationDate: "2024-10-18",
			alphanumericId: "A38",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 3000,
			totalInterest: 450,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 20,
				amount: i < 20 ? 250 : 0,
				collector: i < 20 ? "Célia Mondlane" : undefined,
			})),
		},
		"39": {
			id: "39",
			cardNumber: 1039,
			name: "Rogério Sitoe",
			contact: 879012345,
			dailyAmount: 145,
			totalSaved: 2900,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-11-22",
			alphanumericId: "A39",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 18,
				amount: i < 18 ? 145 : 0,
				collector: i < 18 ? "Arsénio Matusse" : undefined,
			})),
		},
		"40": {
			id: "40",
			cardNumber: 1040,
			name: "Sónia Macamo",
			contact: 880123456,
			dailyAmount: 650,
			totalSaved: 13000,
			currentDebt: 3250,
			daysInCycle: 20,
			status: "in_debt",
			registrationDate: "2024-09-26",
			alphanumericId: "A40",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 8000,
			totalInterest: 1200,
			paymentDays: Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 10 && i % 2 === 0;
				const isDebtPayment = i < 5;
				const isInDebt = true;
				return {
					day,
					paid,
					amount: paid ? 650 : 0,
					collector: paid ? "Filipe Nyusi Jr." : undefined,
					isDebtPayment,
					isInDebt,
				};
			}),
		},
		"41": {
			id: "41",
			cardNumber: 1041,
			name: "Tomé Mondlane",
			contact: 881234567,
			dailyAmount: 210,
			totalSaved: 4200,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-12-05",
			alphanumericId: "A41",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 17,
				amount: i < 17 ? 210 : 0,
				collector: i < 17 ? "Célia Mondlane" : undefined,
			})),
		},
		"42": {
			id: "42",
			cardNumber: 1042,
			name: "Ursula Machel",
			contact: 882345678,
			dailyAmount: 1750,
			totalSaved: 35000,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-09-03",
			alphanumericId: "A42",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 22000,
			totalInterest: 3300,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 16,
				amount: i < 16 ? 1750 : 0,
				collector: i < 16 ? "Arsénio Matusse" : undefined,
			})),
		},
		"43": {
			id: "43",
			cardNumber: 1043,
			name: "Vasco Nhleko",
			contact: 883456789,
			dailyAmount: 185,
			totalSaved: 5550,
			currentDebt: 0,
			daysInCycle: 30,
			status: "inactive",
			registrationDate: "2024-09-20",
			alphanumericId: "A43",
			organizationId: "org-1",
			isActive: false,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 30,
				amount: i < 30 ? 185 : 0,
				collector: i < 30 ? "Filipe Nyusi Jr." : undefined,
			})),
		},
		"44": {
			id: "44",
			cardNumber: 1044,
			name: "Wilhelmina Zunguza",
			contact: 884567890,
			dailyAmount: 330,
			totalSaved: 6600,
			currentDebt: 1650,
			daysInCycle: 20,
			status: "in_debt",
			registrationDate: "2024-10-25",
			alphanumericId: "A44",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 4000,
			totalInterest: 600,
			paymentDays: Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 8 && i % 2 === 0;
				const isDebtPayment = i < 4;
				const isInDebt = true;
				return {
					day,
					paid,
					amount: paid ? 330 : 0,
					collector: paid ? "Célia Mondlane" : undefined,
					isDebtPayment,
					isInDebt,
				};
			}),
		},
		"45": {
			id: "45",
			cardNumber: 1045,
			name: "Xavier Chambule",
			contact: 885678901,
			dailyAmount: 290,
			totalSaved: 5800,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-11-12",
			alphanumericId: "A45",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 1200,
			totalInterest: 180,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 18,
				amount: i < 18 ? 290 : 0,
				collector: i < 18 ? "Arsénio Matusse" : undefined,
			})),
		},
		"46": {
			id: "46",
			cardNumber: 1046,
			name: "Yara Mucavele",
			contact: 886789012,
			dailyAmount: 165,
			totalSaved: 3300,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-12-20",
			alphanumericId: "A46",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 19,
				amount: i < 19 ? 165 : 0,
				collector: i < 19 ? "Filipe Nyusi Jr." : undefined,
			})),
		},
		"47": {
			id: "47",
			cardNumber: 1047,
			name: "Zélia Tembe",
			contact: 887890123,
			dailyAmount: 1100,
			totalSaved: 22000,
			currentDebt: 5500,
			daysInCycle: 20,
			status: "in_debt",
			registrationDate: "2024-09-07",
			alphanumericId: "A47",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 13000,
			totalInterest: 1950,
			paymentDays: Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 11;
				const isDebtPayment = i < 5;
				const isInDebt = true;
				return {
					day,
					paid,
					amount: paid ? 1100 : 0,
					collector: paid ? "Célia Mondlane" : undefined,
					isDebtPayment,
					isInDebt,
				};
			}),
		},
		"48": {
			id: "48",
			cardNumber: 1048,
			name: "Abel Matusse",
			contact: 888901234,
			dailyAmount: 255,
			totalSaved: 5100,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-10-14",
			alphanumericId: "A48",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 19,
				amount: i < 19 ? 255 : 0,
				collector: i < 19 ? "Arsénio Matusse" : undefined,
			})),
		},
		"49": {
			id: "49",
			cardNumber: 1049,
			name: "Beatriz Langa",
			contact: 889012345,
			dailyAmount: 425,
			totalSaved: 8500,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-11-28",
			alphanumericId: "A49",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 3500,
			totalInterest: 525,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 17,
				amount: i < 17 ? 425 : 0,
				collector: i < 17 ? "Filipe Nyusi Jr." : undefined,
			})),
		},
		"50": {
			id: "50",
			cardNumber: 1050,
			name: "Constantino Machava",
			contact: 890123456,
			dailyAmount: 195,
			totalSaved: 3900,
			currentDebt: 0,
			daysInCycle: 20,
			status: "active",
			registrationDate: "2024-12-25",
			alphanumericId: "A50",
			organizationId: "org-1",
			isActive: true,
			organization: { id: "org-1", name: "Xitique Central" },
			totalLoans: 0,
			totalInterest: 0,
			paymentDays: Array.from({ length: 30 }, (_, i) => ({
				day: i + 1,
				paid: i < 18,
				amount: i < 18 ? 195 : 0,
				collector: i < 18 ? "Célia Mondlane" : undefined,
			})),
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
			registrationDate: "2024-09-15",
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

export function useCloseIndividualCycle(id: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: {
			transferDebtDays: boolean;
			reactivateNextCycle: boolean;
			sendNotification: boolean;
		}) => {
			// Mock implementation - in real app, this would call the API
			console.log("Closing individual cycle for saver:", id, data);
			return Promise.resolve({ success: true });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.detail(id) });
			queryClient.invalidateQueries({ queryKey: SAVER_KEYS.lists() });
		},
	});
}

// Function to auto-close all active savers' cycles at end of month
export function autoCloseMonthCycle(month: number, year: number) {
	// Mock implementation - in real app, this would:
	// 1. Get all active savers
	// 2. For each saver:
	//    - Calculate unpaid days
	//    - Calculate debt days
	//    - Transfer debt days to next cycle if applicable
	//    - Mark as inactive or reactivate based on settings
	// 3. Update all savers in batch
	console.log(`Auto-closing cycle for month ${month}, year ${year}`);
	return Promise.resolve({ success: true, count: 0 });
}
