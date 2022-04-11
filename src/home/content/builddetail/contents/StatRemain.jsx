import { getValidStat } from "../../../../utils/WynnMath";
import { BUILDEQUIPS } from "../../../reducer/itembuild";
import './StatRemain.scss'

const statType = [
  "strength",
  "dexterity",
  "intelligence",
  "defense",
  "agility",
];

export function StatAssignCalculateFunction(data) {
    
    let requireStatTypePoints = {
        "strength": 0,
        "dexterity": 0,
        "intelligence": 0,
        "defense": 0,
        "agility": 0
    }

    let additionalStatTypePoints = {
        "strength": 0,
        "dexterity": 0,
        "intelligence": 0,
        "defense": 0,
        "agility": 0
    }

    let finalStatTypePoints = {
        "strength": 0,
        "dexterity": 0,
        "intelligence": 0,
        "defense": 0,
        "agility": 0
    }

    let finalStatTypePointsWithoutWeapon = {
        "strength": 0,
        "dexterity": 0,
        "intelligence": 0,
        "defense": 0,
        "agility": 0
    }

    let properStatAssign = {
        "strength": 0,
        "dexterity": 0,
        "intelligence": 0,
        "defense": 0,
        "agility": 0
    }

  statType.forEach((s) => {
    let maxValue = 0;

    let filtered = BUILDEQUIPS.filter((b) => data[b] !== undefined)
    .map((b) => data[b].item[s]);

    if(filtered.length >= 1) maxValue = Math.max.apply(null, filtered)
    requireStatTypePoints[s] = maxValue
  });

  statType.forEach((s) => {
      BUILDEQUIPS.filter(b => data[b] !== undefined)
      .sort((s1, s2) => {
          let v1 = data[s1].item[s]
          let v2 = data[s2].item[s]
          return v1 - v2
      })
      .forEach(b => {
          let additionalPoint = data[b].item[s+'Points']
          additionalStatTypePoints[s] = additionalPoint

          let requirePoint = data[b].item[s]

          if(finalStatTypePointsWithoutWeapon[s] < requirePoint) {
            let needToAssignMore = requirePoint - finalStatTypePointsWithoutWeapon[s]
            if(needToAssignMore >= 0) {
            finalStatTypePointsWithoutWeapon[s] += needToAssignMore
              finalStatTypePoints[s] += needToAssignMore
              properStatAssign[s] += needToAssignMore
            }
          }
          if(s !== 'weapon') {
            finalStatTypePointsWithoutWeapon[s] += additionalPoint
          }
          finalStatTypePoints[s] += additionalPoint
      })
  })

  let remainStatPoints = 200 - `${statType.map(v => properStatAssign[v]).reduce((a, s) => a + s)}`;

  return {
      requireStatTypePoints: requireStatTypePoints,
      additionalStatTypePoints: additionalStatTypePoints,
      finalStatTypePoints: finalStatTypePoints,
      finalStatTypePointsWithoutWeapon: finalStatTypePointsWithoutWeapon,
     properStatAssign: properStatAssign,
      remainStatPoints: remainStatPoints
  }
}

export default function StatRemain({ data, statAssigned }) {

    const currentLevel = data.settings.level
    const usedStatPoint = statType.map(v => statAssigned.properStatAssign[v]).reduce((a, s) => a + s)
    const validStat = getValidStat(currentLevel)

    const skillPointRemain = validStat - usedStatPoint;

  return <div className="statremain-container">
      <div>
        {`Assigned Skill Points: ${usedStatPoint}`}
      </div>
      <div>
        {`Skill Point Remaining: `}<span style={{
          color: skillPointRemain < 0 ? 'rgb(255, 100, 100)' : 'rgb(100, 255, 100)'
        }}>{skillPointRemain}</span>
      </div>
  </div>;
}
