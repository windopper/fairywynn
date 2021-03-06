
export const SEARCH = (v) => {
    return {
        type: 'SEARCH',
        content: v
    }
}

const initialSearch = {
    currentSearch: '',
    preSearch: []
}

export const searchReducer = (state = initialSearch , action) => {
    switch(action.type) {
        case 'SEARCH' : {
            state.currentSearch = action.content
            if(action.content !== '') {
                if(state.preSearch.length === 10) state.preSearch.pop()
                state.preSearch.splice(0, 0, action.content)
            }
            return state
        }
        default: {
            return state
        }
    }
}