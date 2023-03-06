import Head from 'next/head'
import Image from 'next/image'
import Layout from '@/src/comp/layout/Layout'
import Container from '@mui/material/Container'

export default function Home() {
  return (
    <>
      <Head>
        <title>HDR: U Florida Biomed and Life Sci</title>
        <meta name="description" content="University of Florida Biomedical Life Sciences Research Building" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Container sx={{display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', minHeight: '14rem'}}>
          <h3><center>HDR: University of Florida Biomedical Life Sciences Research Building</center></h3>
        </Container>
      </Layout>
    </>
  )
}
