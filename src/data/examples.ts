export type Example = {
  id: string
  label: string
  description: string
  text: string
}

export const EXAMPLES: Example[] = [
  {
    id: 'normal',
    label: 'Normal case — fake grandson message',
    description: 'A fictional example where the scam is obvious once broken down.',
    text: "Grandma it's me, I got into a car accident and I'm stuck, I need you to send me $500 through Western Union right away, my phone is broken that's why this number is different. Please don't tell mom, she'll panic, I'll explain everything later.",
  },
  {
    id: 'confusing',
    label: 'Confusing case — legitimate bank alert',
    description: 'A trickier fictional example: urgent, but not necessarily a scam.',
    text: "Security alert: an unusual sign-in was detected on your account. If this wasn't you, please check your account as soon as possible from your bank's official website or mobile app.",
  },
  {
    id: 'failure',
    label: "Failure case — nothing to analyze",
    description: 'An empty field, to check that the safety net still shows up.',
    text: '',
  },
]
