import { ICartItem } from '@/type'
import { createContext, useEffect, useState, ReactNode } from 'react'

interface IProvider {
  loading: boolean
  wallet: string | null
  cartItems: ICartItem[];
  updateCartItems: (items: any[]) => void
  setLoading: (state: boolean) => void
  updateWallet: (wallet: string) => void
  logout: () => void
}

const defaultProvider: IProvider = {
  loading: false,
  wallet: null,
  cartItems: [],
  updateCartItems: items => null,
  setLoading: loading => null,
  updateWallet: wallet => null,
  logout: () => null
}

const AuthContext = createContext(defaultProvider)

interface Props {
  children: ReactNode
}

const AuthProvider = (props: Props) => {
  const { children } = props
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [wallet, setWallet] = useState(defaultProvider.wallet)
  const [cartItems, setCartItems] = useState<any[]>([])

  useEffect(() => {
    if (localStorage.getItem('wallet')) {
      let wallet = window.localStorage.getItem('wallet')
      setWallet(wallet)
    }
    if (localStorage.getItem('cartItems')) {
      let cardItems = JSON.parse(localStorage.getItem('cartItems') ?? '')
      setCartItems(cardItems)
    }
  }, [])

  const updateWallet = (wallet: string) => {
    localStorage.setItem('wallet', wallet)
    setWallet(wallet)
  }

  const updateCartItems = (items: any[]) => {
    localStorage.setItem('cartItems', JSON.stringify(items))
    setCartItems(items)
  }
  const logout = () => {
    window.localStorage.removeItem('wallet')
    setWallet(null)
  }

  const values = {
    loading,
    wallet,
    cartItems,
    updateCartItems,
    setLoading,
    updateWallet,
    logout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
