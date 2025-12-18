"use client"
import React, { useState } from 'react';
import { DollarSign, ShoppingBag, Building2, Coffee, Plus, Minus, CreditCard, Target, Settings, Bell, Eye, Sun } from 'lucide-react';
import Link from 'next/link'
import BottomNav from '../BottomNav'

export default function ModernDashboard() {
  const [activeTab, setActiveTab] = useState('monthly');
  
  const balance = 7783.00;
  const totalExpense = 1157.40;
  const expenseLimit = 20000.00;
  const expensePercentage = 30;
  
  const transactions = [
    {
      id: 1,
      title: 'Salary',
      date: '18-27 - April 30',
      category: 'Monthly',
      amount: 4000.00,
      type: 'income',
      icon: <DollarSign className="w-6 h-6" />,
      bgColor: 'bg-blue-400'
    },
    {
      id: 2,
      title: 'Groceries',
      date: '17:00 - April 24',
      category: 'Pantry',
      amount: -100.00,
      type: 'expense',
      icon: <ShoppingBag className="w-6 h-6" />,
      bgColor: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Rent',
      date: '8:30 - April 15',
      category: 'Rent',
      amount: -674.40,
      type: 'expense',
      icon: <Building2 className="w-6 h-6" />,
      bgColor: 'bg-blue-600'
    }
  ];
  const goals = [
    { id: 1, title: 'Dana Liburan', saved: 2500000, target: 5000000 },
    { id: 2, title: 'Dana Darurat', saved: 1500000, target: 3000000 },
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto" style={{ paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }}>
        <header className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-yellow-400" />
              <p className="text-sm text-gray-500">Selamat pagi</p>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Pengelola Keuangan</h2>
          </div>
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-600"><Settings className="w-5 h-5" /></button>
              <button className="w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-600"><Bell className="w-5 h-5" /></button>
            </div>
        </header>

        <div className="bg-gradient-to-br from-[#00b88a] to-[#009975] text-white rounded-xl p-6 shadow-md mb-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs">Saldo Desember</p>
              <p className="text-2xl font-bold mt-2">Rp {balance.toLocaleString('id-ID')}</p>
              <p className="text-sm text-white/80 mt-1">92% ditabung bulan ini</p>
            </div>
            <div className="flex flex-col items-end">
              <button className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center text-white"><Eye className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-xs text-white/90">Pemasukan</p>
              <p className="font-semibold mt-1">Rp 8.500.000</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-xs text-white/90">Pengeluaran</p>
              <p className="font-semibold mt-1">Rp 716.000</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-around mb-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center"><Minus className="w-5 h-5 text-red-500" /></div>
            <p className="text-xs text-gray-500">Expense</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center"><Plus className="w-5 h-5 text-green-600" /></div>
            <p className="text-xs text-gray-500">Income</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center"><CreditCard className="w-5 h-5 text-gray-600" /></div>
            <p className="text-xs text-gray-500">Budget</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-gray-600" /></div>
            <p className="text-xs text-gray-500">Goals</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-800">Goals</h3>
            <a className="text-sm text-green-600">Kelola Goals</a>
          </div>
          <div className="space-y-3">
            {goals.map((g) => {
              const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
              return (
                <div key={g.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-800">{g.title}</p>
                      <p className="text-xs text-gray-500">Rp {g.saved.toLocaleString('id-ID')} dari Rp {g.target.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="text-sm font-semibold text-green-600">{pct}%</div>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-800">Transaksi Terakhir</h3>
            <Link href="/transactions" className="text-sm text-green-600">Lihat Semua</Link>
          </div>

          <ul className="space-y-3">
            {transactions.map((tx) => (
              <li key={tx.id} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-600">
                    {tx.type==='income' ? <DollarSign className="w-5 h-5 text-green-600" /> : <ShoppingBag className="w-5 h-5 text-red-500" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{tx.title}</p>
                    <p className="text-xs text-gray-500">{tx.category} · {tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${tx.amount>0? 'text-green-600':'text-red-500'}`}>{tx.amount>0? '+Rp '+tx.amount.toLocaleString('id-ID') : '-Rp '+Math.abs(tx.amount).toLocaleString('id-ID')}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <BottomNav />
      </div>
    </div>
  )
}