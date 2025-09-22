import { Elysia } from "elysia";
import { prisma } from "../../lib/prisma";

export const getLocations = new Elysia().get("/locations", async () => {
	return await prisma.location.findMany();
});
