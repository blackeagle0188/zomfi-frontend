import Head from 'next/head'
import { MyAssetNavMenu } from '@/components/NavMenu/MyAssetNavMenu'
import TradeHistoryTable from '@/components/Table/TradeHistoryTable'
import styles from '@/styles/Assets.module.css'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import JoinCommunity from '@/components/JoinCommunity'
import Footer from '@/components/Footer'
import { useTranslation } from "next-i18next";

const TableData = [
  {
    type: "Sell",
    address: "0xd0Bd416e1CE60Cd239F467D40C1841263cf1cD31",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Auction",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Rare",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Sell",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Auction",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Rare",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Sell",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Auction",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Rare",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Sell",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Auction",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Rare",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Sell",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Auction",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Rare",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Sell",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Auction",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Rare",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Sell",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Auction",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Rare",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Sell",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Auction",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Rare",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Sell",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Dogs#0123",
    collection: "Dog",
    rarity: "Common",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  },
  {
    type: "Auction",
    address: "0xcEbd64ed16D6dF9f78369CafC1877800469594c8",
    name: "Lands#0123",
    collection: "Land",
    rarity: "Rare",
    listingType: "Auction",
    price: "1.1 BNB",
    date: "2022-10-01 10:20:19"
  }
]

export default function Assets() {
  const { t } = useTranslation("");

  return (
    <>
      <Head>
        <title>{t("assets.Buy/Sell History")}</title>
        <meta property="og:title" content={`${t("assets.Buy/Sell History")}`}/>
      </Head>
      <main className={styles.main}>
        <MyAssetNavMenu />
        <div className={`${styles.table} text-white text-xs m-6`}>
          <TradeHistoryTable tableData={TableData} />
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