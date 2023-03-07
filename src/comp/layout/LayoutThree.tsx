import { useState, useEffect } from 'react'
import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// import Header from './Header'
// import Footer from './Footer'
import layoutStyles from '@/styles/LayoutStyles.module.scss'

interface LayoutProps {
  title?: string
  children: any
  disablePadding?: boolean
}

const LayoutDefault = ({
  children,
  title,
  disablePadding
}: LayoutProps): JSX.Element => {
  const siteTitleDefault = 'U Florida Biomed and Life Sci'
  return (
    <div className={layoutStyles.LayoutThree}>
      <Head>
        <title>{siteTitleDefault}</title>
      </Head>

      <CssBaseline />
      {children}
    </div>
  )
}

export default LayoutDefault
