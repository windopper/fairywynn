import { powderDamageConvert, powderDefenseConvert } from "./WynnData";
import { damageEmojiReverse, defenseEmojiReverse } from "../home/content/EnumParts";

export function SkillPointToPercentage(x) {
    let sum = 0;
    if(x <= 0) return 0
    for(let i=1; i<=x; i++) {
        sum += 0.9908 ** i
    }
    const round = Math.round(sum * 10) / 10
    // console.log(round)
    return round
}

export function GetWeaponDamageWithPowder(equipType, state) {
    const itembuild = state[equipType]
    if(equipType !== 'weapon') {
        return null
    }
    if(itembuild === undefined) {
        return null
    }

    const item = itembuild.item
    const powders = itembuild.powder
    const neutralDamage = itembuild.item['damage']

    const minNeutralDamage = parseInt(neutralDamage.split("-")[0])
    const maxNeutralDamage = parseInt(neutralDamage.split("-")[1])

    let currentMinNeutralDamage = minNeutralDamage;
    let currentMaxNeutralDamage = maxNeutralDamage;
    
    let converted = 0.0

    const weaponDamage = {
        "damage": item.damage,
        "earthDamage": item.earthDamage,
        "thunderDamage": item.thunderDamage,
        "waterDamage": item.waterDamage,
        "fireDamage": item.fireDamage,
        "airDamage": item.airDamage
    }

    for(const _ in powders) {

        let currentTypePowder = powders[_]
        const currentElement = damageEmojiReverse[currentTypePowder.charAt(0)]
        let currentDamageData = weaponDamage[currentElement]
        let mincurrentDamage = parseFloat(currentDamageData.split("-")[0])
        let maxcurrentDamage = parseFloat(currentDamageData.split("-")[1])

        if(converted <= 1) {
            if(converted + powderDamageConvert[currentTypePowder].fromNeutral >= 1) {
                
                mincurrentDamage += (1 - converted) * minNeutralDamage
                maxcurrentDamage += (1 - converted) * maxNeutralDamage
                currentMinNeutralDamage -= (1 - converted) * minNeutralDamage
                currentMaxNeutralDamage -= (1 - converted) * maxNeutralDamage

            } else {

                mincurrentDamage += powderDamageConvert[currentTypePowder].fromNeutral * minNeutralDamage
                maxcurrentDamage += powderDamageConvert[currentTypePowder].fromNeutral * maxNeutralDamage
                currentMinNeutralDamage -= powderDamageConvert[currentTypePowder].fromNeutral * minNeutralDamage
                currentMaxNeutralDamage -= powderDamageConvert[currentTypePowder].fromNeutral * maxNeutralDamage
            }
        }

        mincurrentDamage += parseFloat(powderDamageConvert[currentTypePowder].plus.split("-")[0])
        maxcurrentDamage += parseFloat(powderDamageConvert[currentTypePowder].plus.split("-")[1])

        mincurrentDamage = Math.floor(mincurrentDamage)
        maxcurrentDamage = Math.floor(maxcurrentDamage)
        currentMaxNeutralDamage = Math.floor(currentMaxNeutralDamage)
        currentMinNeutralDamage = Math.floor(currentMinNeutralDamage)

        if(mincurrentDamage <= 0) mincurrentDamage = 0
        if(maxcurrentDamage <= 0) maxcurrentDamage = 0
        weaponDamage[currentElement] = mincurrentDamage+"-"+maxcurrentDamage
        converted += parseFloat(powderDamageConvert[currentTypePowder].fromNeutral)
    }

    if(currentMaxNeutralDamage <= 0) currentMaxNeutralDamage = 0
    if(currentMinNeutralDamage <= 0) currentMinNeutralDamage = 0
    weaponDamage.damage = currentMinNeutralDamage+"-"+currentMaxNeutralDamage

    return weaponDamage
}

export function GetArmorDefenseWithPowder(equipType, state) {
    const itembuild = state[equipType]
    if(equipType == 'weapon') return null
    if(itembuild === undefined) return null

    const item = itembuild.item
    const powders = itembuild.powder

    const armorDefense = {
        "earthDefense": item.earthDefense,
        "thunderDefense": item.thunderDefense,
        "waterDefense": item.waterDefense,
        "fireDefense": item.fireDefense,
        "airDefense": item.airDefense
    }

    for(const _ in powders) {
        let currentTypePowder = powders[_]

        if(powderDefenseConvert[currentTypePowder].earthDefense !== undefined) {
            armorDefense.earthDefense += powderDefenseConvert[currentTypePowder].earthDefense
        } 
        if(powderDefenseConvert[currentTypePowder].thunderDefense !== undefined) {
            armorDefense.thunderDefense += powderDefenseConvert[currentTypePowder].thunderDefense
        }
        if(powderDefenseConvert[currentTypePowder].waterDefense !== undefined) {
            armorDefense.waterDefense += powderDefenseConvert[currentTypePowder].waterDefense
        }
        if(powderDefenseConvert[currentTypePowder].fireDefense !== undefined) {
            armorDefense.fireDefense += powderDefenseConvert[currentTypePowder].fireDefense
        }
        if(powderDefenseConvert[currentTypePowder].airDefense !== undefined) {
            armorDefense.airDefense += powderDefenseConvert[currentTypePowder].airDefense
        }
    }

    return armorDefense
}