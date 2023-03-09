import Head from 'next/head'
import { MyAssetNavMenu } from '@/components/NavMenu/MyAssetNavMenu'
import styles from '@/styles/Assets.module.css'
import RentalHistoryTable from '@/components/Table/RentalHistoryTable'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import JoinCommunity from '@/components/JoinCommunity'
import Footer from '@/components/Footer'
import { useTranslation } from "next-i18next";

const TableData=[
  {
    type: "Lend",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Borrow",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Lend",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Borrow",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Lend",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Borrow",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Lend",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Borrow",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Lend",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Borrow",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Lend",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Borrow",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Lend",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Borrow",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Lend",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  },
  {
    type: "Borrow",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Common",
    mode: "Direct Rent",
    reward: "------------",
    start: "2022-10-01 10:20:19",
    end: "2022-10-01 10:20:19"
  }
]

export default function Rent() {
  const { t } = useTranslation("");

  return (
    <>
      <Head>
        <title>{t("assets.Rent History")}</title>
        <meta property="og:title" content={`${t("assets.Rent History")}`} />
      </Head>
      <main className={styles.main}>
        <MyAssetNavMenu />
        <div className={`${styles.table} text-white text-xs m-6`}>
          <RentalHistoryTable tableData={TableData} />
        </div>
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