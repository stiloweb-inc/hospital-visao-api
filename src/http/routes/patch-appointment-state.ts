import { Elysia, t } from "elysia";
import { prisma } from "../../lib/prisma";

export const patchAppointmentState = new Elysia().patch(
	"/appointments/:id/state",
	async ({ params, body }) => {
		const { id } = params;
		const { state } = body;

		// Check if appointment exists
		const existingAppointment = await prisma.appointment.findUnique({
			where: { id },
		});

		if (!existingAppointment) {
			return { error: "Appointment not found", status: 404 };
		}

		// Update appointment state
		const appointment = await prisma.appointment.update({
			where: { id },
			data: { state },
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
			state: t.Union([
				t.Literal("WAITING"),
				t.Literal("CONFIRMED"),
				t.Literal("REJECTED"),
				t.Literal("SHOW"),
				t.Literal("NO_SHOW"),
			]),
		}),
	},
);