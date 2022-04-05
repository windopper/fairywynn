import { useReducer } from "react"

export const FILTERMINLEVEL = (level) => { return {
    type: 'filter/minLevel',
    minLevel: level
}}

export const FILTERMAXLEVEL = (level) => { return {
    type: 'filter/maxLevel',
    maxLevel: level
}}

export const FILTERCATEGORY = (category) => {
    return {
        type: 'filter/category',
        category: category
    }
}

export const FILTERRARITY = (rarity) => {
    return {
        type: 'filter/rarity',
        rarity: rarity
    }
}

export const initialFilter = {
    minLevel: 0,
    maxLevel: 255,
    Category: 'all',
    Rarity: 'All',
    Filter1: '',
    Filter2: '',
    Filter3: '',
    Filter4: ''
}

export const filter = (state = initialFilter, action) => {
    switch(action.type) {
        case 'filter/minLevel': {
            if(action.minLevel === '-') state.minLevel = 0
            else state.minLevel = action.minLevel
            return state
        }
        case 'filter/maxLevel': {
            if(action.maxLevel === '-') state.maxLevel = 255
            else state.maxLevel = action.maxLevel
            return state
        }
        case 'filter/category': {
            state.Category = action.category
            return state
        }
        case 'filter/rarity': {
            state.Rarity = action.rarity
            return state
        }
        default:
            return state;
    }
}