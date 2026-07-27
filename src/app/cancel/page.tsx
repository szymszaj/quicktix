import { XCircle } from "lucide-react";
import { Button, ButtonVariant } from "@/components/atoms/Button";

type Props = {
  searchParams: Promise<{ event_id?: string }>;
};

export default async function CancelPage({ searchParams }: Props) {
  const { event_id } = await searchParams;
  const backHref = event_id ? `/event/${event_id}` : "/";

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <div className="mb-6 flex justify-center">
          <XCircle size={64} strokeWidth={1.25} className="text-red-400" />
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900">
          Płatność anulowana
        </h1>
        <p className="mt-3 text-gray-500">
          Transakcja została przerwana. Żadne środki nie zostały pobrane.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Button href={backHref} fullWidth>
            Spróbuj ponownie
          </Button>
          <Button href="/" variant={ButtonVariant.GHOST} fullWidth>
            Wróć do wydarzeń
          </Button>
        </div>
      </div>
    </div>
  );
}
