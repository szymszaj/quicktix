import { CheckCircle } from "lucide-react";
import { Button } from "@/components/atoms/Button";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

const generateTicketCode = (sessionId: string) => {
  const suffix = sessionId
    .replace("cs_test_", "")
    .replace("cs_live_", "")
    .slice(-8)
    .toUpperCase();
  return `QT-${suffix}`;
};

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const ticketCode = session_id
    ? generateTicketCode(session_id)
    : "QT-XXXXXXXX";

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <div className="mb-6 flex justify-center">
          <CheckCircle
            size={64}
            strokeWidth={1.25}
            className="text-emerald-500"
          />
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
          <p className="font-mono text-2xl font-bold tracking-widest text-indigo-600">
            {ticketCode}
          </p>
        </div>

        <p className="mb-8 text-sm text-gray-400">
          Zachowaj ten kod — będzie potrzebny przy wejściu na wydarzenie.
        </p>

        <Button href="/" fullWidth>
          Wróć do wydarzeń
        </Button>
      </div>
    </div>
  );
}
