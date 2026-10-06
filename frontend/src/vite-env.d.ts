/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_HERO_VIDEO?: string
  readonly VITE_CALENDLY_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
