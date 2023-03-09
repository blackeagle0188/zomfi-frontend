import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import PAY_TYPES from '@/constants/PAY_TYPES'
import { Do_Hyeon } from '@next/font/google'

const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap'});
interface Props {
  payTypeId: number
  setPayTypeId: Function
}

const PayDropdown = (props: Props) => {
  const { payTypeId, setPayTypeId } = props
  const [showPayTypeDropdown, setShowPayTypeDropdown] = useState(false)

  const choosePayType = (id: number) => {
    setPayTypeId(id)
    setShowPayTypeDropdown(false)
  }
  return (
    <div className='flex items-center justify-end'>
      <div
        className='relative'
        style={{
          border: '1px solid #727272',
          borderRadius: 10,
          padding: '3px 8px 4px 10px',
          minWidth: 150,
          background: '#1b1f25'
        }}
      >
        <div
          className='flex flex-row items-center justify-center cursor-pointer rounded bg-dark'
          onClick={() => setShowPayTypeDropdown(!showPayTypeDropdown)}
        >
          <Image
            src={`/images/${PAY_TYPES[payTypeId].toLowerCase()}.png`}
            alt='zomfi'
            width='25'
            height='25'
            className='rounded-3xl'
          />
          <h5
            className={`${do_hyeon.className} text-xl text-white capitalize font-bold ml-2 mt-[-1px]`}
          >
            {PAY_TYPES[payTypeId]}
          </h5>
          <div className='ml-2 flex flex-row items-center'>
            {showPayTypeDropdown ? (
              <Icon
                icon='material-symbols:keyboard-arrow-up'
                color='white'
                width='24'
              />
            ) : (
              <Icon
                icon='material-symbols:keyboard-arrow-down'
                color='white'
                width='24'
              />
            )}
          </div>
        </div>
        {showPayTypeDropdown && (
          <div
            className='absolute animate-fadein left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700'
            style={{ top: 40 }}
          >
            <ul className='py-1 font-bold'>
              {PAY_TYPES.map((payType: any, idx: number) => (
                <li
                  key={idx}
                  className='flex items-center px-4 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  onClick={() => choosePayType(idx)}
                >
                  <Image
                    src={`/images/${PAY_TYPES[idx].toLowerCase()}.png`}
                    width='25'
                    height='25'
                    alt={PAY_TYPES[idx]}
                    className='mr-2'
                  />{' '}
                  {PAY_TYPES[idx]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default PayDropdown
