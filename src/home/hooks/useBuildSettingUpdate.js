import { useEffect, useRef, useState } from "react";
import { useStore } from "react-redux";

export default function useBuildSettingUpdate() {

    const store = useStore()
    const [_, update] = useState(false)
    const ref = useRef(JSON.stringify(store.getState().itembuild.settings))
    const reRender = () => update(u => !u)

    const listener = () => {
        const current = JSON.stringify(store.getState().itembuild.settings)
        if(ref.current !== current) {
            ref.current = current;
            reRender()
        }
    }

    useEffect(() => {
        const unsubscribe = store.subscribe(listener)
        return () => unsubscribe()
    }, [])

    return
}