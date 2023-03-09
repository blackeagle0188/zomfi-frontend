import Head from 'next/head'
import Image from 'next/image'
import { Saira_Extra_Condensed, Julius_Sans_One, Jura } from '@next/font/google'
import styles from '@/styles/About.module.css'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import JoinCommunity from '@/components/JoinCommunity'
import Footer from '@/components/Footer'

const saira = Saira_Extra_Condensed({ weight: '400', subsets: ['latin'] })
const julius = Julius_Sans_One({ weight: '400', subsets: ['latin'] })
const jura = Jura({ weight: '400', subsets: ['latin'] })

export default function About () {
  return (
    <>
      <Head>
        <title>About</title>
        <meta property="og:title" content="About" />
      </Head>
      <main className={styles.main}>
        <div className={styles.headerContainer}>
          <Image
            className={styles.headerBackground}
            src='/images/background.png'
            width='1852'
            height='654'
            alt='background'
          />
          <div className={styles.headerContent}>
            <div className='container mx-auto'>
              <div className='xl:w-2/5 lg:w-1/2 md:w-2/3 px-5'>
                <h1 className={`${styles.headerHeading} ${saira.className}`}>
                  Welcome
                </h1>
                <Image
                  className={styles.headerBanner}
                  src='/images/banner.png'
                  width='719'
                  height='234'
                  alt='title'
                />
                <hr />
                <p className={`${styles.headerDescription} ${saira.className}`}>
                  Zomfi is a third person zombie shooter game. Players will be
                  able to roam through a zombie apocalypse, where they must
                  collect gear and fight off zombies.
                </p>
              </div>
            </div>
          </div>
        </div>

        <ul className={styles.tabs}>
          <li className={styles.activeTabItem}>
            <a className={`${styles.tabLink} ${saira.className}`} href='#'>
              ZOMFI
            </a>
          </li>
          <li>
            <a className={`${styles.tabLink} ${saira.className}`} href='#'>
              Blog
            </a>
          </li>
        </ul>
        <div className={styles.mapContainer}>
          <div className='container mx-auto my-4'>
            {/* CHARACTER */}
            <div className='character-section'>
              <div className='flex items-center justify-center'>
                <h1 className={`${styles.character} ${julius.className}`}>
                  Character
                </h1>
              </div>
              <div className='flex flex-wrap xl:items-start items-center justify-center px-5'>
                <div className={styles.manCharacterDetail}>
                  <div
                    className={`${styles.characterNote} ${styles.manCharacterNote} ${jura.className}`}
                  >
                    Logan is a 25-year-old under-achiever from the Midwest, who
                    decides to make his way west. Prior to the pandemic, he
                    could barely hold a job and found little motivation to
                    change his life. Through the difficulties he faces, he must
                    find his purpose and what it means to help his fellow man.
                  </div>
                  <div className='relative'>
                    <div
                      className={`${styles.characterName} ${julius.className}`}
                    >
                      Logan jones
                    </div>
                    <div className={styles.manCharacterNameBlur}></div>
                  </div>
                </div>
                <div className={styles.manCharacter}>
                  <Image
                    src='/images/man.png'
                    alt='man'
                    width='628'
                    height='951'
                  />
                </div>
                <div className={styles.womanCharacter}>
                  <Image
                    src='/images/woman.png'
                    alt='woman'
                    width='621'
                    height='1160'
                  />
                </div>
                <div className={styles.womanCharacterDetail}>
                  <div className={`${styles.characterNote} ${jura.className}`}>
                    Laura is a 22-year-old student who was only one class away
                    from her Business Administration degree when the pandemic
                    happened. She knows that the skills and training she
                    previously held will no longer help her and she must adapt
                    to this new world in order to survive.
                  </div>
                  <div className='relative'>
                    <div
                      className={`${styles.characterName} ${julius.className}`}
                    >
                      Laura Smith
                    </div>
                    <div className={styles.womanCharacterNameBlur}></div>
                  </div>
                </div>
              </div>
            </div>
            {/* ZOMFI NFT */}
            <div className='zomfi-nft-section'>
              <div className='flex items-center justify-center mb-[5rem]'>
                <h1 className={`${styles.zomfiNft} ${julius.className}`}>
                  Zomfi NFT
                </h1>
              </div>
              <div className='flex flex-wrap px-5'>
                <div className='flex-[2_2_0%] px-3'>
                  <p className={`${styles.zomfiText} ${jura.className}`}>
                    NFT Assets of each type will be divided into
                    <br /> following rarities:
                  </p>
                  <div className='grid grid-cols-12 p-4 border-b border-t border-[#7A7A7A]'>
                    <div
                      className={`col-span-3 ${styles.sliderCaption} ${jura.className}`}
                    >
                      Common
                    </div>
                    <div className='col-span-9'>
                      <div className={styles.sliderContainer}>
                        <div className={styles.sliderCommonBar}></div>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-12 p-4 border-b border-[#7A7A7A]'>
                    <div
                      className={`col-span-3 ${styles.sliderCaption} ${jura.className}`}
                    >
                      Rare
                    </div>
                    <div className='col-span-9'>
                      <div className={styles.sliderContainer}>
                        <div className={styles.sliderRareBar}></div>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-12 p-4 border-b border-[#7A7A7A]'>
                    <div
                      className={`col-span-3 ${styles.sliderCaption} ${jura.className}`}
                    >
                      Legendary
                    </div>
                    <div className='col-span-9'>
                      <div className={styles.sliderContainer}>
                        <div className={styles.sliderLegendaryBar}></div>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-12 p-4 border-b border-[#7A7A7A]'>
                    <div
                      className={`col-span-3 ${styles.sliderCaption} ${jura.className}`}
                    >
                      Mythical
                    </div>
                    <div className='col-span-9'>
                      <div className={styles.sliderContainer}>
                        <div className={styles.sliderMythicalBar}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex-[1_1_0%] px-3'>
                  <p className={`${styles.zomfiText} ${jura.className}`}>
                    Following are they types of NFT Assets:
                  </p>
                  <div
                    className={`border-l border-[#7A7A7A] ${styles.zomfiNftAssets}`}
                  >
                    <div className='p-3'>
                      <Image
                        src='/images/dogs.png'
                        width='253'
                        height='186'
                        alt='dogs'
                      />
                      <p className={`${styles.zomfiNftName} ${jura.className}`}>
                        Dogs
                      </p>
                    </div>
                    <div className='p-3'>
                      <Image
                        src='/images/lands.png'
                        width='253'
                        height='186'
                        alt='lands'
                      />
                      <p className={`${styles.zomfiNftName} ${jura.className}`}>
                        Lands
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* TOKENS */}
            <div className='tokens-section'>
              <div className='flex items-center justify-center mb-[5rem]'>
                <h1 className={`${styles.tokens} ${julius.className}`}>
                  Tokens
                </h1>
              </div>
              <div className='px-5'>
                <div className={styles.chatLeftBalloonContainer}>
                  <div
                    className={`relative ${styles.chatLeftBalloon} ${jura.className}`}
                  >
                    <Image
                      src='/images/logo.png'
                      width='94'
                      height='94'
                      alt='logo'
                    />
                    The Zomfi token is the core utility and reward token for the
                    Zomfi project wherein users get rewarded with the token by
                    playing various games and can access features within the
                    Zomfi ecosystem.
                    <h4 className='xl:text-[35px] lg:text-[28px] font-bold xl:leading-[5rem] lg:leading-[3.5rem]'>
                      ZOMFI Token Features and Elements
                    </h4>
                    <ul className='list-disc pl-8'>
                      <li>
                        Users will eventually be able to participate in in-game
                        governance, contributing in proposing, adding, amending
                        or removing features, while being rewarded to do so.
                      </li>
                      <li>
                        Gaining access to the game ecosystem, its features and
                        functionalities, including exclusive events and
                        tournaments.
                      </li>
                      <li>
                        Giving the ability to stake (or lock) for stability the
                        tokens and being rewarded for this action.
                      </li>
                      <li>
                        Use the token to as a in-game currency for exclusive
                        $Zomfi NFTs. Players, for example, can purchase NFT
                        Weapons and Armors in-game, also from other players.
                        Ability to setup/purchase Clans (guilds) in-game
                      </li>
                      <li>
                        Token can be used to purchase the internal only (not
                        listable on outside secondary markets) reward tokens
                        called ZEDS.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.chatRightBalloonContainer}>
                  <div
                    className={`relative ${styles.chatRightBalloon} ${jura.className}`}
                  >
                    <Image
                      src='/images/zed.png'
                      width='94'
                      height='94'
                      alt='zed'
                    />
                    ZED is in-game currency that doesn’t have Hard Cap.
                    <h4 className='xl:text-[35px] lg-text-[28px] font-bold xl:leading-[5rem] lg:leading[3.5rem]'>
                      Utlities
                    </h4>
                    <ul className='list-disc pl-8'>
                      <li>
                        In game activities: Players are awarded Zed for
                        completing achievements.
                      </li>
                      <li>
                        Player Upgrade: Player can upgrade their inventory
                        capacity.
                      </li>
                      <li>Particpate in game modes</li>
                      <li>Consumbales: Ammo, Medkits and grenades.</li>
                      <li>In-game storyline</li>
                      <li>
                        Redeem to $ZOMFI (Tax 50% initial or 5% reduce per day
                        with 10 days in total)
                      </li>
                      <li>
                        ZED will be burned when purchasing in-game items or
                        services.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* ROADMAP */}
            <div className='roadmap-section'>
              <div className='flex items-center justify-center mb-[5rem]'>
                <h1 className={`${styles.roadmap} ${julius.className}`}>
                  Roadmap
                </h1>
              </div>
              <div className='px-5'>
                <div className='grid grid-cols-5 gap-3'>
                  <div className={styles.roadmapTopDescription}>
                    <ul>
                      <li>
                        IDO(BSC)
                        <ul className='list-disc pl-8'>
                          <li>cmc & cg</li>
                          <li>Partnerships</li>
                          <li>Pancake Launch</li>
                          <li>Staking $Zomfi</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div></div>
                  <div className={styles.roadmapTopDescription}>
                    <ul className='list-disc pl-10'>
                      <li>Game Release 1.0 PC</li>
                      <li>ZED (IN-game currency)</li>
                    </ul>
                  </div>
                  <div></div>
                  <div className={styles.roadmapTopDescription}>
                    <ul>
                      <li>
                        Multplayer
                        <ol className='list-disc pl-10'>
                          <li>Battle Royale</li>
                          <li>Zomebie Racing</li>
                          <li>4V4</li>
                        </ol>
                      </li>
                      <li>All tiers release</li>
                    </ul>
                  </div>
                </div>
                <div className='grid grid-cols-5 gap-0'>
                  <div className='relative'>
                    <Image
                      src='/images/roadmap_top_right.png'
                      width='327'
                      height='362'
                      alt='roadmap_item_top'
                    />
                    <div className={styles.roadmapMask}>
                      <h3 className={julius.className}>Q4/2021</h3>
                    </div>
                  </div>
                  <div className='relative'>
                    <Image
                      className={styles.roadmapBottom}
                      src='/images/roadmap_bottom.png'
                      width='327'
                      height='362'
                      alt='roadmap_bottom'
                    />
                    <div className={styles.roadmapMask}>
                      <h3 className={julius.className}>Q1/2022</h3>
                    </div>
                  </div>
                  <div className='relative'>
                    <Image
                      src='/images/roadmap_top.png'
                      width='327'
                      height='362'
                      alt='roadmap_item_top'
                    />
                    <div className={styles.roadmapMask}>
                      <h3 className={julius.className}>Q2/2022</h3>
                    </div>
                  </div>
                  <div className='relative'>
                    <Image
                      className={styles.roadmapBottom}
                      src='/images/roadmap_bottom.png'
                      width='327'
                      height='362'
                      alt='roadmap_item_bottom'
                    />
                    <div className={styles.roadmapMask}>
                      <h3 className={julius.className}>Q3/2022</h3>
                    </div>
                  </div>
                  <div className='relative'>
                    <Image
                      src='/images/roadmap_top_left.png'
                      width='327'
                      height='362'
                      alt='roadmap_item_bottom'
                    />
                    <div className={styles.roadmapMask}>
                      <h3 className={julius.className}>Q4/2022</h3>
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-5 gap-3'>
                  <div></div>
                  <div className={styles.roadmapBtmDescription}>
                    <ul className='list-disc pl-8'>
                      <li>Alpha release</li>
                      <li>NFT Weapons</li>
                      <li>NFT Armor Sale</li>
                      <li>NFT Land</li>
                      <li>Crafting</li>
                    </ul>
                  </div>
                  <div></div>
                  <div className={styles.roadmapBtmDescription}>
                    <ul className='list-disc pl-8'>
                      <li>
                        Game Release:
                        <ul className=''>
                          <li>Mobile</li>
                          <li>(Android, IOS)</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <JoinCommunity />
        <Footer />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
    ])),
  },
})