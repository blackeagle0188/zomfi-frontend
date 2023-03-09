import assetsStyle from '@/styles/Assets.module.css'

interface Props {
    tableData: Array<Object>
}

function DynamicTable(props: Props) {
    const { tableData } = props

    const column = Object.keys(tableData[0]);
    const ThData = () => {

        return column.map((data, index:number) => {
            return <th className={`${assetsStyle.tableHeader} text-center`} key={index}>{data}</th>
        })
    }

    const tdData = () => {

        return tableData.map((data: any, index: number) => {
            return (
                <tr className={`${assetsStyle.tableRow} py-4`} key={index}>
                    {
                        column.map((v: any, index: number) => {
                            return <td className={`text-center`} key={index}>{data[v]}</td>
                        })
                    }
                </tr>
            )
        })
    }
    return (
        <table className="w-full">
            <thead>
                <tr>{ThData()}</tr>
            </thead>
            <tbody>
                {tdData()}
            </tbody>
        </table>
    )
}
export default DynamicTable;