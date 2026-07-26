import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/organisms/Navbar'

export const metadata: Metadata = {
  title: 'QuickTix — Bilety na wydarzenia',
  description: 'Kup bilety na koncerty, mecze, spektakle i konferencje w kilka sekund.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className="h-full">
      <body className="flex min-h-full flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-400">
          © 2025 QuickTix. Projekt edukacyjny.
        </footer>
      </body>
    </html>
  )
}
