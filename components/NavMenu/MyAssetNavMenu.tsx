import MenuItems from './MenuItems';
import styles from '@/styles/NavMenu.module.css'

export const menuItems = [
  {
    title: 'MY NFTS',
    url: '/assets',
  },
  {
    title: 'Rent History',
    url: '/assets/rent',
  },
  {
    title: 'Buy/Sell History',
    url: '/assets/trade',
  }
];

export function MyAssetNavMenu() {
  return (
    <nav className={`${styles.navMenuContainer}`}>
      <ul className={`${styles.menus} flex items-center flex-wrap	list-none`}>
        {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
      </ul>
    </nav>
  );
}
