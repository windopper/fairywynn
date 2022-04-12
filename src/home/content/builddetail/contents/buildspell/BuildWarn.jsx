import { getValidStat } from '../../../../../utils/WynnMath';
import { BUILDEQUIPS } from '../../../../reducer/itembuild';
import './BuildWarn.scss'


const statType = [
    "strength",
    "dexterity",
    "intelligence",
    "defense",
    "agility",
  ];


function Tab() {
    return <>&nbsp;&nbsp;&nbsp;&nbsp;</>
}

export default function BuildWarn({itemBuildData, statAssigned}) {

    let invalidBuild = false
    let cautionBuild = false

    const proper = statAssigned.properStatAssign

    const currentLevel = itemBuildData.settings.level
    const usedStatPoint = statType.map(v => proper[v]).reduce((a, s) => a + s)
    const validStat = getValidStat(currentLevel)
    const skillPointRemain = validStat - usedStatPoint;

    let invalidReasons = []
    let cautionReasons = []

    if(BUILDEQUIPS.filter(v => itemBuildData[v]).length !== 9) {
        cautionBuild = true
        cautionReasons.push(
            <div className='reason'>
                <Tab />{`* There are ${9-BUILDEQUIPS.filter(v => itemBuildData[v]).length} space(s) more you can use`}
            </div>
        )
    }

    if(skillPointRemain < 0) {
        invalidBuild = true
        invalidReasons.push(
            <div className='reason'>
                <Tab />{`* This build requires total ${usedStatPoint} skill points, but you can assign ${validStat}`}
            </div>
        )
    }

    statType.filter(v => proper[v] > 100).forEach(v => {
        invalidBuild = true
        invalidReasons.push(
            <div className='reason'>
                <Tab />{`* This build requires to assign ${proper[v]} ${v} points`}
            </div>
        )
    })

    return (
      <>
        {invalidBuild ? (
          <div className="buildwarn">
            <div>
              <i className="fa-solid fa-xmark">&nbsp;</i> This build
              can't be created in game
            </div>
            {invalidReasons}
          </div>
        ) : null}
        {cautionBuild ? (
          <div className="buildcaution">
            <div>
              <i className="fa-solid fa-triangle-exclamation"></i> Build Warning
            </div>
            {cautionReasons}
          </div>
        ) : null}
      </>
    );
}