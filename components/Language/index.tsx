import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import styles from '@/styles/Language.module.css'

export default function Language() {
  const router = useRouter();
  const changeLocale = (locale: string) => {
    router.push({
      pathname: router.pathname,
      query: router.query
    }, router.asPath, { locale });
  }

  return (
    <div className={`${styles.langContainer}`}>
      <div className={`${styles.profileWrapper} flex flex-col`}>
        <div className='my-2.5 uppercase text-white hover:underline w-28 flex flex-row items-center justify-between' onClick={() => changeLocale('en')}>EN<Icon icon="ion:checkmark-sharp" color="#0084ff" width="25" className={`${router.locale != "en" ? "hidden" : ""}`} /></div>
        <div className='my-2.5 uppercase text-white hover:underline w-28 flex flex-row items-center justify-between' onClick={() => changeLocale('ta')}>tagalog</div>
        <div className='my-2.5 uppercase text-white hover:underline w-28 flex flex-row items-center justify-between' onClick={() => changeLocale('es')}>español<Icon icon="ion:checkmark-sharp" color="#0084ff" width="25" className={`${router.locale != "es" ? "hidden" : ""}`} /></div>
        <div className='my-2.5 uppercase text-white hover:underline w-28 flex flex-row items-center justify-between' onClick={() => changeLocale('jp')}>日本<Icon icon="ion:checkmark-sharp" color="#0084ff" width="25" className={`${router.locale != "jp" ? "hidden" : ""}`} /></div>
        <div className='my-2.5 uppercase text-white hover:underline w-28 flex flex-row items-center justify-between' onClick={() => changeLocale('fr')}>FRANÇAIS<Icon icon="ion:checkmark-sharp" color="#0084ff" width="25" className={`${router.locale != "fr" ? "hidden" : ""}`} /></div>
        <div className='my-2.5 uppercase text-white hover:underline w-28 flex flex-row items-center justify-between' onClick={() => changeLocale('kr')}>한국어<Icon icon="ion:checkmark-sharp" color="#0084ff" width="25" className={`${router.locale != "kr" ? "hidden" : ""}`} /></div>
        <div className='my-2.5 uppercase text-white hover:underline w-28 flex flex-row items-center justify-between' onClick={() => changeLocale('vn')}>Tiếng Việt<Icon icon="ion:checkmark-sharp" color="#0084ff" width="25" className={`${router.locale != "vn" ? "hidden" : ""}`} /></div>
        <div className='my-2.5 uppercase text-white hover:underline w-28 flex flex-row items-center justify-between' onClick={() => changeLocale('hi')}>हिन्दी<Icon icon="ion:checkmark-sharp" color="#0084ff" width="25" className={`${router.locale != "hi" ? "hidden" : ""}`} /></div>
        <div className='my-2.5 uppercase text-white hover:underline w-28 flex flex-row items-center justify-between' onClick={() => changeLocale('cn')}>中文<Icon icon="ion:checkmark-sharp" color="#0084ff" width="25" className={`${router.locale != "cn" ? "hidden" : ""}`} /></div>
      </div>
    </div>
  )
}
