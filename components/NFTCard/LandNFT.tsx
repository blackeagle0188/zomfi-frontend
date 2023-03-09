import { Do_Hyeon } from '@next/font/google'
import Image from 'next/image';
import { Icon } from '@iconify/react';
import styles from '@/styles/Marketplace.module.css'

const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })
interface Props {
  type: number;
  tokenId: number;
  handleModal: any;
}

let typeName = [
  "common",
  "rare",
  "legendary",
  "mythical"
]

let sellType = [
  "auction",
  "sell",
  "opensea",
  "exchange"
]

export default function LandNFT(props: Props) {
  return (
    <div className={`${styles.nftCard}`}>
      <div className={`${styles.landMetadata} flex items-end justify-center m-0.5	mb-4`}>
        <div className={`${styles.landImage}`}>
          <Image src={`/images/lands/${typeName[props.type]}.png`} className={`${styles.assetImage}`} alt="dog" width={"0"} height={"0"} sizes="100%" style={{ width: 'auto', height: '100%' }} />
        </div>

        <Image src={`/images/sales/${sellType[props.type]}.png`} className={`absolute top-2 left-2`} alt="sale" width={"0"} height={"0"} sizes="100%" style={{ width: '20px', height: 'auto' }} />
      </div>
      <h6 className={`${styles.dogInfo} ${do_hyeon.className} text-white text-base mb-4 text-center`}>Dog #{props.tokenId} (<span className='capitalize'>{typeName[props.type]}</span>)</h6>
      <div className={`${styles.sell} flex flex-row justify-evenly mb-4`}>
        <h6 className={`${styles.price} ${do_hyeon.className} px-4 flex items-center text-white text-sm	mobile_md:text-xl`}>54.90 USD</h6>
        <div className={`${styles.cart} p-2 cursor-pointer`} onClick={props.handleModal}><Icon className={styles.cartIcon} icon="material-symbols:shopping-cart" color="white" width="20" /></div>
      </div>
    </div>
  );
}
