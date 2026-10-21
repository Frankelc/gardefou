import { useMemo, useState } from 'react'
import { FallbackNotice } from './components/FallbackNotice'
import { MessageIcon, ShieldMark } from './components/icons'
import { ResultPanel } from './components/ResultPanel'
import { EXAMPLES } from './data/examples'
import { analyse } from './lib/engine'

function App() {
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const analysis = useMemo(() => analyse(text), [text])
  const hasText = text.trim().length > 0

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      <div className="mx-auto flex max-w-2xl flex-col gap-10 px-5 pb-16 pt-10 sm:pt-14">
        <header className="rise-in flex items-center gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
            style={{ background: 'var(--pine)', color: 'var(--paper)' }}
          >
            <ShieldMark className="h-6 w-6" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">GardeFou</p>
            <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
              Prototype · SafeSpace Hacks
            </p>
          </div>
        </header>

        <section className="rise-in" style={{ animationDelay: '0.08s' }}>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Understand the risk,{' '}
            <span style={{ color: 'var(--pine)' }}>before you act.</span>
          </h1>
          <p className="mt-3 max-w-md text-xl leading-snug" style={{ color: 'var(--ink-soft)' }}>
            Paste a suspicious message. We'll calmly explain what's unusual,
            signal by signal.
          </p>
        </section>

        <section className="card rise-in flex flex-col gap-4 p-6" style={{ animationDelay: '0.16s' }}>
          <label htmlFor="message" className="flex items-center gap-2 text-lg font-semibold">
            <MessageIcon className="h-5 w-5" style={{ color: 'var(--pine)' }} />
            Message received (SMS, email, text)
          </label>
          <textarea
            id="message"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setSubmitted(false)
            }}
            rows={6}
            placeholder="Paste the message you received..."
            className="rounded-2xl border p-4 text-lg outline-none transition-colors"
            style={{
              background: 'var(--paper)',
              borderColor: 'var(--paper-line)',
              color: 'var(--ink)',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--pine)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--paper-line)')}
          />
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.id}
                type="button"
                title={ex.description}
                onClick={() => {
                  setText(ex.text)
                  setSubmitted(true)
                }}
                className="pill px-3.5 py-2 text-sm font-medium"
              >
                {ex.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="btn-primary self-start px-7 py-3 text-lg font-semibold"
          >
            Analyze
          </button>
        </section>

        <section>
          {submitted && hasText ? (
            <ResultPanel analysis={analysis} />
          ) : submitted && !hasText ? (
            <p className="rise-in text-lg" style={{ color: 'var(--ink-soft)' }}>
              There's nothing to analyze. The safety rule below still
              applies either way.
            </p>
          ) : (
            <p className="text-lg" style={{ color: 'var(--ink-soft)' }}>
              Paste a message, or try an example, then click "Analyze."
            </p>
          )}
        </section>

        <FallbackNotice />

        <footer
          className="border-t pt-5 text-sm leading-relaxed"
          style={{ borderColor: 'var(--paper-line)', color: 'var(--ink-soft)' }}
        >
          <p>
            GardeFou is a prototype. The analysis runs entirely in your
            browser — no message is ever sent to a server. The examples
            used here are fictional. This tool spots signals common to
            well-known scams; it doesn't catch everything (for example, not
            voice calls or audio deepfakes), and its score is indicative,
            not a guarantee. It does not replace the judgment of a trusted
            person or emergency services.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
