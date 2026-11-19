import { prisma } from "@/lib/prisma";

export async function getSoldQuantity(eventId: string): Promise<number> {
  const result = await prisma.purchase.aggregate({
    where: { eventId, status: "active" },
    _sum: { quantity: true },
  });

  return result._sum.quantity ?? 0;
}

export function applySoldSeats<T extends { availableSeats: number }>(
  event: T,
  sold: number,
): T {
  return { ...event, availableSeats: Math.max(0, event.availableSeats - sold) };
}
