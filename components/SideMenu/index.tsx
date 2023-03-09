import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { Saira_Extra_Condensed } from '@next/font/google'
import styles from '@/styles/SideMenu.module.css'
import useOutsideClick from '@/hooks/useOutsideClick';
import { useEffect, useRef } from 'react';
import { useTranslation } from "next-i18next";

const saira = Saira_Extra_Condensed({ weight: '400', subsets: ['latin'] })
interface Props {
  setIsOpen: Function
  isOpen: boolean
}

export default function SideMenu(props: Props) {
  const { t } = useTranslation("");

  const { setIsOpen, isOpen } = props
  const router = useRouter();
  const currentRoute = router.pathname;
  
  const mobileMenu = useRef(null)
  const mobileMenuOutside = useOutsideClick({ref: mobileMenu, isOpen: isOpen})

  useEffect(() => {
    if (!mobileMenuOutside) {
      return
    }
    
    setIsOpen(!mobileMenuOutside)
  }, [mobileMenuOutside])

  return (
    <div className={`${styles.menuContainer} ${isOpen ? styles.mobileActive : ""} overflow-auto absolute sm:relative z-[3] h-full w-0 sm:w-full`} ref={mobileMenu}>
      <div className={`${styles.menuWrapper} w-full`}>
        <Link href="/" className={`${currentRoute === '/' ? styles.active : styles.nonActive} flex items-center justify-center`}>
          <div className={`flex items-center justify-center flex-col`}>
            <Image src="/images/menu-icons/home.png" alt="home" width="32" height="25" />
            <h6 className={`${saira.className} text-white mt-5 text-sm hidden sm:block`}>{t("sideMenu.Home")}</h6>
          </div>
        </Link>
        <Link href="/play" className={`${currentRoute === '/play' || currentRoute.includes('/play') ? styles.active : styles.nonActive} flex items-center justify-center`}>
          <div className={`flex items-center justify-center flex-col`}>
            <Image src="/images/menu-icons/play.png" alt="play" width="32" height="25" />
            <h6 className={`${saira.className} text-white mt-5 text-sm hidden sm:block`}>{t("sideMenu.Play")}</h6>
          </div>
        </Link>
        <Link href="/marketplace" className={`${currentRoute === '/marketplace' ? styles.active : styles.nonActive} flex items-center justify-center`}>
          <div className={`flex items-center justify-center flex-col`}>
            <Image src="/images/menu-icons/marketplace.png" alt="marketplace" width="32" height="25" />
            <h6 className={`${saira.className} text-white mt-5 text-sm hidden sm:block`}>{t("sideMenu.Marketplace")}</h6>
          </div>
        </Link>
        <Link href="/assets" className={`${currentRoute === '/assets' ? styles.active : styles.nonActive} flex items-center justify-center`}>
          <div className={`flex items-center justify-center flex-col`}>
            <Image src="/images/menu-icons/assets.png" alt="assets" width="32" height="25" />
            <h6 className={`${saira.className} text-white mt-5 text-sm hidden sm:block`}>{t("sideMenu.My Assets")}</h6>
          </div>
        </Link>
        {/* <Link href="/about" className={`${currentRoute === '/about' ? styles.active : styles.nonActive} flex items-center justify-center`}>
          <div className={`flex items-center justify-center flex-col`}>
            <Image src="/images/menu-icons/about.png" alt="about" width="32" height="25" />
            <h6 className={`${saira.className} text-white mt-5 text-sm`}>About</h6>
          </div>
        </Link> */}
      </div>
    </div>
  )
}