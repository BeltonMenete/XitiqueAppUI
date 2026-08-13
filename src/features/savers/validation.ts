import * as v from "valibot";

// Valibot schemas for Saver validation
export const CreateSaverSchema = v.object({
	CardNumber: v.pipe(
		v.number(),
		v.integer("Card number must be an integer"),
		v.minValue(1, "Card number must be positive"),
	),
	Name: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(1, "Name is required"),
		v.maxLength(100, "Name cannot exceed 100 characters"),
	),
	DailyAmount: v.pipe(
		v.number(),
		v.finite("Daily amount must be a finite number"),
		v.minValue(20, "Daily amount must be at least 20"),
		v.maxValue(999999.99, "Daily amount cannot exceed 999,999.99"),
	),
	OrganizationId: v.pipe(
		v.string(),
		v.uuid("Organization ID must be a valid UUID"),
	),
	Contact: v.optional(
		v.pipe(
			v.number(),
			v.integer("Contact must be an integer"),
			v.minValue(820000000, "Contact must be a valid Mozambican number"),
			v.maxValue(879999999, "Contact must be a valid Mozambican number"),
		),
	),
	IdentityDocument: v.optional(
		v.pipe(
			v.string(),
			v.maxLength(50, "Identity document cannot exceed 50 characters"),
		),
	),
	Pin: v.optional(
		v.pipe(
			v.string(),
			v.minLength(4, "PIN must be at least 4 characters"),
			v.maxLength(60, "PIN cannot exceed 60 characters"),
		),
	),
	Occupation: v.optional(
		v.pipe(
			v.string(),
			v.maxLength(100, "Occupation cannot exceed 100 characters"),
		),
	),
});

export const UpdateSaverSchema = v.object({
	Name: v.optional(
		v.pipe(
			v.string(),
			v.trim(),
			v.minLength(1, "Name cannot be empty"),
			v.maxLength(100, "Name cannot exceed 100 characters"),
		),
	),
	DailyAmount: v.optional(
		v.pipe(
			v.number(),
			v.finite("Daily amount must be a finite number"),
			v.minValue(20, "Daily amount must be at least 20"),
			v.maxValue(999999.99, "Daily amount cannot exceed 999,999.99"),
		),
	),
	Contact: v.optional(
		v.pipe(
			v.number(),
			v.integer("Contact must be an integer"),
			v.minValue(820000000, "Contact must be a valid Mozambican number"),
			v.maxValue(879999999, "Contact must be a valid Mozambican number"),
		),
	),
	IdentityDocument: v.optional(
		v.pipe(
			v.string(),
			v.maxLength(50, "Identity document cannot exceed 50 characters"),
		),
	),
	Pin: v.optional(
		v.pipe(
			v.string(),
			v.minLength(4, "PIN must be at least 4 characters"),
			v.maxLength(60, "PIN cannot exceed 60 characters"),
		),
	),
	Occupation: v.optional(
		v.pipe(
			v.string(),
			v.maxLength(100, "Occupation cannot exceed 100 characters"),
		),
	),
	IsActive: v.optional(v.boolean()),
});

export const PatchSaverSchema = v.object({
	IsActive: v.optional(v.boolean()),
});

export const RolloverToNextMonthSchema = v.object({
	Month: v.pipe(
		v.number(),
		v.integer("Month must be an integer"),
		v.minValue(1, "Month must be between 1 and 12"),
		v.maxValue(12, "Month must be between 1 and 12"),
	),
	Year: v.pipe(
		v.number(),
		v.integer("Year must be an integer"),
		v.minValue(2000, "Year must be 2000 or later"),
		v.maxValue(2100, "Year cannot exceed 2100"),
	),
});

export const TerminateContractSchema = v.object({
	Month: v.pipe(
		v.number(),
		v.integer("Month must be an integer"),
		v.minValue(1, "Month must be between 1 and 12"),
		v.maxValue(12, "Month must be between 1 and 12"),
	),
	Year: v.pipe(
		v.number(),
		v.integer("Year must be an integer"),
		v.minValue(2000, "Year must be 2000 or later"),
		v.maxValue(2100, "Year cannot exceed 2100"),
	),
	TerminationReason: v.optional(
		v.pipe(
			v.string(),
			v.maxLength(500, "Termination reason cannot exceed 500 characters"),
		),
	),
});

// Type inference
export type CreateSaverInput = v.InferInput<typeof CreateSaverSchema>;
export type CreateSaverOutput = v.InferOutput<typeof CreateSaverSchema>;
export type UpdateSaverInput = v.InferInput<typeof UpdateSaverSchema>;
export type UpdateSaverOutput = v.InferOutput<typeof UpdateSaverSchema>;
export type PatchSaverInput = v.InferInput<typeof PatchSaverSchema>;
export type PatchSaverOutput = v.InferOutput<typeof PatchSaverSchema>;
export type RolloverToNextMonthInput = v.InferInput<
	typeof RolloverToNextMonthSchema
>;
export type RolloverToNextMonthOutput = v.InferOutput<
	typeof RolloverToNextMonthSchema
>;
export type TerminateContractInput = v.InferInput<
	typeof TerminateContractSchema
>;
export type TerminateContractOutput = v.InferOutput<
	typeof TerminateContractSchema
>;
