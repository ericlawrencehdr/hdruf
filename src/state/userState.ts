import { create } from 'zustand'
// import { devtools, persist } from 'zustand/middleware'

interface UserState {
  bears: number
  authChecked: boolean
  increase: (by: number) => void
  checkSession: () => void
}

export const useUserState = create<UserState>((set, get) => ({
  bears: 0,
  authChecked: false,
  increase: async (by) => {
    const currentBears = get().bears
    const updatedBears = currentBears + 1
    set({ bears: updatedBears })
  },
  checkSession: async () => {
    console.log('check sesh')
    set({ authChecked: true })
  }
}))

interface UserStateX {
  bears: number
  increase: (by: number) => void
}
