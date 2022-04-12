import { BUILDEQUIPS } from "../home/reducer/itembuild";
import { store } from "..";
import { getMaxSum, getDefaultHealth } from "./WynnMath";

export function getMajorIds(itembuildData) {
    return BUILDEQUIPS.filter(v => itembuildData[v]).filter(v => itembuildData[v].item.majorIds).map(v => itembuildData[v].item.majorIds[0])
}

export function getTotalHealth(itemBuildData) {
    const currentLevel = itemBuildData.settings.level
    const totalHealth = getMaxSum(itemBuildData, "health", true) + getDefaultHealth(currentLevel) + getMaxSum(itemBuildData, "healthBonus")
    return totalHealth < 5 ? 5 : totalHealth;
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