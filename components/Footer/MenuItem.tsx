import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Saira_Extra_Condensed } from '@next/font/google'

const saira = Saira_Extra_Condensed({ weight: '400', subsets: ['latin'] })
interface Props {
    items: any;
}

interface Item {
    title: string,
    url: string
}

const MenuItems = (props: Props) => {
    const { t } = useTranslation("");
    return (
        <>
            {props.items.map((item: Item, index: Number) => (
                <div className='flex flex-col' key={index.toString()}>
                    <Link href="/" className={`${saira.className} my-1 hover:underline`}>{t(`footer.${item.title}`)}</Link>
                </div>
                ))
            }
        </>
    );
};

export default MenuItems;