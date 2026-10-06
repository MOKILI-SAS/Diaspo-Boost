import * as yup from 'yup'
import type { ProfileType } from '../../shared/types/api'

export interface BookingValues {
  fullName: string
  email: string
  phone: string
  country: string
  profile: ProfileType | ''
  sector: string
  message: string
  consent: boolean
}

const phoneRegex = /^$|^\+?[0-9 ()./-]{7,20}$/

export function createBookingSchema(t: (key: string) => string) {
  return yup.object({
    fullName: yup.string().trim().min(2, t('form.required')).max(120).required(t('form.required')),
    email: yup.string().trim().email(t('form.emailInvalid')).required(t('form.required')),
    phone: yup.string().trim().matches(phoneRegex, t('form.phoneInvalid')),
    country: yup.string().trim().min(2, t('form.required')).required(t('form.required')),
    profile: yup.string().required(t('form.required')),
    sector: yup.string().trim().max(80),
    message: yup.string().trim().min(20, t('form.messageMin')).max(2000).required(t('form.required')),
    consent: yup.boolean().oneOf([true], t('form.consentRequired')),
  })
}

export const emptyBooking: BookingValues = {
  fullName: '',
  email: '',
  phone: '',
  country: '',
  profile: '',
  sector: '',
  message: '',
  consent: false,
}
