import Image from 'next/image'
import Link from 'next/link'
import MenuItems from './MenuItem';
import { Icon } from '@iconify/react';
import { useTranslation } from "next-i18next";
import { Rubik_Wet_Paint, Saira_Extra_Condensed } from '@next/font/google'
import styles from '@/styles/Footer.module.css'

const rubik = Rubik_Wet_Paint({ weight: '400', subsets: ['latin'] })
const saria = Saira_Extra_Condensed({ weight: '400', subsets: ['latin'] })

export const menuItems = [
  {
    menu: [{
      title: 'News',
      url: '/',
    },
    {
      title: 'Create',
      url: '/',
    },
    {
      title: 'Market',
      url: '/',
    },
    {
      title: 'Play',
      url: '/',
    },
    {
      title: 'Whitepaper',
      url: '/',
    }]
  },

  {
    menu: [{
      title: 'Map',
      url: '/',
    },
    {
      title: 'Sand',
      url: '/',
    },
    {
      title: 'Press',
      url: '/',
    },
    {
      title: 'Partners',
      url: '/',
    },
    {
      title: 'Terms of use',
      url: '/',
    }]
  },
  {
    menu: [{
      title: 'One Pager',
      url: '/',
    },
    {
      title: 'FAQ',
      url: '/',
    },
    {
      title: 'Careers',
      url: '/',
    },
    {
      title: 'Licenses',
      url: '/',
    },
    {
      title: 'Privacy Policy',
      url: '/',
    }]
  }
];

export default function Footer() {
  const { t } = useTranslation("");
  return (
    <div className={styles.footerContainer}>
      <div className={`${styles.footerWrapper} flex flex-col md:flex-row h-full items-center`}>
        <div className={`${styles.logoPart} w-full md:w-3/12 lg_2:w-4/12 flex flex-col items-center`}>
          <Link href="/"><Image src="/images/logo_ 2.png" alt="logo" width="1300" height="0" sizes='100%' className={`${styles.logoImg}`} /></Link>
          <div className={`${styles.zomfiText} relative`}>
            <h6 className={`${rubik.className} ${styles.logoText}`}>ZOMFI</h6>
            <Image src="/images/spark_black.png" className={`${styles.spark_black} absolute mix-blend-lighten`} alt="spark_black" width="130" height="35" />
          </div>
        </div>
        <div className={`${styles.menuPart} w-full md:w-5/12 lg_2:w-4/12 flex flex-row my-6`}>
          {menuItems.map((menus, index) => (
            <div className='w-4/12 flex flex-col items-center' key={index}>
              <MenuItems items={menus.menu} />
            </div>
          ))
          }
        </div>
        <div className={`${styles.socialPart} w-full md:w-4/12 flex flex-col items-center`}>
          <div className={`${styles.socialIcons}`}>
            <h6 className={`${saria.className} text-white text-base lg_2:text-xl text-center lg_2:text-left tracking-[.2em]`}>{t("footer.FOLLOW US")}</h6>
            <div className='flex flex-row mt-3.5'>
              <Link href="/"><Icon icon="cib:telegram-plane" className='mr-6' color="white" width="25" /></Link>
              <Link href="/"><Icon icon="ic:baseline-discord" className='mr-6' color="white" width="25" /></Link>
              <Link href="/"><Icon icon="mdi:twitter" className='mr-6' color="white" width="25" /></Link>
              <Link href="/"><Icon icon="uil:medium-m" className='mr-6' color="white" width="25" /></Link>
              <Link href="/"><Icon icon="fa:youtube" className='mr-6' color="white" width="25" /></Link>
            </div>
          </div>
          <h6 className={`${saria.className} ${styles.copyright} text-white text-sm lg_2:text-lg text-center lg_2:text-left tracking-[.2em] mt-3.5`}>{t("footer.Copyright")}</h6>
        </div>
      </div>
    </div>
  )
}