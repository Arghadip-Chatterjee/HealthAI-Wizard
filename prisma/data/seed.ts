// seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create doctors
  await prisma.doctor.createMany({
    data: [
      {
        name: 'Dr. John Doe',
        specialty: 'Cardiology',
        yearsOfExp: 10,
        fees: 100,
        address: '123 Main St',
        photo: 'https://example.com/photo1.jpg',
      },
      {
        name: 'Dr. Jane Smith',
        specialty: 'Dermatology',
        yearsOfExp: 8,
        fees: 90,
        address: '456 Elm St',
        photo: 'https://example.com/photo2.jpg',
      },
      // Add more doctors as needed
    ],
  });

  // Create users
  await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
      // Add more users as needed
    ],
  });

  // Create bookings
  await prisma.booking.createMany({
    data: [
      { userId: 1, doctorId: 1, date: new Date() },
      { userId: 2, doctorId: 2, date: new Date() },
      // Add more bookings as needed
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
