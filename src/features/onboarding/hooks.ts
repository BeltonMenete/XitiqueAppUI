import { useEffect, useState } from "react";
import type { ClientOnboardingData } from "./types";

const ONBOARDING_STORAGE_KEY = "onboarding_data";

export function useOnboardingData(stepPrefix: string) {
	const [data, setData] = useState<ClientOnboardingData>({});
	const [currentStep, setCurrentStep] = useState(0);

	// Load data from localStorage on mount
	useEffect(() => {
		const saved = localStorage.getItem(ONBOARDING_STORAGE_KEY);
		if (saved) {
			const parsed = JSON.parse(saved);
			const stepData = parsed[stepPrefix] || {};
			setData(stepData);
			setCurrentStep(parsed[`${stepPrefix}_step`] || 0);
		}
	}, [stepPrefix]);

	const saveData = (newData: Partial<ClientOnboardingData>) => {
		const updated = { ...data, ...newData };
		setData(updated);

		// Save to localStorage
		const saved = localStorage.getItem(ONBOARDING_STORAGE_KEY);
		const parsed = saved ? JSON.parse(saved) : {};
		parsed[stepPrefix] = updated;
		localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(parsed));
	};

	const saveStep = (step: number) => {
		setCurrentStep(step);

		// Save step to localStorage
		const saved = localStorage.getItem(ONBOARDING_STORAGE_KEY);
		const parsed = saved ? JSON.parse(saved) : {};
		parsed[`${stepPrefix}_step`] = step;
		localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(parsed));
	};

	const nextStep = () => {
		saveStep(currentStep + 1);
	};

	const prevStep = () => {
		if (currentStep > 0) {
			saveStep(currentStep - 1);
		}
	};

	const resetOnboarding = () => {
		setData({});
		setCurrentStep(0);

		// Clear from localStorage
		const saved = localStorage.getItem(ONBOARDING_STORAGE_KEY);
		if (saved) {
			const parsed = JSON.parse(saved);
			delete parsed[stepPrefix];
			delete parsed[`${stepPrefix}_step`];
			localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(parsed));
		}
	};

	return {
		data,
		currentStep,
		saveData,
		saveStep,
		nextStep,
		prevStep,
		resetOnboarding,
	};
}
