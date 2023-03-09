import Dropdown from './Dropdown';
import Link from "next/link";
import styles from '@/styles/NavMenu.module.css'
import { Saira_Extra_Condensed } from '@next/font/google'
import { useState } from 'react';
import { useRouter } from 'next/router';

const saira = Saira_Extra_Condensed({ weight: '400', subsets: ['latin'] })
interface Props {
    items: any;
}

const MenuItems = (props: Props) => {
    const [dropdown, setDropdown] = useState(false);

    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <li className={`${styles.menuItems} relative`}>
            {props.items.submenu ? (
                <>
                    <button
                        type="button"
                        className={`${styles.menuItemBtn} ${saira.className} flex items-center justify-center text-white text-sm sm:text-base lg_2:text-xl text-center cursor-pointer`}
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={() => setDropdown(!dropdown)}
                    >
                        {props.items.title}{' '}
                    </button>
                    <Dropdown submenus={props.items.submenu} dropdown={dropdown} />
                </>
            ) : (
                <Link href={props.items.url} className={`${styles.menuItemBtn} ${saira.className} ${currentRoute == props.items.url ? styles.activeDropdown : ""} flex items-center justify-center text-white text-sm sm:text-base lg_2:text-xl text-center cursor-pointer`}>{props.items.title}</Link>
            )}
        </li>
    );
};

export default MenuItems;