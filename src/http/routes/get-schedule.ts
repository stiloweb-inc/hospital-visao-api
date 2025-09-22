import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getSchedule = new Elysia().get("/schedule", async ({ query }) => {
	const {
		start,
		end,
		professional,
		service,
		location,
		healthInsurance,
		specialty,
		client,
		plan
	} = query as {
		start?: string;
		end?: string;
		professional?: string;
		service?: string;
		location?: string;
		healthInsurance?: string;
		specialty?: string;
		client?: string;
		plan?: string;
	};

	const where: any = {
		isAvailable: true,
	};

	// Filter by date range
	if (start) {
		where.date = {
			...where.date,
			gte: new Date(start),
		};
	}

	if (end) {
		where.date = {
			...where.date,
			lte: new Date(end),
		};
	}

	// Filter by professional
	if (professional) {
		where.professionalId = professional;
	}

	// Filter by service
	if (service) {
		where.serviceId = service;
	}

	// Filter by location
	if (location) {
		where.locationId = location;
	}

	// Filter by health insurance (via professional's appointments)
	if (healthInsurance) {
		where.professional = {
			appointments: {
				some: {
					healthInsuranceId: healthInsurance,
				},
			},
		};
	}

	// Filter by specialty (via professional's specialties)
	if (specialty) {
		where.professional = {
			specialties: {
				some: {
					specialtyId: specialty,
				},
			},
		};
	}

	// Filter by plan (via professional's appointments)
	if (plan) {
		where.professional = {
			appointments: {
				some: {
					planId: plan,
				},
			},
		};
	}

	return await prisma.availableSlot.findMany({
		where,
		include: {
			professional: {
				include: {
					specialties: {
						include: {
							specialty: true,
						},
					},
				},
			},
			service: true,
			location: true,
		},
		orderBy: [
			{ date: 'asc' },
			{ startTime: 'asc' },
		],
	});
});