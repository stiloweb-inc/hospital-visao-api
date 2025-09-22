import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getLocation = new Elysia().get(
	"/locations/:id",
	async ({ params }) => {
		const { id } = params;

		const location = await prisma.location.findUnique({
			where: { id },
		});

		if (!location) {
			return "Location not founded!";
		}

		return location;
	},
);
