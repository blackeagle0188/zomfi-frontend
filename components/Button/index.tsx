import { Russo_One } from '@next/font/google'
const russo_one = Russo_One({ weight: '400', subsets: ['latin'] })
interface Props {
  color: string;
  textColor: string
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  fontSize: string,
  radius: string,
  width?: string,
  font?: any,
  class?: string
}

export default function Button(props: Props) {
  return (
    <button
      onClick={props.onClick}
      className={`${props.font == null ? russo_one.className : props.font.className} ${props.class ? props.class : ""} ${props.width} ${props.fontSize == "Normal" ? "text-sm mobile_lg:text-sm lg_2:text-xl" : "text-xs"} btn flex items-center justify-center`}
      style={{
        backgroundColor: props.color == "Normal" ? "#E92B2B" : props.color,
        borderRadius: props.radius == "Normal" ? "10px" : "5px",
        color: props.textColor == "Normal" ? "#fff" : props.textColor,
        padding: "8px 15px"
      }}
    >
      {props.children}
    </button>
  );
}
