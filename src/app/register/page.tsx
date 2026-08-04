"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { EMAIL_RE, PASSWORD_RE, fieldClass } from "@/lib/auth-form";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Imię i nazwisko jest wymagane.";
    else if (name.trim().length < 2)
      next.name = "Imię musi mieć co najmniej 2 znaki.";
    if (!email) next.email = "Email jest wymagany.";
    else if (!EMAIL_RE.test(email))
      next.email = "Podaj prawidłowy adres email.";
    if (!password) next.password = "Hasło jest wymagane.";
    else if (!PASSWORD_RE.test(password))
      next.password = "Hasło musi mieć min. 8 znaków, zawierać literę i cyfrę.";
    if (!confirm) next.confirm = "Potwierdzenie hasła jest wymagane.";
    else if (confirm !== password) next.confirm = "Hasła nie są identyczne.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function clearError(field: keyof FormErrors) {
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setServerError(data.error ?? "Coś poszło nie tak.");
      setLoading(false);
      return;
    }

    await signIn("credentials", { email, password, redirect: false });
    router.push("/account");
    router.refresh();
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-2xl font-extrabold text-gray-900">
          Utwórz konto
        </h1>
        <p className="mb-8 text-sm text-gray-400">
          Masz już konto?{" "}
          <Link
            href="/login"
            className="text-orange-500 hover:underline font-medium"
          >
            Zaloguj się
          </Link>
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Imię i nazwisko
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearError("name");
              }}
              className={fieldClass(errors.name)}
              placeholder="Jan Kowalski"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError("email");
              }}
              className={fieldClass(errors.email)}
              placeholder="jan@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Hasło
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError("password");
              }}
              className={fieldClass(errors.password)}
              placeholder="min. 8 znaków, litera i cyfra"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Potwierdź hasło
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                clearError("confirm");
              }}
              className={fieldClass(errors.confirm)}
              placeholder="••••••••"
            />
            {errors.confirm && (
              <p className="mt-1 text-xs text-red-500">{errors.confirm}</p>
            )}
          </div>

          {serverError && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {serverError}
            </p>
          )}

          <Button type="submit" disabled={loading} fullWidth>
            {loading ? "Tworzenie konta…" : "Zarejestruj się"}
          </Button>
        </form>
      </div>
    </div>
  );
}
