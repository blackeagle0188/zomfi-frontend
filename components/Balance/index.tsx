import Image from 'next/image'
import Button from '../Button';
import { Icon } from '@iconify/react';
import { Russo_One } from '@next/font/google'
import styles from '@/styles/Balance.module.css'
import { useTranslation } from "next-i18next";

const russo_one = Russo_One({ weight: '400', subsets: ['latin'] })

export default function Balance() {
  const { t } = useTranslation("");

  const handleBuyZomfi = () => {

  }

  const handleBuyZed = () => {

  }

  return (
    <div className={`${styles.balanceContainer}`}>
      <div className={`${styles.zomfiBalance} flex flex-row items-center px-5 py-2.5 mt-3`}>
        <div className={`${styles.network} flex flex-row items-center w-6/12`}>
          <div>
            <Icon icon="mingcute:binance-coin-bnb-fill" color="#f3ba2f" width="30" />
          </div>
          <h6 className={`${russo_one.className} text-white pl-3.5 text-xs`}>{t("common.Binance Network")}</h6>
        </div>
        <div className={`${styles.zomfi} flex flex-row items-center ml-8 w-6/12 justify-between`}>
          <Image src="/images/logo.png" alt="zomfi" width="30" height="30" className='max-w-fit' />
          <div className='flex flex-col'>
            <h6 className={`${russo_one.className} text-white pl-3.5 text-right text-xs`}>Zomfi</h6>
            <h6 className={`${russo_one.className} text-white pl-3.5 text-right text-xs`}>0</h6>
          </div>
        </div>
      </div>
      <div className={`${styles.zedBalance} flex flex-row items-center px-5 py-2.5 mt-3`}>
        <div className={`${styles.network} flex flex-row items-center w-6/12`}>
          <div>
            <Icon icon="mingcute:binance-coin-bnb-fill" color="#f3ba2f" width="30" />
          </div>
          <h6 className={`${russo_one.className} text-white pl-3.5 text-xs`}>{t("common.Binance Network")}</h6>
        </div>
        <div className={`${styles.zomfi} flex flex-row items-center ml-8 w-6/12 justify-between`}>
          <Image src="/images/zed.png" alt="zomfi" width="30" height="30" className='max-w-fit' />
          <div className='flex flex-col'>
            <h6 className={`${russo_one.className} text-white pl-3.5 text-right text-xs`}>Zed</h6>
            <h6 className={`${russo_one.className} text-white pl-3.5 text-right text-xs`}>0</h6>
          </div>
        </div>
      </div>
      <div className='flex flex-row mt-3 justify-evenly'>
        <Button color={"Normal"} height={"Small"} radius={"Small"} textColor={"White"} fontSize={"Small"} width={"w-[100px]"} onClick={handleBuyZomfi}>{t("home.Buy $Zomfi")}</Button>
        <Button color={"Normal"} height={"Small"} radius={"Small"} textColor={"White"} fontSize={"Small"} width={"w-[100px]"} onClick={handleBuyZed}>{t("home.Buy $Zed")}</Button>
      </div>
    </div>
  )
}
