import { Do_Hyeon } from '@next/font/google'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import styles from '@/styles/Marketplace.module.css'
import useAuth from '@/hooks/useAuth'
import PAY_TYPES from '@/constants/PAY_TYPES'

const do_hyeon = Do_Hyeon({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})
interface Props {
  id: any
  itemId: number
  tokenId: number
  nftType: string
  name: string
  rarity: string
  payType: number
  price: number
  image: string
  sold: boolean
  handleModal: any
}

export default function NFTCard (props: Props) {
  let { cartItems, updateCartItems } = useAuth()
  let [isActive, setIsActive] = useState(false)

  let {
    id,
    itemId,
    tokenId,
    nftType,
    name,
    rarity,
    payType,
    price,
    image,
    sold,
    handleModal
  } = props

  useEffect(() => {
    const itemIdx = cartItems.findIndex((item: any) => item.id === id)
    if (itemIdx === -1) setIsActive(false)
    else setIsActive(true)
  }, [cartItems, id])

  const addShoppingCard = () => {
    const item = {
      id,
      itemId,
      tokenId,
      nftType,
      name,
      rarity,
      payType,
      price,
      image,
      sold
    }
    const itemIdx = cartItems.findIndex((item: any) => item.id === id)

    if (itemIdx === -1) {
      cartItems.concat(item)
      updateCartItems(cartItems.concat(item))
    } else {
      updateCartItems(
        cartItems.filter((item: any, idx: number) => idx !== itemIdx)
      )
    }
  }

  return (
    <div className={`${styles.nftCard}`}>
      <div
        className={`${styles.metadata} flex items-end justify-center m-0.5	mb-4`}
      >
        <Image
          src={`/images/${nftType.toLowerCase()}s/${image}`}
          className={`${styles.dogImage}`}
          alt='dog'
          width={'0'}
          height={'0'}
          sizes='100%'
          style={{ width: 'auto', height: '160px' }}
          onClick={() => handleModal(id)}
        />
      </div>
      <h6
        className={`${styles.dogInfo} ${do_hyeon.className} text-white text-base mb-4 text-center`}
      >
        {nftType} #{props.tokenId} (<span className='capitalize'>{name}</span>)
      </h6>
      <div className={`${styles.sell} flex flex-row justify-evenly mb-4`}>
        <h6
          className={`${styles.price} ${do_hyeon.className} px-4 flex items-center text-white text-sm	mobile_md:text-xl`}
        >
          <Image
            src={`/images/${PAY_TYPES[payType - 1].toLowerCase()}.png`}
            width='18'
            height='18'
            alt={PAY_TYPES[payType - 1]}
            className='rounded-2xl mr-1'
          />
          {price}
          {PAY_TYPES[payType - 1]}
        </h6>
        <div
          className={`${isActive ? styles.activeCart : styles.cart} p-2 cursor-pointer`}
          onClick={addShoppingCard}
        >
          <Icon
            className={styles.cartIcon}
            icon='material-symbols:shopping-cart'
            color='white'
            width='20'
          />
        </div>
      </div>
    </div>
  )
}
