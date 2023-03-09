import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Play.module.css'
import { PlayNavMenu } from '@/components/NavMenu/PlayNavMenu'
import { Saira_Extra_Condensed } from '@next/font/google'
import Input from '@/components/Input'
import Button from '@/components/Button'
import RentalCard from '@/components/Cards/RentalCard'
import NFTBorrow from '@/components/Modals/NFTBorrow'
import FilterDropDown from '@/components/DropDown/FilterDropDown'
import { RentalType, Collection, Rarity, Sortby } from '@/constants/Filter'
import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import JoinCommunity from '@/components/JoinCommunity'
import Footer from '@/components/Footer'
import useAuth from '@/hooks/useAuth'
import usePetContract from '@/hooks/usePetContract'
import useLandContract from '@/hooks/useLandContract'
import useRentalContract from '@/hooks/useRentalContract'
import { Contract } from 'ethers'
import TOKEN_CONTRACTS from '@/constants/TOKEN_CONTRACTS'
import CHAIN_CONFIG from '@/constants/CHAIN_CONFIG'
import PAY_TYPES from '@/constants/PAY_TYPES'
import axios from 'axios'
import { toast } from 'react-toastify'

const saria = Saira_Extra_Condensed({ weight: '400', subsets: ['latin'] })

export default function Rental () {
  const { t } = useTranslation('')

  const { wallet, setLoading } = useAuth()
  const { contract: petContract } = usePetContract(wallet)
  const { contract: landContract } = useLandContract(wallet)
  const { contract: rentalContract } = useRentalContract(wallet)
  const [nftSources, setNftSources] = useState<any[]>([])
  const [nfts, setNfts] = useState<any[]>([])
  const [nft, setNft] = useState<any>({})
  const [openBorrowModal, setOpenBorrowModal] = useState<boolean>(false)

  const [rentalType, setRentalType] = useState(0)
  const [rentalTypeName, setRentalTypeName] = useState('')
  const [collectionType, setCollectionType] = useState(0)
  const [collectionTypeName, setCollectionTypeName] = useState('')
  const [rarityType, setRarityType] = useState(0)
  const [rarityTypeName, setRarityTypeName] = useState('')
  const [sortBy, setSortBy] = useState(0)
  const [sortByName, setSortByName] = useState('')
  const [nftName, setNftName] = useState('')
  const [searchValue, setSearchValue] = useState("")


  useEffect(() => {
    ;(async () => {
      if (rentalContract) {
        setLoading(true)
        const assets = await rentalContract.fetchRentalItems()
        let nfts = []
        for (let asset of assets) {
          let item = asset.toObject()
          if (item.nftContract === petContract.target) {
            const { data } = await axios.get(
              `/api/pets/${Number(item.tokenId)}`
            )
            nfts.push({
              ...data.data,
              itemId: item.itemId,
              nftType: 'Dog',
              payType: Number(item.payType),
              price: Number(item.price),
              collateralAmount: Number(item.collateralAmount),
              collateralTokenType: Number(item.collateralTokenType),
              period: Number(item.period),
              lender: item.lender,
              status: 0,
              borrower: item.borrower,
              rentable: item.rentable,
              rentalStartTime: item.rentalStartTime,
              rentalEndTime: item.rentalEndTime,
              depositedCollateral: item.depositedCollateral
            })
          } else if (item.nftContract === landContract.target) {
            const { data } = await axios.get(
              `/api/lands/${Number(item.tokenId)}`
            )
            nfts.push({
              ...data.data,
              nftType: 'Lend',
              itemId: item.itemId,
              payType: Number(item.payType),
              price: Number(item.price),
              collateralAmount: Number(item.collateralAmount),
              collateralTokenType: Number(item.collateralTokenType),
              period: Number(item.period),
              lender: item.lender,
              status: 0,
              borrower: item.borrower,
              rentable: item.rentable,
              rentalStartTime: item.rentalStartTime,
              rentalEndTime: item.rentalEndTime,
              depositedCollateral: item.depositedCollateral
            })
          }
        }
        setNftSources(nfts);
        setNfts(nfts)
        setLoading(false)
      }
    })()
  }, [rentalContract])

  const handleSearch = () => {
    const search = searchValue.toLowerCase();
    setLoading(true);
    setNfts(nftSources.filter((nft, idx) => {
      if (nft.name.toLowerCase().includes(search) ||
      nft.rarity.toLowerCase().includes(search) ||
      nft.tokenId.toString().includes(search)) {
        return nft;
      }
    }));
    setTimeout(() => {
      setLoading(false)
    }, 300);
  }

  const handleOpenBorrowModal = (itemId: number) => {
    let nft = nfts.find(nft => nft.itemId === itemId)
    setNft(nft)
    setOpenBorrowModal(true)
  }
  const compareCollateralBalances = async () => {
    const signer = await rentalContract.runner.provider.getSigner()
    const { USDT, BUSD, ZOMFI } = TOKEN_CONTRACTS
    let contract = new Contract(USDT.ADDR, USDT.ABI, signer)

    if (nft.collateralTokenType > 1) {
      if (PAY_TYPES[nft.collateralTokenType - 1].toLowerCase() === 'usdt') {
        contract = new Contract(USDT.ADDR, USDT.ABI, signer)
      } else if (
        PAY_TYPES[nft.collateralTokenType - 1].toLowerCase() === 'busd'
      ) {
        contract = new Contract(BUSD.ADDR, BUSD.ABI, signer)
      } else if (
        PAY_TYPES[nft.collateralTokenType - 1].toLowerCase() === 'zomfi'
      ) {
        contract = new Contract(ZOMFI.ADDR, ZOMFI.ABI, signer)
      }
      let balance = await contract.balanceOf(wallet)
      let price = BigInt(nft.collateralAmount)
      if (balance >= price) {
        return true
      } else {
        toast.error(
          `Insufficient amount: ${PAY_TYPES[nft.collateralTokenType - 1]}`
        )
        setLoading(false)
        return false
      }
    } else {
      return true
    }
  }

  const approveCollateralBalances = async () => {
    const signer = await rentalContract.runner.provider.getSigner()
    const { USDT, BUSD, ZOMFI } = TOKEN_CONTRACTS
    let contract = new Contract(USDT.ADDR, USDT.ABI, signer)

    if (nft.collateralTokenType > 1) {
      try {
        if (PAY_TYPES[nft.collateralTokenType - 1].toLowerCase() === 'usdt') {
          contract = new Contract(USDT.ADDR, USDT.ABI, signer)
        } else if (
          PAY_TYPES[nft.collateralTokenType - 1].toLowerCase() === 'busd'
        ) {
          contract = new Contract(BUSD.ADDR, BUSD.ABI, signer)
        } else if (
          PAY_TYPES[nft.collateralTokenType - 1].toLowerCase() === 'zomfi'
        ) {
          contract = new Contract(ZOMFI.ADDR, ZOMFI.ABI, signer)
        }
        let price = BigInt(nft.collateralAmount)
        let tx = await contract.approve(rentalContract.target, price)
        await tx.wait()
        return true
      } catch (err: any) {
        setLoading(false)
        toast.error(err.reason)
        return false
      }
    } else {
      return true
    }
  }

  const handleDeposit = async () => {
    setLoading(true)
    if (await compareCollateralBalances()) {
      if (await approveCollateralBalances()) {
        let tx
        try {
          if (nft.collateralTokenType === 1) {
            tx = await rentalContract.depositCollateral(nft.itemId, {
              from: wallet,
              value: BigInt(nft.collateralAmount)
            })
          } else {
            tx = await rentalContract.depositCollateral(nft.itemId)
          }
          await tx.wait()
          setNft({ ...nft, borrower: wallet, depositedCollateral: true })
          setNfts(
            nfts.map((_nft, idx) => {
              if (_nft.tokenId === nft.tokenId) {
                _nft.borrower = wallet
                _nft.depositedCollateral = true
              }
              return _nft
            })
          )
          toast.success('Successfully deposited.')
          setLoading(false)
        } catch (err: any) {
          setLoading(false)
          toast.error(err.reason)
        }
      }
    }
  }
  const compareBalances = async () => {
    const signer = await rentalContract.runner.provider.getSigner()
    const { USDT, BUSD, ZOMFI } = TOKEN_CONTRACTS
    let contract = new Contract(USDT.ADDR, USDT.ABI, signer)

    if (nft.payType > 1) {
      if (PAY_TYPES[nft.payType - 1].toLowerCase() === 'usdt') {
        contract = new Contract(USDT.ADDR, USDT.ABI, signer)
      } else if (PAY_TYPES[nft.payType - 1].toLowerCase() === 'busd') {
        contract = new Contract(BUSD.ADDR, BUSD.ABI, signer)
      } else if (PAY_TYPES[nft.payType - 1].toLowerCase() === 'zomfi') {
        contract = new Contract(ZOMFI.ADDR, ZOMFI.ABI, signer)
      }
      let balance = await contract.balanceOf(wallet)
      let price = BigInt(nft.price)
      if (balance >= price) {
        return true
      } else {
        toast.error(`Insufficient amount: ${PAY_TYPES[nft.payType]}`)
        setLoading(false)
        return false
      }
    } else {
      return true
    }
  }

  const approveBalances = async () => {
    const signer = await rentalContract.runner.provider.getSigner()
    const { USDT, BUSD, ZOMFI } = TOKEN_CONTRACTS
    let contract = new Contract(USDT.ADDR, USDT.ABI, signer)

    if (nft.payType > 1) {
      try {
        if (PAY_TYPES[nft.payType - 1].toLowerCase() === 'usdt') {
          contract = new Contract(USDT.ADDR, USDT.ABI, signer)
        } else if (PAY_TYPES[nft.payType - 1].toLowerCase() === 'busd') {
          contract = new Contract(BUSD.ADDR, BUSD.ABI, signer)
        } else if (PAY_TYPES[nft.payType - 1].toLowerCase() === 'zomfi') {
          contract = new Contract(ZOMFI.ADDR, ZOMFI.ABI, signer)
        }
        let price = BigInt(nft.price)
        let tx = await contract.approve(rentalContract.target, price)
        await tx.wait()
        return true
      } catch (err: any) {
        setLoading(false)
        toast.error(err.reason)
        return false
      }
    } else {
      return true
    }
  }
  const handleBorrow = async () => {
    setLoading(true)
    if (await compareBalances()) {
      if (await approveBalances()) {
        let nftContract, tx
        if (nft.nftType.toLowerCase() === 'dog') {
          nftContract = CHAIN_CONFIG.petContract.contractAddr
        } else {
          nftContract = CHAIN_CONFIG.landContract.contractAddr
        }

        try {
          if (nft.payType === 1) {
            tx = await rentalContract.borrowNFT(nftContract, nft.itemId, {
              from: wallet,
              value: BigInt(nft.price)
            })
          } else {
            tx = await rentalContract.borrowNFT(nftContract, nft.itemId)
          }
          await tx.wait()
          setNfts(
            nfts.filter(_nft => _nft.itemId !== nft.itemId)
          )
          setNft({})
          toast.success('Successfully borrowed.')
          setOpenBorrowModal(false)
          setLoading(false)
        } catch (err: any) {
          setLoading(false)
          toast.error(err.reason)
        }
      }
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>{t('rental.Rental')}</title>
        <meta property='og:title' content={`${t("rental.Rental")}`} />
      </Head>
      <main className={styles.main}>
        <PlayNavMenu />
        <div className='relative'>
          <Image
            src='/images/rental-background.png'
            alt='home'
            width={'0'}
            height={'0'}
            sizes='100vw'
            style={{ width: '100%', height: 'auto' }}
          />
          <div
            className={`${styles.rentalTitleContainer} absolute w-full flex flex-col`}
          >
            <h2
              className={`${saria.className} ${styles.rentalTitle} text-white w-full ml-8 text-left`}
            >
              {t('rental.Rental')}
            </h2>
            <div className={`${styles.line} w-full mt-1`}></div>
            <h6
              className={`${saria.className} ${styles.rentalSubTitle} text-sm lg_2:text-lg tablet:text-2xl text-white tracking-[.2em] mt-2 w-full mr-8 text-right`}
            >
              {t('rental.Earn Together')}
            </h6>
          </div>
        </div>
        <div
          className={`${styles.rentalCards} p5-10 pb-10 mx-4 md:mx-10 flex flex-wrap flex-row justify-evenly`}
        >
          <div
            className={`${styles.searchFilter} flex flex-col justify-end w-full`}
          >
            <div className='flex flex-row justify-end w-full mb-6'>
            <Input placeHolder={"Enter NFT Name/Rarity or ID"} className='mr-2 mobile_lg:mr-4 w-full' maxWidth={'max-w-none mobile_lg:max-w-[250px]'} value={searchValue} handleValue={(e:any) => setSearchValue(e.target.value)} handleSearch={handleSearch}/>
              <Button color={"Normal"} height={"37px"} radius={"Small"} textColor={"White"} fontSize={"15px"} width={"w-[100px]"} onClick={handleSearch} class="mr-2">Search</Button>
            </div>
            {/* <div className='flex flex-col mobile_lg:flex-row justify-between mb-6'>
              <div className='flex flex-col mobile_lg:flex-row'>
                <FilterDropDown
                  title={rentalTypeName == '' ? 'Rental Type' : rentalTypeName}
                  type={rentalType}
                  setFunc={setRentalType}
                  setDropDownName={setRentalTypeName}
                  menu={RentalType}
                  class={'mb-2 mr-2'}
                />
                <FilterDropDown
                  title={
                    collectionTypeName == '' ? 'Collection' : collectionTypeName
                  }
                  type={collectionType}
                  setFunc={setCollectionType}
                  setDropDownName={setCollectionTypeName}
                  menu={Collection}
                  class={'mb-2 mr-2'}
                />
                <FilterDropDown
                  title={rarityTypeName == '' ? 'NFT Rarity' : rarityTypeName}
                  type={rarityType}
                  setFunc={setRarityType}
                  setDropDownName={setRarityTypeName}
                  menu={Rarity}
                  class={'mb-2 mr-2'}
                />
              </div>
              <FilterDropDown
                title={sortByName == '' ? 'Sort By' : sortByName}
                type={sortBy}
                setFunc={setSortBy}
                setDropDownName={setSortByName}
                menu={Sortby}
              />
            </div> */}
          </div>
          <div
            className={`${styles.rentProducts} flex flex-wrap justify-around`}
          >
            {nfts.map((nft, idx) => (
              <RentalCard
                key={idx}
                nftType={nft.nftType}
                itemId={nft.itemId}
                tokenId={nft.tokenId}
                name={nft.name}
                payType={nft.payType}
                price={nft.price}
                image={nft.image}
                rarity={nft.rarity}
                collateralTokenType={nft.collateralTokenType}
                collateralAmount={nft.collateralAmount}
                lender={nft.lender}
                borrower={nft.borrower}
                period={nft.period}
                rentable={nft.rentable}
                rentalStartTime={nft.rentalStartTime}
                rentalEndTime={nft.rentalEndTime}
                handleOpenBorrowModal={handleOpenBorrowModal}
              />
            ))}
          </div>
        </div>
        {openBorrowModal && (
          <NFTBorrow
            nftType={nft.nftType}
            itemId={nft.itemId}
            tokenId={nft.tokenId}
            name={nft.name}
            payType={nft.payType}
            price={nft.price}
            image={nft.image}
            rarity={nft.rarity}
            status={nft.status}
            collateralTokenType={nft.collateralTokenType}
            collateralAmount={nft.collateralAmount}
            wallet={wallet}
            lender={nft.lender}
            borrower={nft.borrower}
            period={nft.period}
            rentable={nft.rentable}
            rentalStartTime={nft.rentalStartTime}
            rentalEndTime={nft.rentalEndTime}
            depositedCollateral={nft.depositedCollateral}
            openBorrowModal={openBorrowModal}
            setOpenBorrowModal={setOpenBorrowModal}
            handleDeposit={handleDeposit}
            handleBorrow={handleBorrow}
          />
        )}
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
