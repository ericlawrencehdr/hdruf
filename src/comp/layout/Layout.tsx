import { useState, useEffect } from 'react'
import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AuthWrapper from '@/src/comp/layout/AuthWrapper'

// import Header from './Header'
// import Footer from './Footer'
import layoutStyles from '@/styles/LayoutStyles.module.scss'

interface LayoutProps {
  title?: string
  children: any
  disablePadding?: boolean
}

const layoutDefaultTheme = createTheme({
  typography: {
    h1: {
      fontWeight: 500,
      fontSize: 20
    },
    h2: {
      fontWeight: 700,
      fontSize: 18
    },
    h3: {
      fontWeight: 700,
      fontSize: 14
    }
  }
})

const containerStylesDefault = {
  my: 2,
  py: 2,
  background: 'white',
  borderRadius: 0.8,
  display: 'flex',
  flex: '1',
  flexDirection: 'column'
}

const containerStylesPaddingDisabled = {
  ...containerStylesDefault,
  py: 0
}

const LayoutDefault = ({
  children,
  title,
  disablePadding
}: LayoutProps): JSX.Element => {
  const siteTitleDefault = 'U Florida Biomed and Life Sci'
  return (
    <div className={['layout layout-default', layoutStyles.TopLevelWrapper].join(' ')}>
      <Head>
        <title>{siteTitleDefault}</title>
        {/* <meta name='description' content={siteDescriptionDefault} /> */}
      </Head>

      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <AuthWrapper>
        <ThemeProvider theme={layoutDefaultTheme}>
          {/* <Header /> */}
          <Container
            component='main'
            sx={{ p: 0, display: 'flex', flexDirection: 'column' }}
            disableGutters
            className={layoutStyles.fullFlex}
            maxWidth={false}
          >
            {title && (
              <Container
                sx={{
                  mt: 3,
                  px: {
                    lg: 0
                  }
                }}
              >
                <Typography variant='h1'>{title}</Typography>
              </Container>
            )}
            {children}
          </Container>

          {/* <Footer /> */}
        </ThemeProvider>
      </AuthWrapper>
    </div>
  )
}

export default LayoutDefault
