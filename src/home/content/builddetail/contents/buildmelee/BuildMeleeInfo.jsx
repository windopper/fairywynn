import { computeAttackSpeed, computePoisonDamage } from '../../../../../utils/WynnMath';
import { hasItemTypeInBuild } from '../../../../reducer/itembuild'
import { DamageContainerDesign } from '../buildspell/SpellProfileCard';
import { getMaxSum } from '../BuildUtils';
import './BuildMeleeInfo.scss'

export default function BuildMeleeInfo({itemBuildData, computedMeleeDamages}) {

    if(!hasItemTypeInBuild('weapon', itemBuildData)) return null;

    const weaponItem = itemBuildData.weapon.item
    const armorsAttackSpeedBonus = getMaxSum(itemBuildData, 'attackSpeedBonus')
    const poison = getMaxSum(itemBuildData, 'poison')
    const strengthPoint = itemBuildData.currentBuild.statAssigned.finalStatTypePoints.strength
    const computedPoisonDamage = computePoisonDamage(poison, strengthPoint)
    const computedPoisonPerSec = computedPoisonDamage / 3
    const attackSpeed = refactorAttackSpeed(computeAttackSpeed(weaponItem.attackSpeed, armorsAttackSpeedBonus))

    return (
      <div className="buildmeleeinfo-wrapper">
        <div className="buildmeleeinfo-container">
          <div className="buildmeleeinfo-item">
                <div>Normal Damage</div>
                <div className="dps column-container">
                <div className="small-info">Per Hit</div>
                <div>{computedMeleeDamages.nonCriticalAverage}</div>
              </div>
                <div className='damage-container'><DamageContainerDesign spellMinMaxData={computedMeleeDamages.nonCritical}/></div>
          </div>
          <div className="buildmeleeinfo-item firstitemorder">
            <div>Melee Damage</div>
            <div className="attackspeed">{attackSpeed}</div>
            <div className="row-container">
              <div className="dps column-container">
                <div className="small-info">DPS</div>
                <div>{computedMeleeDamages.averageDps}</div>
              </div>
              <div className="dps column-container">
                <div className="small-info">Per Hit</div>
                <div>{computedMeleeDamages.averageDamagePerHit}</div>
              </div>
            </div>
            <div className='column-container'>
              <div className='small-info'>Poison Per Sec</div>
              <div>{Math.round(computedPoisonPerSec)}</div>
            </div>
          </div>
          <div className="buildmeleeinfo-item">
              <div>Critical Damage</div>
              <div className="dps column-container">
                <div className="small-info">Per Hit</div>
                <div>{computedMeleeDamages.criticalAverage}</div>
              </div>
              <div className='damage-container'><DamageContainerDesign spellMinMaxData={computedMeleeDamages.critical}/></div>
          </div>
        </div>
      </div>
    );
}

function refactorAttackSpeed(attackSpeed) {
    let split = attackSpeed.split('_')
    split = split.map(v => v.toUpperCase()+' ')
    return `${split} ATTACK SPEED`.replace(",", "")
}