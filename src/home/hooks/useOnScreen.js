import { useState, useEffect } from "react"

export default function useOnScreen(ref) {

    const [isIntersecting, setIntersecting] = useState(false)

    const options = {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0,
    }
  
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting), options
    )
  
    useEffect(() => {
      if(ref.current) {
        console.log('observe')
        observer.observe(ref.current)
      }
      // Remove the observer as soon as the component is unmounted
      return () => { observer.disconnect() }
    }, [])
  
    return isIntersecting
  }