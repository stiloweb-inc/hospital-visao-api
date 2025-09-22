import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getPlans = new Elysia().get("/plans", async ({ query }) => {
	const { healthInsurance, location, professional } = query as {
		healthInsurance?: string;
		location?: string;
		professional?: string;
	};

	const where: any = {};

	// Filter by health insurance
	if (healthInsurance) {
		where.appointments = {
			some: {
				healthInsuranceId: healthInsurance,
			},
		};
	}

	// Filter by location
	if (location) {
		where.appointments = {
			some: {
				locationId: location,
			},
		};
	}

	// Filter by professional
	if (professional) {
		where.appointments = {
			some: {
				professionalId: professional,
			},
		};
	}

	return await prisma.plan.findMany({
		where,
		include: {
			_count: {
				select: {
					appointments: true,
				},
			},
		},
	});
});