import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.room.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting room" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, price, capacity, image } = body;

    const room = await prisma.room.update({
      where: { id },
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
