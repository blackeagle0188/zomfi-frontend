import { Do_Hyeon } from '@next/font/google'
const do_hyeon = Do_Hyeon({ weight: '400', subsets: ['latin'], display: 'swap' })
interface Props {
  placeHolder?: string
  className?: string
  type?: string
  min?: number
  value: any
  handleValue: Function,
  handleSearch?: Function,
  styles?: any
  maxWidth?: string
}

export default function Input(props: Props) {
  return (
    <input
      className={`${do_hyeon.className} ${props.className ? props.className : ""} ${props.maxWidth} input outline-0`}
      type={props.type ? props.type : "text"}
      min={ props.min ? props.min : 0 }
      style={{
        color: "#5F5F5F",
        borderRadius: "10px",
        border: "1px solid #727272",
        padding: "0 20px",
        background: "#1B1F25",
        // width: "100%",
        ...props.styles
      }}
      autoFocus={true}
      placeholder={props.placeHolder}
      value={props.value}
      onChange={(e) => props.handleValue(e)}
      onKeyUp={(e) => {
        if (e.keyCode === 13) {
          props.handleSearch ? props.handleSearch(e) : void(0)
        }
      }}
    />
  );
}
