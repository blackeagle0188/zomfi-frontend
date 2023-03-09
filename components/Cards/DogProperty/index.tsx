import Image from 'next/image'
import styles from '@/styles/Play.module.css'

interface Props {
  type: number;
  value1: any;
  value2: any;
  value3: any;
  value4: any;
}

let typeName = [
  "common",
  "rare",
  "legendary",
  "mythical"
]

export default function DogProperty(props: Props) {

  return (
    <div className={`${styles.propWrapper} ${styles.dogType} content absolute`}>
      <div className={`${styles.dogImage}`}>
        <Image src={`/images/dogs/${typeName[props.type]}.png`} className={`${styles.assetImage} absolute z-1 bottom-6`} alt="ethereum" width={"0"} height={"0"} sizes="100%" style={{ width: '40%', height: 'auto' }} />
      </div>
      <div className='flex items-center justify-center text-white text-5xl sm:text-2xl'>{props.value1}</div>
      <div className='flex items-center justify-center text-white text-5xl sm:text-2xl'>{props.value2}</div>
      <div className='flex items-center justify-center text-white text-5xl sm:text-2xl'>{props.value3}</div>
      <div className='flex items-center justify-center text-white text-5xl sm:text-2xl'>{props.value4}</div>
    </div>
  )
}
