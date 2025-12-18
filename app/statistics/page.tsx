"use client";

import React, { useState } from 'react'
import { ArrowLeft, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Link from 'next/link'
import InteractiveBarChart from '../../components/charts/InteractiveBarChart'
import DonutChart from '../../components/charts/DonutChart'
import BottomNav from '../../components/BottomNav'

const periods = ['Minggu', 'Bulan', 'Tahun']

const areaData = [
  { name: 'Jan', income: 8500000, expense: 5000000 },
  { name: 'Feb', income: 8500000, expense: 4500000 },
  { name: 'Mar', income: 9000000, expense: 5500000 },
  { name: 'Apr', income: 8500000, expense: 6000000 },
  { name: 'Mei', income: 10000000, expense: 5000000 },
  { name: 'Jun', income: 8500000, expense: 4800000 },
]

const categories = [
  { name: 'Makanan & Minuman', amount: 1500000, percentage: 30, color: '#7c3aed', pct: 30 },
  { name: 'Belanja', amount: 1250000, percentage: 25, color: '#06b6d4', pct: 25 },
  { name: 'Tagihan', amount: 1000000, percentage: 20, color: '#10b981', pct: 20 },
  { name: 'Transportasi', amount: 750000, percentage: 12, color: '#60a5fa', pct: 12 },
  { name: 'Lainnya', amount: 500000, percentage: 13, color: '#d1d5db', pct: 13 },
]

const formatCurrency = (amount: number) => {
  if (amount >= 1000000) return `Rp ${(amount / 1000000).toFixed(1)}jt`
  return `Rp ${(amount / 1000).toFixed(0)}rb`
}

export default function Statistics() {
  const [activePeriod, setActivePeriod] = useState('Bulan')

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-32">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </Link>
          <h1 className="text-lg font-semibold text-black">Statistik</h1>
        </div>

        <div className="flex gap-3 mb-4">
          {periods.map((p) => (
            <button key={p} onClick={() => setActivePeriod(p)} className={`px-4 py-2 rounded-full text-sm ${activePeriod === p ? 'bg-green-500 text-white' : 'bg-white text-gray-600 shadow-sm'}`}>
              {p}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-black">Pemasukan</p>
                <p className="text-2xl font-bold mt-1 text-black">Rp 8.5jt</p>
                <p className="text-sm text-green-600 mt-2 flex items-center gap-2"><ArrowUpRight className="w-4 h-4" /> +5% dari bulan lalu</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-black">Pengeluaran</p>
                <p className="text-2xl font-bold mt-1 text-black">Rp 5.0jt</p>
                <p className="text-sm text-red-500 mt-2 flex items-center gap-2"><ArrowDownRight className="w-4 h-4" /> -8% dari bulan lalu</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-800 mb-3">Tren Keuangan</h3>
          <div className="h-56"><InteractiveBarChart data={areaData} /></div>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-800 mb-3">Pengeluaran per Kategori</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-32 h-32 flex items-center justify-center">
              <DonutChart className="w-28 h-28" />
            </div>
            <div className="flex-1 space-y-2">
              {categories.slice(0,3).map((c) => (
                <div key={c.name} className="flex items-center gap-2">
                  <div style={{ background: c.color }} className="w-3 h-3 rounded-full" />
                  <span className="text-sm text-gray-700 truncate">{c.name}</span>
                  <span className="text-sm font-medium text-gray-700 ml-auto">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {categories.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div style={{ background: c.color }} className="w-2 h-8 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{c.name}</span>
                    <span className="text-sm font-semibold text-gray-700">{formatCurrency(c.amount)}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full mt-1 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${c.percentage}%`, background: c.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    </main>
  )
}
