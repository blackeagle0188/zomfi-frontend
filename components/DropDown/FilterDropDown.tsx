import { Fragment, useEffect, useRef, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react';
import { Do_Hyeon } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  title: string
  type: number
  setFunc: Function
  setDropDownName: Function
  menu: Array<string>
  class?: string
}

export default function FilterDropDown(props: Props) {
  const [isOpen, setIsOpen] = useState(true)
  const { title, type, setFunc, setDropDownName, menu } = props

  return (
    <Menu as="div" className={`${props.class} relative inline-block text-left w-full mobile_lg:w-auto`}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <Menu.Button className={`${styles.dropdownBtn} ${do_hyeon.className} inline-flex justify-center items-center rounded-md px-4 py-2 text-sm lg_2:text-lg tablet:text-2xl font-medium text-white w-full`}>
          <h6 className='whitespace-nowrap text-xs mobile_lg:text-sm lg_2:text-xl'>{title}</h6>
          {
            isOpen ? (
              <Icon icon="material-symbols:arrow-drop-down-sharp" color="white" width="20" />
            ) : (
              <Icon icon="material-symbols:arrow-drop-down-sharp" color="white" width="20" rotate={2} />
            )
          }
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={`${styles.dropdownOptions} absolute left-0 z-10 mt-2 w-full mobile_lg:w-56 origin-top-right rounded-md`}>
          {
            menu.map((item: string, index: number) => (
              <Menu.Item key={index} >
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active || type == index ? 'text-white' : 'text-white opacity-50',
                      `${do_hyeon.className} block px-4 py-2 text-xs mobile_lg:text-sm lg_2:text-xl`
                    )}
                    onClick={() => { setFunc(index); setDropDownName(item) }}
                  >
                    {item}
                  </a>
                )}
              </Menu.Item>
            ))
          }
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
