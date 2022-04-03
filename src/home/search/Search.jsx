import { useRef } from 'react'
import './Search.scss'
export default function Search({setSearch}) {

    const input = useRef('')

    return (
        <div className="searchbox">
            <input type='text' className='searchInput' placeholder='Search Items..' onChange={(e) => input.current = e.target.value}></input>
            <div className='searchButton' onClick={() => {
                setSearch(input.current)
            }}>Search</div>
        </div>
    )
}