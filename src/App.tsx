import { useMemo, useState } from 'react'
import { FallbackNotice } from './components/FallbackNotice'
import { ResultPanel } from './components/ResultPanel'
import { EXAMPLES } from './data/examples'
import { analyse } from './lib/engine'

function App() {
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const analysis = useMemo(() => analyse(text), [text])
  const hasText = text.trim().length > 0

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <main className="mx-auto flex max-w-2xl flex-col gap-8 px-5 py-10">
        <header>
          <h1 className="text-3xl font-bold">GardeFou</h1>
          <p className="mt-2 text-xl text-gray-700 dark:text-gray-300">
            Colle un message suspect. On t'explique ce qui est inhabituel,
            avant que tu n'agisses.
          </p>
        </header>

        <section className="flex flex-col gap-3">
          <label htmlFor="message" className="text-lg font-semibold">
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
            className="rounded-xl border-2 border-gray-300 p-4 text-lg focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
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
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {ex.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="self-start rounded-xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700"
          >
            Analyser
          </button>
        </section>

        <section>
          {submitted && hasText ? (
            <ResultPanel analysis={analysis} />
          ) : submitted && !hasText ? (
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Il n'y a rien à analyser. La règle de sécurité ci-dessous reste
              valable dans tous les cas.
            </p>
          ) : (
            <p className="text-lg text-gray-500 dark:text-gray-500">
              Colle un message, ou essaie un exemple, puis clique sur « Analyser ».
            </p>
          )}
        </section>

        <FallbackNotice />

        <footer className="border-t border-gray-200 pt-4 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
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
      </main>
    </div>
  )
}

export default App
