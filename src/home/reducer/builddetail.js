const SHOW = 'builddetail/show'
const HIDE = 'builddetail/hide'

export const showBuildDetail = {
    type: SHOW
}

export const hideBuildDetail = {
    type: HIDE
}

export const builddetail = (state = false, action) => {
    switch(action.type) {
        case SHOW: {
            state = true
            return state
        }
        case HIDE: {
            state = false
            return state
        }
        default: {
            return state
        }
    }
}