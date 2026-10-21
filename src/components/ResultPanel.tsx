import { useState } from 'react'
import type { Analysis } from '../lib/engine'
import { QuoteIcon, ShieldAlert, ShieldCheck } from './icons'

const LEVEL_STYLE: Record<
  Analysis['level'],
  { title: string; action: string; color: string; soft: string; Icon: typeof ShieldCheck }
> = {
  high: {
    title: 'Likely danger',
    action:
      "Don't reply and don't send anything. Call the person directly at a number you already have saved — not the one written in the message.",
    color: 'var(--clay)',
    soft: 'var(--clay-soft)',
    Icon: ShieldAlert,
  },
  medium: {
    title: 'Signals worth checking',
    action:
      "Don't rush. Verify through an official channel (a known website, a number you already have) before acting.",
    color: 'var(--gold)',
    soft: 'var(--gold-soft)',
    Icon: ShieldAlert,
  },
  low: {
    title: 'Nothing alarming found',
    action:
      'No strong signal found, but stay cautious with any request for money or personal information.',
    color: 'var(--moss)',
    soft: 'var(--moss-soft)',
    Icon: ShieldCheck,
  },
}

export function ResultPanel({ analysis }: { analysis: Analysis }) {
  const [dismissed, setDismissed] = useState(false)
  const style = LEVEL_STYLE[analysis.level]
  const canDismiss = analysis.level !== 'low'
  const Icon = style.Icon

  return (
    <div className="rise-in flex flex-col gap-5">
      <div
        className="card p-6"
        style={{
          background: dismissed ? 'var(--paper-deep)' : style.soft,
          borderColor: dismissed ? 'var(--paper-line)' : `color-mix(in srgb, ${style.color} 30%, var(--paper-line))`,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{ background: 'var(--paper)', color: dismissed ? 'var(--ink-soft)' : style.color }}
            >
              <Icon className="h-6 w-6" />
            </div>
            <p className="font-display text-xl font-semibold" style={{ color: dismissed ? 'var(--ink-soft)' : style.color }}>
              {dismissed ? 'Marked as reviewed by you' : style.title}
            </p>
          </div>
          <span
            className="shrink-0 rounded-full px-3 py-1 font-display text-lg font-semibold"
            style={{ background: 'var(--paper)', color: dismissed ? 'var(--ink-soft)' : style.color }}
          >
            {analysis.score}
          </span>
        </div>
        <p className="mt-4 text-lg leading-snug" style={{ color: 'var(--ink)' }}>
          {dismissed
            ? "Got it — you know the situation. The signals we found are still listed below, just in case."
            : style.action}
        </p>
        {canDismiss && (
          <button
            type="button"
            onClick={() => setDismissed((d) => !d)}
            className="pill mt-4 px-4 py-2 text-base font-medium"
          >
            {dismissed ? 'Restore the alert' : "This isn't a trap, I know this situation"}
          </button>
        )}
      </div>

      {analysis.signals.length > 0 ? (
        <div className="card p-6">
          <p className="font-display text-lg font-semibold" style={{ color: 'var(--ink)' }}>
            Signals detected
          </p>
          <ul className="mt-4 flex flex-col gap-4">
            {analysis.signals.map((signal) => (
              <li key={signal.id} className="flex gap-3">
                <div
                  className="mt-1 h-2 w-2 shrink-0 rounded-full"
                  style={{ background: style.color }}
                />
                <div>
                  <p className="font-semibold" style={{ color: 'var(--ink)' }}>
                    {signal.label}
                  </p>
                  <p style={{ color: 'var(--ink-soft)' }}>{signal.explanation}</p>
                  <p
                    className="mt-1.5 flex items-start gap-1.5 text-sm italic"
                    style={{ color: 'var(--ink-soft)' }}
                  >
                    <QuoteIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {signal.match}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg" style={{ color: 'var(--ink-soft)' }}>
          None of this prototype's known signals were found in this text.
        </p>
      )}
    </div>
  )
}
