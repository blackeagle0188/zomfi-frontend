import Link from "next/link";
import { useRouter } from 'next/router';
import { Saira_Extra_Condensed } from '@next/font/google'
import styles from '@/styles/NavMenu.module.css'

const saira = Saira_Extra_Condensed({ weight: '400', subsets: ['latin'] })
interface Props {
    submenus: any;
    dropdown : boolean;
}

const Dropdown = (props: Props) => {
    const router = useRouter();
    const currentRoute = router.pathname

    return (
        <ul className={`${styles.dropdown} ${props.dropdown ? styles.show : ""} absolute right-0 left-auto z-50	list-none`}>
            {props.submenus.map((submenu: any, index: Number) => (
                <li key={index.toString()} className={`${styles.menuItems} relative`}>
                    <Link className={`${styles.dropdownItemLink} ${styles.dropItemBtn} ${saira.className} ${currentRoute == submenu.url ? styles.activeDropdown : ""} flex items-center justify-center block no-underline text-center text-white text-xl cursor-pointer`} href={submenu.url}>{submenu.title}</Link>
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;