import { useEffect, useRef, useState } from "react";
import { useStore } from "react-redux";

export default function useBuildItemsUpdate() {
    const store = useStore()
    const [_, Update] = useState(false)
    const ref = useRef(JSON.stringify(store.getState().itembuild))

    const reRender = () => Update(u => !u)
    
    const listener = () => {
        const itembuild = JSON.stringify(store.getState().itembuild)
        if(ref.current !== itembuild) {
            ref.current = itembuild;
            reRender()
        }
    }

    useEffect(() => {
        store.subscribe(listener)
    }, [])

    return JSON.parse(ref.current)
}