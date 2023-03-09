import Image from 'next/image'
import Button from '@/components/Button'
import { Do_Hyeon } from '@next/font/google'
import { Icon } from '@iconify/react'
import styles from '@/styles/Play.module.css'
import { useState, useEffect, Dispatch } from 'react'
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import useAuth from '@/hooks/useAuth'
import { toast } from 'react-toastify'
import { Contract } from 'ethers'
import { LAND_WHITE_LIST as WHITE_LIST } from '@/constants/WHITE_LIST'
import TOKEN_CONTRACTS from '@/constants/TOKEN_CONTRACTS'
import CHAIN_CONFIG from '@/constants/CHAIN_CONFIG'
import axios from "axios";
import { useTranslation } from "next-i18next";

const do_hyeon = Do_Hyeon({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})
interface Props {
  type: number
  minted: bigint
  setCount: Dispatch<any>
  total: bigint
  prices: any
  contract: any
}

let typeClasses = [
  styles.land_common,
  styles.land_rare,
  styles.land_legendary,
  styles.land_mythical
]

let typeName = ['common', 'rare', 'legend', 'mythical']

let tree: any, root: string, tx: any

export default function LandMintCard(props: Props) {
  const { t } = useTranslation("");

  const { wallet, setLoading } = useAuth()
  const { type, prices, minted, total, contract, setCount } = props
  const [mintCount, setMintCount] = useState(1)
  const [priceId, setPriceId] = useState<number>(0)
  const [showPriceDropdown, setShowPriceDropdown] = useState<boolean>(false)

  useEffect(() => {
    tree = new MerkleTree(WHITE_LIST, keccak256, {
      hashLeaves: true,
      sortPairs: true
    })
    root = tree.getRoot().toString('hex')
    console.log('ROOT====>', root)
  }, [])

  const handleChangeMintCount = (ev: any) => setMintCount(ev.target.value)

  const addMintCount = () => {
    setMintCount(mintCount + 1)
  }

  const minusMintCount = () => {
    if (mintCount == 1) {
      return
    }
    setMintCount(mintCount - 1)
  }

  const chooseCurrency = (idx: number) => {
    setPriceId(idx)
    setShowPriceDropdown(false)
  }

  const getTypeName = (type: number) => {
    return typeName[type]
  }

  const displayPrice = (price: number) => {
    return (Number(price) / Math.pow(10, 18)).toFixed(3)
  }

  const displayTotalPrice = (price: number) => {
    return ((Number(price) / Math.pow(10, 18)) * mintCount).toFixed(3)
  }

  const handleMintLand = async () => {
    setLoading(true)
    let mintRound = Number(await contract.mintRound())
    let amount = prices[priceId].price * BigInt(mintCount)
    if (wallet === null) {
      toast.error('Connect your wallet')
    } else if (mintRound === 0) {
      toast.error('Sale is not active')
    } else {
      const proof = tree.getHexProof(keccak256(wallet))
      if (mintRound === 1 && !tree.verify(proof, keccak256(wallet), root)) {
        toast.error('You are not whitelisted.')
      } else {
        let balance: bigint = BigInt(0),
          signer = await contract.runner.provider.getSigner(),
          { BUSD, USDT, ZOMFI } = TOKEN_CONTRACTS
        if (priceId === 0) {
          balance = await contract.runner.provider.getBalance(wallet)
        } else if (priceId == 1) {
          let usdtContract = new Contract(USDT.ADDR, USDT.ABI, signer)
          balance = await usdtContract.balanceOf(wallet)
          if (balance >= amount) {
            try {
              tx = await usdtContract.approve(
                CHAIN_CONFIG.landContract.contractAddr,
                amount
              )
              await tx.wait()
            } catch (err: any) {
              toast.error(err.reason)
            }
          }
        } else if (priceId == 2) {
          let busdContract = new Contract(BUSD.ADDR, BUSD.ABI, signer)
          balance = await busdContract.balanceOf(wallet)
          if (balance >= amount) {
            try {
              tx = await busdContract.approve(
                CHAIN_CONFIG.landContract.contractAddr,
                amount
              )
              await tx.wait()
            } catch (err: any) {
              toast.error(err.reason)
            }
          }
        } else if (priceId == 3) {
          let zomfiContract = new Contract(ZOMFI.ADDR, ZOMFI.ABI, signer)
          balance = await zomfiContract.balanceOf(wallet)
          if (balance >= amount)
            try {
              tx = await zomfiContract.approve(
                CHAIN_CONFIG.landContract.contractAddr,
                amount
              )
              await tx.wait()
            } catch (err: any) {
              toast.error(err.reason)
            }
        }
        if (balance < amount) {
          toast.error('Insufficient fund')
        } else {
          let commonAmount = 0,
            rareAmount = 0,
            legendAmount = 0,
            mythicalAmount = 0
          if (type === 0) {
            commonAmount = mintCount
          } else if (type === 1) {
            rareAmount = mintCount
          } else if (type === 2) {
            legendAmount = mintCount
          } else if (type === 3) {
            mythicalAmount = mintCount
          }
          let payType = priceId + 1
          try {
            if (payType === 1) {
              tx = await contract.mint(
                proof,
                BigInt(commonAmount),
                BigInt(rareAmount),
                BigInt(legendAmount),
                BigInt(payType),
                {
                  from: wallet,
                  value: amount
                }
              )
            } else {
              tx = await contract.mint(
                proof,
                BigInt(commonAmount),
                BigInt(rareAmount),
                BigInt(legendAmount),
                BigInt(payType)
              )
            }
            await tx.wait()
            axios.post("/api/lands");
            setMintCount(1)
            setCount(BigInt(mintCount) + minted)
            toast.success('Successfully minted')
          } catch (err: any) {
            toast.error(err.reason)
          }
        }
      }
    }

    setLoading(false)
  }

  return (
    <div className={`${styles.mintContainer} ${styles.land}`}>
      <div className={`${styles.mintWrapper} p-4 h-full`}>
        <div
          className={`${styles.mintAsset} ${styles.type} relative`}
          style={{
            backgroundImage: `url("/images/lands/${typeName[props.type]}.png")`,
            border: 'none'
          }}
        >
          <div
            className={`${typeClasses[props.type]
              } absolute w-full h-full top-0`}
          ></div>
        </div>
        <div
          className={`${styles.assetType} flex flex-row items-center justify-between mt-4`}
        >
          <h6
            className={`${do_hyeon.className} text-3xl text-white capitalize text-3xl`}
          >
            {getTypeName(type)}
          </h6>
          {type !== 3 && (
            <div className='flex items-center justify-end'>
              <div className='relative mr-3'>
                <div
                  className='flex flex-row items-center cursor-pointer rounded bg-dark'
                  onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                >
                  <Image
                    src={`/images/${prices[
                      priceId
                    ].currency.toLowerCase()}.png`}
                    alt='zomfi'
                    width='30'
                    height='30'
                    className='rounded-3xl'
                  />
                  <div className='ml-2 flex flex-row items-center'>
                    {showPriceDropdown ? (
                      <Icon
                        icon='material-symbols:keyboard-arrow-up'
                        color='white'
                        width='24'
                      />
                    ) : (
                      <Icon
                        icon='material-symbols:keyboard-arrow-down'
                        color='white'
                        width='24'
                      />
                    )}
                  </div>
                </div>
                {showPriceDropdown && (
                  <div
                    className='absolute animate-fadein left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700'
                    style={{ top: 40 }}
                  >
                    <ul className='py-1 font-bold'>
                      {prices.map((price: any, idx: number) => (
                        <li
                          key={idx}
                          className='flex items-center px-4 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                          onClick={() => chooseCurrency(idx)}
                        >
                          <Image
                            src={`/images/${price.currency.toLowerCase()}.png`}
                            width='30'
                            height='30'
                            alt={price.currency}
                            className='mr-2'
                          />{' '}
                          {price.currency}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <h6 className='text-xl text-white capitalize font-bold mb-1'>
                {displayPrice(prices[priceId].price)}{' '}
                <span className='text-sm'>{prices[priceId].currency}</span>
              </h6>
            </div>
          )}
        </div>
        <div className={`${styles.mintProgress} mt-4`}>
          <div
            className={`${styles.mintStatus} flex flex-row items-center justify-between`}
          >
            <h6 className={`${do_hyeon.className} text-white text-base`}>
              {t("play.Mint Progress")}
            </h6>
            <h6
              className={`${do_hyeon.className} ${styles.progress} text-white text-base`}
            >
              {Number(minted) === 0
                ? 0
                : ((Number(minted) / Number(total)) * 100).toFixed(3)}
              %
            </h6>
          </div>
          <div className={`${styles.progressBarBack}`}>
            <div
              className={`${styles.progressBarFront} text-base`}
              style={{
                width: `${Number(minted) === 0
                  ? 0
                  : ((Number(minted) / Number(total)) * 100).toFixed(3)
                  }%`
              }}
            ></div>
          </div>
        </div>
        <div className={`mt-6`}>
          <h6 className={`${do_hyeon.className} text-white text-base`}>
            {Number(minted)}/{Number(total)}{' '}
            <span className='capitalize'>{typeName[props.type]}</span> {t("common.Lands Minted")}
          </h6>
        </div>
        {type !== 3 ? (
          <div
            className={`${styles.mint} mt-4 flex flex-row items-center justify-between`}
          >
            <div
              className={`${styles.number} flex flex-row items-center cursor-pointer`}
            >
              <span
                className={`${styles.minus} text-center text-white flex items-center justify-center`}
                onClick={minusMintCount}
              >
                <Icon icon='ic:outline-minus' color='white' />
              </span>
              <input
                className={`${styles.count} text-white text-base mx-4`}
                value={mintCount}
                onChange={handleChangeMintCount}
              />
              <span
                className={`${styles.plus} text-center text-white flex items-center justify-center`}
                onClick={addMintCount}
              >
                <Icon icon='ic:baseline-plus' color='white' />
              </span>
            </div>
            <h6 className={`${do_hyeon.className} text-white`}>
              {displayTotalPrice(prices[priceId].price)}{' '}
              {prices[priceId].currency}
            </h6>
            <Button
              color={'Normal'}
              height={'Small'}
              radius={'Small'}
              textColor={'White'}
              fontSize={'Small'}
              width={'w-[80px]'}
              onClick={handleMintLand}
            >
              {t("play.Mint")}
            </Button>
          </div>
        ) : (
          <div className='mt-4 flex flex-row'>
            <h6 className={`${do_hyeon.className} text-white`}>
              {t("play.Mint Description")}
            </h6>
          </div>
        )}
      </div>
    </div>
  )
}
