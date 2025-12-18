import React from 'react'

export default function LineChart({ className = '' }: { className?: string }) {
  // SVG layout: leave left padding for y-axis labels
  return (
    <svg viewBox="0 0 640 260" className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ecfdf5" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff1f2" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="100%" height="100%" fill="transparent" />

      {/* grid lines + y labels */}
      <g fill="#9ca3af" fontSize="13" fontWeight="600">
        <text x="12" y="36">10.0jt</text>
        <text x="12" y="76">7.5jt</text>
        <text x="12" y="116">5.0jt</text>
        <text x="12" y="156">2.5jt</text>
        <text x="12" y="196">0rb</text>
      </g>

      <g stroke="#eef2f7" strokeWidth="1">
        <line x1="40" y1="36" x2="620" y2="36" />
        <line x1="40" y1="76" x2="620" y2="76" />
        <line x1="40" y1="116" x2="620" y2="116" />
        <line x1="40" y1="156" x2="620" y2="156" />
        <line x1="40" y1="196" x2="620" y2="196" />
      </g>

      {/* green area */}
      <path d="M40,80 C120,74 200,70 280,76 C360,82 440,60 520,86 C600,112 620,100 620,120 L620,220 L40,220 Z" fill="url(#g1)" />
      <path d="M40,80 C120,74 200,70 280,76 C360,82 440,60 520,86 C600,112 620,100" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* red area */}
      <path d="M40,120 C120,132 200,140 280,132 C360,124 440,150 520,140 C600,130 620,132 620,150 L620,220 L40,220 Z" fill="url(#g2)" />
      <path d="M40,120 C120,132 200,140 280,132 C360,124 440,150 520,140 C600,130 620,132" fill="none" stroke="#f87171" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* x axis labels */}
      <g fill="#9ca3af" fontSize="13" fontWeight="600">
        <text x="48" y="218">Jan</text>
        <text x="140" y="218">Feb</text>
        <text x="230" y="218">Mar</text>
        <text x="320" y="218">Apr</text>
        <text x="410" y="218">Mei</text>
        <text x="500" y="218">Jun</text>
      </g>

    </svg>
  )
}
