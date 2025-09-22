import { Elysia, t } from "elysia";
import { prisma } from "../../lib/prisma";

export const postClient = new Elysia().post(
	"/clients",
	async ({ body }) => {
		const { name, description, cpf, image, email, birthday, externalId, phones } = body;

		// Create client
		const client = await prisma.client.create({
			data: {
				name,
				description,
				cpf,
				image,
				email,
				birthday: birthday ? new Date(birthday) : undefined,
				externalId,
			},
		});

		// Create phones if provided
		if (phones && phones.length > 0) {
			await prisma.clientPhone.createMany({
				data: phones.map((phone: string) => ({
					clientId: client.id,
					phone,
				})),
			});
		}

		// Return client with phones
		return await prisma.client.findUnique({
			where: { id: client.id },
			include: {
				phones: true,
			},
		});
	},
	{
		body: t.Object({
			name: t.String(),
			description: t.Optional(t.String()),
			cpf: t.Optional(t.String()),
			image: t.Optional(t.String()),
			email: t.Optional(t.String()),
			birthday: t.Optional(t.String()), // YYYY-MM-DD format
			externalId: t.Optional(t.String()),
			phones: t.Optional(t.Array(t.String())),
		}),
	},
);