export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
	return password.length >= 6;
}

export function validateLoginForm(
	email: string,
	password: string
): { valid: boolean; errors: Record<string, string> } {
	const errors: Record<string, string> = {};

	if (!email) {
		errors.email = "Email é obrigatório";
	} else if (!validateEmail(email)) {
		errors.email = "Email inválido";
	}

	if (!password) {
		errors.password = "Palavra-passe é obrigatória";
	} else if (!validatePassword(password)) {
		errors.password = "Palavra-passe deve ter pelo menos 6 caracteres";
	}

	return {
		valid: Object.keys(errors).length === 0,
		errors,
	};
}
