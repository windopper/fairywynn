import { useEffect } from "react"
import { useStore } from "react-redux"

export default function useFetchComplete() {
    const store = useStore()
    const listener = () => {

    }
    useEffect(() => {
        store.subscribe(listener)
    }, [])
    return 
}