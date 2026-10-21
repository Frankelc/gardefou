import { PinIcon } from './icons'

export function FallbackNotice() {
  return (
    <div
      className="card flex items-start gap-4 p-5"
      style={{ background: 'var(--pine-soft)', borderColor: 'color-mix(in srgb, var(--pine) 35%, var(--paper-line))' }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ background: 'var(--paper)', color: 'var(--pine)' }}
      >
        <PinIcon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display text-lg font-semibold" style={{ color: 'var(--pine)' }}>
          La règle qui marche toujours
        </p>
        <p className="mt-1 text-lg leading-snug" style={{ color: 'var(--ink)' }}>
          Que l'outil fonctionne ou non : ne donne jamais d'argent, de code ou
          de mot de passe par téléphone ou SMS. Vérifie toujours en appelant
          la personne ou l'organisation à un numéro que tu connais déjà —
          jamais celui écrit dans le message.
        </p>
      </div>
    </div>
  )
}
