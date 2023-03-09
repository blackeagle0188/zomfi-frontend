import { useState, useEffect } from 'react'
import Image from 'next/image';
import Button from '@/components/Button';
import { Do_Hyeon } from '@next/font/google'
import styles from '@/styles/Play.module.css'
import useAuth from '@/hooks/useAuth'
import { toast } from 'react-toastify'
import truncateEthAddress from 'truncate-eth-address';
import PAY_TYPES from '@/constants/PAY_TYPES';
import { useTranslation } from "next-i18next";

const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })
let typeName = ['common', 'rare', 'legend', 'mythical']

interface Props {
  nftType: string;
  itemId: number;
  tokenId: number;
  name: string;
  payType: number;
  price: number;
  image: string;
  rarity: string;
  collateralTokenType: number;
  collateralAmount: number;
  lender: string;
  borrower: string;
  period: number;
  rentable: boolean;
  rentalStartTime: number;
  rentalEndTime: number;
  
  handleOpenBorrowModal: Function;
}

export default function RentalCard(props: Props) {
  const { t } = useTranslation("");

  const { nftType, itemId, tokenId, name, payType, price, image, rarity, collateralTokenType, collateralAmount, period, rentable, rentalStartTime, rentalEndTime, borrower, lender, handleOpenBorrowModal } = props

  const getTypeName = (type: number) => {
    return typeName[type]
  }

  return (
    <div className={`${styles.reantalCard}`}>
      <div className='relative'>
        <Image
          src={`/images/rental-card-background.png`}
          width='0'
          height='0'
          sizes='100%'
          style={{ width: "100%", height: "100%" }}
          alt="rental"
          className={`${styles.rentalCardBackground} mr-2`}
        />
        <Image
          src={`/images/${nftType.toLowerCase()}s/${image}`}
          className={`${styles.assetImage} absolute z-1 bottom-1`}
          alt='dog'
          width={'0'}
          height={'0'}
          sizes='100%'
          style={{ width: 'auto', height: '100%' }}
        />
      </div>
      <div className='mt-2 md:mt-4'>
        <div className='h-16 mobile_lg:h-20'>
          <h6 className={`${do_hyeon.className} text-white text-base md:text-2xl`}>{nftType}#{tokenId}<span>({name})</span></h6>
          {
            <h6 className={`${do_hyeon.className} text-white text-xs md:text-sm w-full text-right my-2`}>{t("common.Lender")}: <span>{truncateEthAddress(lender)}</span></h6>
          }
        </div>
        <Button
          color={'Normal'}
          height={'Small'}
          radius={'Small'}
          textColor={'White'}
          fontSize={'Small'}
          width={'w-full'}
          onClick={() => handleOpenBorrowModal(itemId)}
        >
          <span className='flex items-center text-white'>
            <Image
              src={`/images/${PAY_TYPES[payType - 1].toLowerCase()}.png`}
              alt={PAY_TYPES[payType - 1].toLowerCase()}
              className='rounded-3xl ml-3 mr-1'
              width='20'
              height='20'
            />
            ${(Number(price) / 1e18).toFixed(3)}
            {PAY_TYPES[payType - 1]} For {period / 86400} days(s)
          </span>
          {/* ${(price / 1e18).toFixed(3)} For {period / 86400} day(s) */}
        </Button>
      </div>
    </div>
  )
}
