import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: Role.admin,
      active: true,
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      role: Role.viewer,
      active: false,
    },
    {
      name: "Alice Brown",
      email: "alice@example.com",
      role: Role.editor,
      active: true,
    },
  ];

  // Clear existing data
  await prisma.user.deleteMany();
  console.log("🗑️  Cleared existing users");

  // Create new users
  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  console.log("🌱 Database seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
