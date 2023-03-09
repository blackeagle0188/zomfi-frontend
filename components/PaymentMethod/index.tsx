import { Icon } from '@iconify/react';
import Image from 'next/image';
import styles from '@/styles/Marketplace.module.css'
import { Do_Hyeon } from '@next/font/google'

const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })
interface Props {
  children?: React.ReactNode;
  active: number;
  type: number;
  price: number;
  setActiveMethod: any;
}

let currency = [
  "ZOMFI",
  "BNB",
  "USDT"
]

let images = [
  <Image src="/images/logo.png" alt="zomfi" width="70" height="70" key={0} />,
  <Icon icon="cryptocurrency-color:bnb" width="70" key={1} />,
  <Icon icon="cryptocurrency-color:usdt" width="70" key={2} />
]

export default function PaymentMethod(props: Props) {
  const setActive = () => {
    props.setActiveMethod(props.type);
  }
  return (
    <div className={`${styles.paymentMethod} ${props.active == props.type ? styles.active : ""} p-2 flex flex-row items-center mx-5 my-2.5 cursor-pointer`} onClick={setActive}>
      {images[props.type]}
      <h6 className={`${do_hyeon.className} text-white text-sm lg_2:text-lg tablet:text-2xl ml-6`}>Buy with {props.price} {currency[props.type]}</h6>
    </div>
  )
}
