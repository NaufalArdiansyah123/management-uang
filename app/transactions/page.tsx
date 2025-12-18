import React from 'react'
import { ArrowLeft, Filter } from 'lucide-react'
import BottomNav from '../../components/BottomNav'
import { DollarSign, ShoppingBag, Coffee, Gift, Truck } from 'lucide-react'
import formatCurrency from '../../lib/utils/formatCurrency'

export const metadata = {
  title: 'Transaksi - MoneyApp',
}

const sample = [
  { id: 1, title: 'Belanja Bulanan', category: 'Supermarket', amount: -450000, date: 'Hari ini', time: '10:30', icon: 'groceries' },
  { id: 2, title: 'Makan Siang', category: 'Warteg', amount: -25000, date: 'Hari ini', time: '12:45', icon: 'food' },
  { id: 3, title: 'Kopi', category: 'Kopi Kenangan', amount: -29000, date: 'Hari ini', time: '15:00', icon: 'coffee' },
  { id: 4, title: 'Gaji', category: 'Gaji Bulan Desember', amount: 8500000, date: 'Kemarin', time: '09:00', icon: 'salary' },
  { id: 5, title: 'Bensin', category: 'Pertamina', amount: -100000, date: 'Kemarin', time: '08:30', icon: 'car' },
  { id: 6, title: 'Listrik', category: 'Token PLN', amount: -200000, date: 'Kemarin', time: '10:00', icon: 'bill' },
  { id: 7, title: 'Netflix', category: 'Langganan Bulanan', amount: -186000, date: '15 Des 2024', time: '15:00', icon: 'netflix' },
]

function IconFor(key: string) {
  switch (key) {
    case 'salary':
      return <DollarSign className="w-5 h-5 text-green-600" />
    case 'groceries':
      return <ShoppingBag className="w-5 h-5 text-red-500" />
    case 'coffee':
      return <Coffee className="w-5 h-5 text-red-500" />
    case 'car':
      return <Truck className="w-5 h-5 text-red-500" />
    default:
      return <Gift className="w-5 h-5 text-gray-600" />
  }
}

export default function TransactionsPage() {
  // group by date label
  const grouped: Record<string, any[]> = {}
  for (const t of sample) {
    grouped[t.date] = grouped[t.date] || []
    grouped[t.date].push(t)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-32">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="p-2 bg-white rounded-lg shadow-sm"><ArrowLeft className="w-4 h-4 text-gray-600" /></button>
            <h1 className="text-lg font-semibold text-black">Riwayat Transaksi</h1>
          </div>
          <button className="p-2 bg-white rounded-lg shadow-sm"><Filter className="w-4 h-4 text-gray-600" /></button>
        </div>

        <div className="flex gap-3 mb-6">
          <button className="px-4 py-2 rounded-full bg-green-600 text-white text-sm">Semua</button>
          <button className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm shadow-sm">Pemasukan</button>
          <button className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm shadow-sm">Pengeluaran</button>
        </div>

        <div className="space-y-8">
          {Object.keys(grouped).map((date) => (
            <section key={date}>
              <h3 className="text-sm text-gray-500 mb-4">{date}</h3>
              <div className="space-y-3">
                {grouped[date].map((tx) => (
                  <div key={tx.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
                        {IconFor(tx.icon)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{tx.title}</p>
                        <p className="text-xs text-gray-500">{tx.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>{tx.amount > 0 ? '+' : '-'}{formatCurrency(Math.abs(tx.amount))}</p>
                      <p className="text-xs text-gray-400">{tx.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <BottomNav />
      </div>
    </main>
  )
}
