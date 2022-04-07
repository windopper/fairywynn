import './PowderApplyDashBoard.scss'
import PowderLine from './PowderLine'

const element = ['earth', 'thunder', 'water', 'fire', 'air']

export default function PowderApplyDashBoard() {
    return (
        <div className="powderapplydashboard-container">
            {element.map(v => <PowderLine type={v}/>)}
        </div>
    )
}