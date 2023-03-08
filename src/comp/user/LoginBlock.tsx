import { FormEventHandler, useState } from 'react'
import Image from 'next/image'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import { useSpring, animated } from '@react-spring/web'
import Logo from '@/public/assets/HDR_logo_white.svg'
import styles from '@/styles/loginBlock.module.scss'

import { useUserState } from '@/src/state/userState'
// import { useUserState } from '@/state/userState'

interface LoginBlockProps {
  className?: string
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            background: '#888',
            color: '#222'
          },
          background: '#444',
          color: '#fff'
        },
      }
    }
  }
});

export default function LoginBlock ({ className }: LoginBlockProps) {
  const userState = useUserState()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();
    setIsSubmitting(!isSubmitting)
    const result = await userState.logIn({credentials: {password: values.password, redirect: false}})

    setTimeout(() => {
      setIsSubmitting(false)
    }, 1000)

  };

  // @TODO: Refine types
  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  // @TODO: Refine types
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  }

  const formStatusClass = isSubmitting ? 'isSubmitting' : 'isReady'

  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })
  const props2 = useSpring({ ...props })

  return (
    <div className={[styles.wrapper, className, styles[formStatusClass]].join(' ')}>
      <animated.div style={props}>
        <div className={styles.logoWrapper}>
          <Image src={Logo.src} className={styles.logo} alt="HDR Inc" width="50" height="20"/>

          <animated.div style={props2} className={styles.animatedWrapper}>
            {/* <Box> */}
              <form onSubmit={handleSubmit} className={styles.Form}>
                <ThemeProvider theme={darkTheme}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                  <InputLabel disabled={true} htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                    size="small"
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                  <Button type="submit" variant="contained" size="small">Log In</Button>
                </FormControl>
                </ThemeProvider>
              </form>
            {/* </Box> */}
          </animated.div>
          
        </div>
      </animated.div>
      
    </div>
  )
}
