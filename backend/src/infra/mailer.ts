import nodemailer from 'nodemailer'
import type { Env } from './env.js'

export interface MailerPayload {
  to: string
  subject: string
  text: string
  html?: string
}

export interface Mailer {
  send(payload: MailerPayload): Promise<void>
}

export const consoleMailer: Mailer = {
  async send(payload) {
    console.log('[mailer:console]', payload.subject, '->', payload.to)
    console.log(payload.text)
  },
}

export function createMailer(env: Env): Mailer {
  if (env.SMTP_HOST) {
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT ?? 587,
      secure: env.SMTP_PORT === 465,
      auth:
        env.SMTP_USER && env.SMTP_PASS
          ? {
              user: env.SMTP_USER,
              pass: env.SMTP_PASS,
            }
          : undefined,
    })

    return {
      async send(payload) {
        await transporter.sendMail({
          from: env.SMTP_FROM,
          to: payload.to,
          subject: payload.subject,
          text: payload.text,
          html: payload.html,
        })
      },
    }
  }

  if (env.RESEND_API_KEY) {
    return {
      async send(payload) {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: env.SMTP_FROM,
            to: payload.to,
            subject: payload.subject,
            text: payload.text,
            html: payload.html,
          }),
        })
        if (!res.ok) {
          const err = await res.text()
          throw new Error(`Resend mailer error: ${err}`)
        }
      },
    }
  }

  return consoleMailer
}
