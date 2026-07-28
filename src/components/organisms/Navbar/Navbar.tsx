import Link from "next/link";
import { Ticket } from "lucide-react";

const Navbar = () => (
  <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <Link href="/" className="flex items-center gap-2 text-white">
        <Ticket size={22} />
        <span className="text-lg font-bold tracking-tight">QuickTix</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium text-zinc-400">
        <Link href="/" className="hover:text-white transition-colors">
          Wydarzenia
        </Link>
      </nav>
    </div>
  </header>
);

export default Navbar;
