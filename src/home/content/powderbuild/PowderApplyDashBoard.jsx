import './PowderApplyDashBoard.scss'
import PowderLine from './PowderLine'

const element = ['earth', 'thunder', 'water', 'fire', 'air']

export default function PowderApplyDashBoard({equipType}) {
    // console.log(equipType)
    return (
        <div className="powderapplydashboard-container">
            {element.map(v => <PowderLine type={v} equipType={equipType}/>)}
        </div>
    )
}