import { create } from 'zustand'

interface UsePopupState {
  isOpen: boolean
  onToggle: () => void
  inToggle: () => void
}

export const usePopup = create<UsePopupState>((set) => ({
  isOpen: true,
  onToggle: () =>
    set(() => ({
      isOpen: false
    })),
  inToggle: () =>
    set({
      isOpen: true
    })
}))
