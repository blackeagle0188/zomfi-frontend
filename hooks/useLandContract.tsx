import { useEffect, useState } from "react"
import { BrowserProvider, Contract } from 'ethers'
import CHAIN_CONFIG from '@/constants/CHAIN_CONFIG'
import {LAND_CONTRACT_ABI as ABI} from '@/constants/ABI'
import { toast } from 'react-toastify'
import { defaultCommonPrices, defaultLegendPrices, defaultRarePrices, defaultMythicalPrices } from "@/constants/PRICES"

export default function useLandContract(wallet: any) {
  let [contract, setContract] = useState<any>(null)

  const [commonPrices, setCommonPrices] = useState<any[]>(defaultCommonPrices)
  const [legendPrices, setLegendPrices] = useState<any[]>(defaultLegendPrices)
  const [rarePrices, setRarePrices] = useState<any[]>(defaultRarePrices)
  const [mythicalPrices, setMythicalPrices] = useState<any[]>(defaultMythicalPrices)

  let [commonTokenIdCnt, setCommonTokenIdCnt] = useState<bigint>(BigInt(0))
  let [legendTokenIdCnt, setLegendTokenIdCnt] = useState<bigint>(BigInt(0))
  let [rareTokenIdCnt, setRareTokenIdCnt] = useState<bigint>(BigInt(0))
  let [mythicalTokenIdCnt, setMythicalTokenIdCnt] = useState<bigint>(BigInt(0))

  let [maxCommon, setMaxCommon] = useState<bigint>(BigInt(0))
  let [maxLegend, setMaxLegend] = useState<bigint>(BigInt(0))
  let [maxRare, setMaxRare] = useState<bigint>(BigInt(0))
  let [maxMythical, setMaxMythical] = useState<bigint>(BigInt(0))

  useEffect(() => {
    ; (async () => {
      if (wallet) {
        try {
          let provider = new BrowserProvider(window.ethereum)
          let signer = await provider.getSigner()
          let contract = new Contract(CHAIN_CONFIG.landContract.contractAddr, ABI, signer)
          setContract(contract)
          let prices = await contract.prices()
          prices = prices.toObject()
          setCommonPrices([
            {
              currency: 'BNB',
              price: prices.commonPriceBNB
            },
            {
              currency: 'USDT',
              price: prices.commonPriceUSDT
            },
            {
              currency: 'BUSD',
              price: prices.commonPriceBUSD
            },
            {
              currency: 'ZOMFI',
              price: prices.commonPriceZOMFI
            }
          ])
          setLegendPrices([
            {
              currency: 'BNB',
              price: prices.legendPriceBNB
            },
            {
              currency: 'USDT',
              price: prices.legendPriceUSDT
            },
            {
              currency: 'BUSD',
              price: prices.legendPriceBUSD
            },
            {
              currency: 'ZOMFI',
              price: prices.legendPriceZOMFI
            }
          ])
          setRarePrices([
            {
              currency: 'BNB',
              price: prices.rarePriceBNB
            },
            {
              currency: 'USDT',
              price: prices.rarePriceUSDT
            },
            {
              currency: 'BUSD',
              price: prices.rarePriceBUSD
            },
            {
              currency: 'ZOMFI',
              price: prices.rarePriceZOMFI
            }
          ])
          setMythicalPrices([
            {
              currency: 'BNB',
              price: BigInt(0)
            },
            {
              currency: 'USDT',
              price: BigInt(0)
            },
            {
              currency: 'BUSD',
              price: BigInt(0)
            },
            {
              currency: 'ZOMFI',
              price: BigInt(0)
            }
          ])
          let commonTokenIdCnt = await contract._commonTokenIdCounter()
          setCommonTokenIdCnt(commonTokenIdCnt)
          let maxCommon = await contract.MAX_COMMON()
          setMaxCommon(maxCommon)
          let rareTokenIdCnt = await contract._rareTokenIdCounter()
          setRareTokenIdCnt(rareTokenIdCnt)
          let maxRare = await contract.MAX_RARE()
          setMaxRare(maxRare)
          let legendTokenIdCnt = await contract._legendTokenIdCounter()
          setLegendTokenIdCnt(legendTokenIdCnt)
          let maxLegend = await contract.MAX_LEGEND()
          setMaxLegend(maxLegend)
          let mythicalTokenIdCnt = await contract._mythicalTokenIdCounter()
          setMythicalTokenIdCnt(mythicalTokenIdCnt)
          let maxMythical = await contract.MAX_MYTHICAL()
          setMaxMythical(maxMythical)
        } catch (err: any) {
          toast.error(err.reason)
        }
      } else {
      }
    })()
  }, [wallet]);

  return {
    contract,
    commonPrices,
    legendPrices,
    rarePrices,
    mythicalPrices,
    commonTokenIdCnt,
    legendTokenIdCnt,
    rareTokenIdCnt,
    mythicalTokenIdCnt,
    setCommonTokenIdCnt,
    setRareTokenIdCnt,
    setLegendTokenIdCnt,
    setMythicalTokenIdCnt,
    maxCommon,
    maxLegend,
    maxRare,
    maxMythical
  };
}
