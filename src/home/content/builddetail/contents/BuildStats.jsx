import { BUILDEQUIPS } from '../../../reducer/itembuild'
import './BuildStats.scss'
import { AdditionalStats, ElementDefense, Health, HealthRegen, LifeSteal, ManaRegen, ManaSteal, ExtraStats } from './BuildUtils'

export default function BuildStats({data}) {
    return (
        <div className="buildstats-wrapper">
            <div className="buildstats-title">Build Stats</div>
            <div className='buildstats-content'>
                <ContentPart1 data={data} />
                <ContentPart2 data={data} />
            </div>
        </div>
    )
}

function ContentPart1({data}) {
    return (
        <div className='buildstats-content-part'>
            <br/>
            <Health data={data}/>
            <HealthRegen data={data}/>
            <ManaRegen data={data}/>
            <br/>
            <ElementDefense data={data}/>
            <br/>
            <AdditionalStats data={data}/>
            <br/>
        </div>
    )
}

function ContentPart2({data}) {
    return (
        <div className='buildstats-content-part'>
            <br/>
            <LifeSteal data={data} />
            <ManaSteal data={data} />
            <ExtraStats data={data} />
            <br/>
        </div>
    )
}

function HPPerLevel(level) {
    return 5 + level * 5;
}