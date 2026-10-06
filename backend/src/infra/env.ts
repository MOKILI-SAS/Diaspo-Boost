import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4080),
  DB_DRIVER: z.enum(['mysql', 'file']).default('file'),
  DATABASE_URL: z.string().optional(),
  FRONTEND_ORIGIN: z.string().url().default('http://127.0.0.1:5280'),
  ADMIN_API_KEY: z.string().min(8).default('change-me-admin-key-dev'),
  ADMIN_EMAIL: z.string().email().default('contact@diaspoboost.com'),
  ADMIN_PASSWORD: z.string().min(6).default('DiaspoBoost2026!'),
  GOOGLE_FORM_URL: z
    .string()
    .optional()
    .default('https://docs.google.com/forms/d/e/1FAIpQLSfh6xV-google-form-contact-diaspoboost/viewform'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().default('DiaspoBoost <contact@diaspoboost.com>'),
  RESEND_API_KEY: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

export function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')
    throw new Error(`Invalid environment: ${issues}`)
  }
  const env = parsed.data
  if (env.DB_DRIVER === 'mysql' && !env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required when DB_DRIVER=mysql')
  }
  return env
}
