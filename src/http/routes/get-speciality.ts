import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getSpeciality = new Elysia().get(
	"/specialities/:id",
	async ({ params }) => {
		const { id } = params;

		const speciality = await prisma.specialty.findUnique({
			where: { id },
		});

		if (!speciality) {
			return "Speciality not founded!";
		}

		return speciality;
	},
);
