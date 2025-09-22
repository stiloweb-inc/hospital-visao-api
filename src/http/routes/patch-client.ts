import { Elysia, t } from "elysia";
import { prisma } from "../../lib/prisma";

export const patchClient = new Elysia().patch(
	"/clients/:id",
	async ({ params, body }) => {
		const { id } = params;
		const { name, description, cpf, image, email, birthday, externalId, phones } = body;

		// Check if client exists
		const existingClient = await prisma.client.findUnique({
			where: { id },
		});

		if (!existingClient) {
			return { error: "Client not found", status: 404 };
		}

		// Update client
		const client = await prisma.client.update({
			where: { id },
			data: {
				...(name && { name }),
				...(description !== undefined && { description }),
				...(cpf !== undefined && { cpf }),
				...(image !== undefined && { image }),
				...(email !== undefined && { email }),
				...(birthday && { birthday: new Date(birthday) }),
				...(externalId !== undefined && { externalId }),
			},
		});

		// Update phones if provided
		if (phones) {
			// Remove existing phones
			await prisma.clientPhone.deleteMany({
				where: { clientId: id },
			});

			// Add new phones
			if (phones.length > 0) {
				await prisma.clientPhone.createMany({
					data: phones.map((phone: string) => ({
						clientId: id,
						phone,
					})),
				});
			}
		}

		// Return updated client with phones
		return await prisma.client.findUnique({
			where: { id },
			include: {
				phones: true,
			},
		});
	},
	{
		body: t.Object({
			name: t.Optional(t.String()),
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