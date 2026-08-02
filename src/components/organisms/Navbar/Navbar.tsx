import Link from "next/link";
import { Ticket, User, LogIn } from "lucide-react";
import { auth } from "@/lib/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Ticket size={22} />
          <span className="text-lg font-bold tracking-tight">QuickTix</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            Wydarzenia
          </Link>

          {session?.user ? (
            <Link
              href="/account"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <User size={15} />
              {session.user.name ?? session.user.email}
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 transition-colors"
            >
              <LogIn size={15} />
              Zaloguj się
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
