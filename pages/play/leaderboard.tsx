import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Play.module.css'
import { PlayNavMenu } from '@/components/NavMenu/PlayNavMenu'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import JoinCommunity from '@/components/JoinCommunity'
import Footer from '@/components/Footer'
import { useTranslation } from "next-i18next";

export default function Leaderboard() {
  const { t } = useTranslation("");

  return (
    <>
      <Head>
        <title>{t("leaderboard.Leaderboard")}</title>
        <meta property="og:title" content={`${t("leaderboard.Leaderboard")}`} />
      </Head>
      <main className={styles.main}>
        <PlayNavMenu />
        <JoinCommunity />
        <Footer />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
    ])),
  },
})