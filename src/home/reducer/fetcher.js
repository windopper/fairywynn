export const COMPLETE = (v) => {
    return {
        type: 'fetcher/COMPLETE',
        data: v
    }
}

export const FETCHING = () => {
    return {
        type: 'fetcher/FETCHING'
    }
}

const initialState = []

export const fetcher = (state = initialState, action) => {
    switch(action.type) {
        case 'fetcher/COMPLETE': {
            state = action.data
            return state
        }
        case 'fetcher/FETCHING': {
            state = []
            return state
        }
        default: {
            return state;
        }
    }
}