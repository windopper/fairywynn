import { useStore } from "react-redux"
import { store } from "../.."
import { GetArmorDefenseWithPowder, getBuildDamages, GetWeaponDamageWithPowder, StatAssignCalculateFunction } from "../../utils/WynnMath"

const IMPORTBUILD = 'build/importbuild'
const UPDATEBUILD = 'build/updatebuild'
const ADDITEM = 'build/additem'
const REMOVEITEM = 'build/removeitem'
const ADDPOWDERBOOST = 'build/addpowderboost'
const REMOVEPOWDERBOOST = 'build/removepowderboost'
const ADDABILITYBOOST = 'build/addabilityboost'
const REMOVEABILITYBOOST = 'build/removeabilityboost'
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
    settings: {
        level: 106,
        boosts: [],
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

export const updatebuild = (buildDamages, statAssigned) => {
    return {
        type: UPDATEBUILD,
        buildDamages: buildDamages,
        statAssigned: statAssigned
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

export const itembuild = (state = initialState, action) => {
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
            state.currentBuild.computedDamage = action.buildDamages
            state.currentBuild.statAssigned.properStatAssign = action.statAssigned.properStatAssign
            state.currentBuild.statAssigned.finalStatTypePoints = action.statAssigned.finalStatTypePoints
            state.currentBuild.statAssigned.requireStatTypePoints = action.statAssigned.requireStatTypePoints
            return state
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

            if(state.settings.powderBoostValue <= 1) state.settings.powderBoosts = 1
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
            if(state.settings.abilityBoostValue <= 1) state.settings.abilityBoosts = 1
            break;
        }
        default: return state
    }
    return state;
}

export const hasItemInBuild = (item) => {
    for(let v in BUILDEQUIPS) {
        // console.log(v)
        if(store.getState().itembuild[BUILDEQUIPS[v]] !== undefined) {
            if(store.getState().itembuild[BUILDEQUIPS[v]].item.name === item.name) {
                return true
            }
        }
    }
    return false
}

export const hasItemTypeInBuild = (equipType) => {
    return store.getState().itembuild[equipType] !== undefined
}