export type Example = {
  id: string
  label: string
  description: string
  text: string
}

export const EXAMPLES: Example[] = [
  {
    id: 'normal',
    label: 'Cas normal — faux message de petit-fils',
    description: 'Un exemple fictif où l’arnaque est claire une fois décortiquée.',
    text: "Grand-maman c'est moi, j'ai eu un accident de voiture et je suis bloqué, j'ai besoin que tu m'envoies 500$ par Western Union tout de suite, mon téléphone est cassé c'est pour ça que ce numéro est différent. S'il te plaît ne dis rien à maman, elle va paniquer, je t'expliquerai tout après.",
  },
  {
    id: 'confus',
    label: 'Cas confus — alerte bancaire légitime',
    description:
      'Un exemple fictif plus ambigu : urgent, mais pas forcément une arnaque.',
    text: "Alerte sécurité : une connexion inhabituelle a été détectée sur votre compte. Si ce n'était pas vous, veuillez vérifier votre compte dès que possible depuis le site officiel de votre banque ou l'application mobile.",
  },
  {
    id: 'echec',
    label: "Cas d'échec — rien à analyser",
    description: 'Un champ vide, pour vérifier que le filet de sécurité reste affiché.',
    text: '',
  },
]
