import React from 'react'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Auth - MoneyApp',
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
