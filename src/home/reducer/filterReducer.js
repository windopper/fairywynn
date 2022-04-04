export const FILTERMINLEVEL = (level) => { return {
    type: 'filter/minLevel',
    level: level
}}

export const FILTERMAXLEVEL = (level) => { return {
    type: 'filter/maxLevel',
    level: level
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
    Category: [],
    Rarity: [],
    Descending: [],
    Ascending: [],
}

export function filteringReducer(state, action) {
    switch(action) {
        case 'filter/minLevel': {
            state.minLevel = action.minLevel
            return state
        }
        case 'filter/maxLevel': {
            state.maxLevel = action.maxLevel
            return state
        }
        case 'filter/category': {
            state.Category = state.category
        }
        case 'filter/rarity': {
            state.Rarity = state.rarity
        }
        default:
            return state;
    }
}