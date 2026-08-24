import { number, object, optional, string } from "valibot";

export const createTransactionSchema = object({
	date: string("Data é obrigatória"),
	description: string("Descrição é obrigatória"),
	amount: number("Valor é obrigatório"),
	type: string("Tipo é obrigatório"),
	category: string("Categoria é obrigatória"),
});

export const updateTransactionSchema = object({
	description: optional(string("Descrição é obrigatória")),
	amount: optional(number("Valor deve ser um número")),
	status: optional(string("Status é obrigatório")),
	category: optional(string("Categoria é obrigatória")),
});
