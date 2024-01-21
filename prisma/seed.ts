import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { UniqueEnforcer } from "enforce-unique";
import { TransactionType } from "@/types/misc";

const prisma = new PrismaClient();
const uniqueUsernameEnforcer = new UniqueEnforcer();

function getRandomElement<T extends unknown[]>(arr: T[]): T[number] {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function getRandomNumber(length: number) {
  return Math.floor(Math.random() * length);
}

export function createUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const password = faker.internet.password();

  const username = uniqueUsernameEnforcer
    .enforce(() => {
      return (
        faker.string.alphanumeric({ length: 2 }) +
        "_" +
        faker.internet.userName({
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
        })
      );
    })
    .slice(0, 20)
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");
  return {
    username,
    firstName,
    lastName,
    password,
    email: `${username}@example.com`,
  };
}

export function createTransaction() {
  const amount: string = faker.finance.amount();
  const categoryId: TransactionType = "GIFT";
  return {
    amount,
    categoryId,
  };
}

async function main() {
  console.log("🌱 Seeding...");
  console.time(`🌱 Database has been seeded`);

  console.time("🧹 Cleaned up the database...");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await prisma.user.deleteMany();

  console.timeEnd("🧹 Cleaned up the database...");
  const totalUsers = 8;
  for (let index = 0; index < totalUsers; index++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const user = await prisma.user.create({
      data: { ...createUser() },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await prisma.transaction.create({
      data: {
        amount: faker.number.float(),
        categoryId: "GIFT",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        userId: user.id,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(`👤 Created user with id: ${user.id}`);
  }

  console.timeEnd(`🌱 Database has been seeded`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
