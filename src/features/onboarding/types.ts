export interface OnboardingProgress {
	currentStep: number;
	totalSteps: number;
	completed: boolean;
}

export interface OnboardingStep {
	id: string;
	title: string;
	description: string;
	isValid: boolean;
}

export interface ClientOnboardingData {
	location?: {
		province: string;
		district: string;
	};
	phone?: string;
	pin?: string;
	agreeTerms?: boolean;
	organizationId?: string;
}

export interface OrganizationOnboardingData {
	name?: string;
	province?: string;
	district?: string;
	phone?: string;
	email?: string;
}
