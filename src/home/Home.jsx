import Content from './content/Content'
import './Home.scss'
import Loading from './Loading'
import Menu from './menu/Menu'
import Search from './search/Search'
import HotButton from './content/itembuild/HotButton'
import Alerts from '../alerts/Alerts'
import BuildDetail from './content/builddetail/BuildDetail'
import PowderBuild from './content/powderbuild/PowderBuild'

export default function Home() {

    return (
        <div className='home'>
            {/* <div className='menu'><Menu/></div> */}
            {/* <div className="title"></div> */}
            <div className='search'><Search/></div>
            <div className='loading'><Loading/></div>
            <div className="content"><Content/></div>
            {/* <div className="list"></div> */}
            <HotButton />
            <BuildDetail />
            <PowderBuild />
            <Alerts/>
        </div>
    )
}

