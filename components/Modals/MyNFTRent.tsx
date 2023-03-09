import { useState, useEffect } from 'react'
import Modal from './Modal'
import Image from 'next/image'
import { Do_Hyeon } from '@next/font/google'
import assetsStyle from '@/styles/Assets.module.css'
import Button from '../Button'
import moment from 'moment'
import PAY_TYPES from '@/constants/PAY_TYPES'
import { BrowserProvider } from 'ethers'
import truncateEthAddress from 'truncate-eth-address'
import useAuth from '@/hooks/useAuth'

const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })
interface Props {
  id: string
  nftType: string
  itemId: number
  tokenId: number
  name: string
  rarity: string
  image: string
  status: number
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
  setBuyModalOpen?: Function
  handleCancelRental: Function
  handleClaimCollateral: Function
}

const assetType = ['rented', 'borrowed', 'onsale']

export default function MyNFTRent (props: Props) {
  const {
    nftType,
    itemId,
    tokenId,
    name,
    image,
    status,
    price,
    borrower,
    payType,
    openModal,
    setModalOpen,
    setBuyModalOpen,
    collateralAmount,
    collateralTokenType,
    depositedCollateral,
    handleCancelRental,
    handleClaimCollateral
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

  const getAssetType = (type: number) => {
    return assetType[type]
  }

  const isExpired = () => {
    return moment.unix(currentTime).isAfter(moment.unix(props.rentalEndTime))
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
              src={`/images/${nftType.toLowerCase()}s/${image}`}
              alt={nftType.toLowerCase()}
              width={'0'}
              height={'0'}
              sizes='100%'
              style={{ width: 'auto', height: '200px' }}
            />
            {nftType != null && (
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
            className={`${do_hyeon.className} text-white text-base mb-2 sm:mb-4 text-center`}
          >
            {nftType}#{tokenId} (<span className='capitalize'>{name}</span>)
          </h6>
          <div className='mt-4 flex items-center flex-col'>
            {depositedCollateral === false ? (
              <Button
                color={'Normal'}
                height={'48px'}
                radius={'Small'}
                textColor={'White'}
                fontSize={'25px'}
                width={'w-[215px]'}
                font={do_hyeon}
                onClick={() => handleCancelRental(itemId)}
              >
                Cancel Renting
              </Button>
            ) : isExpired() === true ? (
              <Button
                color={'Normal'}
                height={'48px'}
                radius={'Small'}
                textColor={'White'}
                fontSize={'25px'}
                width={'w-[215px]'}
                font={do_hyeon}
                onClick={() => handleClaimCollateral(itemId)}
              >
                Claim Collateral
              </Button>
            ) : (
              <p className='text-white font-bold text-lg'>{timer}</p>
            )}
          </div>
        </div>
        <div className={`${assetsStyle.additionInfo} ml-4 p-6`}>
          <div className='flex flex-col pl-0 sm:pl-10'>
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
            {depositedCollateral && (
              <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mb-2`}>
                Borrower :{' '}
                <span className='text-white'>
                  {truncateEthAddress(borrower)}
                </span>
              </h6>
            )}
            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mb-2`}>
              LentedAt :{' '}
              <span className='text-white'>
                {!depositedCollateral
                  ? '------'
                  : moment
                      .unix(props.rentalStartTime)
                      .format('YYYY/MM/DD HH:mm:ss')}
              </span>
            </h6>
            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mb-10`}>
              ExpiredAt :{' '}
              <span className='text-white'>
                {!depositedCollateral
                  ? '------'
                  : moment
                      .unix(props.rentalEndTime)
                      .format('YYYY/MM/DD HH:mm:ss')}
              </span>
            </h6>
            {depositedCollateral === false ? (
              <p className={`${do_hyeon.className} text-center text-red-600`}>
                Nobody rented this NFT yet.
              </p>
            ) : (
              <p className={`${do_hyeon.className} text-center text-blue-600`}>
                The borrower deposited collateral.
              </p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
