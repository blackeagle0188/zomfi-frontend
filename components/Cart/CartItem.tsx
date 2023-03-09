import Image from 'next/image'
import { Russo_One } from '@next/font/google'
import styles from '@/styles/Cart.module.css'
import { useTranslation } from "next-i18next";
import PAY_TYPES from '@/constants/PAY_TYPES';
import { Icon } from '@iconify/react';

const russo = Russo_One({ weight: '400', subsets: ['latin'] })

interface Props {
  id: string;
  itemId: number;
  tokenId: number;
  nftType: string;
  name: string;
  rarity: string;
  payType: number;
  price: number;
  image: string;
  sold: boolean;
  setActiveId: Function;
  setOpenDeleteModal: Function
}

export default function CartItem(props: Props) {
  const { t } = useTranslation("");

  const { id, itemId, tokenId, nftType, name, rarity, payType, price, image, sold, setActiveId, setOpenDeleteModal } = props;
  const handleBuy = () => {

  }

  const handleDeleteCartItem = () => {
    setActiveId(id);
    setOpenDeleteModal(true)
  }
  return (
    <div className={`${styles.cartItem} w-full`}>
      <div className={`${styles.itemProperty} flex flex-row items-center justify-start`}>
        <Image src={`/images/${nftType}s/${image}`} alt="zomfi" width="0" height="0" sizes='100%' style={{ width: "100%", minWidth: "30px", maxWidth: "50px" }} className='mr-2.5' />
        <div className='flex flex-col justify-around h-full'>
          <h6 className={`${russo.className} text-left text-xs lg_2:text-sm text-white tracking-[.2em]`}>
            {nftType}#{tokenId} ({name})
          </h6>
          <h6 className={`${russo.className} text-left text-xs lg_2:text-sm text-white tracking-[.2em]`} style={{ color: "#FF4747" }}>
            {rarity}
          </h6>
        </div>
      </div>
      <div className={`${styles.currency} flex-row items-center justify-center hidden mobile_lg:flex`}>
        <Image src={`/images/${PAY_TYPES[payType - 1].toLowerCase()}.png`} alt="zomfi" width="0" height="0" sizes='100%' style={{ width: "100%", minWidth: "30px", maxWidth: "50px", maxHeight: "50px" }} className='mr-2.5 rounded-3xl' />
        <div className='flex-col justify-around h-full hidden sm:flex'>
          <h6 className={`${russo.className} text-left text-xs lg_2:text-sm text-white tracking-[.2em]`} style={{ color: "#00FFC2" }}>
            {PAY_TYPES[payType - 1]}
          </h6>
        </div>
      </div>
      <div className='flex flex-row items-center justify-end pr-6'>
        <div className='flex flex-col justify-center h-full'>
          {/* <h6 className={`${russo.className} text-left text-xs lg_2:text-sm text-white tracking-[.2em]`}>
          10 $Zomfi
          </h6> */}
          <h6 className={`${russo.className} text-left text-xs lg_2:text-sm text-white tracking-[.2em]`} style={{ color: "#00FFC2" }}>
          ${price} {PAY_TYPES[payType - 1]}
          </h6>
        </div>
        <Icon icon="bi:trash" color="white" width="30" onClick={handleDeleteCartItem} cursor={"pointer"} />
      </div>
    </div>
  );
}
