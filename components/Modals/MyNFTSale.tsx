import Modal from './Modal';
import Image from 'next/image'
import { Do_Hyeon } from '@next/font/google'
import assetsStyle from '@/styles/Assets.module.css'
import Button from '../Button';
import useAuth from "@/hooks/useAuth";
import useMarketContract from "@/hooks/useMarketContract"
import PAY_TYPES from '@/constants/PAY_TYPES';
import moment from "moment";

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
  createdAt: string
  borrower?: any
  openModal: boolean
  setModalOpen: Function
  handleCancelList: Function
}

let assetType = [
  "rented",
  "borrowed",
  "onsale"
]

export default function MyNFTSale(props: Props) {
  const { nftType, itemId, tokenId, name, rarity, image, borrower, price, payType, createdAt, status, openModal, setModalOpen, handleCancelList } = props

  const getAssetType = (type: number) => {
    return assetType[type];
  }

  return (
    <Modal
      openModal={openModal}
      setModalOpen={setModalOpen}
    >
      <div className={`${assetsStyle.nftMetadata}`}>
        <div className={`${assetsStyle.baseInfo} pr-4 flex justify-center flex-col`}>
          <div className={`${assetsStyle.salemetadata} flex items-center justify-center m-0.5 mb-2 sm:mb-4 relative`}>
            <Image
                src={`/images/${nftType.toLowerCase()}s/${image}`}
                alt={nftType.toLowerCase()}
                width={"0"}
                height={"0"}
                sizes="100%"
                style={{ width: 'auto', height: '200px' }}
              />
            {
              status != null && (
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
              )
            }
          </div>
          <h6
            className={`${do_hyeon.className} text-white text-base mb-2 sm:mb-4 text-center`}
          >
            {nftType}#{tokenId} (<span className='capitalize'>{name}</span>)
          </h6>
          <div className='mt-0 sm:mt-3 flex items-center flex-col'>
            <Button
              color={"Normal"}
              height={"48px"}
              radius={"Small"}
              textColor={"White"}
              fontSize={"25px"}
              width={"w-[215px]"}
              font={do_hyeon}
              onClick={() => handleCancelList(itemId)}
            >
              Cancel Listing
            </Button>
          </div>
        </div>
        <div className={`${assetsStyle.additionInfo} ml-4 p-6 mt-3 sm:mt-0`}>
          <div
            className='flex flex-col pl-0 sm:pl-10'
          >
            <h6
              className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mb-2 sm:mb-4`}
            >
              NFT Name : <span className='text-white'>{nftType}#{tokenId} ({name})</span>
            </h6>
            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl my-2 sm:my-4`}
            >
              Rarity : <span className='text-white capitalize'>{rarity}</span>
            </h6>
            <h6
              className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl my-2 sm:my-4`}
            >
              Price : <span className='text-white'>{price} {PAY_TYPES[payType]}</span>
            </h6>
            <h6
              className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mt-2 sm:mt-4`}
            >
              Minted At : <span className='text-white'>{moment(createdAt).format("YYYY/MM/DD HH:mm:ss")}</span>
            </h6>
          </div>
        </div>
      </div>
    </Modal>
  )
}