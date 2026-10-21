export type Signal = {
  id: string
  label: string
  explanation: string
  weight: number
  match: string
}

export type RiskLevel = 'low' | 'medium' | 'high'

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
    id: 'urgency',
    label: 'Artificial urgency',
    explanation:
      'Scams create time pressure to stop you from thinking it through or checking.',
    weight: 20,
    pattern:
      /\b(hurry|urgent(ly)?|immediately|right away|quickly|don't wait|before it's too late|last chance)\b/i,
  },
  {
    id: 'money',
    label: 'Request for money or a transfer',
    explanation:
      'A message that quickly asks for money, a wire transfer, or a gift card is a classic scam signal.',
    weight: 30,
    pattern:
      /\b(western union|wire transfer|money order|gift cards?|crypto|bitcoin|send me|pay (me|now)|transfer)\b/i,
  },
  {
    id: 'code',
    label: 'Request for a code, password, or card number',
    explanation:
      'No legitimate institution asks for a verification code, PIN, or password by text or phone call.',
    weight: 30,
    pattern:
      /\b(verification code|otp|password|pin|security code|card number|cvv|access code)\b/i,
  },
  {
    id: 'identity',
    label: 'Impersonation (a relative or an authority)',
    explanation:
      'Posing as a relative in distress or an authority (bank, police, tech support) is a common way to earn trust.',
    weight: 15,
    pattern:
      /\b(it's me|grandma|grandpa|your grandson|your granddaughter|your son|your daughter|tech support|customer support|police|irs|tax office|bank)\b/i,
  },
  {
    id: 'isolation',
    label: 'Isolation pressure',
    explanation:
      "Asking to keep the message secret or not mention it to anyone is meant to stop you from checking it.",
    weight: 20,
    pattern: /\b(don't tell (anyone|anybody)|keep this (a )?secret|don't mention this|just between us)\b/i,
  },
  {
    id: 'channel',
    label: 'Unusual contact channel',
    explanation:
      "A new number or an excuse not to talk directly can mean the person isn't who they claim to be.",
    weight: 10,
    pattern: /\b(new number|my phone (is )?broke|i can't talk right now|lost my phone)\b/i,
  },
  {
    id: 'link',
    label: 'A link to click',
    explanation:
      'A link asking you to confirm an account or an identity can lead to a fake site imitating an official one.',
    weight: 15,
    pattern: /https?:\/\/\S+|\b(click (here|this link)|verify your account|confirm your identity)\b/i,
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

  let level: RiskLevel = 'low'
  if (score >= 55) level = 'high'
  else if (score >= 25) level = 'medium'

  return { signals, score, level }
}
