import { describe, it, expect } from "vitest";
import {
	validateEmail,
	validatePassword,
	validateLoginForm,
} from "#/lib/validation";

describe("validation", () => {
	describe("validateEmail", () => {
		it("returns true for valid email", () => {
			expect(validateEmail("user@example.com")).toBe(true);
		});

		it("returns false for invalid email", () => {
			expect(validateEmail("invalid-email")).toBe(false);
			expect(validateEmail("")).toBe(false);
			expect(validateEmail("@example.com")).toBe(false);
		});
	});

	describe("validatePassword", () => {
		it("returns true for password with 6+ characters", () => {
			expect(validatePassword("password123")).toBe(true);
		});

		it("returns false for password with less than 6 characters", () => {
			expect(validatePassword("pass")).toBe(false);
			expect(validatePassword("")).toBe(false);
		});
	});

	describe("validateLoginForm", () => {
		it("returns valid: true when email and password are valid", () => {
			const result = validateLoginForm("user@example.com", "password123");
			expect(result.valid).toBe(true);
			expect(result.errors).toEqual({});
		});

		it("returns errors for missing email", () => {
			const result = validateLoginForm("", "password123");
			expect(result.valid).toBe(false);
			expect(result.errors.email).toBeDefined();
		});

		it("returns errors for invalid email", () => {
			const result = validateLoginForm("invalid", "password123");
			expect(result.valid).toBe(false);
			expect(result.errors.email).toBeDefined();
		});

		it("returns errors for missing password", () => {
			const result = validateLoginForm("user@example.com", "");
			expect(result.valid).toBe(false);
			expect(result.errors.password).toBeDefined();
		});

		it("returns errors for short password", () => {
			const result = validateLoginForm("user@example.com", "pass");
			expect(result.valid).toBe(false);
			expect(result.errors.password).toBeDefined();
		});

		it("returns all errors when both fields are invalid", () => {
			const result = validateLoginForm("invalid", "pass");
			expect(result.valid).toBe(false);
			expect(result.errors.email).toBeDefined();
			expect(result.errors.password).toBeDefined();
		});
	});
});
