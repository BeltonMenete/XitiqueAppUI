import * as v from "valibot";

const LoginSchema = v.object({
	email: v.pipe(
		v.string("Email é obrigatório"),
		v.trim(),
		v.nonEmpty("Email é obrigatório"),
		v.email("Por favor, introduza um email válido")
	),
	password: v.pipe(
		v.string("Palavra-passe é obrigatória"),
		v.nonEmpty("Palavra-passe é obrigatória"),
		v.minLength(6, "Palavra-passe deve ter pelo menos 6 caracteres")
	),
});

export type LoginInput = v.InferInput<typeof LoginSchema>;
export type LoginOutput = v.InferOutput<typeof LoginSchema>;

export function validateLoginForm(
	email: string,
	password: string
): { valid: boolean; errors: Record<string, string> } {
	const result = v.safeParse(LoginSchema, { email, password });

	if (result.success) {
		return { valid: true, errors: {} };
	}

	const errors: Record<string, string> = {};
	for (const issue of result.issues) {
		const path = issue.path?.[0]?.key || "general";
		errors[path] = issue.message;
	}

	return { valid: false, errors };
}
