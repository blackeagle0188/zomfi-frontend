import { useEffect, useState } from "react";

interface Props {
  ref: any
  isOpen?: boolean
}

export default function useOutsideClick(props: Props) {
  const { ref, isOpen } = props;
  const [outside, setOutSide] = useState(Boolean);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref?.current && !ref?.current.contains(event.target)) {
        setOutSide(true);
      } else {
        setOutSide(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if(isOpen == undefined) {
      return;
    }
    if(isOpen) {
      setOutSide(false)
    }
  }, [isOpen])
  return outside;
}
