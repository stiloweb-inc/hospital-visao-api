import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getAppointment = new Elysia().get(
	"/appointments/:id",
	async ({ params }) => {
		const { id } = params;

		const appointment = await prisma.appointment.findUnique({
			where: { id },
			include: {
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
			},
		});

		if (!appointment) {
			return { error: "Appointment not found", status: 404 };
		}

		const startDate = new Date(appointment.date);
		const date = startDate.toISOString().split("T")[0];
		const hour = startDate.toTimeString().slice(0, 5);

		return {
			...appointment,
			date,
			hour,
		};
	},
);
