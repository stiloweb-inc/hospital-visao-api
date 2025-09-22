import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getServices = new Elysia().get("/services", async ({ query }) => {
	const { location, professional, healthInsurance, specialty, plan, client, enabled } = query as {
		location?: string;
		professional?: string;
		healthInsurance?: string;
		specialty?: string;
		plan?: string;
		client?: string;
		enabled?: string;
	};

	const where: any = {};

	// Filter by location
	if (location) {
		where.availableSlots = {
			some: {
				locationId: location,
			},
		};
	}

	// Filter by professional
	if (professional) {
		where.availableSlots = {
			some: {
				professionalId: professional,
			},
		};
	}

	// Filter by health insurance
	if (healthInsurance) {
		where.appointments = {
			some: {
				healthInsuranceId: healthInsurance,
			},
		};
	}

	// Filter by specialty
	if (specialty) {
		where.appointments = {
			some: {
				specialtyId: specialty,
			},
		};
	}

	// Filter by plan
	if (plan) {
		where.appointments = {
			some: {
				planId: plan,
			},
		};
	}

	// Filter by client
	if (client) {
		where.appointments = {
			some: {
				clientId: client,
			},
		};
	}

	// Filter by enabled (available slots)
	if (enabled === "true") {
		where.availableSlots = {
			some: {
				isAvailable: true,
			},
		};
	}

	return await prisma.service.findMany({
		where,
		include: {
			_count: {
				select: {
					appointments: true,
					availableSlots: true,
				},
			},
		},
	});
});