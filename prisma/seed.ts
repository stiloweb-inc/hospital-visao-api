import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Starting database seed...");

	const location = await prisma.location.create({
		data: {
			name: "Hospital da Visão - Unidade Principal",
			address: "Rua 38, nº 300, Setor Marista Goiânia - GO",
			city: "Goiânia",
			state: "GO",
			cep: "74.150-250",
			lat: "-16.6964298",
			long: "-49.2663532",
		},
	});

	console.log("📍 Created location:", location.name);

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

	console.log(
		"🏥 Created specialties:",
		specialty1.name,
		"and",
		specialty2.name,
	);

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
