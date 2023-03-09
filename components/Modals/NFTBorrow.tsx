import Modal from './Modal'
import Image from 'next/image'
import { Do_Hyeon } from '@next/font/google'
import assetsStyle from '@/styles/Assets.module.css'
import Button from '../Button'
import PAY_TYPES from '@/constants/PAY_TYPES'
import truncateEthAddress from 'truncate-eth-address'

const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })

interface Props {
  nftType: string
  itemId: number
  tokenId: number
  name: string
  payType: number
  price: number
  image: string
  status: number
  rarity: string
  collateralTokenType: number
  collateralAmount: number
  wallet: string | null
  lender: string
  borrower: string
  period: number
  rentable: boolean
  rentalStartTime: number
  rentalEndTime: number
  depositedCollateral: boolean
  openBorrowModal: boolean
  setOpenBorrowModal: Function
  handleDeposit: Function
  handleBorrow: Function
}

export default function MyNFTBorrow (props: Props) {
  const {
    nftType,
    tokenId,
    name,
    payType,
    price,
    image,
    collateralTokenType,
    collateralAmount,
    wallet,
    lender,
    borrower,
    period,
    depositedCollateral,
    openBorrowModal,
    setOpenBorrowModal,
    handleDeposit,
    handleBorrow
  } = props

  return (
    <Modal openModal={openBorrowModal} setModalOpen={setOpenBorrowModal}>
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
          </div>
          <h6
            className={`${do_hyeon.className} text-white text-base mb-4 text-center`}
          >
            {nftType}#{tokenId} (<span className='capitalize'>{name}</span>)
          </h6>
          <div className='mt-0 sm:mt-3 flex flex-column items-center flex-col'>
            {depositedCollateral === false ? (
              <Button
                color={'Normal'}
                height={'48px'}
                radius={'Small'}
                textColor={'White'}
                fontSize={'25px'}
                font={do_hyeon}
                onClick={() => handleDeposit()}
              >
                Deposit Collateral
              </Button>
            ) : borrower === wallet ? (
              <div className='flex flex-col items-center justify-center'>
                <p className='text-red-600 text-center mb-3'>
                  You deposited the collateral. Borrow the NFT now.
                </p>
                <Button
                  color={'Normal'}
                  height={'48px'}
                  radius={'Small'}
                  textColor={'White'}
                  fontSize={'25px'}
                  width={'w-[215px]'}
                  font={do_hyeon}
                  onClick={() => handleBorrow()}
                >
                  Borrow
                </Button>
              </div>
            ) : (
              <p className="text-red-600 text-center mb-3">Someone else deposited the collateral. You cannot borrow this NFT.</p>
            )}
          </div>
        </div>
        <div className={`${assetsStyle.additionInfo} ml-4 p-6 mt-3 sm:mt-0`}>
          <div className='flex flex-col pl-0 md:pl-10'>
            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mb-2 sm:mb-4`}>
              NFT Name :{' '}
              <span className='text-white'>
                {nftType}#{tokenId} ({name})
              </span>
            </h6>
            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl my-2 sm:my-4`}>
              Lender :{' '}
              <span className='text-white'>{truncateEthAddress(lender)}</span>
            </h6>
            <h6
              className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl my-2 sm:my-4 flex items-center`}
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
                ${(Number(price) / 1e18).toFixed(3)}
                {PAY_TYPES[payType - 1]}
              </span>
            </h6>
            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl my-2 sm:my-4`}>
              Period : <span className='text-white'>{period / 86400} Day(s)</span>
            </h6>
            <h6
              className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mt-2 sm:mt-4 flex items-center`}
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
                ${(Number(collateralAmount) / 1e18).toFixed(3)}
                {PAY_TYPES[collateralTokenType - 1]}
              </span>
            </h6>
          </div>
        </div>
      </div>
    </Modal>
  )
}
