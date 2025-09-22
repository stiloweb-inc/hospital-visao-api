import { Elysia } from "elysia";
import { getLocation } from "./http/routes/get-location";
import { getLocations } from "./http/routes/get-locations";
import { getSpecialities } from "./http/routes/get-specialities";
import { getSpeciality } from "./http/routes/get-speciality";

const app = new Elysia()
	.get("/", () => "Hello Elysia")
	.listen(3000)
	.use(getLocations)
	.use(getLocation)
	.use(getSpeciality)
	.use(getSpecialities);

console.log(`API is running at ${app.server?.hostname}:${app.server?.port}`);
