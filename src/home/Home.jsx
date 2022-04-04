import { useEffect, useReducer, useRef, useState } from 'react'
import { filter, initialFilter } from './reducer/filter'
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

    // const preSearch = useRef([])
    // const [search, dispatchSearching] = useReducer(reducer, '');
    // const [filtering, dispatchFiltering] = useReducer(filter, initialFilter)
    const [loading, dispatchLoading] = useReducer(loadingReducer, false)
    const [update, setUpdate] = useState(false)
    
    // useEffect(() => {
    //     setUpdate((u) => !u)
    //     if(search != '') {
    //         preSearch.current.splice(0, 0, search)
    //     }
       
    // }, [search])

    return (
        <div className='home'>
            <div className='menu'><Menu/></div>
            <div className="title"></div>
            <div className='search'><Search/></div>
            <div className='loading'><Loading /></div>
            <div className="content"><Content /></div>
            <div className="list"></div>
        </div>
    )
}

