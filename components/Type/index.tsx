import { Do_Hyeon } from '@next/font/google'
import styles from '@/styles/Play.module.css'

const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })
interface Props {
  children?: React.ReactNode;
  type: number;
}

export default function Type(props: Props) {
  return (
    <div className={`${props.type == 0 ? styles.dogTypeWrapper : styles.landTypeWrapper} ${do_hyeon.className} flex items-center justify-center text-white text-4xl sm:text-2xl`}>
      {props.children}
    </div>
  )
}
