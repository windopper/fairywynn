import { useStore } from "react-redux"
import { store } from "../.."
import { deepCopy } from "../../utils/FairyWynnUtil"
import { GetArmorDefenseWithPowder, getBuildDamages, GetWeaponDamageWithPowder, StatAssignCalculateFunction } from "../../utils/WynnMath"
import { stats } from "../content/EnumParts"

const IMPORTBUILD = 'build/importbuild'
const UPDATEBUILD = 'build/updatebuild'
const UPDATESTAT = 'build/updatestat'
const UPdATEBUILDDAMAGE = 'build/updatebuilddamage'
const MANUALLYUPDATESTAT = 'build/manuallyupdatestat'

const RESETSETTING = 'build/resetsetting'

const ADDITEM = 'build/additem'
const REMOVEITEM = 'build/removeitem'

const ADDPOWDERBOOST = 'build/addpowderboost'
const REMOVEPOWDERBOOST = 'build/removepowderboost'
const ADDABILITYBOOST = 'build/addabilityboost'
const REMOVEABILITYBOOST = 'build/removeabilityboost'
const ADDDEFENSEBOOST = 'build/adddefenseboost'
const REMOVEDEFENSEBOOST = 'build/removedefenseboost'

const ADDBOOST = 'build/addboost'
const REMOVEBOOST = 'build/removeboost'

const ADDPOWDER = 'build/addpowder'
const REMOVEPOWDER = 'build/removepowder'

const weapons = ['dagger', 'spear', 'wand', 'bow', 'relik']

const DAMAGES = {
    mindamage: 0,
    maxdamage: 0,
    minearthDamage: 0,
    maxearthDamage: 0,
    minthunderDamage: 0,
    maxthunderDamage: 0,
    minwaterDamage: 0,
    maxwaterDamage: 0,
    minfireDamage: 0,
    maxfireDamage: 0,
    minairDamage: 0,
    maxairDamage: 0,
  }

export const BUILDEQUIPS = ['helmet', 'chestplate', 'leggings', 'boots', 'weapon', 'ring1', 'ring2', 'bracelet', 'necklace']

const initialState = {
    buildCode: 0,
    settings: {
        resetCode: 0,
        level: 106,
        boosts: [],
        manuallyUpdateStat: {
            'strength': 0,
            'dexterity': 0,
            'intelligence': 0,
            'defense': 0,
            'agility': 0,
        },
        defenseBoosts: [],
        defenseBoostValue: 1,
        powderBoostValue: 1,
        abilityBoostValue: 1,
    },
    currentBuild: {
        computedDamage: {
            'spell': {
                '1': DAMAGES,
                '2': DAMAGES,
                '3': DAMAGES,
                '4': DAMAGES,
            },
            'melee': {
                DAMAGES,
            }
        },
        computedStat: {

        },
        statAssigned: {
            finalStatTypePoints: {
                'strength': 0,
                'dexterity': 0,
                'intelligence': 0,
                'defense': 0,
                'agility': 0,
            },
            properStatAssign: {
                'strength': 0,
                'dexterity': 0,
                'intelligence': 0,
                'defense': 0,
                'agility': 0,
            },
            requireStatTypePoints: {
                'strength': 0,
                'dexterity': 0,
                'intelligence': 0,
                'defense': 0,
                'agility': 0,
            }
        }
    },
    helmet: undefined,
    chestplate: undefined,
    leggings: undefined,
    boots: undefined,
    weapon: undefined,
    ring1: undefined,
    ring2: undefined,
    bracelet: undefined,
    necklace: undefined
}

export const importbuild = (build) => {
    return {
        type: IMPORTBUILD,
        build: build,
    }
}

export const updatebuild = (itemBuildData) => {
    return {
        type: UPDATEBUILD,
    }
}

export const updateStat = (itemBuildData) => {
    return {
        type: UPDATESTAT,
        statAssigned: StatAssignCalculateFunction(itemBuildData)
    }
}

export const updatebuilddamage = (itemBuildData) => {
    return {
        type: UPdATEBUILDDAMAGE,
        computedDamage: getBuildDamages(itemBuildData),
    }
}

export const manuallyupdatestat = (manuallyUpdateStat) => {
    return {
        type: MANUALLYUPDATESTAT,
        manuallyUpdateStat: manuallyUpdateStat
    }
}

export const resetsetting = () => {
    return {
        type: RESETSETTING
    }
}

export const additem = (item) => {
    return {
        type: ADDITEM,
        item: item,
        powder: []
    }
}

export const removeitem = (type) => {
    return {
        type: REMOVEITEM,
        equip: type
    }
}

export const addpowderboost = (boostValue, name) => {
    return {
        type: ADDPOWDERBOOST,
        boostValue: boostValue,
        boostName: name
    }
}

export const removepowderboost = (boostValue, name) => {
    return {
        type: REMOVEPOWDERBOOST,
        boostValue: boostValue,
        boostName: name
    }
}

export const addabilityboost = (boostValue, name) => {
    return {
        type: ADDABILITYBOOST,
        boostValue: boostValue,
        boostName: name
    }
}

export const removeabilityboost = (boostValue, name) => {
    return {
        type: REMOVEABILITYBOOST,
        boostValue: boostValue,
        boostName: name
    }
}

export const adddefenseboost = (boostValue, name) => {
    return {
        type: ADDDEFENSEBOOST,
        boostValue: boostValue,
        boostName: name,
    }
}

export const removedefenseboost = (boostValue, name) => {
    return {
        type: REMOVEDEFENSEBOOST,
        boostValue: boostValue,
        boostName: name,
    }
}

export const addboost = (ability, defense, name) => {
    return {
        type: ADDBOOST,
        abilityBoost: ability,
        defenseBoost: defense,
        name: name,
    }
}

export const removeboost = (ability, defense, name) => {
    return {
        type: REMOVEBOOST,
        abilityBoost: ability,
        defenseBoost: defense,
        name: name,
    }
}

export const addpowder = (equipType, powder) => {
    return {
        type: ADDPOWDER,
        equip: equipType,
        powder: powder,
    }
}

export const removepowder = (equipType, location) => {
    return {
        type: REMOVEPOWDER,
        equip: equipType,
        location: location,
    }
}

export const itembuild = (state = deepCopy(initialState), action) => {
    switch(action.type) {
        case ADDITEM: {
            let type
            if(action.item.type !== undefined) type = action.item.type.toLowerCase()
            if(action.item.accessoryType !== undefined) type = action.item.accessoryType.toLowerCase()
            if(type === 'ring') {
                if(state.ring1 === undefined) {
                    state.ring1 = {item: action.item, powder: [], armorDefense: null}
                    state.ring1.armorDefense = GetArmorDefenseWithPowder(type, state)
                } else {
                    state.ring2 = {item: action.item, powder: [], armorDefense: null}
                    state.ring2.armorDefense = GetArmorDefenseWithPowder(type, state)
                }
            } else if(weapons.includes(type)) {
                state.weapon = {item: action.item, powder: [], weaponDamage: null}
                state.weapon.weaponDamage = GetWeaponDamageWithPowder('weapon', state)
            }
            else {
                state[type] = {item: action.item, powder: [], armorDefense: null}
                state[type].armorDefense = GetArmorDefenseWithPowder(type, state)
            }
            return state
        }
        case REMOVEITEM: {
            state[action.equip] = undefined
            return state
        }
        case ADDPOWDER: {

            let type = action.equip
            
            if(state[action.equip].item.sockets > state[action.equip].powder.length) {
                state[action.equip].powder.push(action.powder)
                if(action.equip === 'weapon') state[action.equip].weaponDamage = GetWeaponDamageWithPowder(type, state)
                else state[action.equip].armorDefense = GetArmorDefenseWithPowder(type, state)
            }
            
            return state
        }
        case REMOVEPOWDER: {

            let type = action.equip

            state[action.equip].powder.splice(action.location, 1)
            if(action.equip === 'weapon') state[action.equip].weaponDamage = GetWeaponDamageWithPowder(type, state)
            else state[action.equip].armorDefense = GetArmorDefenseWithPowder(type, state)

            return state
        }
        case IMPORTBUILD: {
            state = action.build
            return state
        }
        case UPDATEBUILD: {
            state.buildCode += 1;
            return state
        }
        case UPDATESTAT: {
            const statAssigned = action.statAssigned
            state.currentBuild.statAssigned.properStatAssign = statAssigned.properStatAssign
            state.currentBuild.statAssigned.finalStatTypePoints = statAssigned.finalStatTypePoints
            state.currentBuild.statAssigned.requireStatTypePoints = statAssigned.requireStatTypePoints
            break;
        }
        case UPdATEBUILDDAMAGE: {
            const computedDamage = action.computedDamage
            state.currentBuild.computedDamage = computedDamage
            break;
        }
        case RESETSETTING: {
            state.settings = deepCopy(initialState.settings)
            state.settings.resetCode++
            return state;
        }
        case MANUALLYUPDATESTAT: {
            state.settings.manuallyUpdateStat = action.manuallyUpdateStat
            break;
        }
        case ADDPOWDERBOOST: {
            if(!state.settings.boosts.includes(action.boostName)) {
                state.settings.powderBoostValue += action.boostValue
                state.settings.boosts.push(action.boostName)
            }
            break;
        }
        case REMOVEPOWDERBOOST: {
            if(state.settings.boosts.includes(action.boostName)) {
                state.settings.powderBoostValue -= action.boostValue
                state.settings.boosts = state.settings.boosts.filter(v => action.boostName !== v)
            }

            if(state.settings.powderBoostValue <= 1) state.settings.powderBoostValue = 1
            break;
        }
        case ADDABILITYBOOST: {
            if(!state.settings.boosts.includes(action.boostName)) {
                state.settings.abilityBoostValue += action.boostValue
                state.settings.boosts.push(action.boostName)
            }
            break;
        }
        case REMOVEABILITYBOOST: {
            if(state.settings.boosts.includes(action.boostName)) {
                state.settings.abilityBoostValue -= action.boostValue
                state.settings.boosts = state.settings.boosts.filter(v => action.boostName !== v)
            }
            if(state.settings.abilityBoostValue <= 1) state.settings.abilityBoostValue = 1
            break;
        }
        case ADDDEFENSEBOOST: {
            if(!state.settings.defenseBoosts.includes(action.boostName)) {
                state.settings.defenseBoostValue += action.boostValue
                state.settings.defenseBoosts.push(action.boostName)
            }
            break;
        }
        case REMOVEDEFENSEBOOST: {
            if(state.settings.defenseBoosts.includes(action.boostName)) {
                state.settings.defenseBoostValue -= action.boostValue
                state.settings.defenseBoosts = state.settings.defenseBoosts.filter(v => action.boostName !== v)
            }
            if(state.settings.defenseBoostValue <= 1) state.settings.defenseBoostValue = 1
            break;
        }
        case ADDBOOST: {
            if(!state.settings.boosts.includes(action.name) && action.abilityBoost != 0) {
                state.settings.abilityBoostValue += action.abilityBoost
                state.settings.boosts.push(action.name)
            }
            if(!state.settings.defenseBoosts.includes(action.name) && action.defenseBoost != 0) {
                state.settings.defenseBoostValue += action.defenseBoost
                state.settings.defenseBoosts.push(action.name)
            }
            break;
        }
        case REMOVEBOOST: {
            if(state.settings.boosts.includes(action.name)) {
                state.settings.abilityBoostValue -= action.abilityBoost
                state.settings.boosts = state.settings.boosts.filter(v => action.name !== v)
            }
            if(state.settings.abilityBoostValue <= 1) state.settings.abilityBoostValue = 1

            if(state.settings.defenseBoosts.includes(action.name)) {
                state.settings.defenseBoostValue -= action.defenseBoost
                state.settings.defenseBoosts = state.settings.defenseBoosts.filter(v => action.name !== v)
            }
            if(state.settings.defenseBoostValue <= 1) state.settings.defenseBoostValue = 1
            break;
        }
        default: return state
    }
    return state;
}

export const hasItemInBuild = (item, itembuilddata) => {
    for(let v in BUILDEQUIPS) {
        // console.log(v)
        if(itembuilddata[BUILDEQUIPS[v]]) {
            if(itembuilddata[BUILDEQUIPS[v]].item.name === item.name) {
                return true
            }
        }
    }
    return false
}

export const hasItemTypeInBuild = (equipType, itembuilddata) => {
    return itembuilddata[equipType] !== undefined
}

export const getDefenseBoost = () => {
    return store.getState().itembuild.settings.defenseBoostValue
}

export const reCalculateBuildAndUpdate = (itemBuildData) => {
    store.dispatch(updateStat(itemBuildData))
    store.dispatch(updatebuilddamage(itemBuildData))
    store.dispatch(updatebuild(itemBuildData))
}