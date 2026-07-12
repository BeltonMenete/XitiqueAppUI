import * as v from "valibot";

const LoginSchema = v.object({
	email: v.pipe(
		v.string("Email é obrigatório"),
		v.trim(),
		v.nonEmpty("Email é obrigatório"),
		v.email("Por favor, introduza um email válido"),
	),
	password: v.pipe(
		v.string("Palavra-passe é obrigatória"),
		v.nonEmpty("Palavra-passe é obrigatória"),
		v.minLength(8, "Palavra-passe deve ter pelo menos 8 caracteres"),
	),
});

const ResetPasswordSchema = v.object({
	password: v.pipe(
		v.string("A palavra-passe é obrigatória."),
		v.nonEmpty("A palavra-passe é obrigatória."),
		v.minLength(8, "A palavra-passe deve ter pelo menos 8 caracteres."),
		v.regex(
			/[A-Z]/,
			"A palavra-passe deve conter pelo menos uma letra maiúscula.",
		),
		v.regex(/[0-9]/, "A palavra-passe deve conter pelo menos um número."),
	),
	confirmPassword: v.string("Confirme a palavra-passe."),
});

export type LoginInput = v.InferInput<typeof LoginSchema>;
export type LoginOutput = v.InferOutput<typeof LoginSchema>;

export function validateLoginForm(
	email: string,
	password: string,
): { valid: boolean; errors: Record<string, string> } {
	const result = v.safeParse(LoginSchema, { email, password });

	if (result.success) {
		return { valid: true, errors: {} };
	}

	const errors: Record<string, string> = {};
	for (const issue of result.issues) {
		const path = issue.path?.[0]?.key || "general";
		errors[`${path}`] = issue.message;
	}

	return { valid: false, errors };
}

export function validateResetPasswordForm(
	password: string,
	confirmPassword: string,
): { valid: boolean; errors: Record<string, string> } {
	const result = v.safeParse(ResetPasswordSchema, {
		password,
		confirmPassword,
	});

	if (result.success) {
		return { valid: true, errors: {} };
	}

	const errors: Record<string, string> = {};
	for (const issue of result.issues) {
		const path = issue.path?.[0]?.key || "general";
		errors[`${path}`] = issue.message;
	}

	if (password && confirmPassword && password !== confirmPassword) {
		errors.confirmPassword = "As palavras-passe introduzidas não coincidem.";
	}

	return { valid: Object.keys(errors).length === 0, errors };
}
