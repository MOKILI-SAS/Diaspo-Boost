import { useTranslation } from 'react-i18next'
import { CONTACTS } from '../../data/contacts'
import { loc } from '../../shared/lib/locale'
import { cn } from '../../shared/lib/cn'

export function ContactDetails({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const { i18n } = useTranslation()
  const muted = variant === 'dark' ? 'text-white/80' : 'text-navy'
  const link = variant === 'dark' ? 'underline-offset-4 hover:underline' : 'link'

  return (
    <ul className={cn('space-y-2 text-sm', muted)}>
      {CONTACTS.emails.map((email) => (
        <li key={email}>
          <a className={link} href={`mailto:${email}`}>
            {email}
          </a>
        </li>
      ))}
      {CONTACTS.phones.map((phone) => (
        <li key={phone.href}>
          <a className={link} href={phone.href}>
            {phone.display}
          </a>
          {phone.whatsapp ? (
            <span className={variant === 'dark' ? 'text-white/50' : 'text-neutral/50'}> · WhatsApp</span>
          ) : null}
        </li>
      ))}
      <li>{loc(CONTACTS.address, i18n.language)}</li>
    </ul>
  )
}
