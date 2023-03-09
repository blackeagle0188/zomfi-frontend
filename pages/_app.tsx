import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '@/components/Header'
import SideMenu from '@/components/SideMenu'
import { ToastContainer } from "react-toastify"
import { AuthProvider } from '@/contexts/AuthContext'
import Spinner from "@/components/Spinner";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react'
import { appWithTranslation } from 'next-i18next'

declare global {
  interface Window {
    ethereum: any
  }
}

function App({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMobileMenuOpen = (e: boolean) => setIsOpen(e);

  return (
    <div className='mainContainer h-screen'>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name="description" content="Zomfi is an action, shooter game. Players will be able to roam through a zombie apocalypse, where they must collect gear and fight off zombies." />
        <meta property="og:description" content="Zomfi is an action, shooter game. Players will be able to roam through a zombie apocalypse, where they must collect gear and fight off zombies."/>
        <meta property="og:url" content="https://blockchain-dev-seven.vercel.app/"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="%PUBLIC_URL%/logo.png" />
      </Head>
      <AuthProvider>
        <Header setIsOpen={handleMobileMenuOpen} isOpen={isOpen} />
        <div className='mainWrapper'>
          <SideMenu setIsOpen={handleMobileMenuOpen} isOpen={isOpen} />
          <div className='overflow-auto'>
            <div className='mainContent'>
              <Component {...pageProps} />
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Spinner />
      </AuthProvider>
    </div>
  )
}

export default appWithTranslation(App)
