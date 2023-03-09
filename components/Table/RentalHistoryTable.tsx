import assetsStyle from '@/styles/Assets.module.css'
import { useState } from 'react';
import TableHeaderDropDown from '../DropDown/TableHeaderDropDown';

interface Props {
    tableData: Array<Object>
}

const tableHeader = [
    [
        "All",
        "Lend",
        "Borrow"
    ],
    'NFT NAME',
    [
        "All",
        "Dog",
        "Land"
    ],
    [
        "All",
        "Common",
        "Rare",
        "Legendary",
        "Mythical"
    ],
    [
        "All",
        "Fee",
        "Direct Rent",
        "Profit Share"
    ],
    "FEE/REWARD",
    "STARTED IN",
    "ENDED IN"
];

function RentalHistoryTable(props: Props) {
    const { tableData } = props

    const [tradeType, setTradeType] = useState(0)
    const [tradeName, setTradeName] = useState("")

    const [collectionType, setCollectionType] = useState(0)
    const [collectionName, setCollectionName] = useState("")

    const [rarityType, setRarityType] = useState(0)
    const [rarityName, setRarityName] = useState("")

    const [modeType, setModeType] = useState(0)
    const [modeName, setModeName] = useState("")

    const column = Object.keys(tableData[0]);

    const ThData = () => {
        return (
            <>
                <th className={`${assetsStyle.tableHeader} text-center uppercase`}>
                    <TableHeaderDropDown title={tradeName == "" ? "All" : tradeName} type={tradeType} setFunc={setTradeType} setDropDownName={setTradeName} menu={tableHeader[0] as Array<string>} />
                </th>
                <th className={`${assetsStyle.tableHeader} text-center uppercase`}>{tableHeader[1]}</th>
                <th className={`${assetsStyle.tableHeader} text-center uppercase`}>
                    <TableHeaderDropDown title={collectionName == "" ? "All" : collectionName} type={collectionType} setFunc={setCollectionType} setDropDownName={setCollectionName} menu={tableHeader[2] as Array<string>} />
                </th>
                <th className={`${assetsStyle.tableHeader} text-center uppercase`}>
                    <TableHeaderDropDown title={rarityName == "" ? "All" : rarityName} type={rarityType} setFunc={setRarityType} setDropDownName={setRarityName} menu={tableHeader[3] as Array<string>} />
                </th>
                <th className={`${assetsStyle.tableHeader} text-center uppercase`}>
                    <TableHeaderDropDown title={modeName == "" ? "All" : modeName} type={modeType} setFunc={setModeType} setDropDownName={setModeName} menu={tableHeader[4] as Array<string>} />
                </th>
                <th className={`${assetsStyle.tableHeader} text-center uppercase`}>{tableHeader[5]}</th>
                <th className={`${assetsStyle.tableHeader} text-center uppercase`}>{tableHeader[6]}</th>
                <th className={`${assetsStyle.tableHeader} text-center uppercase`}>{tableHeader[7]}</th>
            </>
        )
    }

    const tdData = () => {

        return tableData.map((data: any, index: number) => {
            return (
                <tr className={`${assetsStyle.tableRow} py-4`} key={index}>
                    {
                        column.map((v: string, index: number) => {
                            return <td className={`text-center`} key={index}>{data[v]}</td>
                        })
                    }
                </tr>
            )
        })
    }
    return (
        <table className={`${assetsStyle.tableContainer} w-full text-xl`}>
            <thead>
                <tr className={`${assetsStyle.tableHeaderWrapper}`}>{ThData()}</tr>
            </thead>
            <tbody>
                {tdData()}
            </tbody>
        </table>
    )
}
export default RentalHistoryTable;