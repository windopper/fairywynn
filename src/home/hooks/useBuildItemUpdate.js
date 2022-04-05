import { useEffect, useRef, useState } from "react";
import { useStore } from "react-redux";

export default function useBuildItemUpdate(type) {

    const store = useStore()
    const ref = useRef(store.getState().itembuild[type])
    const [update, setUpdate] = useState(false)

    const reRender = () => setUpdate(u => !u);

    const listener = () => {
        let item = store.getState().itembuild[type]
        if(ref.current !== item) {
            ref.current = store.getState().itembuild[type]
            reRender()
        }
    }

    useEffect(() => {
        const unsubscribe = store.subscribe(listener)
        return () => unsubscribe()
    }, [])

    return ref.current;
}