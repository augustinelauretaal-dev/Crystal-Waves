import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [totalBookings, pendingBookings, confirmedBookings, cancelledBookings, totalRooms] =
      await Promise.all([
        prisma.booking.count(),
        prisma.booking.count({ where: { status: "pending" } }),
        prisma.booking.count({ where: { status: "confirmed" } }),
        prisma.booking.count({ where: { status: "cancelled" } }),
        prisma.room.count(),
      ]);

    return NextResponse.json({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      totalRooms,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching stats" }, { status: 500 });
  }
}
