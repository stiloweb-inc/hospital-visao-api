import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getLocations = new Elysia().get("/locations", async ({ query }) => {
	const { service, professional, specialty, client } = query as {
		service?: string;
		professional?: string;
		specialty?: string;
		client?: string;
	};

	const where: any = {};

	// Filter by service
	if (service) {
		where.availableSlots = {
			some: {
				serviceId: service,
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

	// Filter by specialty
	if (specialty) {
		where.availableSlots = {
			some: {
				professional: {
					specialties: {
						some: {
							specialtyId: specialty,
						},
					},
				},
			},
		};
	}

	// Filter by client (appointments)
	if (client) {
		where.appointments = {
			some: {
				clientId: client,
			},
		};
	}

	return await prisma.location.findMany({
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
