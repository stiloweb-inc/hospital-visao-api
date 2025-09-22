import { Elysia, t } from "elysia";
import { prisma } from "../../lib/prisma";

export const patchAppointmentTime = new Elysia().patch(
	"/appointments/:id/time",
	async ({ params, body }) => {
		const { id } = params;
		const { date, hour, endHour } = body;

		// Check if appointment exists
		const existingAppointment = await prisma.appointment.findUnique({
			where: { id },
		});

		if (!existingAppointment) {
			return { error: "Appointment not found", status: 404 };
		}

		// Update appointment time
		const appointment = await prisma.appointment.update({
			where: { id },
			data: {
				...(date && { date: new Date(date) }),
				...(hour && { hour: new Date(`${date || existingAppointment.date.toISOString().split('T')[0]}T${hour}`) }),
				...(endHour && { endHour: new Date(`${date || existingAppointment.date.toISOString().split('T')[0]}T${endHour}`) }),
			},
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

		return appointment;
	},
	{
		body: t.Object({
			date: t.Optional(t.String()), // YYYY-MM-DD format
			hour: t.Optional(t.String()), // HH:mm format
			endHour: t.Optional(t.String()), // HH:mm format
		}),
	},
);