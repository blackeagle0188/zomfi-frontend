import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import TooltipModal from '../TooltipModal'
import Balance from '../Balance'
import ProfileModal from '../Profile'
import Language from '../Language'
import { Russo_One, Hind } from '@next/font/google'
import styles from '@/styles/Header.module.css'
import { useEffect, useRef, useState } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'
import CHAIN_CONFIG from '@/constants/CHAIN_CONFIG'
import { toast } from 'react-toastify'
import useAuth from '@/hooks/useAuth'
import { BrowserProvider } from 'ethers'
import { Divide as Hamburger } from 'hamburger-react'
import { useRouter } from 'next/router'
import { useTranslation } from "next-i18next";

const russo_one = Russo_One({ weight: '400', subsets: ['latin'] })
const hind = Hind({ weight: '400', subsets: ['latin'] })

interface Props {
  setIsOpen: Function
  isOpen: boolean
}

export default function Header(props: Props) {
  const { t } = useTranslation("");

  const { setIsOpen, isOpen } = props

  const router = useRouter()

  const { wallet, updateWallet, cartItems } = useAuth()

  const [provider, setProvider] = useState<any>(null)

  const userModalRef = useRef(null)
  const balanceModalRef = useRef(null)
  const langModalRef = useRef(null)

  const [userModal, setUserModal] = useState(false)
  const [balanceModal, setBalanceModal] = useState(false)
  const [langModal, setLangModal] = useState<boolean>(false)
  const userModalOutside = useOutsideClick({ ref: userModalRef })
  const balanceModalOutside = useOutsideClick({ ref: balanceModalRef })
  const langModalOutside = useOutsideClick({ ref: langModalRef })

  useEffect(() => {
    ;(async () => {
      if (window.ethereum) {
        try {
          if (!!window && window.ethereum === null) {
            toast.error('Please install MetaMask.')
          } else {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: CHAIN_CONFIG.chainId }]
            })
          }
        } catch (err: any) {
          if (err.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [CHAIN_CONFIG]
              })
            } catch (err: any) {
              toast.error('Error adding chain: ' + err)
            }
          }
        }

        let provider = new BrowserProvider(window.ethereum)
        setProvider(provider)
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          updateWallet(accounts[0])
        })
      }
    })()
  }, [])

  useEffect(() => {
    if (!userModalOutside) {
      return
    }
    setUserModal(!userModalOutside)
  }, [userModalOutside])

  useEffect(() => {
    if (!balanceModalOutside) {
      return
    }
    setBalanceModal(!balanceModalOutside)
  }, [balanceModalOutside])

  useEffect(() => {
    if (!langModalOutside) {
      return
    }
    setLangModal(!langModalOutside)
  }, [langModalOutside])

  const showUserModal = () => {
    setUserModal(!userModal)
  }

  const showBalanceModal = () => {
    setBalanceModal(!balanceModal)
  }

  const showLangModal = () => {
    setLangModal(!langModal)
  }

  const connectWallet = async () => {
    try {
      if (wallet !== null) return
      let signer = await provider.getSigner()
      updateWallet(signer.address)
    } catch (err:any) {
      toast.error(err.reason);
    }
  }

  return (
    <div className={`${styles.headerContainer} h-full`}>
      <div
        className={`${styles.logoContainer} flex items-center justify-center pr-10 h-full`}
      >
        <div
          className={`${styles.logo} flex flex-row items-center justift-between h-full`}
        >
          <div className={`${styles.hamburger} flex h-full block sm:hidden`}>
            <Hamburger
              direction='right'
              color='#ffffff'
              size={20}
              toggled={isOpen}
              onToggle={toggled => {
                if (toggled) {
                  setIsOpen(true)
                } else {
                  setIsOpen(false)
                }
              }}
            />
          </div>
          <Link href='/'>
            <Image
              className={`${styles.logoImage}`}
              src='/images/logo_ 2.png'
              alt='logo'
              width='0'
              height='0'
              sizes='100%'
            />
          </Link>
        </div>
      </div>
      <div className={`relative flex`}>
        <div
          className={`${styles.menuBackground} absolute h-full w-full right-0`}
        ></div>
        <div
          className={`${styles.menuWrapper} flex items-center justify-between relative w-full h-full`}
        >
          {wallet !== null && [
            <div key={1} className={`relative mx-1`} ref={userModalRef}>
              <Image
                src='/images/user.png'
                className={`${styles.userImage} cursor-pointer rounded-full`}
                alt='user'
                width='35'
                height='35'
                onClick={() => showUserModal()}
              />
              <div className={`${styles.userModal} absolute z-50`}>
                <TooltipModal active={userModal}>
                  <ProfileModal />
                </TooltipModal>
              </div>
            </div>,
            <div key={2} className={`relative mx-1`} ref={balanceModalRef}>
              <Image
                className={`${styles.blanace} cursor-pointer`}
                src='/images/currency.png'
                alt='balance'
                width='35'
                height='35'
                onClick={() => showBalanceModal()}
              />
              <div className={`${styles.balanceModal} absolute z-50`}>
                <TooltipModal
                  active={balanceModal}
                  className={styles.mobileBalance}
                >
                  <h5
                    className={`${hind.className} text-white text-xl whitespace-nowrap text-center`}
                  >
                    {t("header.Total Balance")}
                  </h5>
                  <Balance />
                </TooltipModal>
              </div>
            </div>
          ]}
          <div
            className={`${styles.langContainer} flex items-center cursor-pointer relative mx-1`}
            ref={langModalRef}
            onClick={() => showLangModal()}
          >
            <Icon
              className={styles.worldIcon}
              icon='mdi:world-wide-web'
              color='white'
              width='25'
            />
            <h6
              className={`${styles.language} ${russo_one.className} text-white ml-2 uppercase`}
            >
              {router.locale}
            </h6>
            <div className={`${styles.langModal} absolute z-50`}>
              <TooltipModal active={langModal} className={styles.mobileLang}>
                <Language />
              </TooltipModal>
            </div>
          </div>
          {wallet === null && (
            <div
              className={`${styles.connectBtn} flex items-center justify-evenly cursor-pointer text-xs mobile_lg:text-sm md:text-base`}
              onClick={connectWallet}
            >
              <h6 className={`${russo_one.className} text-white`}>{t("header.Sign In")}</h6>
            </div>
          )}
          <div
            className={`${styles.appContainer} items-center justify-evenly cursor-pointer hidden lg_2:flex mx-1`}
          >
            <Icon icon='ion:logo-windows' color='white' width='19' />
            <Icon icon='ion:logo-apple' color='white' width='22' />
            <h6
              className={`${styles.appText} ${russo_one.className} text-white`}
            >
              {t("header.Download alpha")}
            </h6>
          </div>
          {wallet !== null && (
            <div className={`relative mx-1`}>
              <Link href='/cart' className='relative'>
                <Icon
                  className={styles.cartIcon}
                  icon='material-symbols:shopping-cart'
                  color='white'
                  width='30'
                />
                {cartItems.length > 0 && (
                  <span className='absolute top-[-5px] right-[-10px] inline-block whitespace-nowrap rounded-full bg-[#e74c3c] text-[white] px-[0.5em] pt-[0.2em] pb-[0.25em] text-center align-baseline text-[1.0em] font-bold leading-none'>
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
