import { useState } from "react";
import styles from '@/styles/Home.module.css'
import { Icon } from '@iconify/react';
import { Do_Hyeon } from '@next/font/google'
import { useTranslation } from "next-i18next";

const do_hyeon = Do_Hyeon({ subsets: ['latin'], weight: "400" })
interface Props {
  children?: React.ReactNode
}

export default function Accordion(props: Props) {
  const { t } = useTranslation("");

  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div
      style={{
        width: "100%",
        marginBottom: "30px",
        lineHeight: "15px",
      }}
    >
      <button
        className={`${styles.accordion} ${do_hyeon.className} w-full text-white py-4 flex flex-row items-center justify-center text-xs mobile_lg:text-sm lg_2:text-xl`}
        onClick={toggle}
        type="button"
        style={{borderRadius: isShowing ? "0.375rem 0.375rem 0 0" : "0.375rem"}}
      >
        <h6>{t("common.Show Flter")}</h6>
        {
          isShowing ? (
            <Icon icon="material-symbols:arrow-drop-down-sharp" color="white" width="20" rotate={2} />
          )
            : (
              <Icon icon="material-symbols:arrow-drop-down-sharp" color="white" width="20" />
            )
        }

      </button>
      <div
        style={{ display: isShowing ? "block" : "none" }}
      >{props.children}</div>
    </div>
  );
}
