import { useEffect, useState } from "react";

export default function useOutsideAlerter(ref) {

  const [_, update] = useState(false)
  const reRender = () => update(u => !u);

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      reRender()
    }
  }
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return
}
