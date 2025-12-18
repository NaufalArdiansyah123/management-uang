"use client"

import React, { useEffect, useRef, useState } from "react"

type MonthPoint = { name: string; income: number; expense: number }

interface Props {
  data: MonthPoint[]
  height?: number
}

export default function InteractiveBarChart({ data, height = 160 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(320)
  const [hover, setHover] = useState<{ x: number; y: number; idx: number } | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setWidth(e.contentRect.width)
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  // compute max across both series
  const values = data.flatMap((d) => [d.income, d.expense])
  const max = Math.max(...values, 1)
  // visual sizing — make bars narrower and groups spaced
  const padding = 48 // add extra left space so leftmost bars don't touch edge
  const svgW = Math.max(200, width)
  const svgH = height
  const barGap = 22 // increased gap between groups
  const barCount = data.length
  const groupW = (svgW - padding * 2 - barGap * (barCount - 1)) / barCount
  const innerGap = 10 // gap between income & expense within a group
  // make bars narrower relative to group width
  const barW = Math.max(6, (groupW - innerGap) * 0.42)
  const colors = { income: '#10b981', expense: '#2563eb' }

  return (
    <div ref={ref} className="w-full relative">
      <svg width={svgW} height={svgH} className="block">
        {/* grid lines and y-axis labels */}
        <g transform={`translate(${padding - 30},0)`}>
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
            const y = 20 + (1 - t) * (svgH - 60)
            const value = Math.round(max * t)
            const fmt = value >= 1000 ? `${Math.round(value / 1000)}k` : `${value}`
            return (
              <g key={i}>
                <text x={0} y={y + 4} fontSize={12} fill="#60a5fa">{fmt}</text>
                <line x1={36} y1={y} x2={svgW - padding} y2={y} stroke="#bfdbfe" strokeDasharray="4 6" />
              </g>
            )
          })}
        </g>

        <g transform={`translate(${padding},0)`}> 
          {/* baseline */}
          <line x1={0} y1={svgH - 20} x2={svgW - padding * 2} y2={svgH - 20} stroke="#0f172a" strokeWidth={1.5} />

          {data.map((d, i) => {
            const gx = i * (groupW + barGap)
            const incomeH = (d.income / max) * (svgH - 60)
            const expenseH = (d.expense / max) * (svgH - 60)
            const incomeY = svgH - incomeH - 24
            const expenseY = svgH - expenseH - 24
            return (
              <g key={d.name}>
                <rect
                  x={gx + (groupW - (barW * 2 + innerGap)) / 2}
                  y={incomeY}
                  width={barW}
                  height={incomeH}
                  rx={6}
                  fill={colors.income}
                  className="transition-all duration-500 ease-out"
                />
                <rect
                  x={gx + (groupW - (barW * 2 + innerGap)) / 2 + barW + innerGap}
                  y={expenseY}
                  width={barW}
                  height={expenseH}
                  rx={6}
                  fill={colors.expense}
                  className="transition-all duration-500 ease-out"
                />

                {/* interactive hit area for group */}
                <rect
                  x={gx}
                  y={0}
                  width={groupW}
                  height={svgH}
                  fill="transparent"
                  onMouseMove={(e) => {
                    const target = e.target as SVGRectElement
                    const pt = target.getBoundingClientRect()
                    const container = ref.current?.getBoundingClientRect()
                    if (!container) return
                    // convert to coordinates relative to container
                    setHover({ x: pt.x + pt.width / 2 - container.left, y: pt.y - container.top, idx: i })
                  }}
                  onMouseLeave={() => setHover(null)}
                />

                <text
                  x={gx + groupW / 2}
                  y={svgH - 4}
                  fontSize={13}
                  fill="#0f172a"
                  textAnchor="middle"
                >
                  {d.name}
                </text>
              </g>
            )
          })}
        </g>
      </svg>

      {hover && data[hover.idx] && (
        <div
          className="absolute pointer-events-none bg-white shadow rounded px-3 py-2 text-sm text-slate-800"
          style={{ left: hover.x, top: hover.y - 72, transform: "translate(-50%, 0)" }}
        >
          <div className="text-xs text-slate-500">{data[hover.idx].name}</div>
          <div className="flex gap-3 mt-1">
            <div className="flex items-center gap-2"><span style={{ width:8, height:8, background: colors.income, display:'inline-block', borderRadius:4 }} /> Rp {Math.round(data[hover.idx].income).toLocaleString()}</div>
            <div className="flex items-center gap-2"><span style={{ width:8, height:8, background: colors.expense, display:'inline-block', borderRadius:4 }} /> Rp {Math.round(data[hover.idx].expense).toLocaleString()}</div>
          </div>
        </div>
      )}
      <style jsx>{`
        svg rect { transform: scaleY(0); }
        svg rect { transform-origin: bottom center; }
        svg rect { animation: grow 600ms ease-out forwards; }
        @keyframes grow { to { transform: scaleY(1); } }
      `}</style>
    </div>
  )
}
