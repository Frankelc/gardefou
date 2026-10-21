export function FallbackNotice() {
  return (
    <div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-4 text-amber-900 dark:border-amber-500 dark:bg-amber-950 dark:text-amber-100">
      <p className="text-lg font-semibold">La règle qui marche toujours</p>
      <p className="mt-1 text-lg">
        Que l'outil fonctionne ou non : ne donne jamais d'argent, de code ou de
        mot de passe par téléphone ou SMS. Vérifie toujours en appelant la
        personne ou l'organisation à un numéro que tu connais déjà — jamais
        celui écrit dans le message.
      </p>
    </div>
  )
}
