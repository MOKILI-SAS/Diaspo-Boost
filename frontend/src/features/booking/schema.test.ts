import { describe, expect, it } from 'vitest'
import { createBookingSchema } from './schema'

const t = (key: string) => key

describe('booking schema', () => {
  const schema = createBookingSchema(t)

  it('rejects short message and missing consent', async () => {
    await expect(
      schema.validate(
        {
          fullName: 'Marie Nkosi',
          email: 'marie@example.com',
          phone: '',
          country: 'France',
          profile: 'diaspora',
          sector: '',
          message: 'trop court',
          consent: false,
        },
        { abortEarly: false },
      ),
    ).rejects.toBeTruthy()
  })

  it('accepts a complete request', async () => {
    const value = await schema.validate({
      fullName: 'Marie Nkosi',
      email: 'marie@example.com',
      phone: '+33600000000',
      country: 'France',
      profile: 'diaspora',
      sector: 'Agri',
      message: 'Je souhaite un cadrage pour un projet agro-industriel au Kongo-Central.',
      consent: true,
    })
    expect(value.email).toBe('marie@example.com')
  })
})
