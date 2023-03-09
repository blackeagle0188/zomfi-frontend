import Image from 'next/image'
import Button from '../Button';
import { Icon } from '@iconify/react';
import { Russo_One } from '@next/font/google'
import { useTranslation } from "next-i18next";
import styles from '@/styles/Home.module.css'

const russo_one = Russo_One({ weight: '400', subsets: ['latin'] })
interface Props {
  image: string
  title: string
}

export default function BlogCard(props: Props) {
  const { t } = useTranslation("");

  const handleBuyZomfi = () => {

  }

  const handleBuyZed = () => {

  }

  return (
    <div className={`${styles.blogCard} relative overflow-hidden mb-6`}>
      <Image src={`/images/${props.image}.png`} alt="blog" width="0" height="0" sizes='100%' style={{ width: "100%", height: "auto" }} />
      <div className={`${styles.blogTitle} absolute bottom-0 w-full h-full flex flex-col items-start justify-end px-4 py-2`}>
        <h6 className={`${russo_one.className} text-left text-white text-xs md:text-sm bg-[#E92B2B] px-1`}>{t("home.WHATS NEW")}</h6>
        <h6 className={`${russo_one.className} text-left text-white text-sm lg_2:text-lg tablet:text-2xl`}>{props.title}</h6>
      </div>
    </div>
  )
}
