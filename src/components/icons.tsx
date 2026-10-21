import type { CSSProperties } from 'react'

type IconProps = { className?: string; style?: CSSProperties }

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function ShieldMark({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style}>
      <path d="M12 3.5 5 6v5.5c0 4.6 3 7.8 7 9 4-1.2 7-4.4 7-9V6l-7-2.5Z" />
      <path d="M9.25 12.25 11 14l3.5-3.75" />
    </svg>
  )
}

export function ShieldCheck({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style}>
      <path d="M12 3.5 5 6v5.5c0 4.6 3 7.8 7 9 4-1.2 7-4.4 7-9V6l-7-2.5Z" />
      <path d="M9 12.25 11 14.25l4-4.5" />
    </svg>
  )
}

export function ShieldAlert({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style}>
      <path d="M12 3.5 5 6v5.5c0 4.6 3 7.8 7 9 4-1.2 7-4.4 7-9V6l-7-2.5Z" />
      <path d="M12 8v4.25" />
      <circle cx="12" cy="15" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function MessageIcon({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style}>
      <path d="M4 5.5h16v10H9.5L6 19v-3.5H4v-10Z" />
    </svg>
  )
}

export function PhoneCallIcon({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style}>
      <path d="M6.5 4.5h3L11 8l-2 1.5a9 9 0 0 0 5.5 5.5L16 13l3.5 1.5v3a1.5 1.5 0 0 1-1.6 1.5A14.5 14.5 0 0 1 5 5.6 1.5 1.5 0 0 1 6.5 4.5Z" />
    </svg>
  )
}

export function PinIcon({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style}>
      <path d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  )
}

export function QuoteIcon({ className, style }: IconProps) {
  return (
    <svg {...base} className={className} style={style}>
      <path d="M7.5 9c-1.4 0-2.5 1.1-2.5 2.6 0 1.5 1.1 2.4 2.3 2.4-.2 1.3-1 2.3-2.3 2.8v1.7c2.5-.5 4-2.4 4-5V11c0-1.1-.7-2-1.5-2Z" />
      <path d="M15.5 9c-1.4 0-2.5 1.1-2.5 2.6 0 1.5 1.1 2.4 2.3 2.4-.2 1.3-1 2.3-2.3 2.8v1.7c2.5-.5 4-2.4 4-5V11c0-1.1-.7-2-1.5-2Z" />
    </svg>
  )
}
