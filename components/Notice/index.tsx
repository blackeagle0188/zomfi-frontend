import { Do_Hyeon } from '@next/font/google'
import styles from '@/styles/Notice.module.css'

const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'] })
interface Props {
  children?: React.ReactNode;
}

export default function Notice(props: Props) {
  return (
    <div className={`${styles.notice} text-white flex items-center justify-center`}>
      <h6 className={`${do_hyeon.className}`}>{props.children}</h6>
    </div>
  )
}
