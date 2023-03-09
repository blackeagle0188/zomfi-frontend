import Link from 'next/link'
import Notice from '../Notice'
import { Russo_One } from '@next/font/google'
import styles from '@/styles/Profile.module.css'
import useAuth from "@/hooks/useAuth";

const russo_one = Russo_One({ weight: '400', subsets: ['latin'] })

export default function ProfileModal() {
  const { logout } = useAuth()

  return (
    <div className={`${styles.profileContainer} `}>
      <div className={`${styles.profileWrapper} flex flex-col`}>
        <div className='my-2.5'><Link href="/" className={`${russo_one.className} text-white hover:underline text-sm md:text-base`}>Profile</Link></div>
        <div className='my-2.5 flex flex-row items-center justify-between'><Link href="/" className={`${russo_one.className} text-white hover:underline mr-10 text-sm md:text-base`}>Staking</Link><Notice>NEW</Notice></div>
        <div className='my-2.5'><Link href="/" className={`${russo_one.className} text-white hover:underline text-sm md:text-base`}>Bridge</Link></div>
        <div className='my-2.5 flex flex-row items-center justify-between'><Link href="/" className={`${russo_one.className} text-white hover:underline mr-10 text-sm md:text-base`}>Migration</Link><Notice>NEW</Notice></div>
        <div className='my-2.5'><Link href="/" className={`${russo_one.className} text-white hover:underline text-sm md:text-base`}>Referral</Link></div>
        <div className='my-2.5'><Link href="/" className={`${russo_one.className} text-white hover:underline text-sm md:text-base`}>Claims</Link></div>
        <div className='my-2.5 flex flex-row items-center justify-between'><Link href="/" className={`${russo_one.className} text-white hover:underline mr-10 text-sm md:text-base`}>Settings</Link><Notice>NEW</Notice></div>
        <div className='my-2.5'><span className={`${russo_one.className} ${styles.logout} text-white hover:underline cursor-pointer text-sm md:text-base`} onClick={logout}>Log Out</span></div>
      </div>
    </div>
  )
}
