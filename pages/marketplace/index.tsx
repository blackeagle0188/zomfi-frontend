import Head from 'next/head'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Image from 'next/image'
import MarketplaceFilter from '@/components/MarketplaceFilter'
import NFTCard from '@/components/NFTCard/DogNFT'
import MarketplaceModal from '@/components/Modals/MarketplaceModal'
import { Rubik_Wet_Paint, Saira_Extra_Condensed, Do_Hyeon } from '@next/font/google'
import styles from '@/styles/Marketplace.module.css'
import { Sortby } from "@/constants/Filter"
import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import JoinCommunity from '@/components/JoinCommunity'
import Footer from '@/components/Footer'
import useAuth from "@/hooks/useAuth";
import usePetContract from "@/hooks/usePetContract";
import useLandContract from "@/hooks/useLandContract";
import useMarketContract from "@/hooks/useMarketContract"
import axios from "axios";
import { useTranslation } from "next-i18next";

const rubik = Rubik_Wet_Paint({ subsets: ['latin'], weight: "400" })
const saira = Saira_Extra_Condensed({ subsets: ['latin'], weight: "400" })

export default function Marketplace() {
  const { wallet, setLoading, cartItems, updateCartItems } = useAuth();
  const { contract: petContract } = usePetContract(wallet)
  const { contract: landContract } = useLandContract(wallet)
  const { contract: marketContract } = useMarketContract(wallet);
  const { t } = useTranslation("");

  const [openModal, setModalOpen] = useState(false)
  const [openBuyModal, setBuyModalOpen] = useState(false)
  const [activeMethod, setActiveMethod] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [filterName, setFilterName] = useState("")
  const [nftSources, setNftSources] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);
  const [nft, setNft] = useState<any>(null);
  const [activeMarket, setActiveMarket] = useState(0);

  const [sortBy, setSortBy] = useState(0)

  useEffect(() => {
    (async () => {
      if (marketContract) {
        setLoading(true);
        const assets = await marketContract.fetchMarketplaceItems();
        const nfts = [];
        for (let asset of assets) {
          let item = asset.toObject();
          if (activeMarket === 0) {
            if (item.nftContract === petContract.target) {
              const { data } = await axios.get(`/api/pets/${Number(item.tokenId)}`);
              nfts.push({
                nftType: "Dog",
                itemId: Number(item.itemId),
                owner: item.owner,
                seller: item.seller,
                payType: Number(item.payType),
                price: (Number(item.price) / Math.pow(10, 18)).toFixed(3),
                sold: item.sold,
                ...data.data
              });
            } 
          } else if (activeMarket === 1) {
            if (item.nftContract === landContract.target) {
              const { data } = await axios.get(`/api/lands/${Number(item.tokenId)}`);
              nfts.push({
                nftType: "Land",
                itemId: Number(item.itemId),
                owner: item.owner,
                seller: item.seller,
                payType: Number(item.payType),
                price: (Number(item.price) / Math.pow(10, 18)).toFixed(3),
                sold: item.sold,
                ...data.data
              })
            }
          }
        }
        setNftSources(nfts);
        setNfts(nfts)
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    })();
  }, [marketContract, activeMarket])

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

  const handleModal = (id:any) => {
    setNft(nfts.find(nft => nft._id === id));
    setModalOpen(true)
  }

  const handleFilterName = (e: any) => {
    setSearchValue(e.target.value);
  }

  const handlePurchase = (id:any) => {
    setNfts(nfts.filter(nft => nft._id !== id));
    updateCartItems(cartItems.filter(cartItem => cartItem.id !== id));
    setModalOpen(false);
  }

  return (
    <>
      <Head>
        <title>{t("marketplace.Marketplace")}</title>
        <meta property="og:title" content={`${t("marketplace.Marketplace")}`} />
      </Head>
      <main className={styles.main}>
        {
          openModal && (
            <MarketplaceModal 
              id={nft._id}
              itemId={nft.itemId}
              tokenId={nft.tokenId}
              nftType={nft.nftType}
              name={nft.name}
              rarity={nft.rarity}
              payType={nft.payType}
              price={nft.price}
              image={nft.image}
              seller={nft.seller}
              sold={nft.sold}
              openModal={openModal} 
              setModalOpen={setModalOpen}
              handlePurchase={handlePurchase}
            />
          )
        }
        {/* <BuyModal openModal={openBuyModal} setModalOpen={setBuyModalOpen}>
          <h6 className={`${do_hyeon.className} text-xl text-center text-white mb-6`}>Select currency what you want to by the NFT with.</h6>
          <PaymentMethod active={activeMethod} type={0} price={40} setActiveMethod={setActiveMethod} />
          <PaymentMethod active={activeMethod} type={1} price={40} setActiveMethod={setActiveMethod} />
          <PaymentMethod active={activeMethod} type={2} price={40} setActiveMethod={setActiveMethod} />
          <div className='mt-6 flex items-center justify-center'>
            <Button color={"Normal"} height={"48px"} radius={"Small"} textColor={"White"} fontSize={"25px"} width={"w-[215px]"} font={rubik} onClick={handleBuy}>Buy Now</Button>
          </div>
        </BuyModal> */}
        <div className={`${styles.container} px-4 mobile_lg:px-10 tablet:px-20`}>
          <div className={`${styles.topTitle} flex flex-col items-center justify-center`}>
            <h2 className={`${styles.title} ${rubik.className} text-center`}>{t("marketplace.Marketplace Welcome")}</h2>
            <h6 className={`${styles.subTitle} ${saira.className} text-white tracking-[.2em] text-xs sm:text-base lg_2:text-2xl text-center`}>{t("marketplace.Description")}</h6>
          </div>
          <div className={`${styles.marketTab} mb-4 flex flex-row justify-center lg_2:justify-start`}>
            <div className={`${activeMarket == 0 ? styles.activeMarket : ""} flex flex-row items-center justify-center cursor-pointer`} onClick={() => setActiveMarket(0)}>
              <Image src={`/images/dog-${activeMarket == 0 ? "selected" : "normal"}.png`} className={`mr-0 mobile_lg:mr-2`} alt="dog" width={"0"} height={"0"} sizes="100%" style={{ width: '40px', height: 'auto' }} />
              <h6 className={`${saira.className} text-white ml-2 text-lg sm:text-2xl`}>{t("marketplace.Dog NFT")}</h6>
            </div>
            <div className={`${activeMarket == 1 ? styles.activeMarket : ""} flex flex-row items-center justify-center cursor-pointer`} onClick={() => setActiveMarket(1)}>
              <Image src={`/images/land-${activeMarket == 1 ? "selected" : "normal"}.png`} className={`mr-0 mobile_lg:mr-2`} alt="dog" width={"0"} height={"0"} sizes="100%" style={{ width: '40px', height: 'auto' }} />
              <h6 className={`${saira.className} text-white ml-2 text-lg sm:text-2xl`}>{t("marketplace.Land NFT")}</h6>
            </div>
          </div>
          <div className={`${styles.action} flex flex-row justify-between items-center pt-6`}>
            <div className={`${styles.search} flex flex-row w-full`}>
              <Input placeHolder={"Enter NFT Name/Rarity or ID"} className='mr-2 mobile_lg:mr-4 w-full' maxWidth={'max-w-none mobile_lg:max-w-[250px]'} value={searchValue} handleValue={handleFilterName} handleSearch={handleSearch}/>
              <Button color={"Normal"} height={"37px"} radius={"Small"} textColor={"White"} fontSize={"15px"} width={"w-[100px]"} onClick={handleSearch} class="mr-2">Search</Button>
            </div>
            {/* <FilterDropDown title={filterName == "" ? "Sort By" : filterName} type={sortBy} setFunc={setSortBy} setDropDownName={setFilterName} menu={Sortby} /> */}
          </div>
          <div className={`${styles.marketplace} py-2 mobile_lg:py-8`}>
            {/* <div className={`${styles.filter}`}>
              <div className='pr-0 lg_2:pr-20 block lg_2:hidden'>
                <Accordion><MarketplaceFilter /></Accordion>
              </div>
              <div className='pr-0 lg_2:pr-20 hidden lg_2:block'>
                <MarketplaceFilter />
              </div>
            </div> */}
            <div className={`${styles.products} flex flex-wrap items-start justify-around`}>
              {nfts.map((nft, idx) => (
                <NFTCard 
                  key={idx} 
                  id={nft._id}
                  itemId={nft.itemId}
                  tokenId={nft.tokenId}
                  nftType={nft.nftType}
                  name={nft.name}
                  rarity={nft.rarity}
                  payType={nft.payType}
                  price={nft.price}
                  image={nft.image}
                  sold={nft.sold}
                  handleModal={handleModal}
                />
              ))}
            </div>
          </div>
        </div>
        <JoinCommunity />
        <Footer />
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
    ])),
  },
})