import React from 'react'

function Segment({ stroke, offset, value }: { stroke: string; offset: number; value: number }) {
  const circumference = 2 * Math.PI * 40
  const dash = (value / 100) * circumference
  return (
    <circle
      r={40}
      cx={50}
      cy={50}
      fill="transparent"
      stroke={stroke}
      strokeWidth={12}
      strokeDasharray={`${dash} ${circumference - dash}`}
      strokeDashoffset={-offset}
      transform="rotate(-90 50 50)"
    />
  )
}

export default function DonutChart({ className = '' }: { className?: string }) {
  // sample segments: 30%, 25%, 20%, rest
  const segs = [30, 25, 20, 25]
  let offset = 0
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <defs />
      <g>
        {segs.map((v, i) => {
          const seg = v
          const node = (
            <Segment key={i} stroke={['#7c3aed', '#06b6d4', '#10b981', '#f59e0b'][i]} offset={offset} value={seg} />
          )
          offset += (seg / 100) * (2 * Math.PI * 40)
          return node
        })}
      </g>
      <circle cx={50} cy={50} r={28} fill="#fff" />
    </svg>
  )
}
