import { getColorFromTier } from '../../../../utils/ColorPicker'
import { ComputeArmorWearSequence } from '../../../../utils/WynnMath'

import './BuildAssignSequence.scss'

export default function BuildAssignSequence({itemBuildData}) {

    const equipOrder = ComputeArmorWearSequence(itemBuildData)
    const statType = ['strength', 'dexterity', 'intelligence', 'defense', 'agility']
    const statEmoji = ["✤","✦","❉","✹","❋"]
    const statColor = ["RGB(4, 155, 5)","RGB(255, 255, 85)","RGB(70, 223, 223)","RGB(255, 85, 83)","RGB(228, 226, 227)"]

    const properStatAssign = itemBuildData.currentBuild.statAssigned.properStatAssign

    return (
      <div className="buildassignsequence-wrapper row-container">
        <div className="container">
          <div className="column-container">
            <div className="text">You Should Assign: </div>
            {statType.map((v, i) => (
              <div style={{
                  margin: '2px',
              }}>
                <span
                  style={{ 
                      color: statColor[i],
                }}
                >{`${statEmoji[i]} ${v}: `}</span>
                <span>{properStatAssign[v]}</span>
              </div>
            ))}
          </div>
          <div className='column-container'>
              <div className='text'>Equip Order: </div>
              {equipOrder.map(v => (
              <div style={{
                  color: getColorFromTier(v)
              }}>
                  {v.name}
              </div>))}
          </div>
        </div>
      </div>
    );
}