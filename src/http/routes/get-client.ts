import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getClient = new Elysia().get(
	"/clients/:id",
	async ({ params }) => {
		const { id } = params;

		const client = await prisma.client.findUnique({
			where: { id },
			include: {
				phones: true,
				appointments: {
					include: {
						location: true,
						service: true,
						professional: true,
						specialty: true,
						healthInsurance: true,
						plan: true,
					},
					orderBy: {
						date: 'desc',
					},
				},
				_count: {
					select: {
						appointments: true,
					},
				},
			},
		});

		if (!client) {
			return { error: "Client not found", status: 404 };
		}

		return client;
	},
);