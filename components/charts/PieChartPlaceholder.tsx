'use client'

import React from 'react'

export default function PieChartPlaceholder({ income, expense }: { income: number; expense: number }) {
  const total = income + expense || 1
  const incomePct = Math.round((income / total) * 100)
  const expensePct = 100 - incomePct

  const size = 140
  const radius = 50
  const circumference = 2 * Math.PI * radius

  const incomeStroke = (incomePct / 100) * circumference
  const expenseStroke = circumference - incomeStroke

  return (
    <div className="flex items-center justify-between">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle r={radius} cx={0} cy={0} fill="#f3f4f6" />
          <circle
            r={radius}
            cx={0}
            cy={0}
            fill="transparent"
            stroke="#16A34A"
            strokeWidth={30}
            strokeDasharray={`${incomeStroke} ${expenseStroke}`}
            strokeLinecap="butt"
            transform={`rotate(-90)`}
          />
        </g>
      </svg>
      <div className="ml-4">
        <div className="text-sm text-gray-500">Pemasukan</div>
        <div className="text-lg font-semibold text-green-600">{incomePct}%</div>
        <div className="mt-2 text-sm text-gray-500">Pengeluaran</div>
        <div className="text-lg font-semibold text-red-600">{expensePct}%</div>
      </div>
    </div>
  )
}
