import { useEffect, useState } from "react"
import { BrowserProvider, Contract } from 'ethers'
import CHAIN_CONFIG from '@/constants/CHAIN_CONFIG'
import { MARKET_CONTRACT_ABI as ABI} from '@/constants/ABI'
import { toast } from 'react-toastify'

export default function usePetContract(wallet: any) {
  let [contract, setContract] = useState<any>(null)

  useEffect(() => {
    ; (async () => {
      if (wallet) {
        try {
          let provider = new BrowserProvider(window.ethereum)
          let signer = await provider.getSigner()
          let contract = new Contract(CHAIN_CONFIG.marketContract.contractAddr, ABI, signer)
          setContract(contract)
        } catch (err: any) {
          toast.error(err.reason)
        }
      } else {
      }
    })()
  }, [wallet]);

  return {
    contract
  };
}
