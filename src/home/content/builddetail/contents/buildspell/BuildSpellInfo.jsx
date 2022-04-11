import './BuildSpellStyle.scss'
import { getBuildDamages } from '../../../../../utils/WynnMath'
import { hasItemTypeInBuild } from '../../../../reducer/itembuild'
import EmptySpellCard from './EmptySpellCard'
import SpellProfileCard from './SpellProfileCard'

export default function BuildSpellInfo({itemBuildData, computedBuildDamages}) {

    const currentLevel = itemBuildData.settings.level
    const firstSpell = computedBuildDamages.spell[1]
    const secondSpell = computedBuildDamages.spell[2]
    const thirdSpell = computedBuildDamages.spell[3]
    const fourthSpell = computedBuildDamages.spell[4]

    if(!hasItemTypeInBuild('weapon')) {
        return (
            <div className='buildspellinfo-container'>
                <EmptySpellCard />
                <EmptySpellCard />
                <EmptySpellCard />
                <EmptySpellCard />
            </div>
        )
    }

    let weaponItem = itemBuildData.weapon.item;
    let weaponType = weaponItem.type.toLowerCase();

    return (
        <div className="buildspellinfo-container">
            <SpellProfileCard currentLevel={currentLevel} spellDamageData={firstSpell} spellNumber={1} weaponType={weaponType} />
            <SpellProfileCard currentLevel={currentLevel} spellDamageData={secondSpell} spellNumber={2} weaponType={weaponType} />
            <SpellProfileCard currentLevel={currentLevel} spellDamageData={thirdSpell} spellNumber={3} weaponType={weaponType} />
            <SpellProfileCard currentLevel={currentLevel} spellDamageData={fourthSpell} spellNumber={4} weaponType={weaponType} />
        </div>
    )
}