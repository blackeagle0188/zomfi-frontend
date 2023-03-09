import Head from 'next/head'
import Image from 'next/image'
import { Russo_One, Rubik_Wet_Paint } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useTranslation } from "next-i18next";
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import JoinCommunity from '@/components/JoinCommunity'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import BlogCard from '@/components/BlogCard';
import Partners from '@/components/Partners';

const russo_one = Russo_One({ weight: '400', subsets: ['latin'] })
const rubik = Rubik_Wet_Paint({ weight: '400', subsets: ['latin'] })

export default function Home() {
  const { t } = useTranslation("");

  const handleSelectEvent = () => {

  }

  return (
    <>
      <Head>
        <title>{t("home.Welcome to Zomfi")}</title>
        <meta property="og:title" content={`${t("home.Welcome to Zomfi")}`} />
      </Head>
      <main className={styles.main}>
        <div className={`${styles.banner} flex flex-row overflow-hidden`}>
          <div className={`${styles.bannerContent} flex flex-row max-w-[1280px] w-full mx-4 md:mx-10 my-20 lg_2:m-auto items-center lg_2:my-44`}>
            <div className='flex flex-col items-start z-[1]'>
              <div className='flex flex-col lg_2:flex-row'>
                <div className='flex flex-row'>
                  <Button color={"#00FFC2"} height={"Normal"} radius={"Small"} textColor={"White"} fontSize={"20px"} class={"mr-4 md:mr-8"} onClick={handleSelectEvent}>{t("home.SPECIAL EVENT")}</Button>
                  <Button color={"Normal"} height={"Normal"} radius={"Small"} textColor={"White"} fontSize={"20px"} class={"mr-0 lg_2:mr-8"} onClick={handleSelectEvent}>{t("home.GIVEAWAY")}</Button>
                </div>
                <div className='flex flex-row items-center mt-8 lg_2:mt-0'>
                  <div className={`${styles.live} mr-1`}>
                  </div>
                  <h6 className={`${russo_one.className} text-white text-xs md:text-xl`}><span className='mr-4'>{t("home.LIVE")}</span>{t("home.OPEN UNTIL")} 7TH NOV</h6>
                </div>
              </div>
              <h6 className={`${rubik.className} text-3xl md:text-4xl lg_2:text-5xl text-white mt-8 md:mt-10 lg_2:mt-14`}>{t("home.Play with your NFTS")}</h6>
              <Button color={"Normal"} height={"Normal"} radius={"Small"} textColor={"White"} fontSize={"20px"} class={"mt-14"} onClick={handleSelectEvent}>{t("home.Play now")}</Button>
            </div>
            <div className='relative min-w-[120px]'>
              <div className={`${styles.blurEffect} absolute w-full`}></div>
              <Image src="/images/zomfi-image.png" alt="zomfi" width="0" height="0" sizes='100%' style={{ width: "100%", height: "auto", maxWidth: "340px", zIndex: "1" }} className='relative' />
            </div>
          </div>
        </div>
        <div className={`${styles.avatarCollection} flex flex-row`}>
          <div className={`${styles.bannerContent} flex flex-col sm:flex-row max-w-[1280px] w-full mx-4 md:mx-10 my-10 lg_2:m-auto items-center lg_2:my-20`}>
            <div className='max-w-[575px]'>
              <h6 className={`${russo_one.className} text-center sm:text-left text-white text-xl md:text-2xl lg_2:text-3xl mb-3 sm:mb-6`}>{t("home.PLAY WITH YOUR NFTS")}</h6>
              <h6 className={`${russo_one.className} text-center sm:text-left text-white text-xs	md:text-sm lg_2:text-xl`}>{t("home.Avatar Description")}</h6>
            </div>
            <Button color={"Normal"} height={"Normal"} radius={"Small"} textColor={"White"} fontSize={"20px"} class={"mt-6 sm:mt-14"} onClick={handleSelectEvent}>{t("home.Explore Avatar collection")}</Button>
          </div>
        </div>
        <div className={`${styles.mainBackground}`}>

          <div className={`${styles.blogSection} flex flex-row`}>
            <div className={`${styles.bannerContent} flex flex-col max-w-[1280px] w-full mx-0 sm:mx-4 md:mx-10 my-10 lg_2:m-auto items-left lg_2:my-20`}>
              <h6 className={`${russo_one.className} text-left text-white text-xs md:text-base mb-2 sm:mb-4`}>{t("home.COMMUNITY")}</h6>
              <h6 className={`${russo_one.className} text-left text-white text-xl md:text-2xl lg_2:text-3xl mb-3 sm:mb-6`}>{t("home.WHATS NEW")}</h6>
              <div className={`flex flex-col sm:flex-row items-center justify-between mt-2`}>
                <BlogCard image={'blog1'} title={'ZOMFI FINANCE NEWSLETTER: RECAP OF 2021'} />
                <BlogCard image={'blog2'} title={'ZOMFI I CLOSED ALPHA VERSION 1'} />
              </div>
            </div>
          </div>
          <div className={`${styles.blogSection} flex flex-row`}>
            <div className={`${styles.bannerContent} flex flex-col max-w-[1280px] w-full mx-0 sm:mx-4 md:mx-10 lg_2:m-auto items-left mb-20`}>
              <h6 className={`${russo_one.className} text-left text-white text-xs md:text-base mb-2 sm:mb-4`}>{t("home.SOME OF OUR")}</h6>
              <h6 className={`${russo_one.className} text-left text-xl md:text-2xl lg_2:text-3xl mb-3 sm:mb-6 text-[#9E0000]`}>{t("home.PARTNERS")}</h6>
              <Partners />
            </div>
          </div>
          <div className={`${styles.landNFTSection} flex flex-row mt-6`}>
            <div className={`${styles.bannerContent} flex flex-col md:flex-row items-center max-w-[1280px] w-full mx-0 sm:mx-4 md:mx-10 lg_2:m-auto items-left h-full mb-10 lg_2:mb-20`}>
              <div className='relative w-6/12 m-auto h-full md:mr-4'>
                <Image src="/images/home-lands.png" alt="zomfi" width="0" height="0" sizes='100%' style={{ width: "100%", height: "auto" }} />
              </div>
              <div className='relative w-full md:w-6/12 ml-0 md:ml-4 mt-6 md:mt-0'>
                <Image src="/images/blood.png" alt="zomfi" width="0" height="0" sizes='100%' style={{ width: "100%", height: "auto", zIndex: "-1", transform: "rotate(180deg)" }} className='absolute' />
                <h6 className={`${russo_one.className} text-center md:text-right text-white text-xl md:text-2xl lg_2:text-3xl mb-2 sm:mb-4`}>{t("home.Become a Land Owner")}</h6>
                <h6 className={`${russo_one.className} text-center md:text-right text-white text-xs mobile_lg:text-sm lg_2:text-xl  mb-2 sm:mb-4`}>{t("home.Land Owner Desription")}</h6>
                <div className='flex flex-row justify-center md:justify-end'>
                  <Button color={"Normal"} height={"Normal"} radius={"Small"} textColor={"White"} fontSize={"20px"} class={"mr-2 md:mr-0 lg_2:mr-8"} onClick={handleSelectEvent}>{t("home.Buy Land")}</Button>
                  <Button color={"rgba(0, 0, 0, 0)"} height={"Normal"} radius={"Small"} textColor={"White"} fontSize={"20px"} class={"border border-[#5E34BA] ml-2 md:ml-0"} onClick={handleSelectEvent}>{t("home.Discover the map")}</Button>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.dogNFTSection} flex flex-row`}>
            <div className={`${styles.bannerContent} flex flex-col md:flex-row-reverse items-center max-w-[1280px] w-full mx-0 sm:mx-4 md:mx-10 lg_2:m-auto items-left h-full mb-10 lg_2:mb-20`}>
              <div className='relative w-6/12 m-auto h-full md:ml-4'>
                <Image src="/images/home-dogs.png" alt="zomfi" width="0" height="0" sizes='100%' style={{ width: "100%", height: "auto" }} />
              </div>
              <div className='relative w-full md:w-6/12 mr-0 md:mr-4 mt-6 md:mt-0'>
                <Image src="/images/blood.png" alt="zomfi" width="0" height="0" sizes='100%' style={{ width: "100%", height: "auto", zIndex: "-1" }} className='absolute' />
                <h6 className={`${russo_one.className} text-center md:text-left text-white text-xl md:text-2xl lg_2:text-3xl mb-2 sm:mb-4`}>{t("home.GET YOUR NFTs")}</h6>
                <h6 className={`${russo_one.className} text-center md:text-left text-white text-xs mobile_lg:text-sm lg_2:text-xl  mb-2 sm:mb-4`}>{t("home.Dog NFT Description")}</h6>
                <div className='flex flex-row justify-center md:justify-start'>
                  <Button color={"Normal"} height={"Normal"} radius={"Small"} textColor={"White"} fontSize={"20px"} class={"mr-2 md:mr-0 lg_2:mr-8"} onClick={handleSelectEvent}>{t("home.Go to Marketplace")}</Button>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.dogNFTSection} flex flex-row`}>
            <div className={`${styles.bannerContent} flex flex-col md:flex-row items-center max-w-[1280px] w-full mx-0 sm:mx-4 md:mx-10 lg_2:m-auto items-left h-full mb-10 lg_2:mb-20`}>
              <div className='relative w-full md:w-6/12 m-auto flex flex-col justify-center items-center h-full md:mr-4'>
                <Image src="/images/logo.png" alt="zomfi" width="0" height="0" sizes='100%' style={{ width: "50%", height: "auto", maxWidth: "200px" }} />
                <h6 className={`${russo_one.className} text-center text-white text-xl md:text-2xl lg_2:text-3xl mb-2 sm:mb-4 mt-8`}>{t("home.WHY ZOMFI")}</h6>
                <h6 className={`${russo_one.className} text-center text-white text-xs mobile_lg:text-sm lg_2:text-xl  mb-2 sm:mb-4`}>{t("home.ZOMFI Description")}</h6>
                <Button color={"Normal"} height={"Normal"} radius={"Small"} textColor={"White"} fontSize={"20px"} class={"mr-2 md:mr-0 lg_2:mr-8"} onClick={handleSelectEvent}>{t("home.Buy $Zomfi")}</Button>
              </div>
              <div className='relative w-full md:w-6/12 m-auto flex flex-col justify-center items-center h-full md:ml-4 mt-10 md:mt-0'>
                <Image src="/images/zed.png" alt="zomfi" width="0" height="0" sizes='100%' style={{ width: "50%", height: "auto", maxWidth: "200px" }} />
                <h6 className={`${russo_one.className} text-center text-white text-xl md:text-2xl lg_2:text-3xl mb-2 sm:mb-4 mt-8`}>{t("home.WHY ZED")}</h6>
                <h6 className={`${russo_one.className} text-center text-white text-xs mobile_lg:text-sm lg_2:text-xl  mb-2 sm:mb-4`}>{t("home.ZED Description")}</h6>
                <Button color={"Normal"} height={"Normal"} radius={"Small"} textColor={"White"} fontSize={"20px"} class={"mr-2 md:mr-0 lg_2:mr-8"} onClick={handleSelectEvent}>{t("home.Buy $Zed")}</Button>
              </div>
            </div>
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