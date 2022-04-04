import { useEffect, useReducer, useRef, useState } from 'react'
import { filteringReducer, initialFilter } from './reducer/filterReducer'
import Content from './content/Content'
import './Home.scss'
import Loading from './Loading'
import Menu from './menu/Menu'
import Search from './search/Search'

const initialState = {
    search: ''
}

function reducer(state, action) {
    return action;
}

function loadingReducer(state, action) {
    return action;
}

export default function Home() {

    const preSearch = useRef([])
    const [search, dispatchSearching] = useReducer(reducer, 'i');
    const [filtering, dispatchFiltering] = useReducer(filteringReducer, initialFilter)
    const [loading, dispatchLoading] = useReducer(loadingReducer, false)
    const [update, setUpdate] = useState(false)
    
    useEffect(() => {
        setUpdate((u) => !u)
        if(search != '') {
            preSearch.current.splice(0, 0, search)
        }
       
    }, [search])

    return (
        <div className='home'>
            <div className='menu'><Menu/></div>
            <div className="title"></div>
            <div className='search'><Search setSearch={dispatchSearching} preSearch={preSearch.current}/></div>
            <div className='loading'><Loading loading={loading} searching={search}/></div>
            <div className="content"><Content search={search} setLoading={dispatchLoading} loading={loading}/></div>
            <div className="list"></div>
        </div>
    )
}

