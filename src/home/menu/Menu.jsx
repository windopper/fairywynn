import './Menu.scss'
import { Link } from 'react-router-dom'
export default function Menu() {

    return (
        <div className='menu'>
            <Link className='link' to='/itemsearch'><div>Item Search</div></Link>
            <Link className='link' to='/crafts'><div>Crafts</div></Link>
        </div>
    )
}