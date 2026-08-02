"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonVariant } from "@/components/atoms/Button";

export const ReturnButton = ({ purchaseId }: { purchaseId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReturn = async () => {
    if (!confirm("Na pewno chcesz złożyć wniosek o zwrot?")) return;
    setLoading(true);

    await fetch(`/api/returns`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ purchaseId }),
    });

    setLoading(false);
    router.refresh();
  };

  return (
    <Button
      variant={ButtonVariant.GHOST}
      size="sm"
      onClick={handleReturn}
      disabled={loading}
    >
      {loading ? "Przetwarzanie…" : "Złóż zwrot"}
    </Button>
  );
};
