import Head from 'next/head'
import Image from 'next/image'
import Layout from '@/src/comp/layout/LayoutThree'
import ModelDisplay from '@/src/comp/ModelDisplay'
import Container from '@mui/material/Container'
import styles from '@/src/styles/LayoutStyles.module.scss'

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
        <ModelDisplay modelUrl />
      </Layout>
    </>
  )
}
