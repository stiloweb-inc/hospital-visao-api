import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getHealthInsurance = new Elysia().get(
	"/health-insurances/:id",
	async ({ params }) => {
		const { id } = params;

		const healthInsurance = await prisma.healthInsurance.findUnique({
			where: { id },
			include: {
				_count: {
					select: {
						appointments: true,
					},
				},
			},
		});

		if (!healthInsurance) {
			return { error: "Health insurance not found", status: 404 };
		}

		return healthInsurance;
	},
);