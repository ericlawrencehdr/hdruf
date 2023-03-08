import { create } from 'zustand'
import { signIn, signOut, useSession, getSession } from 'next-auth/react'
// import { devtools, persist } from 'zustand/middleware'

interface UserState {
  bears: number
  authChecked: boolean
  authState: string //
  isLoggedIn: boolean
  increase: (by: number) => void
  logIn: (credentials: any) => Promise<void>
  logOut: () => Promise<void>
  updateSession: (session: any) => void
  checkSession: () => void
}

export const useUserState = create<UserState>((set, get) => ({
  bears: 0,
  authChecked: false,
  authState: 'loading',
  isLoggedIn: false,
  increase: async (by) => {
    const currentBears = get().bears
    const updatedBears = currentBears + 1
    set({ bears: updatedBears })
  },

  logIn: async ({credentials}) => {
    console.log('log in', credentials)
    const result = await signIn('credentials', {redirect: false, password: credentials.password})
    console.log('result', result)
    if (!result?.error) {
      console.log('%cset auth', 'color: green;')
      // @TODO: Remove this pause
      await new Promise(resolve => setTimeout(resolve, 2000));
      return set({ authState: 'authenticated' })
    } else {
      console.log('%cset anon', 'color: orange;')
      return set({ authState: 'unauthenticated' })
    }
  },

  logOut: async () => {
    console.log('logout')
    signOut()
  },

  updateSession: (session) => {
    const authChecked = session === undefined ? false : true

    let authStateStatus = 'authenticated'

    if (session === undefined) { 
      authStateStatus = 'loading'
    }

    if (session === null) { 
      authStateStatus = 'unauthenticated'
    }

    set({ authChecked: authChecked, authState: authStateStatus })
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
