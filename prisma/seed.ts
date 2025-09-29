import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Starting database seed...");

	// Create location
	const location = await prisma.location.create({
		data: {
			name: "Hospital da Visão - Unidade Principal",
			address: "Rua 38, nº 300, Setor Marista Goiânia - GO",
			city: "Goiânia",
			state: "GO",
			cep: "74.150-250",
			lat: -16.6964298,
			long: -49.2663532,
		},
	});

	console.log("📍 Created location:", location.name);

	// Create health insurances
	const healthInsurance1 = await prisma.healthInsurance.create({
		data: {
			name: "Unimed",
			color: "#00A859",
		},
	});

	const healthInsurance2 = await prisma.healthInsurance.create({
		data: {
			name: "Particular",
			color: "#3B82F6",
		},
	});

	console.log(
		"💳 Created health insurances:",
		healthInsurance1.name,
		"and",
		healthInsurance2.name,
	);

	// Create plans
	const plan1 = await prisma.plan.create({
		data: {
			name: "Unimed Individual",
		},
	});

	const plan2 = await prisma.plan.create({
		data: {
			name: "Particular",
		},
	});

	console.log("📋 Created plans:", plan1.name, "and", plan2.name);

	// Create specialties
	const specialty1 = await prisma.specialty.create({
		data: {
			name: "Oftalmologia",
		},
	});

	const specialty2 = await prisma.specialty.create({
		data: {
			name: "Cirurgia Refrativa",
		},
	});

	const specialty3 = await prisma.specialty.create({
		data: {
			name: "Retina e Vítreo",
		},
	});

	console.log(
		"🏥 Created specialties:",
		specialty1.name,
		specialty2.name,
		"and",
		specialty3.name,
	);

	// Create services
	const service1 = await prisma.service.create({
		data: {
			name: "Consulta Oftalmológica",
			price: 150.0,
			duration: 30,
			description: "Consulta completa com oftalmologista",
			preparation: "Trazer óculos ou lentes de contato em uso",
		},
	});

	const service2 = await prisma.service.create({
		data: {
			name: "Cirurgia de Catarata",
			price: 2500.0,
			duration: 90,
			description: "Cirurgia de catarata com implante de lente intraocular",
			preparation: "Jejum de 8 horas. Trazer acompanhante.",
		},
	});

	console.log("⚕️ Created services:", service1.name, "and", service2.name);

	// Create professionals
	const professional1 = await prisma.professional.create({
		data: {
			name: "Dr. Carlos Silva",
			description: "Oftalmologista especialista em retina",
			expertise: "Cirurgia de Retina e Vítreo",
			register: "CRM-GO 12345",
		},
	});

	const professional2 = await prisma.professional.create({
		data: {
			name: "Dra. Ana Santos",
			description: "Especialista em cirurgia refrativa",
			expertise: "Cirurgia Refrativa e Catarata",
			register: "CRM-GO 67890",
		},
	});

	console.log(
		"👨‍⚕️ Created professionals:",
		professional1.name,
		"and",
		professional2.name,
	);

	// Create professional-specialty relationships
	await prisma.professionalSpecialty.create({
		data: {
			professionalId: professional1.id,
			specialtyId: specialty1.id,
		},
	});

	await prisma.professionalSpecialty.create({
		data: {
			professionalId: professional1.id,
			specialtyId: specialty3.id,
		},
	});

	await prisma.professionalSpecialty.create({
		data: {
			professionalId: professional2.id,
			specialtyId: specialty1.id,
		},
	});

	await prisma.professionalSpecialty.create({
		data: {
			professionalId: professional2.id,
			specialtyId: specialty2.id,
		},
	});

	console.log("🔗 Created professional-specialty relationships");

	// Create a sample client
	const client = await prisma.client.create({
		data: {
			name: "João Silva",
			cpf: "123.456.789-00",
			email: "joao.silva@email.com",
			birthday: new Date("1985-03-15"),
		},
	});

	// Create client phone
	await prisma.clientPhone.create({
		data: {
			clientId: client.id,
			phone: "5562999887766",
		},
	});

	console.log("👤 Created client:", client.name);

	// Create an available slot
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	const startTime = new Date(tomorrow);
	startTime.setHours(9, 0, 0, 0);

	const endTime = new Date(tomorrow);
	endTime.setHours(9, 30, 0, 0);

	await prisma.availableSlot.create({
		data: {
			date: tomorrow,
			startTime: startTime,
			endTime: endTime,
			professionalId: professional1.id,
			serviceId: service1.id,
			locationId: location.id,
		},
	});

	console.log("🗓️ Created available slot for tomorrow");

	console.log("✅ Database seeded successfully!");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error("❌ Error seeding database:", e);
		await prisma.$disconnect();
		process.exit(1);
	});
