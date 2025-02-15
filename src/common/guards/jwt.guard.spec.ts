import { createMock } from "@golevelup/ts-jest";
import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { JwtAuthGuard } from "./jwt.guard";

describe("JwtAuthGuard", () => {
	let authenticatedGuard: JwtAuthGuard;
	const mockReflector = createMock<Reflector>();
	const mockContext = createMock<ExecutionContext>({
		switchToHttp: () => ({
			getRequest: () => ({
				headers: {
					authorization: "Bearer token",
				},
			}),
		}),
	});

	beforeEach(() => {
		authenticatedGuard = new JwtAuthGuard(mockReflector);
	});

	it("should be defined", () => {
		expect(authenticatedGuard).toBeDefined();
	});

	describe("canActivate", () => {
		it("should return true for public", () => {
			mockReflector.get.mockImplementationOnce(() => {
				return true;
			});
			expect(authenticatedGuard.canActivate(mockContext)).toBe(true);
		});
	});
});
