import Link from "next/link";
import { auth } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { navItems } from "@/data/navItems";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-5 border-b border-gray-100 pb-4">
              <p className="text-sm font-semibold text-gray-900">
                {session?.user?.name ?? "Moje konto"}
              </p>
              <p className="mt-0.5 truncate text-xs text-gray-400">
                {session?.user?.email}
              </p>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 border-t border-gray-100 pt-4">
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                  Wyloguj się
                </button>
              </form>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">{children}</main>
      </div>
    </div>
  );
}
