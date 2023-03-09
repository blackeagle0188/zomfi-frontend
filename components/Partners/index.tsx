import Image from 'next/image'
import Button from '../Button'
import { Icon } from '@iconify/react'
import { Russo_One } from '@next/font/google'
import { useTranslation } from "next-i18next"
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from '@/styles/Home.module.css'

const russo_one = Russo_One({ weight: '400', subsets: ['latin'] })

export default function Partners() {
  const { t } = useTranslation("");

  const handleBuyZomfi = () => {

  }

  const handleBuyZed = () => {

  }

  const sliderSettings = {
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: false,
  }



  return (
    <>
      <div className={`relative overflow-hidden mb-6 flex-row flex-wrap items-center hidden sm:flex`}>
        {Array.apply(0, Array(31)).map(function (x, i) {
          return <Image src={`/images/partners/${i + 1}.png`} alt="blog" width="0" height="0" sizes='100%' style={{ width: "10%", height: "auto" }} className='mx-1' key={i} />;
        })}
      </div>
      <Slider {...sliderSettings} className='mx-4 !block sm:!hidden'>
        {Array.apply(0, Array(31)).map(function (x, i) {
          return <Image src={`/images/partners/${i + 1}.png`} alt="blog" width="0" height="0" sizes='100%' style={{ width: "10%", height: "auto" }} key={i} />;
        })}
      </Slider>
    </>

  )
}
