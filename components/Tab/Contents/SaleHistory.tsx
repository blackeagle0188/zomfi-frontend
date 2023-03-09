import React from "react"
import { Do_Hyeon } from '@next/font/google'
import assetsStyle from '@/styles/Assets.module.css'
import DynamicTable from "@/components/Table"
import truncateEthAddress from 'truncate-eth-address';

const TableData=[
    {From:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), To:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), "Buy/Sell":25, DATE:"23:47 08/07/2022", PRICE:"-"},
    {From:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), To:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), "Buy/Sell":26, DATE:"23:47 08/07/2022", PRICE:"-"},
    {From:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), To:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), "Buy/Sell":18, DATE:"23:47 08/07/2022", PRICE:"-"},
    {From:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), To:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), "Buy/Sell":22, DATE: "23:47 08/07/2022", PRICE:"-"},
    {From:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), To:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), "Buy/Sell": 21, DATE: "23:47 08/07/2022", PRICE:"-"},
    {From:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), To:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), "Buy/Sell": 21, DATE: "23:47 08/07/2022", PRICE:"-"},
    {From:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), To:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), "Buy/Sell": 21, DATE: "23:47 08/07/2022", PRICE:"-"},
    {From:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), To:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), "Buy/Sell": 21, DATE: "23:47 08/07/2022", PRICE:"-"},
    {From:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), To:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), "Buy/Sell": 21, DATE: "23:47 08/07/2022", PRICE:"-"},
    {From:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), To:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), "Buy/Sell": 21, DATE: "23:47 08/07/2022", PRICE:"-"},
    {From:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), To:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), "Buy/Sell": 21, DATE: "23:47 08/07/2022", PRICE:"-"},
    {From:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), To:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), "Buy/Sell": 21, DATE: "23:47 08/07/2022", PRICE:"-"},
    {From:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), To:truncateEthAddress("0x64842B9be9C6DE50693FE975E7601346E95274c5"), "Buy/Sell": 21, DATE: "23:47 08/07/2022", PRICE:"-"}
]

export default function SaleHistory() {

    return (
        <div className={`${assetsStyle.tab} text-white text-xs`}>
            <DynamicTable tableData={TableData} />
        </div>
    )
}