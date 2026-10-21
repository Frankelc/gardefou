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
          The rule that always works
        </p>
        <p className="mt-1 text-lg leading-snug" style={{ color: 'var(--ink)' }}>
          Whether the tool works or not: never give money, a code, or a
          password over the phone or by text. Always verify by calling the
          person or organization at a number you already know — never the
          one written in the message.
        </p>
      </div>
    </div>
  )
}
