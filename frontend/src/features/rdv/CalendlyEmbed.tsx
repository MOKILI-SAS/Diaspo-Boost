import { useEffect } from 'react'

export function CalendlyEmbed({ url }: { url: string }) {
  useEffect(() => {
    const existing = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
    if (existing) return
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div
      className="calendly-inline-widget overflow-hidden rounded-xl border border-base-300 bg-white"
      data-url={url}
      style={{ minWidth: 320, height: 720 }}
    />
  )
}
