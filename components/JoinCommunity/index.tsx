import styles from '@/styles/Home.module.css'
import Button from '../Button'
import Image from 'next/image'
import { useTranslation } from "next-i18next";
import { Saira_Extra_Condensed } from '@next/font/google'

const saria = Saira_Extra_Condensed({ weight: '400', subsets: ['latin'] })

export default function JoinCommunity() {
  const { t } = useTranslation("");

  const handleJoin = () => {

  }
  return (
    <div className={`${styles.communityWrapper} flex items-center justify-center flex-col relative px-6`}>
      <h2 className={`${saria.className} text-white text-2xl sm:text-3xl mb-4 tracking-widest text-center`}>{t("community.Community Title")}</h2>
      <h2 className={`${saria.className} text-white text-sm mobile_lg:text-xl sm:text-2xl lg_2:text-3xl mb-10 tracking-widest text-center`}>{t("community.Community SubTitle")}</h2>
      <Button color={"Normal"} height={"Normal"} radius={"Small"} textColor={"White"} fontSize={"Small"} width={"w-[150px]"} onClick={handleJoin}>{t("community.Join Us")}</Button>
      <Image src="/images/spark.png" alt="spark" width="0" height="0" sizes="100%" className={`${styles.spark} absolute pointer-events-none`} />
    </div>
  )
}
