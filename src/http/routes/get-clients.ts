import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getClients = new Elysia().get("/clients", async ({ query }) => {
	const { limit = "50", offset = "0" } = query as {
		limit?: string;
		offset?: string;
	};

	const take = parseInt(limit);
	const skip = parseInt(offset);

	return await prisma.client.findMany({
		take,
		skip,
		include: {
			phones: true,
			_count: {
				select: {
					appointments: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
});