import { Elysia, t } from "elysia";
import { prisma } from "../../lib/prisma";

export const postAppointment = new Elysia().post(
	"/appointments",
	async ({ body }) => {
		const {
			date,
			hour,
			endHour,
			state = "WAITING",
			classification,
			clientId,
			locationId,
			specialtyId,
			healthInsuranceId,
			professionalId,
			serviceId,
			planId,
		} = body;

		// Create appointment
		const appointment = await prisma.appointment.create({
			data: {
				date: new Date(date),
				hour: new Date(`${date}T${hour}`),
				...(endHour && { endHour: new Date(`${date}T${endHour}`) }),
				state,
				classification,
				clientId,
				locationId,
				specialtyId,
				healthInsuranceId,
				professionalId,
				serviceId,
				planId,
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
			date: t.String(), // YYYY-MM-DD format
			hour: t.String(), // HH:mm format
			endHour: t.Optional(t.String()), // HH:mm format
			state: t.Optional(
				t.Union([
					t.Literal("WAITING"),
					t.Literal("CONFIRMED"),
					t.Literal("REJECTED"),
					t.Literal("SHOW"),
					t.Literal("NO_SHOW"),
				]),
			),
			classification: t.Optional(t.String()),
			clientId: t.Optional(t.String()),
			locationId: t.Optional(t.String()),
			specialtyId: t.Optional(t.String()),
			healthInsuranceId: t.Optional(t.String()),
			professionalId: t.Optional(t.String()),
			serviceId: t.Optional(t.String()),
			planId: t.Optional(t.String()),
		}),
	},
);
