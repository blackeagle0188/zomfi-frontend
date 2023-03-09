import { Saira_Extra_Condensed, Russo_One } from '@next/font/google'
import { useState, useEffect } from 'react'
import styles from '@/styles/Cart.module.css'
import { useTranslation } from 'next-i18next'
import Button from '../Button'
import useAuth from '@/hooks/useAuth'
import { Contract } from 'ethers'
import TOKEN_CONTRACTS from '@/constants/TOKEN_CONTRACTS'
import CHAIN_CONFIG from '@/constants/CHAIN_CONFIG'
import PAY_TYPES from "@/constants/PAY_TYPES"
import useMarketContract from '@/hooks/useMarketContract'
import { toast } from 'react-toastify'

const saria = Saira_Extra_Condensed({ weight: '400', subsets: ['latin'] })
const russo = Russo_One({ weight: '400', subsets: ['latin'] })

interface Props {}

export default function TotalCart (props: Props) {
  const { t } = useTranslation('')
  const { wallet, setLoading, cartItems, updateCartItems } = useAuth()
  const { contract: marketContract } = useMarketContract(wallet)

  const [cartPayTypes, setCartPayTypes] = useState<number[]>([])

  useEffect(() => {
    let cartPayTypes: number[] = []

    cartItems.forEach(cartItem => {
      if (!cartPayTypes.includes(cartItem.payType)) {
        cartPayTypes.push(cartItem.payType)
      }
    })
    setCartPayTypes(cartPayTypes)
  }, [cartItems])

  const totalPrice = (payType: number) => {
    let total = 0
    cartItems.forEach(cartItem => {
      if (cartItem.payType === payType) {
        total += Number(cartItem.price)
      }
    })
    return total
  }

  const compareBalances = async () => {
    const signer = await marketContract.runner.provider.getSigner()
    const { USDT, BUSD, ZOMFI } = TOKEN_CONTRACTS
    let contract = new Contract(USDT.ADDR, USDT.ABI, signer)
    let insuffiBalances = []

    for (let i = 0; i < cartPayTypes.length; i++) {
      let balance = BigInt(0),
        price = 0
      if (cartPayTypes[i] > 1) {
        if (PAY_TYPES[cartPayTypes[i] - 1].toLowerCase() === 'usdt') {
          contract = new Contract(USDT.ADDR, USDT.ABI, signer)
        } else if (PAY_TYPES[cartPayTypes[i] - 1].toLowerCase() === 'busd') {
          contract = new Contract(BUSD.ADDR, BUSD.ABI, signer)
        } else if (PAY_TYPES[cartPayTypes[i] - 1].toLowerCase() === 'zomfi') {
          contract = new Contract(ZOMFI.ADDR, ZOMFI.ABI, signer)
        }
        balance = await contract.balanceOf(wallet)
        price = totalPrice(cartPayTypes[i]) * Math.pow(10, 18)
        if (balance < BigInt(price)) {
          insuffiBalances.push(PAY_TYPES[cartPayTypes[i] - 1])
        }
      }
    }
    return insuffiBalances
  }

  const approveBalances = async () => {
    const signer = await marketContract.runner.provider.getSigner()
    const { USDT, BUSD, ZOMFI } = TOKEN_CONTRACTS
    let contract = new Contract(USDT.ADDR, USDT.ABI, signer)

    try {
      for (let i = 0; i < cartPayTypes.length; i++) {
        let price = 0
        if (cartPayTypes[i] > 1) {
          if (PAY_TYPES[cartPayTypes[i] - 1].toLowerCase() === 'usdt') {
            contract = new Contract(USDT.ADDR, USDT.ABI, signer)
          } else if (PAY_TYPES[cartPayTypes[i] - 1].toLowerCase() === 'busd') {
            contract = new Contract(BUSD.ADDR, BUSD.ABI, signer)
          } else if (PAY_TYPES[cartPayTypes[i] - 1].toLowerCase() === 'zomfi') {
            contract = new Contract(ZOMFI.ADDR, ZOMFI.ABI, signer)
          }
          price = totalPrice(cartPayTypes[i]) * Math.pow(10, 18)
          let tx = await contract.approve(marketContract.target, BigInt(price))
          await tx.wait()
        }
      }
    } catch (err: any) {
      toast.error(err.reason)
      setLoading(false);
    }
  }

  const handleBuy = async () => {
    setLoading(true)
    const insuffiBalances = await compareBalances()
    if (insuffiBalances.length) {
      toast.error(`Insuffcient Fund: ${insuffiBalances.join(', ')}`)
      setLoading(false);
    } else {
      try {
        // Buy
        await approveBalances()
        let nftContracts = [],
          itemIds = []
        for (let cartItem of cartItems) {
          if (cartItem.nftType === 'Dog') {
            nftContracts.push(CHAIN_CONFIG.petContract.contractAddr)
          } else if (cartItem.nftType === 'Land') {
            nftContracts.push(CHAIN_CONFIG.landContract.contractAddr)
          }
          itemIds.push(cartItem.itemId)
        }
  
        let bnbTotalPrice = BigInt(totalPrice(1) * Math.pow(10, 18))
        let tx = await marketContract.multiSale(nftContracts, itemIds, {
          from: wallet,
          value: bnbTotalPrice
        });
        await tx.wait()
        updateCartItems([]);
        setLoading(false);
      } catch (err: any) {
        toast.error(err.reason);
        setLoading(false);
      }
    }
  }

  return (
    <>
      <div
        className={`${styles.totalCart} overflow-hidden pb-2 flex flex-col justify-between items-center`}
      >
        <div
          className={`${styles.topTitle} flex items-center justify-center w-full`}
        >
          <h6
            className={`${saria.className} text-center text-xl text-white tracking-[.2em]`}
          >
            {t('cart.Total Cart')}
          </h6>
        </div>
        <div
          className={`${styles.cartAmount} flex items-start justify-between p-2 w-full`}
        >
          <div>
            <h6
              className={`${russo.className} text-left text-sm text-white tracking-[.2em]`}
            >
              {t('cart.Total')}
            </h6>
            <h6
              className={`${russo.className} text-left text-sm text-white tracking-[.2em]`}
            >
              {cartItems.length} items
            </h6>
          </div>
          <div>
            {cartPayTypes.map((cartPayType, idx) => (
              <h6
                key={idx}
                className={`${russo.className} text-right text-sm text-white tracking-[.2em]`}
              >
                ${totalPrice(cartPayType).toFixed(3)}
                {PAY_TYPES[cartPayType - 1]}
              </h6>
            ))}
          </div>
        </div>
        <Button
          color={'Normal'}
          height={'Small'}
          radius={'Small'}
          textColor={'White'}
          fontSize={'Small'}
          width={'w-[100px]'}
          onClick={handleBuy}
        >
          Buy Now
        </Button>
      </div>
      <div
        className={`${russo.className} text-white mt-10 text-base text-center desktop:text-left`}
      >
        {t('cart.Description')}
      </div>
    </>
  )
}
