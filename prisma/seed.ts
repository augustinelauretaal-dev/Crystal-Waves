import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@crystalwaves.com' },
    update: {},
    create: {
      email: 'admin@crystalwaves.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('Created admin user:', admin.email);

  // Create rooms
  const rooms = [
    {
      name: 'Standard Room',
      price: 2500,
      capacity: 2,
      image: 'https://images.unsplash.com/photo-1590490364834-c532b5c5fb3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      name: 'Deluxe Room',
      price: 3500,
      capacity: 3,
      image: 'https://images.unsplash.com/photo-1611892440157-4b370961c8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      name: 'Family Room',
      price: 5000,
      capacity: 6,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      name: 'Suite Room',
      price: 8000,
      capacity: 4,
      image: 'https://images.unsplash.com/photo-1582719508461-905c8243f0a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
  ];

  // Check if rooms already exist
  const existingRooms = await prisma.room.findMany();
  if (existingRooms.length === 0) {
    for (const room of rooms) {
      await prisma.room.create({
        data: room,
      });
    }
    console.log('Created rooms');
  } else {
    console.log('Rooms already exist, skipping creation');
  }

  console.log('Created rooms');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
