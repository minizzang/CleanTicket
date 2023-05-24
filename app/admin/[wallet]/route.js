import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET() {
  const managerList = await client.ticketManager.findMany();
  return NextResponse.json({ managerList });
}

export async function PUT(res, { params }) {
  const wallet = params.wallet;

  const changed = await client.ticketManager.update({
    where: { wallet: wallet },
    data: { isAccepted: true },
  });
  return NextResponse.json({ changed });
}

export async function DELETE(res, { params }) {
  const wallet = params.wallet;

  const deleted = await client.ticketManager.delete({
    where: { wallet: wallet },
  });
  return NextResponse.json({ deleted });
}
