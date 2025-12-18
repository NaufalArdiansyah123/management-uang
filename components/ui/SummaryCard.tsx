import React from 'react'

export default function SummaryCard({ title, value, icon, accent }: { title: string; value: string; icon?: string; accent?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-4 flex items-center justify-between ${accent ?? ''}`}>
      <div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-lg font-semibold mt-1">{value}</div>
      </div>
      <div className="text-2xl ml-4" aria-hidden>
        {icon}
      </div>
    </div>
  )
}
