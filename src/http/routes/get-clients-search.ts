import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getClientsSearch = new Elysia().get("/clients/search", async ({ query }) => {
	const { term, limit = "50", offset = "0" } = query as {
		term?: string;
		limit?: string;
		offset?: string;
	};

	if (!term) {
		return { error: "Search term is required", status: 400 };
	}

	const take = parseInt(limit);
	const skip = parseInt(offset);

	return await prisma.client.findMany({
		where: {
			OR: [
				{
					name: {
						contains: term,
						mode: 'insensitive',
					},
				},
				{
					email: {
						contains: term,
						mode: 'insensitive',
					},
				},
				{
					cpf: {
						contains: term,
					},
				},
				{
					phones: {
						some: {
							phone: {
								contains: term,
							},
						},
					},
				},
			],
		},
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