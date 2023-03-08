import { useEffect  } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useUserState } from '@/src/state/userState'

export default function SessionManager () {
  const userState = useUserState()
  const authChecked = useUserState((state) => state.authChecked)
  const updateSession = useUserState((state) => state.updateSession)

  const { status, data: session } = useSession({
    required: false,
    onUnauthenticated() {
      console.log('_________ unauthenticated ____________', authChecked, session)
      // The user is not authenticated, handle it here.
    },
  })

  useEffect(() => {
    console.log(`%cStatus change`, 'border-left: 14px solid red;', status, session)
    userState.updateSession(session)
  }, [status, session])

  // useEffect(() => {
  //   console.log(`%cStatus change`, 'border-left: 4px solid red;', status)
  //   console.log('authChecked', authChecked)

  //   userState.checkSession()
  // }, [status])

  return <></>
}
