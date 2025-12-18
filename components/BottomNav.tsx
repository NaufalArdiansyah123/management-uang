"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, TrendingUp, Layers, User } from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-white rounded-xl shadow-md p-3 flex items-center justify-around pointer-events-auto">
        <Link href="/dashboard" className={`flex flex-col items-center ${pathname === '/dashboard' ? 'text-green-600' : 'text-gray-600'}`}>
          <Home />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/transactions" className={`flex flex-col items-center ${pathname === '/transactions' ? 'text-green-600' : 'text-gray-600'}`}>
          <TrendingUp />
          <span className="text-xs">Transaksi</span>
        </Link>
        <Link href="/statistics" className={`flex flex-col items-center ${pathname === '/statistics' ? 'text-green-600' : 'text-gray-600'}`}>
          <Layers />
          <span className="text-xs">Statistik</span>
        </Link>
        <Link href="/profile" className={`flex flex-col items-center ${pathname === '/profile' ? 'text-green-600' : 'text-gray-600'}`}>
          <User />
          <span className="text-xs">Profil</span>
        </Link>
      </div>
    </nav>
  )
}
