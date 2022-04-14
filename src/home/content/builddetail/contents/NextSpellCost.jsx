import { useSelector } from 'react-redux'
import { CLASSSKILLS } from '../../../../utils/WynnData'
import { getMaxSum, getMinSum } from '../../../../utils/WynnMath'
import { getComputedManaAndNextIntelligencePoint, getComputedManaCost } from '../../../../utils/WynnUtils'
import './NextSpellCost.scss'
const WEAPONTOCLASS = {
    'spear': 'warrior',
    'wand': 'mage',
    'bow': 'archer',
    'dagger': 'assasin',
    'relik': 'shaman'
}
export default function NextSpellCost() {

    const itemBuildData = useSelector(state => state.itembuild)
    const level = useSelector(state => state.itembuild.settings.level)

    if(!itemBuildData.weapon) return (
      <div className="nextspellcost-wrapper">
        <div className="nextspellcost-container">
          <div className="nextspellcost-card">
            <div>There's no weapon</div>
          </div>
        </div>
      </div>
    );

    const weaponType = itemBuildData.weapon.item.type
    const classType = WEAPONTOCLASS[weaponType.toLowerCase()]

    const card = () => {
        const number = [1, 2, 3, 4]
        return number.map(v => {
            const skillName = CLASSSKILLS[classType][v].name
            const [computedCost, futureCost, futureIntelligence] = getComputedManaAndNextIntelligencePoint(classType, v, itemBuildData)
            return (
              <div className='nextspellcost-card'>
                <div className="nextspellcost-title">
                    {skillName}
                </div>
                <div className='nextspellcost-content'>
                    <div className='nextspellcost-mana'>{computedCost}<i className='mana-icon'></i>&nbsp;→&nbsp;{futureCost}<i className='mana-icon'></i></div>
                    {computedCost !== futureCost ? `+`+futureIntelligence : null}
                </div>
              </div>
            );
        })
    }

    return (
        <div className="nextspellcost-wrapper">
            <div className="nextspellcost-container">
            {card()}
            </div>
        </div>
    )
}