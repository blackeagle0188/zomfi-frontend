import MenuItems from './MenuItems';
import styles from '@/styles/NavMenu.module.css'

export const menuItems = [
  {
    title: 'Mint',
    url: '#',
    submenu: [
      {
        title: 'Dog',
        url: '/play/dog',
      },
      {
        title: 'Land',
        url: '/play/land',
      }
    ]
  },
  {
    title: 'Rental',
    url: '/play/rental',
  },
  {
    title: 'Leaderboard',
    url: '/play/leaderboard',
  }
];

export function PlayNavMenu() {
  return (
    <nav className={`${styles.navMenuContainer} relative z-[1]`}>
      <ul className={`${styles.menus} flex items-center flex-wrap	list-none`}>
        {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
      </ul>
    </nav>
  );
}
