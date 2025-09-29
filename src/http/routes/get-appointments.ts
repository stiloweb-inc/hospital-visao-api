import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getAppointments = new Elysia().get(
	"/appointments",
	async ({ query }) => {
		const {
			start,
			end,
			location,
			service,
			professional,
			client,
			state,
			minimal,
		} = query as {
			start?: string;
			end?: string;
			location?: string;
			service?: string;
			professional?: string;
			client?: string;
			state?: string;
			minimal?: string;
		};

		const where: any = {};

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

		// Filter by location
		if (location) {
			where.locationId = location;
		}

		// Filter by service
		if (service) {
			where.serviceId = service;
		}

		// Filter by professional
		if (professional) {
			where.professionalId = professional;
		}

		// Filter by client
		if (client) {
			where.clientId = client;
		}

		// Filter by state
		if (state) {
			where.state = state;
		}

		// Include options based on minimal parameter
		const include =
			minimal === "true"
				? undefined
				: {
						client: {
							include: {
								phones: true,
							},
						},
						location: true,
						service: true,
						professional: {
							include: {
								specialties: {
									include: {
										specialty: true,
									},
								},
							},
						},
						specialty: true,
						healthInsurance: true,
						plan: true,
					};

		const appointments = await prisma.appointment.findMany({
			where,
			include,
			orderBy: [{ date: "asc" }, { hour: "asc" }],
		});

		// Format date and hour
		return appointments.map((appointment) => ({
			...appointment,
			date: appointment.date.toISOString().split("T")[0],
			hour: `${String(appointment.hour.getHours()).padStart(2, "0")}:${String(appointment.hour.getMinutes()).padStart(2, "0")}`,
		}));
	},
);
