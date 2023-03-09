import { useState, useEffect } from 'react'
import Modal from './Modal'
import Image from 'next/image'
import { Do_Hyeon } from '@next/font/google'
import assetsStyle from '@/styles/Assets.module.css'
import truncateEthAddress from 'truncate-eth-address'
import Button from '../Button'
import { BrowserProvider } from 'ethers'
import useAuth from '@/hooks/useAuth'
import PAY_TYPES from '@/constants/PAY_TYPES'
import moment from 'moment'

const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })

interface Props {
  id: string
  nftType: string
  itemId: number
  tokenId: number
  name: string
  rarity: string
  image: string
  status?: number
  price: number
  payType: number
  collateralTokenType: number
  collateralAmount: number
  lender: string
  borrower: string
  period: number
  rentalStartTime: number
  rentalEndTime: number
  rentable: boolean
  depositedCollateral: boolean
  openModal: boolean
  setModalOpen: Function
  handleReturnNFT: Function
}
let assetType = ['rented', 'borrowed', 'onsale']

export default function MyNFTBorrow (props: Props) {
  const {
    nftType,
    itemId,
    tokenId,
    name,
    image,
    status,
    price,
    payType,
    collateralAmount,
    collateralTokenType,
    rentalEndTime,
    lender,
    openModal,
    setModalOpen,
    handleReturnNFT
  } = props
  const { setLoading } = useAuth()
  const [currentTime, setCurrentTime] = useState<any>(moment())
  const [timer, setTimer] = useState('')

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const provider = new BrowserProvider(window.ethereum)
      const curBlockNum = await provider.getBlockNumber()
      const curBlock = await provider.getBlock(curBlockNum)
      const blockTimestamp = curBlock ? curBlock.timestamp : 0

      setCurrentTime(blockTimestamp)
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (!isExpired()) {
      let _currentTime = currentTime
      const interval = setInterval(() => {
        _currentTime++
        let distance = props.rentalEndTime - _currentTime
        if (distance <= 0) clearInterval(interval)
        let days = Math.floor(distance / (60 * 60 * 24))
        let hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60))
        let minutes = Math.floor(((distance % (60 * 60 * 24)) % (60 * 60)) / 60)
        let seconds = Math.floor(((distance % (60 * 60 * 24)) % (60 * 60)) % 60)
        setTimer(
          `${days > 9 ? days : '0' + days}Days ${
            hours > 9 ? hours : '0' + hours
          }Hrs ${minutes > 9 ? minutes : '0' + minutes}Mins ${
            seconds > 9 ? seconds : '0' + seconds
          }Sec`
        )
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [currentTime])

  const isExpired = () => {
    return moment.unix(currentTime).isAfter(moment.unix(rentalEndTime))
  }

  const getAssetType = (type: number) => {
    return assetType[type]
  }

  return (
    <Modal openModal={openModal} setModalOpen={setModalOpen}>
      <div className={`${assetsStyle.nftMetadata}`}>
        <div
          className={`${assetsStyle.baseInfo} pr-4 flex justify-center flex-col`}
        >
          <div
            className={`${assetsStyle.salemetadata} flex items-center justify-center m-0.5 mb-4 relative`}
          >
            <Image
              src={`/images/${nftType?.toLowerCase()}s/${image}`}
              alt='dog'
              width={'0'}
              height={'0'}
              sizes='100%'
              style={{ width: 'auto', height: '200px' }}
            />
            {status != null && (
              <div>
                <Image
                  src={`/images/${getAssetType(status)}-ribbon.png`}
                  className={`absolute z-1 top-0 left-0`}
                  alt='nft type'
                  width={'0'}
                  height={'0'}
                  sizes='100%'
                  style={{ width: '90px', height: '90px' }}
                />
                <h6
                  className={`${do_hyeon.className} ${assetsStyle.assetType} absolute z-1 top-2 left-0 text-white -rotate-45 capitalize`}
                >
                  {getAssetType(status)}
                </h6>
              </div>
            )}
          </div>
          <h6
            className={`${do_hyeon.className} text-white text-base mb-4 text-center`}
          >
            {nftType}#{tokenId} (<span className='capitalize'>{name}</span>)
          </h6>
          <div className='mt-3 flex items-center flex-col'>
            {isExpired() === false && (
              <div>
                <p className='text-white font-bold text-lg mb-3'>{timer}</p>
                <Button
                  color={'Normal'}
                  height={'48px'}
                  radius={'Small'}
                  textColor={'White'}
                  fontSize={'25px'}
                  width={'w-[215px]'}
                  font={do_hyeon}
                  onClick={() => handleReturnNFT(itemId)}
                >
                  Return NFT
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className={`${assetsStyle.additionInfo} ml-4 p-6`}>
          <div className='flex flex-col pl-10'>
            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mb-2`}>
              NFT Name :{' '}
              <span className='text-white'>
                {nftType}#{tokenId} ({name})
              </span>
            </h6>
            <h6
              className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mb-2 flex items-center`}
            >
              Rental Price :{' '}
              <span className='flex items-center text-white'>
                <Image
                  src={`/images/${PAY_TYPES[payType - 1].toLowerCase()}.png`}
                  alt={PAY_TYPES[payType - 1].toLowerCase()}
                  className='rounded-3xl ml-3 mr-1'
                  width='25'
                  height='25'
                />
                ${price.toFixed(3)}
                {PAY_TYPES[payType - 1]}
              </span>
            </h6>
            <h6
              className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mb-2 flex items-center`}
            >
              Collateral Amount :{' '}
              <span className='flex items-center text-white'>
                <Image
                  src={`/images/${PAY_TYPES[
                    collateralTokenType - 1
                  ].toLowerCase()}.png`}
                  alt={PAY_TYPES[collateralTokenType - 1].toLowerCase()}
                  className='rounded-3xl ml-3 mr-1'
                  width='25'
                  height='25'
                />
                ${collateralAmount.toFixed(3)}
                {PAY_TYPES[collateralTokenType - 1]}
              </span>
            </h6>
            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mb-2`}>
              Period :{' '}
              <span className='text-white'>{props.period / 86400} Day(s)</span>
            </h6>
            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mb-2`}>
              Lender :{' '}
              <span className='text-white'>{truncateEthAddress(lender)}</span>
            </h6>

            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mb-2`}>
              BorrowedAt :{' '}
              <span className='text-white'>
                {moment
                  .unix(props.rentalStartTime)
                  .format('YYYY/MM/DD HH:mm:ss')}
              </span>
            </h6>
            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mb-10`}>
              ExpiredAt :{' '}
              <span className='text-white'>
                {moment.unix(props.rentalEndTime).format('YYYY/MM/DD HH:mm:ss')}
              </span>
            </h6>
          </div>
        </div>
      </div>
    </Modal>
  )
}
