import { CheckCircle } from "lucide-react";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { Button, ButtonVariant } from "@/components/atoms/Button";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const generateTicketCode = (sessionId: string) =>
  `QT-${sessionId.slice(-8).toUpperCase()}`;

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  let ticketCode = "QT-XXXXXXXX";

  if (session_id && process.env.STRIPE_SECRET_KEY?.startsWith("sk_")) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      const meta = session.metadata ?? {};
      ticketCode = generateTicketCode(session_id);

      if (meta.userId && meta.eventId) {
        const exists = await prisma.purchase.findUnique({
          where: { ticketCode },
        });

        if (!exists) {
          await prisma.purchase.create({
            data: {
              userId: meta.userId,
              eventId: meta.eventId,
              eventTitle: meta.eventTitle ?? "Wydarzenie",
              quantity: Number(meta.quantity ?? 1),
              totalPrice: Number(meta.totalPrice ?? 0),
              ticketCode,
            },
          });
        }
      }
    } catch {
      // Stripe nie skonfigurowany lub błąd sieci — pokazujemy tylko kod
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <div className="mb-6 flex justify-center">
          <CheckCircle size={64} strokeWidth={1.25} className="text-emerald-500" />
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900">
          Płatność zakończona!
        </h1>
        <p className="mt-3 text-gray-500">
          Dziękujemy za zakup. Twój bilet jest gotowy.
        </p>

        <div className="my-8 rounded-xl bg-gray-50 px-6 py-5">
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-gray-400">
            Kod biletu
          </p>
          <p className="font-mono text-2xl font-bold tracking-widest text-orange-500">
            {ticketCode}
          </p>
        </div>

        <p className="mb-8 text-sm text-gray-400">
          Zachowaj ten kod — będzie potrzebny przy wejściu na wydarzenie.
        </p>

        <div className="flex flex-col gap-3">
          <Button href="/account/tickets" fullWidth>
            Moje bilety
          </Button>
          <Button href="/" variant={ButtonVariant.SECONDARY} className="border-gray-200" fullWidth>
            Wróć do wydarzeń
          </Button>
        </div>
      </div>
    </div>
  );
}
