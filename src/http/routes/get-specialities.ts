import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getSpecialities = new Elysia().get("/specialties", async () => {
	return await prisma.specialty.findMany();
});
