import styles from '@/styles/Tooltip.module.css'

interface Props {
  children?: React.ReactNode;
  active: boolean
  className?: string
}

export default function TooltipModal(props: Props) {
  return (
    <div className={`${styles.tooltipContainer} ${props.active == true ? styles.visible : styles.invisible} animate-fadein`}>
      <div className={`${styles.tooltipWrapper} relative`}>
        <div className={`${styles.topArrow} ${props.className != undefined ? props.className : ""} absolute`}></div>
        {props.children}
      </div>
    </div>
  )
}
