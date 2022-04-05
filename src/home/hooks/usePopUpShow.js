import { useEffect, useRef, useState } from "react";
import { useStore } from "react-redux";

export default function usePopUpShow() {
    const store = useStore()
    const [state, Update] = useState(false)
    const ref = useRef(JSON.stringify(store.getState().popup))
    
    const reRender = (v) => Update(v)

    const listener = () => {
        const popup = JSON.stringify(store.getState().popup)
        if(popup !== ref.current) {
            ref.current = popup
            reRender(store.getState().popup.status)
        }
    }

    useEffect(() => {
        const unsubscribe = store.subscribe(listener)
        return () => unsubscribe()
    }, [])

    return JSON.parse(ref.current);
}