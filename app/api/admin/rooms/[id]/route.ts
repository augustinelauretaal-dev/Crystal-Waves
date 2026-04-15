import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.room.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting room" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, price, capacity, image } = body;

    const room = await prisma.room.update({
      where: { id: params.id },
      data: {
        name,
        price: parseFloat(price),
        capacity: parseInt(capacity),
        image,
      },
    });

    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json({ error: "Error updating room" }, { status: 500 });
  }
}
