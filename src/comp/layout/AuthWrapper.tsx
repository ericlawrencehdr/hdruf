import { ReactElement, ReactNode, Fragment, useState, useEffect } from "react"
import { animated, useSpring } from '@react-spring/web'
import LoadingFullPage from '@/src/comp/LoadingFullPage'
import LoginBlock from '@/src/comp/user/LoginBlock'

import { useUserState } from '@/src/state/userState'
import FPOUserState from "../fpo/FPOUserState"

const fpoStyles = {
  border: '1px solid red',
  padding: '1rem',
  borderRadius: '0.5rem',
}

const StateLoading= () => {
  return (
    <LoadingFullPage />
  )
}

const FPOAnon = () => {
  return (
    <div style={fpoStyles}>
      <h3>Anon</h3>
      <LoginBlock />
    </div>
  )
}

const FPOAuth = () => {
  return (
    <div style={fpoStyles}>
      <h3>Authorized</h3>
    </div>
  )
}


interface AuthWrapperProps {
  children: ReactNode
}

export default function AuthWrapper ({ children }: AuthWrapperProps) {
  const authState = useUserState((state) => state.authState)
  const isLoggedIn = useUserState((state) => state.isLoggedIn)

  const [showLoading, setShowLoading] = useState(authState === 'loading')
  const [showAnon, setShowAnon] = useState(false)
  const [showAuthorized, setShowAuthorized] = useState(false)

  useEffect(() => {
    setShowLoading(authState === 'loading')
    setShowAnon(authState === 'unauthenticated')
    setShowAuthorized(authState === 'authenticated')
    console.log('authState', authState, isLoggedIn)
  }, [authState])

  useEffect(() => {
    console.log('showAnon',showAnon)
  }, [showAnon])

  const [springs, api] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: 1000,
    delay: 1000,
  }))

  const animationStyles = {
    ...springs
  }

  return (
    <Fragment>
      {/* <FPOUserState /> */}

      {showAnon && <Fragment>
        <animated.div style={animationStyles}>
          <FPOAnon />
        </animated.div>
      </Fragment>}
      
      {showAuthorized && <Fragment>
        <animated.div style={animationStyles}>
          {children}
        </animated.div>
      </Fragment>}

      {showLoading && <StateLoading />}
    </Fragment>
  )
}
