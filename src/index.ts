import { Elysia } from "elysia";

// Location routes
import { getLocation } from "./http/routes/get-location";
import { getLocations } from "./http/routes/get-locations";

// Health Insurance routes
import { getHealthInsurance } from "./http/routes/get-health-insurance";
import { getHealthInsurances } from "./http/routes/get-health-insurances";

// Plan routes
import { getPlans } from "./http/routes/get-plans";

// Specialty routes
import { getSpecialities } from "./http/routes/get-specialities";
import { getSpeciality } from "./http/routes/get-speciality";

// Service routes
import { getService } from "./http/routes/get-service";
import { getServices } from "./http/routes/get-services";

// Professional routes
import { getProfessional } from "./http/routes/get-professional";
import { getProfessionals } from "./http/routes/get-professionals";

// Client routes
import { getClient } from "./http/routes/get-client";
import { getClients } from "./http/routes/get-clients";
import { getClientsSearch } from "./http/routes/get-clients-search";
import { postClient } from "./http/routes/post-client";
import { patchClient } from "./http/routes/patch-client";

// Schedule routes
import { getSchedule } from "./http/routes/get-schedule";

// Appointment routes
import { getAppointment } from "./http/routes/get-appointment";
import { getAppointments } from "./http/routes/get-appointments";
import { postAppointment } from "./http/routes/post-appointment";
import { patchAppointmentState } from "./http/routes/patch-appointment-state";
import { patchAppointmentTime } from "./http/routes/patch-appointment-time";

const app = new Elysia()
	.get("/", () => "Hospital da Visão API - Clinia Integration")

	// Location endpoints
	.use(getLocations)
	.use(getLocation)

	// Health Insurance endpoints
	.use(getHealthInsurances)
	.use(getHealthInsurance)

	// Plan endpoints
	.use(getPlans)

	// Specialty endpoints
	.use(getSpecialities)
	.use(getSpeciality)

	// Service endpoints
	.use(getServices)
	.use(getService)

	// Professional endpoints
	.use(getProfessionals)
	.use(getProfessional)

	// Client endpoints
	.use(getClients)
	.use(getClientsSearch)
	.use(getClient)
	.use(postClient)
	.use(patchClient)

	// Schedule endpoints
	.use(getSchedule)

	// Appointment endpoints
	.use(getAppointments)
	.use(getAppointment)
	.use(postAppointment)
	.use(patchAppointmentState)
	.use(patchAppointmentTime)

	.listen(3000);

console.log(`🏥 Hospital da Visão API is running at ${app.server?.hostname}:${app.server?.port}`);
