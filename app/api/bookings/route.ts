import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      checkIn,
      checkOut,
      roomType,
      guests,
      specialRequest,
    } = body;

    // Find the room by name
    const room = await prisma.room.findFirst({
      where: { name: roomType },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Check for overlapping bookings
    const overlappingBookings = await prisma.booking.findMany({
      where: {
        roomId: room.id,
        status: { not: "cancelled" },
        OR: [
          {
            checkIn: { lte: new Date(checkOut) },
            checkOut: { gte: new Date(checkIn) },
          },
        ],
      },
    });

    if (overlappingBookings.length > 0) {
      return NextResponse.json(
        { error: "Room is not available for the selected dates" },
        { status: 409 }
      );
    }

    // Create or find user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          password: "temp", // Temporary password for guest users
          role: "user",
        },
      });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        roomId: room.id,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests: parseInt(guests),
        specialRequest,
        status: "pending",
      },
      include: {
        room: true,
        user: true,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Error creating booking" },
      { status: 500 }
    );
  }
}
