export type Signal = {
  id: string
  label: string
  explanation: string
  weight: number
  match: string
}

export type RiskLevel = 'faible' | 'moyen' | 'eleve'

export type Analysis = {
  signals: Signal[]
  score: number
  level: RiskLevel
}

type Rule = {
  id: string
  label: string
  explanation: string
  weight: number
  pattern: RegExp
}

const RULES: Rule[] = [
  {
    id: 'urgence',
    label: 'Urgence artificielle',
    explanation:
      "Les arnaques créent une pression de temps pour empêcher de réfléchir ou de vérifier.",
    weight: 20,
    pattern:
      /\b(vite|urgent(e)?|imm[ée]diatement|tout de suite|d[ée]p[ée]che|rapidement|sans attendre|dernière chance|avant qu'il ne soit trop tard)\b/i,
  },
  {
    id: 'argent',
    label: "Demande d'argent ou de transfert",
    explanation:
      'Un message qui demande rapidement de l’argent, un virement ou une carte cadeau est un signal classique d’arnaque.',
    weight: 30,
    pattern:
      /\b(western union|virement|mandat|carte(s)?[- ]cadeau|crypto|bitcoin|envoie[- ]?moi|paye[rz]?|transf[èe]re?|transfert)\b/i,
  },
  {
    id: 'code',
    label: "Demande de code, mot de passe ou numéro de carte",
    explanation:
      'Aucune institution légitime ne demande un code de vérification, un NIP ou un mot de passe par SMS ou téléphone.',
    weight: 30,
    pattern:
      /\b(code de v[ée]rification|otp|mot de passe|nip|code secret|num[ée]ro de carte|cvv|code d'acc[èe]s)\b/i,
  },
  {
    id: 'identite',
    label: "Usurpation d'identité (proche ou autorité)",
    explanation:
      "Se faire passer pour un proche en détresse ou une autorité (banque, police, support technique) est une technique courante pour gagner la confiance.",
    weight: 15,
    pattern:
      /\b(c'est moi|grand-maman|grand-papa|petit-fils|petite-fille|ton fils|ta fille|support technique|service technique|police|imp[ôo]ts|revenu qu[ée]bec|banque)\b/i,
  },
  {
    id: 'isolement',
    label: "Pression d'isolement",
    explanation:
      'Demander de garder le message secret ou de ne pas en parler à un proche sert à empêcher toute vérification.',
    weight: 20,
    pattern:
      /\b(ne (le )?dis à personne|garde ça secret|ne pr[ée]viens pas|entre nous|ne dis rien à)\b/i,
  },
  {
    id: 'canal',
    label: 'Canal de contact inhabituel',
    explanation:
      "Un nouveau numéro ou une excuse pour ne pas parler de vive voix peut indiquer que la personne n'est pas qui elle prétend être.",
    weight: 10,
    pattern:
      /\b(nouveau num[ée]ro|mon t[ée]l[ée]phone est cass[ée]|je ne peux pas parler|j'ai perdu mon t[ée]l[ée]phone)\b/i,
  },
  {
    id: 'lien',
    label: 'Lien à cliquer',
    explanation:
      "Un lien demandant de confirmer un compte ou une identité peut mener vers un site frauduleux imitant un site officiel.",
    weight: 15,
    pattern: /https?:\/\/\S+|\b(clique[rz]?|v[ée]rifie[rz]? ton compte|confirme[rz]? ton identit[ée])\b/i,
  },
]

export function analyse(text: string): Analysis {
  const trimmed = text.trim()
  const signals: Signal[] = []

  if (trimmed.length > 0) {
    for (const rule of RULES) {
      const match = trimmed.match(rule.pattern)
      if (match) {
        signals.push({
          id: rule.id,
          label: rule.label,
          explanation: rule.explanation,
          weight: rule.weight,
          match: match[0],
        })
      }
    }
  }

  const rawScore = signals.reduce((sum, s) => sum + s.weight, 0)
  const score = Math.min(100, rawScore)

  let level: RiskLevel = 'faible'
  if (score >= 55) level = 'eleve'
  else if (score >= 25) level = 'moyen'

  return { signals, score, level }
}
