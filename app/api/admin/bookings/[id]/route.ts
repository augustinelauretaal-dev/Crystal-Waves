import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        room: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: "Error updating booking" }, { status: 500 });
  }
}
