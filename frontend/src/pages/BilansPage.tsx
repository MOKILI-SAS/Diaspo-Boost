import { useTranslation } from 'react-i18next'
import { BILANS } from '../data/bilans'
import { BilanCard } from '../features/bilans/BilanCard'
import { Container, PageHero, Section } from '../shared/ui/Section'

export function BilansPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero kicker={t('bilans.kicker')} title={t('bilans.title')} lead={t('bilans.lead')} />
      <Section>
        <Container className="grid gap-6 lg:grid-cols-2">
          {BILANS.map((doc) => (
            <BilanCard key={doc.slug} doc={doc} />
          ))}
        </Container>
      </Section>
    </>
  )
}
