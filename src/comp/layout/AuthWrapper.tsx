import { ReactElement, ReactNode, Fragment } from "react"
import { animated, useSpring } from '@react-spring/web'

import { useUserState } from '@/src/state/userState'


interface AuthWrapperProps {
  children: ReactNode
}

export default function AuthWrapper ({ children }: AuthWrapperProps) {
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0 },
  }))

  const fadeIn = () => {
    api.start({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    })
  }

  const fadeOut = () => {
    api.start({
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
    })
  }

  const onClickHandler = (evt: any) => {
    evt.preventDefault()
    fadeIn()
  }

  const animationStyles = {
    ...springs
  }

  const authChecked = useUserState((state) => state.authChecked)

  return (
    <Fragment>
      <a href="#" onClick={onClickHandler}>stuff</a>
      <animated.div style={animationStyles}>
        <h3>Checked: {authChecked}</h3>
        {children}
      </animated.div>
    </Fragment>
  )
}

