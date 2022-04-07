import { useEffect, useRef, useState } from "react";
import { useDispatch, useStore } from "react-redux";

export default function usePowderBuildDashBoardStateUpdate() {

    const [_, update] = useState(false)
    const store = useStore()
    const reRender = () => update(u => !u)
    const ref = useRef(JSON.parse(JSON.stringify(store.getState().powderbuild)))

    const listener = () => {
        if(ref.current.state != store.getState().powderbuild.state) {
            ref.current = JSON.parse(JSON.stringify(store.getState().powderbuild))
            reRender()
        }
    }

    useEffect(() => {
        const unsubscribe = store.subscribe(listener)
        return () => unsubscribe()
    }, [])

    return {
        state: ref.current.state,
        item: ref.current.item
    }
}