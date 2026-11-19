import Stripe from "stripe";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const generateTicketCode = (sessionId: string) =>
  `QT-${sessionId.slice(-8).toUpperCase()}`;

export async function ensurePurchaseFromSession(
  session: Stripe.Checkout.Session,
) {
  const meta = session.metadata ?? {};
  if (!meta.userId || !meta.eventId) return null;

  const ticketCode = generateTicketCode(session.id);

  try {
    return await prisma.purchase.create({
      data: {
        userId: meta.userId,
        eventId: meta.eventId,
        eventTitle: meta.eventTitle ?? "Wydarzenie",
        quantity: Number(meta.quantity ?? 1),
        totalPrice: Number(meta.totalPrice ?? 0),
        ticketCode,
      },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return prisma.purchase.findUnique({ where: { ticketCode } });
    }
    throw err;
  }
}
