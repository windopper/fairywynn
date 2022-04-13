import { BUILDEQUIPS, getDefenseBoost } from "../home/reducer/itembuild";
import { store } from "..";
import { getMaxSum, getDefaultHealth, SkillPointToPercentage, getDefaultDefense, getMinSum, getManaUsed } from "./WynnMath";
import { CLASSSKILLS } from "./WynnData";

export function getMajorIds(itembuildData) {
    return BUILDEQUIPS.filter(v => itembuildData[v]).filter(v => itembuildData[v].item.majorIds).map(v => itembuildData[v].item.majorIds[0])
}

export function getTotalHealth(itemBuildData) {
    const currentLevel = itemBuildData.settings.level
    const totalHealth = getMaxSum(itemBuildData, "health", true) + getDefaultHealth(currentLevel) + getMaxSum(itemBuildData, "healthBonus")
    return totalHealth < 5 ? 5 : totalHealth;
}

export function getTotalEHP(itemBuildData) {
    const defaultDefense = getDefaultDefense(itemBuildData)
    const healthSum = getTotalHealth(itemBuildData)
    const defense = SkillPointToPercentage(itemBuildData.currentBuild.statAssigned.finalStatTypePoints.defense) / 100
    const agility = SkillPointToPercentage(itemBuildData.currentBuild.statAssigned.finalStatTypePoints.agility) / 100
    const effectHealth = healthSum / ((1 - defense) * (1 - agility) * (2 - defaultDefense) * (2 - getDefenseBoost()))
    return effectHealth
}

export function getComputedManaCost(selectedClass, spellNumber, itemBuildData) {
    const selectedSkill = CLASSSKILLS[selectedClass][spellNumber];
    const selectedGrade = getSelectedGrade(spellNumber, itemBuildData.settings.level)

    const statAssigned = store.getState().itembuild.currentBuild.statAssigned.finalStatTypePoints

    const intelligencePoints = statAssigned.intelligence
    const skillBaseCost = selectedSkill[selectedGrade].mana
    const spellCostRaw = getMinSum(itemBuildData, `spellCostRaw${spellNumber}`, false)
    const spellCostPct = getMinSum(itemBuildData, `spellCostPct${spellNumber}`, false)
    const computedCost = getManaUsed(skillBaseCost, intelligencePoints, spellCostRaw, spellCostPct)
    return computedCost
}

export function getSelectedGrade(spellNumber, currentLevel) {
    const ENUM_GRADE = ["grade1", "grade2", "grade3"];
    let selectedGrade = "";
    ENUM_GRADE.forEach((v) => {
      if (CLASSSKILLS.archer[spellNumber][v].level < currentLevel)
        selectedGrade = v;
    });
    return selectedGrade;
  }

export function getPowderDamageBoostMultiplier(itemBuildData) {
    const powderBoosts = itemBuildData.settings.powderBoosts
    let multiplier = {
        'damage': 1,
        'earthDamage': 1,
        'thunderDamage': 1,
        'waterDamage': 1,
        'fireDamage': 1,
        'airDamage': 1
    }
}

export function getAbilityDamageBoostMultiplier() {
    return store.getState().itembuild.settings.abilityBoostValue
}

export function getAbilityDefenseBoostMultiplier() {
    return store.getState().itembuild.settings.abilityBoostValue
}