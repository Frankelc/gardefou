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
            Comprends le risque,{' '}
            <span style={{ color: 'var(--pine)' }}>avant d'agir.</span>
          </h1>
          <p className="mt-3 max-w-md text-xl leading-snug" style={{ color: 'var(--ink-soft)' }}>
            Colle un message suspect. On t'explique calmement ce qui est
            inhabituel, signal par signal.
          </p>
        </section>

        <section className="card rise-in flex flex-col gap-4 p-6" style={{ animationDelay: '0.16s' }}>
          <label htmlFor="message" className="flex items-center gap-2 text-lg font-semibold">
            <MessageIcon className="h-5 w-5" style={{ color: 'var(--pine)' }} />
            Message reçu (SMS, courriel, texto)
          </label>
          <textarea
            id="message"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setSubmitted(false)
            }}
            rows={6}
            placeholder="Colle ici le message que tu as reçu..."
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
            Analyser
          </button>
        </section>

        <section>
          {submitted && hasText ? (
            <ResultPanel analysis={analysis} />
          ) : submitted && !hasText ? (
            <p className="rise-in text-lg" style={{ color: 'var(--ink-soft)' }}>
              Il n'y a rien à analyser. La règle de sécurité ci-dessous reste
              valable dans tous les cas.
            </p>
          ) : (
            <p className="text-lg" style={{ color: 'var(--ink-soft)' }}>
              Colle un message, ou essaie un exemple, puis clique sur « Analyser ».
            </p>
          )}
        </section>

        <FallbackNotice />

        <footer
          className="border-t pt-5 text-sm leading-relaxed"
          style={{ borderColor: 'var(--paper-line)', color: 'var(--ink-soft)' }}
        >
          <p>
            GardeFou est un prototype. L'analyse se fait entièrement dans ton
            navigateur — aucun message n'est envoyé à un serveur. Les
            exemples utilisés ici sont fictifs. Cet outil repère des signaux
            connus d'arnaques courantes ; il ne détecte pas tout (par
            exemple, pas les appels vocaux ou deepfakes audio) et son score
            est indicatif, pas une garantie. Il ne remplace pas le jugement
            d'une personne de confiance ni les services d'urgence.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
