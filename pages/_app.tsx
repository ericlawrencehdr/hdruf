import { SessionProvider } from 'next-auth/react'
import SessionManager from '@/src/state/SessionManager'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps }, 
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <SessionManager />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
