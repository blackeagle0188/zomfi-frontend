import { Do_Hyeon } from '@next/font/google'
import Input from '../Input';
import styles from '@/styles/Marketplace.module.css'
import { useTranslation } from "next-i18next";
import { useState } from 'react';

const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })

export default function MarketplaceFilter() {
  const { t } = useTranslation("");

  const [filterText, setFilterText] = useState("")

  const handleFilterChange = (e: any) => {
    setFilterText(e.target.value)
  }

  return (
    <div className={`${styles.filterBody} p-4 flex flex-col `}>
      <div className={`${styles.filterTab} w-full overflow-hidden flex flex-row m-auto mb-6`}>
        <div className={`${styles.active} ${styles.tab} ${do_hyeon.className} w-6/12 h-full text-center flex items-center justify-center cursor-pointer`}>{t("marketplace.For Sale")}</div>
        <div className={`${styles.tab} ${do_hyeon.className} w-6/12 h-full text-center flex items-center justify-center cursor-pointer`}>{t("marketplace.Show Al")}l</div>
      </div>
      <div className={`${styles.filterClear} ${do_hyeon.className} flex items-center justify-center ml-auto	mr-0 cursor-pointer`}>{t("marketplace.CLEAR ALL FILTERS")}</div>
      <div className={`${styles.filterOptions}`}>
        <div className='mb-6'>
          <h6 className={`${do_hyeon.className} ${styles.optionTitle} text-white text-xs mb-1`}>Background</h6>
          <Input placeHolder={"Choose a Property..."} handleValue={handleFilterChange} value={filterText}></Input>
        </div>
        <div className='mb-6'>
          <h6 className={`${do_hyeon.className} ${styles.optionTitle} text-white text-xs mb-1`}>Background</h6>
          <Input placeHolder={"Choose a Property..."} handleValue={handleFilterChange} value={filterText}></Input>
        </div>
        <div className='mb-6'>
          <h6 className={`${do_hyeon.className} ${styles.optionTitle} text-white text-xs mb-1`}>Background</h6>
          <Input placeHolder={"Choose a Property..."} handleValue={handleFilterChange} value={filterText}></Input>
        </div>
        <div className='mb-6'>
          <h6 className={`${do_hyeon.className} ${styles.optionTitle} text-white text-xs mb-1`}>Background</h6>
          <Input placeHolder={"Choose a Property..."} handleValue={handleFilterChange} value={filterText}></Input>
        </div>
        <div className='mb-6'>
          <h6 className={`${do_hyeon.className} ${styles.optionTitle} text-white text-xs mb-1`}>Background</h6>
          <Input placeHolder={"Choose a Property..."} handleValue={handleFilterChange} value={filterText}></Input>
        </div>
        <div className='mb-6'>
          <h6 className={`${do_hyeon.className} ${styles.optionTitle} text-white text-xs mb-1`}>Background</h6>
          <Input placeHolder={"Choose a Property..."} handleValue={handleFilterChange} value={filterText}></Input>
        </div>
        <div className='mb-6'>
          <h6 className={`${do_hyeon.className} ${styles.optionTitle} text-white text-xs mb-1`}>Background</h6>
          <Input placeHolder={"Choose a Property..."} handleValue={handleFilterChange} value={filterText}></Input>
        </div>
        <div className='mb-6'>
          <h6 className={`${do_hyeon.className} ${styles.optionTitle} text-white text-xs mb-1`}>Background</h6>
          <Input placeHolder={"Choose a Property..."} handleValue={handleFilterChange} value={filterText}></Input>
        </div>
        <div className='mb-6'>
          <h6 className={`${do_hyeon.className} ${styles.optionTitle} text-white text-xs mb-1`}>Background</h6>
          <Input placeHolder={"Choose a Property..."} handleValue={handleFilterChange} value={filterText}></Input>
        </div>
        <div className='mb-6'>
          <h6 className={`${do_hyeon.className} ${styles.optionTitle} text-white text-xs mb-1`}>Background</h6>
          <Input placeHolder={"Choose a Property..."} handleValue={handleFilterChange} value={filterText}></Input>
        </div>
      </div>
    </div>
  );
}
