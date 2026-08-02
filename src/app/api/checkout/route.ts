import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";
import { getEventData } from "@/parsers/getEventData";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { eventId, quantity } = await req.json();

  if (!eventId || !quantity || quantity < 1) {
    return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  }

  const { event } = getEventData(eventId as string);

  if (!event) {
    return NextResponse.json(
      { error: "Wydarzenie nie istnieje." },
      { status: 404 },
    );
  }

  if (quantity > event.availableSeats) {
    return NextResponse.json(
      { error: `Dostępnych jest tylko ${event.availableSeats} miejsc.` },
      { status: 400 },
    );
  }

  const session = await auth();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: {
              name: event.title,
              description: `${event.venue}, ${event.city} — ${event.date} ${event.time}`,
            },
            unit_amount: event.price * 100,
          },
          quantity,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel?event_id=${event.id}`,
      metadata: {
        eventId: event.id,
        eventTitle: event.title,
        quantity: String(quantity),
        totalPrice: String(event.price * quantity),
        userId: session?.user?.id ?? "",
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Błąd Stripe.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
