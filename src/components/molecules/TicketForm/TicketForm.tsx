"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { formatPrice } from "@/utils/formatPrice";

type TicketFormProps = {
  eventId: string;
  price: number;
  availableSeats: number;
};

const TicketForm = ({ eventId, price, availableSeats }: TicketFormProps) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sold = availableSeats === 0;
  const max = Math.min(availableSeats, 10);

  const handleBuy = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, quantity }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Coś poszło nie tak.");
        return;
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setError("Nie udało się połączyć z serwerem płatności.");
    } finally {
      setLoading(false);
    }
  };

  if (sold) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
        <p className="font-semibold text-red-600">Bilety wyprzedane</p>
        <p className="mt-1 text-sm text-red-400">
          Nie ma już wolnych miejsc na to wydarzenie.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-base font-semibold text-gray-900">
        Wybierz liczbę biletów
      </h3>

      <div className="mb-5 flex items-center gap-4">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-xl font-bold text-gray-600 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-30 transition-colors cursor-pointer"
        >
          −
        </button>
        <span className="min-w-8 text-center text-xl font-bold text-gray-900">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => Math.min(max, q + 1))}
          disabled={quantity >= max}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-xl font-bold text-gray-600 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-30 transition-colors cursor-pointer"
        >
          +
        </button>
        <span className="text-sm text-gray-400">max {max} szt.</span>
      </div>

      <div className="mb-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
        <span className="text-sm text-gray-500">Łącznie</span>
        <span className="text-xl font-bold text-gray-900">
          {formatPrice(price * quantity)}
        </span>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <Button onClick={handleBuy} disabled={loading} fullWidth size="lg">
        {loading ? "Przekierowuję…" : "Kup bilet →"}
      </Button>

      <p className="mt-3 text-center text-xs text-gray-400">
        Bezpieczna płatność przez Stripe
      </p>
    </div>
  );
};

export default TicketForm;
