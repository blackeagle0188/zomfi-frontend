import Modal from './Modal';
import Image from 'next/image'
import { Do_Hyeon } from '@next/font/google'
import assetsStyle from '@/styles/Assets.module.css'
import Button from '../Button';
import { Tab } from '@headlessui/react';
import NFTProperties from '../Tab/Contents/NFTProperties';
import SaleHistory from '../Tab/Contents/SaleHistory';
import RentingHistory from '../Tab/Contents/RentingHistory';

const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })
interface Props {
  id: number,
  nftType: string
  tokenId: number
  status?: number
  name: string
  rarity: string
  image: string
  borrower: any
  openModal: boolean
  setModalOpen: Function
  setSaleModalOpen: Function
  setRentModalOpen: Function
}


let assetType = [
  "rented",
  "borrowed",
  "onsale"
]

export default function MyNFTOwned(props: Props) {
  const { nftType, tokenId, status, name, rarity, image, borrower, openModal, setModalOpen, setSaleModalOpen, setRentModalOpen } = props

  const handleOpenSaleModal = () => {
    setModalOpen(false)
    setSaleModalOpen(true)
  }

  const handleOpenRentModal = () => {
    setModalOpen(false)
    setRentModalOpen(true)
  }

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
          <div className={`${assetsStyle.salemetadata} flex items-center justify-center m-0.5 mb-4 relative`}>
              <Image
                src={`/images/${nftType.toLowerCase()}s/${(image)}`}
                alt="dog"
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
          <div className='mt-2 sm:mt-6 flex items-center flex-col'>
            <Button
              color={"#58B60E"}
              height={"48px"}
              radius={"Small"}
              textColor={"White"}
              fontSize={"25px"}
              width={"w-[215px]"}
              font={do_hyeon}
              onClick={handleOpenSaleModal}
            >
              List on Sale
            </Button>
            <Button
              color={"#415AB4"}
              height={"48px"}
              radius={"Small"}
              textColor={"White"}
              fontSize={"25px"}
              width={"w-[215px]"}
              font={do_hyeon}
              onClick={handleOpenRentModal}
              class={"my-2 sm:my-4"}
            >
              Rent
            </Button>
          </div>
        </div>
        <div className={`${assetsStyle.additionInfo} ml-4 mt-3 sm:mt-0 overflow-hidden`}>
          {/* <Tab.Group>
            <Tab.List className={`${assetsStyle.tabList} flex flex-rol itemc-center justify-center text-white py-2`}>
              <Tab className={`${assetsStyle.tabTitle} ${do_hyeon.className} px-6`}>Properties</Tab>
              <Tab className={`${assetsStyle.tabTitle} ${do_hyeon.className} px-6`}>Sale History</Tab>
              <Tab className={`${assetsStyle.tabTitle} ${do_hyeon.className} px-6`}>Renting History</Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className='m-4'> */}
                <NFTProperties 
                  nftType={nftType}
                  name={name}
                  tokenId={tokenId}
                  rarity={rarity}
                />
              {/* </Tab.Panel>
              <Tab.Panel className='m-4'><SaleHistory /></Tab.Panel>
              <Tab.Panel className='m-4'><RentingHistory /></Tab.Panel>
            </Tab.Panels>
          </Tab.Group> */}
        </div>
      </div>
    </Modal>
  )
}