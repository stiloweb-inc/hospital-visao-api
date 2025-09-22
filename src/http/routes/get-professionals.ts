import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getProfessionals = new Elysia().get("/professionals", async ({ query }) => {
	const { location, service, healthInsurance, specialty, enabled } = query as {
		location?: string;
		service?: string;
		healthInsurance?: string;
		specialty?: string;
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

	// Filter by service
	if (service) {
		where.availableSlots = {
			some: {
				serviceId: service,
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
		where.specialties = {
			some: {
				specialtyId: specialty,
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

	return await prisma.professional.findMany({
		where,
		include: {
			specialties: {
				include: {
					specialty: true,
				},
			},
			_count: {
				select: {
					appointments: true,
					availableSlots: true,
				},
			},
		},
	});
});