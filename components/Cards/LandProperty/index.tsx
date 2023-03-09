import Image from 'next/image'
import styles from '@/styles/Play.module.css'

interface Props {
  type: number;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
}

let typeName = [
  "common",
  "rare",
  "legendary",
  "mythical"
]

export default function LandProperty(props: Props) {

  return (
    <div className={`${styles.landPropWrapper} ${styles.landType}`}>
      <div className={`${styles.landImage} flex items-center`}>
        <Image src={`/images/lands/${typeName[props.type]}.png`} className={`${styles.landAssetImage}`} alt="ethereum" width={"0"} height={"0"} sizes="100%" style={{ width: '100%', height: 'auto' }} />
      </div>
      <div className='flex items-center justify-center text-white text-5xl sm:text-2xl'>{props.value1}</div>
      <div className='flex items-center justify-center text-white text-5xl sm:text-2xl'>{props.value2}</div>
      <div className='flex items-center justify-center text-white text-5xl sm:text-2xl'>{props.value3}</div>
      <div className='flex items-center justify-center text-white text-5xl sm:text-2xl'>{props.value4}</div>
    </div>
  )
}