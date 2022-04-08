
const OPEN = 'powder/open'
const CLOSE = 'powder/close'

export const openPowderBuild = (item, equipType) => {
    return {
        type: OPEN,
        equipType: equipType,
        item: item
    }
}

export const closePowderBuild = () => {
    return {
        type: CLOSE
    }
}

const initialState = {
    state: false,
    equipType: null,
    item: null
}


export const powderbuild = (state = initialState, action) => {
    switch(action.type) {
        case OPEN: {
            state.state = true
            state.equipType = action.equipType
            state.item = action.item
            return state
        }
        case CLOSE: {
            state.state = false
            state.equipType = null
            state.item = null
            return state
        }
        default: return state
    }
}