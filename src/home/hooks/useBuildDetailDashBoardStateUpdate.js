import { useEffect, useRef, useState } from "react";
import { useStore } from "react-redux";

export default function useBuildDetailDashBoardStateUpdate() {
    const store = useStore()
    const [_, update] = useState(false)
    const ref = useRef(store.getState().builddetail)

    const reRender = () => update(u => !u)

    const listener = () => {
        const currentState = store.getState().builddetail
        if(ref.current !== currentState) {
            ref.current = currentState
            reRender()
        }
    }

    useEffect(() => {
        const unsubscribe = store.subscribe(listener)
        return () => unsubscribe()
    }, [])

    return ref.current;
}