import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    
    const bookings = await prisma.booking.findMany({
      take: limit ? parseInt(limit) : undefined,
      include: {
        user: {
          select: {
            email: true,
          },
        },
        room: {
          select: {
            name: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching bookings" }, { status: 500 });
  }
}
