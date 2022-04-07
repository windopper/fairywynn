
const OPEN = 'powder/open'
const CLOSE = 'powder/close'

export const openPowderBuild = (item) => {
    return {
        type: OPEN,
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
    item: null
}


export const powderbuild = (state = initialState, action) => {
    switch(action.type) {
        case OPEN: {
            state.state = true
            state.item = action.item
            return state
        }
        case CLOSE: {
            state.state = false
            state.item = null
            return state
        }
        default: return state
    }
}