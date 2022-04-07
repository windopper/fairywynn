import { store } from "../.."

const ADDITEM = 'build/additem'
const REMOVEITEM = 'build/removeitem'
const ADDPOWDER = 'build/addpowder'

const weapons = ['dagger', 'spear', 'wand', 'bow', 'relik']

export const BUILDEQUIPS = ['helmet', 'chestplate', 'leggings', 'boots', 'weapon', 'ring1', 'ring2', 'bracelet', 'necklace']

const initialState = {
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

export const addpowder = (type, powder) => {
    return {
        type: ADDPOWDER,
        equip: type,
        powder: powder,
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
                    state.ring1 = {item: action.item, powder: []}
                } else state.ring2 = {item: action.item, powder: []}
            } else if(weapons.includes(type)) {
                state.weapon = {item: action.item, powder: []}
            }
            else {
                state[type] = {item: action.item, powder: []}
            }
            return state
        }
        case REMOVEITEM: {
            state[action.equip] = undefined
            return state
        }
        case ADDPOWDER: {
            state[action.equip].powder.push(action.powder)
            return state
        }
        default: return state
    }
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