import Head from 'next/head'
import Image from 'next/image'
import useAuth from '@/hooks/useAuth'
import { PlayNavMenu } from '@/components/NavMenu/PlayNavMenu'
import LandMintCard from '@/components/Cards/LandMint'
import { Rubik_Wet_Paint, Saira_Extra_Condensed } from '@next/font/google'
import styles from '@/styles/Play.module.css'
import Type from '@/components/Type'
import useLandContract from "@/hooks/useLandContract"
import LandProperty from '@/components/Cards/LandProperty'
import { useTranslation } from "next-i18next";
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import JoinCommunity from '@/components/JoinCommunity'
import Footer from '@/components/Footer'

const rubik = Rubik_Wet_Paint({ weight: '400', subsets: ['latin'] })
const saria = Saira_Extra_Condensed({ weight: '400', subsets: ['latin'] })

export default function LandMint() {
  const { t } = useTranslation("");

  let { wallet } = useAuth();
  
  const contractData = useLandContract(wallet);
  const getDisplayPrice = (price: bigint) => {
    return (Number(price) / Math.pow(10, 18)).toFixed(3);
  }

  return (
    <>
      <Head>
        <title>{t("play.Land Mint Page Name")}</title>
        <meta property="og:title" content={`${t("play.Land Mint Page Name")}`} />
      </Head>
      <main className={styles.main}>
        <PlayNavMenu />
        <div className="relative">
          <Image src="/images/land-background.png" alt="home" width={"0"} height={"0"} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
          <div className={`${styles.titleContainer} absolute w-full flex flex-col items-center px-12`}>
            <h2 className={`${rubik.className} ${styles.title}`}>{t("play.Land Mint Title")}</h2>
            <div className={`${styles.line} w-full mt-1`}></div>
            <h6 className={`${saria.className} text-xs sm:text-base lg_2:text-2xl text-white tracking-[.2em] mt-2 text-center`}>{t("play.Land Mint SubTitle")}</h6>
          </div>
        </div>
        <div className={`${styles.mintCards} py-10 flex flex-wrap flex-row justify-evenly`}>
          <LandMintCard 
            type={0} 
            minted={contractData.commonTokenIdCnt} 
            setCount={contractData.setCommonTokenIdCnt} 
            total={contractData.maxCommon} 
            prices={contractData.commonPrices}
            contract={contractData.contract}
          />
          <LandMintCard 
            type={1} 
            minted={contractData.rareTokenIdCnt} 
            setCount={contractData.setRareTokenIdCnt} 
            total={contractData.maxRare} 
            prices={contractData.rarePrices}
            contract={contractData.contract}
          />
          <LandMintCard 
            type={2} 
            minted={contractData.legendTokenIdCnt} 
            setCount={contractData.setLegendTokenIdCnt} 
            total={contractData.maxLegend} 
            prices={contractData.legendPrices}
            contract={contractData.contract}
          />
          <LandMintCard 
            type={3} 
            minted={contractData.mythicalTokenIdCnt}
            setCount={contractData.setMythicalTokenIdCnt} 
            total={contractData.maxMythical} 
            prices={contractData.mythicalPrices}
            contract={contractData.contract}
          />
        </div>
        <div className={`${styles.landProperties} flex items-center justify-center`}>
          <div className={`${styles.landGrid} px-10`}>
            <div className={styles.landType}>
              <div></div>
              <div className='flex items-center'><Type type={1}>BNB</Type></div>
              <div className='flex items-center'><Type type={1}>USDT</Type></div>
              <div className='flex items-center'><Type type={1}>BUSD</Type></div>
              <div className='flex items-center'><Type type={1}>ZOMFI</Type></div>
            </div>
            <LandProperty 
              type={0} 
              value1={getDisplayPrice(contractData.commonPrices[0].price)}
              value2={getDisplayPrice(contractData.commonPrices[1].price)}
              value3={getDisplayPrice(contractData.commonPrices[2].price)}
              value4={getDisplayPrice(contractData.commonPrices[3].price)}
            />
            <LandProperty 
              type={1} 
              value1={getDisplayPrice(contractData.rarePrices[0].price)}
              value2={getDisplayPrice(contractData.rarePrices[1].price)}
              value3={getDisplayPrice(contractData.rarePrices[2].price)}
              value4={getDisplayPrice(contractData.rarePrices[3].price)}
            />
            <LandProperty 
              type={2} 
              value1={getDisplayPrice(contractData.legendPrices[0].price)} 
              value2={getDisplayPrice(contractData.legendPrices[1].price)} 
              value3={getDisplayPrice(contractData.legendPrices[2].price)} 
              value4={getDisplayPrice(contractData.legendPrices[3].price)} 
            />
            <LandProperty 
              type={3} 
              value1="-" 
              value2="-" 
              value3="-" 
              value4="-" 
            />
          </div>
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