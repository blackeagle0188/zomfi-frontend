import Head from 'next/head'
import { Do_Hyeon } from '@next/font/google'
import { MyAssetNavMenu } from '@/components/NavMenu/MyAssetNavMenu'
import styles from '@/styles/Assets.module.css'
import Button from '@/components/Button'
import { Collection, Rarity, RentList } from '@/constants/Filter'
import FilterDropDown from '@/components/DropDown/FilterDropDown'
import PayTypeDropdown from '@/components/DropDown/PayTypeDropdown'
import { useState, useEffect } from 'react'
import MyNFTRent from '@/components/Modals/MyNFTRent'
import MyNFTBorrowed from '@/components/Modals/MyNFTBorrowed'
import MyNFTSale from '@/components/Modals/MyNFTSale'
import MyNFTOwned from '@/components/Modals/MyNFTOwned'
import AssetCard from '@/components/Cards/AssetCard'
import BuyModal from '@/components/Modals/BuyModal'
import Input from '@/components/Input'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import JoinCommunity from '@/components/JoinCommunity'
import Footer from '@/components/Footer'
import useAuth from '@/hooks/useAuth'
import usePetContract from '@/hooks/usePetContract'
import useLandContract from '@/hooks/useLandContract'
import useMarketContract from '@/hooks/useMarketContract'
import useRentalContract from '@/hooks/useRentalContract'
import CHAIN_CONFIG from '@/constants/CHAIN_CONFIG'
import { BrowserProvider } from 'ethers'
import { toast } from 'react-toastify'
import axios from 'axios'
import moment from "moment";
import { useTranslation } from "next-i18next";

const do_hyeon = Do_Hyeon({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})
interface IBorrowItem {
  borrower: string
  collateralAmount: number
  collateralTokenType: number
  depositedCollateral: boolean
  itemId: number
  lender: string
  nftContract: string
  payType: number
  period: number
  price: number
  rentable: boolean
  rentalStartTime: number
  rentalEndTime: number
  tokenId: bigint
}

export default function Trade () {
  const { t } = useTranslation("");

  const { wallet, setLoading } = useAuth()

  const { contract: petContract } = usePetContract(wallet)
  const { contract: landContract } = useLandContract(wallet)
  const { contract: marketContract } = useMarketContract(wallet)
  const { contract: rentalContract } = useRentalContract(wallet)
  const [currentTime, setCurrentTime] = useState<any>(moment())
  const [collectionType, setCollectionType] = useState(0)
  const [collectionTypeName, setCollectionTypeName] = useState('')
  const [rarityType, setRarityType] = useState(0)
  const [rarityTypeName, setRarityTypeName] = useState('')
  const [selectedTokenId, setSelectedTokenId] = useState(0)
  const [selectedCardType, setSelectedCardType] = useState('')
  const [selectedType, setSelectedType] = useState(0)
  const [selectedNftType, setSelectedNftType] = useState('Dogs')
  const [selectedPayType, setSelectedPayType] = useState(0)
  const [openRentModal, setRentModalOpen] = useState(false)
  const [openBorrowModal, setBorrowModalOpen] = useState(false)
  const [openOnSaleModal, setOnSaleModalOpen] = useState(false)
  const [openOwnedModal, setOwnedModalOpen] = useState(false)
  const [salePrice, setSalePrice] = useState(0)
  const [selectedRentalPayType, setSelectedRentalPayType] = useState(0)
  const [rentalPrice, setRentalPrice] = useState(0)
  const [selectedCollateralTokenType, setSelectedCollateralTokenType] =
    useState(0)
  const [collateralAmount, setCollateralAmount] = useState(0)
  const [period, setPeriod] = useState(1)
  const [openSaleModal, setSaleModalOpen] = useState(false)
  const [openRentListModal, setRentListModalOpen] = useState(false)
  const [assets, setAssets] = useState<any[]>([])
  const [asset, setAsset] = useState<any>({})
  const [isReload, setIsReload] = useState<boolean>(false);

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const provider = new BrowserProvider(window.ethereum)
      const curBlockNum = await provider.getBlockNumber()
      const curBlock = await provider.getBlock(curBlockNum)
      const blockTimestamp = curBlock ? curBlock.timestamp : 0

      setCurrentTime(blockTimestamp)

      let petAssets = [],
        landAssets = [],
        marketAssets = [],
        rentalAssets = []
      if (petContract) {
        const items = await petContract.walletOfOwner(wallet)

        const tokenIds = items.toArray().map((item: bigint) => Number(item))
        const { data: data } = await axios.post('/api/pets/fetch-nfts', {
          tokenIds: tokenIds
        })
        petAssets = data.data.map((asset: any) => {
          asset.nftType = 'Dog'
          return asset
        })
      }
      if (landContract) {
        const items = await landContract.walletOfOwner(wallet)
        const tokenIds = items.toArray().map((item: bigint) => Number(item))
        const { data: data } = await axios.post('/api/lands/fetch-nfts', {
          tokenIds: tokenIds
        })
        landAssets = data.data.map((asset: any) => {
          asset.nftType = 'Land'
          return asset
        })
      }

      if (marketContract) {
        const items = await marketContract.fetchMyNFTs(wallet)
        for (let item of items) {
          let _item = item.toObject()
          if (_item.nftContract === petContract.target) {
            const { data: data } = await axios.get(
              `/api/pets/${Number(_item.tokenId)}`
            )
            marketAssets.push({
              ...data.data,
              itemId: _item.itemId,
              payType: Number(_item.payType),
              price: Number(_item.price) / Math.pow(10, 18),
              nftType: 'Dog',
              status: 2
            })
          } else if (_item.nftContract === landContract.target) {
            const { data: data } = await axios.get(
              `/api/lands/${Number(_item.tokenId)}`
            )
            marketAssets.push({
              ...data.data,
              itemId: _item.itemId,
              payType: Number(_item.payType),
              price: Number(_item.price) / Math.pow(10, 18),
              nftType: 'Land',
              status: 2
            })
          }
        }
      }
      if (rentalContract) {
        const items = await rentalContract.fetchMyRentedNFTs(wallet)
        for (let item of items) {
          let _item = item.toObject()
          if (_item.nftContract === petContract.target) {
            const { data: data } = await axios.get(
              `/api/pets/${Number(_item.tokenId)}`
            )
            rentalAssets.push({
              ...data.data,
              itemId: _item.itemId,
              payType: Number(_item.payType),
              price: Number(_item.price) / 1e18,
              collateralTokenType: Number(_item.collateralTokenType),
              collateralAmount: Number(_item.collateralAmount) / 1e18,
              period: Number(_item.period),
              lender: _item.lender,
              borrower: _item.borrower,
              rentalStartTime: Number(_item.rentalStartTime),
              rentalEndTime: Number(_item.rentalEndTime),
              rentable: _item.rentable,
              depositedCollateral: _item.depositedCollateral,
              nftType: 'Dog',
              status: 0
            })
          } else if (_item.nftContract === landContract.target) {
            const { data: data } = await axios.get(
              `/api/lands/${Number(_item.tokenId)}`
            )
            rentalAssets.push({
              ...data.data,
              itemId: _item.itemId,
              payType: Number(_item.payType),
              price: Number(_item.price) / 1e18,
              collateralTokenType: Number(_item.collateralTokenType),
              collateralAmount: Number(_item.collateralAmount) / 1e18,
              period: Number(_item.period),
              lender: _item.lender,
              borrower: _item.borrower,
              rentalStartTime: Number(_item.rentalStartTime),
              rentalEndTime: Number(_item.rentalEndTime),
              rentable: _item.rentable,
              depositedCollateral: _item.depositedCollateral,
              nftType: 'Land',
              status: 0
            })
          }
        }
        let borrowedItems = [],
          _borrowedItems: IBorrowItem[] = []

        borrowedItems = await rentalContract.fetchMyBorrowedNFTs(wallet)
        borrowedItems = borrowedItems.toArray()
        _borrowedItems = borrowedItems.map((borrowedItem: any) =>
          borrowedItem.toObject()
        )

        petAssets = petAssets.map((petAsset: any, idx: number) => {
          let item = _borrowedItems.find(
            (borrowedItem: IBorrowItem, idx: number) =>
              borrowedItem.tokenId == BigInt(petAsset.tokenId)
          )
          if (item?.borrower.toLowerCase() == wallet?.toLowerCase()) {
            let rentalEndTime = Number(item?.rentalEndTime);
            if (!isExpired(rentalEndTime??0)) {
              petAsset.status = 1
            }
            petAsset.itemId = Number(item?.itemId)
            petAsset.payType = Number(item?.payType)
            petAsset.period = Number(item?.period)
            petAsset.price = Number(item?.price) / 1e18
            petAsset.rentable = item?.rentable
            petAsset.rentalStartTime = Number(item?.rentalStartTime)
            petAsset.rentalEndTime = rentalEndTime
            petAsset.collateralAmount = Number(item?.collateralAmount) / 1e18
            petAsset.collateralTokenType = Number(item?.collateralTokenType)
            petAsset.borrower = item?.borrower
            petAsset.lender = item?.lender
          }
          return petAsset
        })

        landAssets = landAssets.map((landAsset: any, idx: number) => {
          let item = _borrowedItems.find(
            (borrowedItem: IBorrowItem, idx: number) =>
              borrowedItem.tokenId == BigInt(landAsset.tokenId)
          )
          if (item?.borrower.toLowerCase() == wallet?.toLowerCase()) {
            let rentalEndTime = Number(item?.rentalEndTime)

            if (!isExpired(rentalEndTime??0)) {
              landAsset.status = 1
            }
            landAsset.itemId = Number(item?.itemId)
            landAsset.payType = Number(item?.payType)
            landAsset.period = Number(item?.period)
            landAsset.price = Number(item?.price) / 1e18
            landAsset.rentable = item?.rentable
            landAsset.rentalStartTime = Number(item?.rentalStartTime)
            landAsset.rentalEndTime = rentalEndTime
            landAsset.collateralAmount = Number(item?.collateralAmount) / 1e18
            landAsset.collateralTokenType = Number(item?.collateralTokenType)
            landAsset.borrower = item?.borrower
            landAsset.lender = item?.lender
          }
          return landAsset
        })
      }

      setAssets(
        marketAssets.concat(rentalAssets).concat(petAssets).concat(landAssets)
      )
      setLoading(false)
    })()
  }, [marketContract, petContract, landContract, rentalContract, isReload])

  const isExpired = (time: number) => {
    return moment.unix(currentTime).isAfter(moment.unix(time));
  }

  const displayDetail = (id: string, status: number) => {
    const asset = assets.find(asset => asset._id === id)
    setAsset(asset)
    if (status === 0) {
      setRentModalOpen(true)
    } else if (status === 1) {
      setBorrowModalOpen(true)
    } else if (status === 2) {
      setOnSaleModalOpen(true)
    } else {
      setOwnedModalOpen(true)
    }
  }

  const handleSearchAll = () => {}

  const handleList = async () => {
    setSalePrice(Number(salePrice))
    if (isNaN(salePrice)) {
      toast.error('Please enter a valid price.')
    } else {
      if (salePrice < 0) {
        toast.error('Please enter a price.')
      } else {
        setLoading(true)
        try {
          const tokenId = asset.tokenId
          const payType = selectedPayType + 1
          const price = BigInt(salePrice * Math.pow(10, 18))
          // Approve Token

          let tx, contractAddr
          if (asset.nftType.toLowerCase() === 'dog') {
            contractAddr = CHAIN_CONFIG.petContract.contractAddr
            tx = await petContract.approve(
              CHAIN_CONFIG.marketContract.contractAddr,
              tokenId
            )
          } else if (asset.nftType.toLowerCase() === 'land') {
            contractAddr = CHAIN_CONFIG.landContract.contractAddr
            tx = await landContract.approve(
              CHAIN_CONFIG.marketContract.contractAddr,
              tokenId
            )
          }
          await tx.wait()
          // List Token to Market
          tx = await marketContract.createMarketplaceItem(
            contractAddr,
            tokenId,
            payType,
            price
          )
          await tx.wait()
          setSaleModalOpen(false)
          toast.success('Successfully listed.')
          setIsReload(!isReload);
        } catch (err: any) {
          toast.error(err.reason)
        }
        setLoading(false)
      }
    }
  }

  const handleCancelList = async (id: number) => {
    setLoading(true)
    try {
      let tx = await marketContract.removeMarketplaceSale(id)
      await tx.wait()
      setAssets(
        assets.map(asset => {
          if (asset.itemId === id) delete asset.status
          return asset
        })
      )
      setOnSaleModalOpen(false)
    } catch (err: any) {
      toast.error(err.reason)
    }
    setLoading(false)
  }

  const handleRental = async () => {
    setRentalPrice(Number(rentalPrice))
    setCollateralAmount(Number(collateralAmount))
    if (isNaN(rentalPrice) || rentalPrice <= 0) {
      toast.error('Please enter a valid price.')
    } else if (isNaN(collateralAmount) || collateralAmount <= 0) {
      toast.error('Please enter a valid amount.')
    } else {
      try {
        let tx,
          nftContract,
          tokenId = asset.tokenId,
          payType = selectedRentalPayType + 1,
          price = BigInt(rentalPrice * Math.pow(10, 18)),
          collateralPayType = selectedCollateralTokenType + 1,
          _collateralAmount = BigInt(collateralAmount * Math.pow(10, 18)),
          _period = BigInt(period * 86400)
        setLoading(true)
        if (asset.nftType.toLowerCase() === 'dog') {
          nftContract = CHAIN_CONFIG.petContract.contractAddr
          tx = await petContract.approve(
            CHAIN_CONFIG.rentalContract.contractAddr,
            tokenId
          )
        } else {
          nftContract = CHAIN_CONFIG.landContract.contractAddr
          tx = await landContract.approve(
            CHAIN_CONFIG.rentalContract.contractAddr,
            tokenId
          )
        }
        await tx.wait()
        // approve to rental contract
        tx = await rentalContract.createRentalItem(
          nftContract,
          tokenId,
          payType,
          price,
          _collateralAmount,
          collateralPayType,
          _period
        )
        await tx.wait()
        setRentListModalOpen(false)
        toast.success('Successfully listed on Lental Market.')
        setLoading(false)
        setIsReload(!isReload);
      } catch (err: any) {
        toast.error(err.reason)
        setLoading(false)
      }
    }
  }

  const handleCancelRental = async (id: number) => {
    setLoading(true)
    try {
      let tx = await rentalContract.removeRentalItem(id)
      await tx.wait()
      setAssets(
        assets.map(asset => {
          if (asset.itemId === id) delete asset.status
          return asset
        })
      )
      setRentModalOpen(false)
      toast.success('Successfully cancelled.')
    } catch (err: any) {
      toast.error(err.reason)
    }
    setLoading(false)
  }

  const handleClaimCollateral = async (id: number) => {
    setLoading(true)
    try {
      let tx = await rentalContract.claimCollateral(id)
      await tx.wait()
      setAssets(assets.filter(asset => asset.itemId !== id))
      setRentModalOpen(false)
      toast.success('Successfully claimed.')
    } catch (err: any) {
      toast.error(err.reason)
    }
    setLoading(false)
  }

  const handleReturnNFT = async (id: number) => {
    setLoading(true);
    try {
      let tx;
      if (asset.nftType.toLowerCase() === 'dog') {
        tx = await petContract.approve(
          CHAIN_CONFIG.rentalContract.contractAddr,
          asset.tokenId
        )
      } else {
        tx = await landContract.approve(
          CHAIN_CONFIG.rentalContract.contractAddr,
          asset.tokenId
        )
      }
      await tx.wait()
      tx = await rentalContract.returnNFT(id)
      await tx.wait()
      setAssets(assets.filter(asset => asset.itemId !== id))
      setBorrowModalOpen(false)
      toast.success('Successfully returned.')
    } catch (err: any) {
      toast.error(err.reason)
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>{t("assets.My Assets")}</title>
        <meta property='og:title' content={`${t("assets.My Assets")}`} />
      </Head>
      <main className={styles.main}>
        {/* <MyAssetNavMenu /> */}
        {openRentModal && (
          <MyNFTRent
            id={asset._id}
            nftType={asset.nftType}
            itemId={asset.itemId}
            tokenId={asset.tokenId}
            name={asset.name}
            rarity={asset.rarity}
            image={asset.image}
            status={asset.status}
            price={asset.price}
            payType={asset.payType}
            collateralTokenType={asset.collateralTokenType}
            collateralAmount={asset.collateralAmount}
            lender={asset.lender}
            borrower={asset.borrower}
            period={asset.period}
            rentalStartTime={asset.rentalStartTime}
            rentalEndTime={asset.rentalEndTime}
            rentable={asset.rentable}
            depositedCollateral={asset.depositedCollateral}
            openModal={openRentModal}
            setModalOpen={setRentModalOpen}
            handleCancelRental={handleCancelRental}
            handleClaimCollateral={handleClaimCollateral}
          />
        )}
        {openBorrowModal == true && (
          <MyNFTBorrowed
            id={asset._id}
            nftType={asset.nftType}
            itemId={asset.itemId}
            tokenId={asset.tokenId}
            name={asset.name}
            rarity={asset.rarity}
            image={asset.image}
            status={asset.status}
            price={asset.price}
            payType={asset.payType}
            collateralTokenType={asset.collateralTokenType}
            collateralAmount={asset.collateralAmount}
            lender={asset.lender}
            borrower={asset.borrower}
            period={asset.period}
            rentalStartTime={asset.rentalStartTime}
            rentalEndTime={asset.rentalEndTime}
            rentable={asset.rentable}
            depositedCollateral={asset.depositedCollateral}
            openModal={openBorrowModal}
            setModalOpen={setBorrowModalOpen}
            handleReturnNFT={handleReturnNFT}
          />
        )}

        {openOnSaleModal && (
          <MyNFTSale
            id={asset._id}
            nftType={asset.nftType}
            itemId={asset.itemId}
            tokenId={asset.tokenId}
            name={asset.name}
            rarity={asset.rarity}
            image={asset.image}
            status={asset.status}
            price={asset.price}
            payType={asset.payType}
            createdAt={asset.createdAt}
            borrower={wallet}
            openModal={openOnSaleModal}
            setModalOpen={setOnSaleModalOpen}
            handleCancelList={handleCancelList}
          />
        )}
        {openOwnedModal && (
          <MyNFTOwned
            id={asset._id}
            nftType={asset.nftType}
            tokenId={asset.tokenId}
            name={asset.name}
            rarity={asset.rarity}
            image={asset.image}
            borrower={wallet}
            openModal={openOwnedModal}
            setModalOpen={setOwnedModalOpen}
            setSaleModalOpen={setSaleModalOpen}
            setRentModalOpen={setRentListModalOpen}
          />
        )}

        {/* Modal for sale */}
        {openSaleModal && (
          <BuyModal openModal={openSaleModal} setModalOpen={setSaleModalOpen}>
            <h6
              className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl text-left text-white mb-6`}
            >
              {asset.nftType} #{asset.tokenId}
            </h6>
            <div className='flex flex-row items-center'>
              <h6
                className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl text-left text-white mr-6`}
              >
                {t("assets.Pay Type")} :{' '}
              </h6>
              <PayTypeDropdown
                payTypeId={selectedPayType}
                setPayTypeId={setSelectedPayType}
              />
            </div>
            <div className='flex flex-row items-center mt-6'>
              <h6
                className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl text-left text-white mr-6`}
              >
                {t("assets.Price")} :{' '}
              </h6>
              <Input
                type='text'
                placeHolder={'Enter the Price'}
                value={salePrice}
                handleValue={(ev: any) => setSalePrice(ev.target.value)}
              />
            </div>

            <div className='mt-6 flex items-center justify-center'>
              <Button
                color={'Normal'}
                height={'48px'}
                radius={'Small'}
                textColor={'White'}
                fontSize={'25px'}
                width={'215px'}
                font={do_hyeon}
                onClick={handleList}
              >
                {t("assets.List")}
              </Button>
            </div>
          </BuyModal>
        )}

        {/* Modal for rent */}
        <BuyModal
          openModal={openRentListModal}
          setModalOpen={setRentListModalOpen}
        >
          <h6
            className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl text-left text-white mb-6`}
          >
            {asset.nftType}#{asset.tokenId}
          </h6>
          <div className='flex flex-row items-center justify-between mb-3'>
            <h6
              className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl text-left text-white mr-6`}
            >
              {t("assets.Rental Pay Type")} :{' '}
            </h6>
            <PayTypeDropdown
              payTypeId={selectedRentalPayType}
              setPayTypeId={setSelectedRentalPayType}
            />
          </div>
          <div className='flex flex-row items-center justify-between mb-3'>
            <h6
              className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl text-left text-white mr-6`}
            >
               {t("assets.Rental Price")} :{' '}
            </h6>
            <Input
              placeHolder={'Enter the price'}
              value={rentalPrice}
              maxWidth={'w-[150px]'}
              handleValue={(ev: any) => setRentalPrice(ev.target.value)}
            />
          </div>
          <div className='flex flex-row items-center justify-between mb-3'>
            <h6
              className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl text-left text-white mr-6`}
            >
              {t("assets.Period(Days)")} :{' '}
            </h6>
            <PayTypeDropdown
              payTypeId={selectedCollateralTokenType}
              setPayTypeId={setSelectedCollateralTokenType}
            />
          </div>
          <div className='flex flex-row items-center justify-between mb-3'>
            <h6
              className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl text-left text-white mr-6`}
            >
              {t("assets.Period(Days)")} :{' '}
            </h6>
            <Input
              placeHolder={'Enter the amount'}
              value={collateralAmount}
              maxWidth={'w-[150px]'}
              handleValue={(ev: any) => setCollateralAmount(ev.target.value)}
            />
          </div>
          <div className='flex flex-row items-center justify-between mb-3'>
            <h6
              className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl text-left text-white mr-6`}
            >
              {t("assets.Period(Days)")} :{' '}
            </h6>
            <Input
              type='number'
              min={1}
              placeHolder={'Enter the period'}
              value={period}
              maxWidth={'w-[150px]'}
              handleValue={(ev: any) =>
                setPeriod(
                  isNaN(parseInt(ev.target.value))
                    ? 1
                    : parseInt(ev.target.value)
                )
              }
            />
          </div>
          <div className='mt-6 flex items-center justify-center'>
            <Button
              color={'Normal'}
              height={'48px'}
              radius={'Small'}
              textColor={'White'}
              fontSize={'25px'}
              width={'230px'}
              font={do_hyeon}
              onClick={handleRental}
            >
              {t("assets.Rent")}
            </Button>
          </div>
        </BuyModal>

        <div className='flex flex-col px-4 mobile_lg:px-10 tablet:px-20 py-10'>
          {/* <div
            className={`${styles.filter} flex flex-col mobile_lg:flex-row pb-4`}
          >
            <Button
              color={'Normal'}
              height={'Normal'}
              radius={'Small'}
              textColor={'White'}
              fontSize={'Normal'}
              width={'w-full mobile_lg:w-[150px]'}
              class={'mr-2 mb-2'}
              onClick={handleSearchAll}
            >
               {t("assets.All")}
            </Button>
            <FilterDropDown
              title={collectionTypeName == '' ? 'Dogs' : collectionTypeName}
              type={collectionType}
              setFunc={setCollectionType}
              setDropDownName={setCollectionTypeName}
              menu={Collection}
              class={'mr-2 mb-2'}
            />
            <FilterDropDown
              title={rarityTypeName == '' ? 'NFT Rarity' : rarityTypeName}
              type={rarityType}
              setFunc={setRarityType}
              setDropDownName={setRarityTypeName}
              menu={Rarity}
            />
          </div> */}

          <div className='flex flex-wrap justify-around'>
            {assets.map((asset, idx) => {
              return (
                <AssetCard
                  key={idx}
                  id={asset._id}
                  nftType={asset.nftType}
                  tokenId={asset.tokenId}
                  status={asset.status}
                  name={asset.name}
                  rarity={asset.rarity}
                  image={asset.image}
                  borrower={asset.borrower}
                  lender={asset.lender}
                  displayDetail={displayDetail}
                />
              )
            })}
          </div>
        </div>
        <JoinCommunity />
        <Footer />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common']))
  }
})
