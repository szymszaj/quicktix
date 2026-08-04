export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export function fieldClass(error: string | undefined) {
  return `w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 transition ${
    error
      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
      : "border-gray-200 focus:border-orange-400 focus:ring-orange-100"
  }`;
}
