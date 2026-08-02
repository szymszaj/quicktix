import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
  }

  const { purchaseId } = await req.json();

  const purchase = await prisma.purchase.findUnique({
    where: { id: purchaseId },
  });

  if (!purchase || purchase.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Nie znaleziono zakupu." },
      { status: 404 },
    );
  }

  if (purchase.status !== "active") {
    return NextResponse.json(
      { error: "Bilet został już zwrócony." },
      { status: 400 },
    );
  }

  await prisma.purchase.update({
    where: { id: purchaseId },
    data: { status: "refunded" },
  });

  return NextResponse.json({ ok: true });
}
