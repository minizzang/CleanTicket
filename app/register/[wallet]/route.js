import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET(req, { params }) {
  const wallet = params.wallet;

  const checkIsManager = await client.ticketManager.findUnique({
    where: { wallet },
  });
  return NextResponse.json({ checkIsManager });
}

export async function POST(req) {
  const request = await req.json();
  const { wallet, name, company, phone } = request.data;

  const result = await client.ticketManager.create({
    data: {
      wallet: wallet,
      name: name,
      company: company,
      phone: phone,
    },
  });
  return NextResponse.json({ result });
}
