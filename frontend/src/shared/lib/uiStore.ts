import { create } from 'zustand'

interface UiState {
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
  lancerModalOpen: boolean
  lancerSelectedService?: string
  openLancerModal: (serviceSlug?: string) => void
  closeLancerModal: () => void
}

export const useUiStore = create<UiState>((set) => ({
  mobileOpen: false,
  setMobileOpen: (open) => set({ mobileOpen: open }),
  lancerModalOpen: false,
  lancerSelectedService: undefined,
  openLancerModal: (serviceSlug) =>
    set({ lancerModalOpen: true, lancerSelectedService: serviceSlug, mobileOpen: false }),
  closeLancerModal: () =>
    set({ lancerModalOpen: false, lancerSelectedService: undefined }),
}))
