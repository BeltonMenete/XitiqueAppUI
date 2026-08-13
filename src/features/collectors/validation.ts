import { minLength, object, string, optional } from "valibot";

export const createCollectorSchema = object({
	name: optional(string("Nome é obrigatório")),
	phone: optional(string("Telefone é obrigatório")),
	email: optional(string("Email inválido")),
	district: optional(string("Distrito é obrigatório")),
	province: optional(string("Província é obrigatória")),
});

export const updateCollectorSchema = object({
	name: optional(string("Nome é obrigatório")),
	phone: optional(string("Telefone é obrigatório")),
	email: optional(string("Email inválido")),
	status: optional(string("Status é obrigatório")),
});
