import React from "react"
import { Do_Hyeon } from '@next/font/google'
import assetsStyle from '@/styles/Assets.module.css'

const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })
interface Props {
    nftType: string
    name: string
    tokenId: number
    rarity: string
    children?: React.ReactNode
}

export default function NFTProperties(props: Props) {
    const { nftType, name, tokenId, rarity, children } = props;

    return (
        <div className={`${assetsStyle.tab}`}>
            <div className='flex flex-col pl-2 md:pl-10 py-4 sm:py-10'>
                <h6 className={`${do_hyeon.className} ${assetsStyle.nftInfo} text-sm lg_2:text-lg tablet:text-2xl`}>NFT ID : <span className='text-white'>{nftType}#{tokenId}</span></h6>
                <h6 className={`${do_hyeon.className} ${assetsStyle.nftInfo} text-sm lg_2:text-lg tablet:text-2xl my-2`}>NFT Name : <span className='text-white'>{name}</span></h6>
                <h6 className={`${do_hyeon.className} ${assetsStyle.nftInfo} text-sm lg_2:text-lg tablet:text-2xl mb-2 capitalize`}>Rarity : <span className='text-white'>{rarity}</span></h6>
                <h6 className={`${do_hyeon.className} ${assetsStyle.nftInfo} text-sm lg_2:text-lg tablet:text-2xl`}>About Collection : <span className='text-white'>This is Dogs collection</span></h6>
            </div>
        </div>
    )
}