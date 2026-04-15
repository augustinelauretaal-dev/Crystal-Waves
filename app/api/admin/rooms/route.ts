import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching rooms" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, capacity, image } = body;

    const room = await prisma.room.create({
      data: {
        name,
        price: parseFloat(price),
        capacity: parseInt(capacity),
        image,
      },
    });

    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json({ error: "Error creating room" }, { status: 500 });
  }
}
