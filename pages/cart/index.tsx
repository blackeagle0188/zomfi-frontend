import { ICartItem } from '@/type'
import Head from 'next/head'
import Image from 'next/image'
import { Rubik_Wet_Paint, Saira_Extra_Condensed, Do_Hyeon } from '@next/font/google'
import TotalCart from '@/components/Cart/TotalCart'
import styles from '@/styles/Cart.module.css'
import { useState } from 'react'
import { useTranslation } from "next-i18next";
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import JoinCommunity from '@/components/JoinCommunity'
import Footer from '@/components/Footer'
import CartItem from '@/components/Cart/CartItem'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import BuyModal from '@/components/Modals/BuyModal'
import useAuth from "@/hooks/useAuth";

const rubik = Rubik_Wet_Paint({ weight: '400', subsets: ['latin'] })
const saria = Saira_Extra_Condensed({ weight: '400', subsets: ['latin'] })
const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })

export default function Cart() {
  const { t } = useTranslation("");
  const { cartItems, updateCartItems } = useAuth();
  const router = useRouter()

  const [activeId, setActiveId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const handleGoMarket = () => {
    router.push('/marketplace')
  }

  const handleDeleteCartItem = () => {
    updateCartItems(cartItems.filter((cartItem:ICartItem) => cartItem.id !== activeId));
    setOpenDeleteModal(false)
  }

  const closeDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  return (
    <>
      <Head>
        <title> {t("cart.Cart")}</title>
        <meta property="og:title" content={`${t("cart.Cart")}`} />
      </Head>
      <main className={styles.main}>
        <BuyModal openModal={openDeleteModal} setModalOpen={setOpenDeleteModal}>
          <h6 className={`${do_hyeon.className} text-sm lg_2:text-lg tablet:text-2xl text-white`}>{t("cart.Confirm Delete")}</h6>
          <div className='flex flex-row items-center justify-between'>
            <Button color={"Normal"} height={"Normal"} radius={"Small"} textColor={"White"} fontSize={"20px"} width={"w-[150px]"} class={"mt-8"} onClick={handleDeleteCartItem}>{t("cart.Delete")}</Button>
            <Button color={"Normal"} height={"Normal"} radius={"Small"} textColor={"White"} fontSize={"20px"} width={"w-[150px]"} class={"mt-8"} onClick={closeDeleteModal}>{t("cart.Cancel")}</Button>
          </div>
        </BuyModal>
        <div className='px-8 desktop:px-20 py-16'>
          <h2 className={`${rubik.className} ${styles.title} text-left`}>
            {t("cart.Title")}
          </h2>
          {
            cartItems.length > 0 ? (
              <>
                <h6 className={`${saria.className} text-left text-xl text-white tracking-[.2em] mt-6`}>
                  {t("cart.ETHEREUM NETWORK")}(3)
                </h6>
                <div className={`${styles.shoping}`}>
                  <div className={`${styles.cartItmes} mr-0 mb-12 desktop:mr-12`}>
                    {
                      cartItems.map((item: any, index: number) => (
                        <CartItem 
                          id={item.id}
                          itemId={item.itemId}
                          tokenId={item.tokenId}
                          nftType={item.nftType}
                          name={item.name}
                          rarity={item.rarity}
                          payType={item.payType}
                          price={item.price}
                          image={item.image}
                          sold={item.sold}
                          setActiveId={setActiveId}
                          setOpenDeleteModal={setOpenDeleteModal} 
                          key={index} 
                        />
                      ))
                    }
                  </div>
                  <div className='flex flex-col items-center'>
                    <TotalCart />
                  </div>
                </div>
              </>
            )
              : (
                <div className='flex flex-col items-center justify-center my-6'>
                  <Image src={`/images/cart.png`} alt="zomfi" width="0" height="0" sizes='100%' style={{ width: "100%", maxWidth: "270px" }} className='m-4' />
                  <h6 className={`${saria.className} text-left text-xl text-white tracking-[.2em] mt-6`}>
                    {t("cart.No Cart Item")}
                  </h6>
                  <Button color={"Normal"} height={"Normal"} radius={"Small"} textColor={"White"} fontSize={"20px"} width={"w-[205px]"} class={"mt-8"} onClick={handleGoMarket}>{t("cart.Go To Market")}</Button>
                </div>)
          }

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