import './Menu.scss'
import { Link } from 'react-router-dom'
export default function Menu() {

    return (
        <div className='menu'>
            <Link className='link' to='/'><div>Item Search</div></Link>
            <Link className='link' to='/guilds'><div>Crafts</div></Link>
        </div>
    )
}