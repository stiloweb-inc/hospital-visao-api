import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getProfessional = new Elysia().get(
	"/professionals/:id",
	async ({ params }) => {
		const { id } = params;

		const professional = await prisma.professional.findUnique({
			where: { id },
			include: {
				specialties: {
					include: {
						specialty: true,
					},
				},
				_count: {
					select: {
						appointments: true,
						availableSlots: true,
					},
				},
			},
		});

		if (!professional) {
			return { error: "Professional not found", status: 404 };
		}

		return professional;
	},
);