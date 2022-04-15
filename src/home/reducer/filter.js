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

export const FILTER1STATS = (stats, sort = 'ascend') => {
    return {
        type: 'filter/stats_1',
        stats: stats,
        sort: sort,
    }
}

export const FILTER2STATS = (stats, sort = 'ascend') => {
    return {
        type: 'filter/stats_2',
        stats: stats,
        sort: sort,
    }
}

export const FILTER3STATS = (stats, sort = 'ascend') => {
    return {
        type: 'filter/stats_3',
        stats: stats,
        sort: sort,
    }
}

export const FILTER4STATS = (stats, sort = 'ascend') => {
    return {
        type: 'filter/stats_4',
        stats: stats,
        sort: sort,
    }
}

export const initialFilter = {
    minLevel: 0,
    maxLevel: 255,
    Category: 'all',
    Rarity: 'All',
    Filter1: {
        type: 'All',
        sort: 'ascend'
    },
    Filter2: {
        type: 'All',
        sort: 'ascend'
    },
    Filter3: {
        type: 'All',
        sort: 'ascend'
    },
    Filter4: {
        type: 'All',
        sort: 'ascend'
    },
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
        case 'filter/stats_1': {
            state.Filter1 = {
                type: action.stats,
                sort: action.sort,
            }
            return state
        }
        case 'filter/stats_2': {
            state.Filter2 = {
                type: action.stats,
                sort: action.sort,
            }
            return state
        }
        case 'filter/stats_3': {
            state.Filter3 = {
                type: action.stats,
                sort: action.sort,
            }
            return state
        }
        case 'filter/stats_4': {
            state.Filter4 = {
                type: action.stats,
                sort: action.sort,
            }
            return state
        }
        default:
            return state;
    }
}