import { useEffect, useRef, useState } from "react";
import { useStore } from "react-redux";

export default function useBuildItemPowderUpdate(equipType) {
    const store = useStore()
    const [_, update] = useState(false)

    const ref = useRef(JSON.stringify(store.getState().itembuild[equipType].powder))
    const reRender = () => update(u => !u)

    const listener = () => {
        const currentValue = JSON.stringify(store.getState().itembuild[equipType].powder)
        if(ref.current !== currentValue) {
            ref.current = currentValue
            reRender()
        }
    }

    useEffect(() => { 
        const unsubscribe = store.subscribe(listener)
        return () => unsubscribe()
    }, [])

    return JSON.parse(ref.current)
}  