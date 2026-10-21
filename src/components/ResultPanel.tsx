import { useState } from 'react'
import type { Analysis } from '../lib/engine'

const LEVEL_STYLE: Record<
  Analysis['level'],
  { title: string; action: string; className: string }
> = {
  eleve: {
    title: 'Danger probable',
    action:
      "Ne réponds pas et ne transfère rien. Appelle la personne directement au numéro que tu as déjà enregistré — pas celui écrit dans le message.",
    className:
      'border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
  },
  moyen: {
    title: 'Signaux à vérifier',
    action:
      "Ne te presse pas. Vérifie par un canal officiel (site connu, numéro déjà enregistré) avant d'agir.",
    className:
      'border-orange-500 bg-orange-50 text-orange-900 dark:bg-orange-950 dark:text-orange-100',
  },
  faible: {
    title: 'Rien de flagrant détecté',
    action:
      "Aucun signal fort trouvé, mais reste prudent avec toute demande d'argent ou d'information personnelle.",
    className:
      'border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100',
  },
}

export function ResultPanel({ analysis }: { analysis: Analysis }) {
  const [dismissed, setDismissed] = useState(false)
  const style = LEVEL_STYLE[analysis.level]
  const canDismiss = analysis.level !== 'faible'

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`rounded-xl border-2 p-5 transition-colors ${
          dismissed ? 'border-gray-300 bg-gray-50 text-gray-700 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200' : style.className
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-xl font-bold">
            {dismissed ? 'Marqué comme vérifié par toi' : style.title}
          </p>
          <span className="text-lg font-semibold">{analysis.score}/100</span>
        </div>
        <p className="mt-2 text-lg">
          {dismissed
            ? "D'accord — tu connais la situation. Les signaux repérés restent listés plus bas, au cas où."
            : style.action}
        </p>
        {canDismiss && (
          <button
            type="button"
            onClick={() => setDismissed((d) => !d)}
            className="mt-3 rounded-lg border border-current px-3 py-2 text-base font-medium underline-offset-2 hover:underline"
          >
            {dismissed
              ? "Rétablir l'alerte"
              : "Ce n'est pas un piège, je connais cette situation"}
          </button>
        )}
      </div>

      {analysis.signals.length > 0 ? (
        <div className="rounded-xl border border-gray-300 p-5 dark:border-gray-700">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Signaux détectés
          </p>
          <ul className="mt-3 flex flex-col gap-4">
            {analysis.signals.map((signal) => (
              <li key={signal.id} className="border-l-4 border-gray-300 pl-3 dark:border-gray-600">
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {signal.label}
                </p>
                <p className="text-gray-700 dark:text-gray-300">{signal.explanation}</p>
                <p className="mt-1 text-sm italic text-gray-500 dark:text-gray-400">
                  Passage repéré : « {signal.match} »
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Aucun des signaux connus de ce prototype n'a été trouvé dans ce texte.
        </p>
      )}
    </div>
  )
}
