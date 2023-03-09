import { Fragment, useRef } from 'react'
import Modal from './Modal';
import Image from 'next/image'
import { Rubik_Wet_Paint, Saira_Extra_Condensed, Do_Hyeon } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import marketPlaceStyles from '@/styles/Marketplace.module.css'
import Button from '../Button';
import useAuth from "@/hooks/useAuth";
import usePetContract from "@/hooks/usePetContract";
import useLandContract from "@/hooks/useLandContract";
import useMarketContract from "@/hooks/useMarketContract"
import { Contract } from 'ethers'
import TOKEN_CONTRACTS from '@/constants/TOKEN_CONTRACTS'
import PAY_TYPES from '@/constants/PAY_TYPES';
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import truncateEthAddress from 'truncate-eth-address'

const rubik = Rubik_Wet_Paint({ subsets: ['latin'], weight: "400" })
const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })
interface Props {
  id: string
  itemId: number
  tokenId: number
  nftType: string
  name: string
  rarity: string
  payType: number
  price: number
  image: string
  seller: string
  sold: boolean
  openModal: boolean
  setModalOpen: Function
  handlePurchase: Function
}

export default function MarketplaceModal(props: Props) {
  const { t } = useTranslation("");

  const { wallet, setLoading } = useAuth();

  const { contract: petContract } = usePetContract(wallet)
  const { contract: landContract } = useLandContract(wallet)
  const { contract: marketContract } = useMarketContract(wallet);

  const { id, itemId, tokenId, nftType, name, rarity, payType, price, image, seller, sold, openModal, setModalOpen, handlePurchase } = props

  const buyNft = async () => {
    setLoading(true);
    try {
      let nftContractAddr;
      if (nftType === "Dog") {
        nftContractAddr = petContract.target;
      } else if (nftType === "Land") {
        nftContractAddr = landContract.target;
      }
      const signer = await marketContract.runner.provider.getSigner();
      const { USDT, BUSD, ZOMFI } = TOKEN_CONTRACTS;
      let contract = new Contract(USDT.ADDR, USDT.ABI, signer);
      let balance = BigInt(0);
      if (payType > 1) {
        if (payType === 2) {
          contract = new Contract(USDT.ADDR, USDT.ABI, signer);
        } else if (payType === 3) {
          contract = new Contract(BUSD.ADDR, BUSD.ABI, signer);
        } else if (payType === 4) {
          contract = new Contract(ZOMFI.ADDR, ZOMFI.ABI, signer);
        }
        balance = await contract.balanceOf(wallet);
        if (balance >= BigInt(Number(price) * Math.pow(10, 18))) {
          try {
            let tx = await contract.approve(marketContract.target, BigInt(Number(price) * Math.pow(10, 18)));
            await tx.wait();
            tx = await marketContract.createMarketplaceSale(nftContractAddr, itemId);
            await tx.wait();
            toast.success("Successfully purchased.");
            handlePurchase(id);
          } catch (err:any) {
            toast.error(err.reason);
          }
        } else {
          toast.error("Insufficient fund.");
        }
      } else {// BNB
        balance = await marketContract.runner.provider.getBalance(wallet);
        if (balance >= BigInt((Number(price) * Math.pow(10, 18)))) {
          let tx = await marketContract.createMarketplaceSale(nftContractAddr, itemId, {
            from: wallet,
            value: BigInt((Number(price) * Math.pow(10, 18)))
          })
          await tx.wait();
          handlePurchase(id);
        } else {
          toast.error("Insufficient fund.");
        }
      }
    } catch (err:any) {
      toast.error(err.reason);
    }
    setLoading(false);
  }

  return (
    <Modal openModal={openModal} setModalOpen={setModalOpen}>
      <div className={`${marketPlaceStyles.nftMetadata}`}>
        <div className={`${marketPlaceStyles.baseInfo} pr-0 mobile_lg:pr-2.5`}>
          <div className={`${marketPlaceStyles.nftImage} m-auto mb-2 sm:mb-4 pt-px`}>
            <div className={`${marketPlaceStyles.salemetadata} flex items-end justify-center m-0.5	mb-2 sm:mb-4`}>
              <Image src={`/images/${nftType.toLowerCase()}s/${image}`} className={`${marketPlaceStyles.assetImage}`} alt="dog" width={"0"} height={"0"} sizes="100%" style={{ width: 'auto', height: '160px' }} />
            </div>
            <h6 className={`${marketPlaceStyles.dogInfo} ${do_hyeon.className} text-white text-base mb-2 sm:mb-4 text-center`}>{nftType}#{tokenId} (<span className='capitalize'>{name}</span>)</h6>
            <div className={`${marketPlaceStyles.sell} flex flex-row justify-evenly mb-2 sm:mb-4`}>
              <h6 className={`${marketPlaceStyles.price} ${do_hyeon.className} px-4 flex items-center text-white text-xl mb-2 sm:mb-4`}>
                <Image 
                  src={`/images/${PAY_TYPES[payType - 1].toLowerCase()}.png`}
                  width="18"
                  height="18"
                  alt={PAY_TYPES[payType - 1]}
                  className="mr-1 rounded-3xl"
                /> {price}{PAY_TYPES[payType - 1]}
              </h6>
            </div>
          </div>
          <div className={`${marketPlaceStyles.salePrices} pt-0 sm:pt-4 px-3`}>
            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mt-2 md:mt-6 text-center`}>{t("marketplace.Current Price")} : <span className='text-white'>{price}{PAY_TYPES[payType - 1]}</span></h6>
            <div className="flex justify-center items-center mt-2 md:mt-[3rem]">
              <Button color={"Normal"} height={"48px"} radius={"Small"} textColor={"White"} fontSize={"25px"} width={"w-[215px]"} font={rubik} onClick={buyNft}>Buy Now</Button>
            </div>
          </div>
        </div>
        <div className={`${marketPlaceStyles.additionInfo} mt-8`}>
          <div className='flex flex-col px-4 sm:pl-10'>
            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl`}>{t("marketplace.NFT Name")} : <span className='text-white'>{nftType}#{tokenId} ({name})</span></h6>
            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl mt-2`}>{t("marketplace.Rarity")} : <span className='text-white capitalize'>{rarity}</span></h6>
            <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl my-2`}>Seller : <span className="text-white">{truncateEthAddress(seller)}</span></h6>
          </div>
        </div>
      </div>
    </Modal>
  )
}