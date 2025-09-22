import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getHealthInsurances = new Elysia().get("/health-insurances", async ({ query }) => {
	const { service, location, professional } = query as {
		service?: string;
		location?: string;
		professional?: string;
	};

	const where: any = {};

	// Filter by service
	if (service) {
		where.appointments = {
			some: {
				serviceId: service,
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

	return await prisma.healthInsurance.findMany({
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