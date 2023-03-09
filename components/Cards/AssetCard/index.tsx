import Image from 'next/image'
import Button from '@/components/Button'
import { Do_Hyeon } from '@next/font/google'
import styles from '@/styles/Assets.module.css'
import truncateEthAddress from 'truncate-eth-address'
import { useTranslation } from 'next-i18next'

const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })
interface Props {
  id: any
  nftType: string
  status?: number
  tokenId: number
  name: string
  rarity: string
  image: string
  lender: string
  borrower: string
  displayDetail: Function
}

let assetType = ['rented', 'borrowed', 'onsale']

export default function AssetCard (props: Props) {
  const { t } = useTranslation('')

  let {
    id,
    nftType,
    status,
    tokenId,
    name,
    rarity,
    image,
    borrower,
    lender,
    displayDetail
  } = props
  const getAssetType = (type: number) => {
    return assetType[type]
  }

  const handleDetails = () => {
    displayDetail(id, status)
  }

  return (
    <div className={`${styles.assetCard} relative`}>
      <div className='relative'>
        <Image
          src={`/images/rental-card-background.png`}
          width='0'
          height='0'
          sizes='100%'
          style={{ width: '100%', height: '100%' }}
          alt='rental'
          className={`${styles.assetCardBackground} mr-2`}
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
      {status != null && status < 3 && (
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
            className={`${do_hyeon.className} ${styles.assetType} absolute z-1 top-2 left-0 text-white -rotate-45 capitalize`}
          >
            {getAssetType(status)}
          </h6>
        </div>
      )}
      <div className='mt-4'>
        <div className='h-16 mobile_lg:h-20'>
          <h6
            className={`${do_hyeon.className} text-white text-base md:text-2xl`}
          >
            {nftType}#{tokenId}
            <span>({name})</span>
          </h6>
          {status == 0 && (
            <h6
              className={`${do_hyeon.className} text-white text-xs md:text-sm w-full text-right my-2`}
            >
              {t('common.Borrower')}:{' '}
              <span>
                {borrower === '0x0000000000000000000000000000000000000000'
                  ? 'Null'
                  : truncateEthAddress(borrower)}
              </span>
            </h6>
          )}
          {status == 1 && (
            <h6
              className={`${do_hyeon.className} text-white text-xs md:text-sm w-full text-right my-2`}
            >
              {t('common.Lender')}: <span>{truncateEthAddress(lender)}</span>
            </h6>
          )}
        </div>
        <Button
          color={'#1C92FF'}
          height={'Normal'}
          radius={'Small'}
          textColor={'White'}
          fontSize={'20px'}
          width={'w-full'}
          class={'mr-4'}
          onClick={handleDetails}
        >
          {t('common.Details')}
        </Button>
      </div>
    </div>
  )
}
