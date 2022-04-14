import { useEffect, useRef, useState } from "react";
import { useStore } from "react-redux";

export default function useBuildUpdate() {
    const store = useStore()
    const ref = useRef(store.getState().itembuild.buildCode)
    const [_, update] = useState(false)
    const reRender = () => update(u => !u)
    const listener = () => {
        const current = store.getState().itembuild.buildCode
        // console.log(store.getState().itembuild.buildCode)
        if(ref.current !== current) {
            ref.current = current
            reRender()
        }
    }
    useEffect(() => {
        const unsubscribe = store.subscribe(listener)
        return () => unsubscribe()
    }, [])

    return ref.current
}