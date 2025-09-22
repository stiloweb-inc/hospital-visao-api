import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getService = new Elysia().get(
	"/services/:id",
	async ({ params }) => {
		const { id } = params;

		const service = await prisma.service.findUnique({
			where: { id },
			include: {
				_count: {
					select: {
						appointments: true,
						availableSlots: true,
					},
				},
			},
		});

		if (!service) {
			return { error: "Service not found", status: 404 };
		}

		return service;
	},
);