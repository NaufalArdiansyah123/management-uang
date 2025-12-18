"use client"
import React, { useRef, useState, useEffect } from 'react'

type Point = { name: string; income: number; expense: number }

export default function InteractiveLineChart({ data }: { data: Point[] }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const incomePathRef = useRef<SVGPathElement | null>(null)
  const expensePathRef = useRef<SVGPathElement | null>(null)
  const incomeAreaRef = useRef<SVGPathElement | null>(null)
  const expenseAreaRef = useRef<SVGPathElement | null>(null)
  const [rect, setRect] = useState({ left: 0, top: 0, width: 600, height: 240 })
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setRect({ left: r.left, top: r.top, width: r.width || 600, height: r.height || 240 })
    const ro = new ResizeObserver(() => {
      const r2 = ref.current!.getBoundingClientRect()
      setRect({ left: r2.left, top: r2.top, width: r2.width || 600, height: r2.height || 240 })
    })
    ro.observe(ref.current)
    // trigger animation after mount
    const t = setTimeout(() => setAnimated(true), 50)
    return () => {
      clearTimeout(t)
      ro.disconnect()
    }
  }, [])

  const paddingLeft = 40
  const paddingRight = 20
  const paddingTop = 20
  const paddingBottom = 36

  const values = data.flatMap((d) => [d.income, d.expense])
  const max = Math.max(...values) || 1

  const points = data.map((d, i) => {
    const x = paddingLeft + (i * (rect.width - paddingLeft - paddingRight)) / (data.length - 1)
    const incomeY = paddingTop + ((1 - d.income / max) * (rect.height - paddingTop - paddingBottom))
    const expenseY = paddingTop + ((1 - d.expense / max) * (rect.height - paddingTop - paddingBottom))
    return { x, incomeY, expenseY, name: d.name, income: d.income, expense: d.expense }
  })

  const incomePath = (() => {
    if (!points.length) return ''
    let p = `M ${points[0].x},${points[0].incomeY}`
    for (let i = 1; i < points.length; i++) p += ` L ${points[i].x},${points[i].incomeY}`
    return p
  })()

  const expensePath = (() => {
    if (!points.length) return ''
    let p = `M ${points[0].x},${points[0].expenseY}`
    for (let i = 1; i < points.length; i++) p += ` L ${points[i].x},${points[i].expenseY}`
    return p
  })()

  const incomeArea = (() => {
    if (!points.length) return ''
    let p = `M ${points[0].x},${rect.height - paddingBottom}`
    p += ` L ${points[0].x},${points[0].incomeY}`
    for (let i = 1; i < points.length; i++) p += ` L ${points[i].x},${points[i].incomeY}`
    p += ` L ${points[points.length - 1].x},${rect.height - paddingBottom} Z`
    return p
  })()

  const expenseArea = (() => {
    if (!points.length) return ''
    let p = `M ${points[0].x},${rect.height - paddingBottom}`
    p += ` L ${points[0].x},${points[0].expenseY}`
    for (let i = 1; i < points.length; i++) p += ` L ${points[i].x},${points[i].expenseY}`
    p += ` L ${points[points.length - 1].x},${rect.height - paddingBottom} Z`
    return p
  })()

  function handleMove(e: React.MouseEvent) {
    const x = e.clientX - rect.left
    // find nearest point by x
    let nearest = 0
    let best = Infinity
    points.forEach((pt, i) => {
      const d = Math.abs(pt.x - x)
      if (d < best) {
        best = d
        nearest = i
      }
    })
    setHoverIndex(nearest)
    setTooltipPos({ x: points[nearest].x, y: Math.min(points[nearest].incomeY, points[nearest].expenseY) })
  }

  function handleLeave() {
    setHoverIndex(null)
  }

  return (
    <div ref={ref} className="relative w-full h-full" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <svg viewBox={`0 0 ${rect.width} ${rect.height}`} preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="incomeGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ecfdf5" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="expenseGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff1f2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* grid lines */}
        <g stroke="#eef2f7" strokeWidth={1}>
          <line x1={paddingLeft} y1={36} x2={rect.width - paddingRight} y2={36} />
          <line x1={paddingLeft} y1={76} x2={rect.width - paddingRight} y2={76} />
          <line x1={paddingLeft} y1={116} x2={rect.width - paddingRight} y2={116} />
          <line x1={paddingLeft} y1={156} x2={rect.width - paddingRight} y2={156} />
          <line x1={paddingLeft} y1={196} x2={rect.width - paddingRight} y2={196} />
        </g>

        {/* areas */}
        <path ref={incomeAreaRef} d={incomeArea} fill="url(#incomeGrad)" style={{ opacity: animated ? 1 : 0, transition: 'opacity 700ms ease 200ms' }} />
        <path ref={expenseAreaRef} d={expenseArea} fill="url(#expenseGrad)" style={{ opacity: animated ? 1 : 0, transition: 'opacity 700ms ease 200ms' }} />

        {/* lines */}
        <path
          ref={incomePathRef}
          d={incomePath}
          fill="none"
          stroke="#10b981"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: animated && incomePathRef.current ? incomePathRef.current.getTotalLength() : undefined,
            strokeDashoffset: animated ? 0 : incomePathRef.current ? incomePathRef.current.getTotalLength() : undefined,
            transition: 'stroke-dashoffset 900ms ease-out',
          }}
        />
        <path
          ref={expensePathRef}
          d={expensePath}
          fill="none"
          stroke="#f87171"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: animated && expensePathRef.current ? expensePathRef.current.getTotalLength() : undefined,
            strokeDashoffset: animated ? 0 : expensePathRef.current ? expensePathRef.current.getTotalLength() : undefined,
            transition: 'stroke-dashoffset 900ms ease-out 100ms',
          }}
        />

        {/* points */}
        {points.map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy={pt.incomeY} r={3} fill="#10b981" />
            <circle cx={pt.x} cy={pt.expenseY} r={3} fill="#f87171" />
          </g>
        ))}

        {/* x labels */}
        <g fill="#9ca3af" fontSize={13} fontWeight={600}>
          {points.map((pt, i) => (
            <text key={i} x={pt.x} y={rect.height - 6} textAnchor="middle">
              {pt.name}
            </text>
          ))}
        </g>
      </svg>

      {hoverIndex !== null && (
        <div
          className="absolute bg-white shadow-md rounded-md p-2 text-sm border border-gray-100"
          style={{ left: tooltipPos.x + 8, top: tooltipPos.y - 48, transform: 'translateX(-50%)' }}
        >
          <div className="font-medium text-black">{data[hoverIndex].name}</div>
          <div className="text-green-600">Pemasukan: Rp {(data[hoverIndex].income / 1000000).toFixed(1)}jt</div>
          <div className="text-red-500">Pengeluaran: Rp {(data[hoverIndex].expense / 1000000).toFixed(1)}jt</div>
        </div>
      )}
    </div>
  )
}
