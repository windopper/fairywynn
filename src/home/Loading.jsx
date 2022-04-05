import { useSelector, useStore } from "react-redux"
import { useEffect, useRef, useState } from "react"
import './Loading.scss'



export default function Loading() {

    const store = useStore()
    
    const [update, setUpdate] = useState(false)

    const searching = useRef(store.getState().search.currentSearch)
    const preSearch = useRef(store.getState().search.preSearch)
    const coreLength = useRef(0)

    useEffect(() => {
        const listener = () => {
            searching.current = store.getState().search.currentSearch
            preSearch.current = store.getState().search.preSearch
            coreLength.current = store.getState().fetcher.length
            setUpdate(u => !u)
        }
        let unsubscribe = store.subscribe(listener)
        return () => {
            unsubscribe()
        }
    }, [])


    return (
        <div className="loading" >
            {preSearch.current.length !== 0 ? `'${searching.current}'의 검색결과` : null}
            {preSearch.current.length === 0 && searching.current === '' && coreLength.current !== 0 ? '아이템을 검색해주세요' : null}
            {coreLength.current === 0 ? '서버로부터 API를 받아오는 중...' : null}
            <div className="loading-info">
            </div>
        </div>
    )
}