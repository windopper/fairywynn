import { store } from "../.."

const ADD = 'popup/add'
const REMOVE = 'popup/remove'

const REGISTERSUCCESS = 'popup/registersuccess'
const REMOVESUCCESS = 'popup/removesuccess'
const REGISTERWARN = 'popup/registerwarn'

const add = (v, i, alertType) => {
    return {
        type: ADD,
        content: v,
        alertType: alertType,
        mili: i
    }
}

const remove = () => {
    return {
        type: REMOVE
    }
}

const initialState = {
    status: false,
    alertType: '',
    content: '',
    mili: 0,
}

export const popup = (state = initialState, action) => {
    switch(action.type) {
        case ADD: {
            state.status = true;
            state.content = action.content;
            state.alertType = action.alertType
            state.mili = action.mili
            return state;
        }
        case REMOVE: {
            state.status = false
            state.content = ''
            state.alertType = ''
            state.mili = 0
            return state
        }
        default: {
            return state;
        }
    }
}

let currentTimer

export function showCheckingPopUps(text, mili) {
    if(currentTimer) {
        clearTimeout(currentTimer)
        store.dispatch(remove())
    }
    setTimeout(() => store.dispatch(add(text, mili, REGISTERSUCCESS)), 10)
    currentTimer = setTimeout(() => {
        store.dispatch(remove())
        currentTimer = undefined;
    }, mili)
}

export function showWarningPopUps(text, mili) {
    if(currentTimer) {
        clearTimeout(currentTimer)
        store.dispatch(remove())
    }
    setTimeout(() => store.dispatch(add(text, mili, REGISTERWARN)), 10)
    currentTimer = setTimeout(() => {
        store.dispatch(remove())
        currentTimer = undefined;
    }, mili)
}

export function showRemovingPopUps(text, mili) {
    if(currentTimer) {
        clearTimeout(currentTimer)
        store.dispatch(remove())
    }
    setTimeout(() => store.dispatch(add(text, mili, REMOVESUCCESS)), 10)
    currentTimer = setTimeout(() => {
        store.dispatch(remove())
        currentTimer = undefined;
    }, mili)
}

export function isRegisteringPopUp(state) {
    return state.alertType === REGISTERSUCCESS
}

export function isRemovingPopUp(state) {
    return state.alertType === REMOVESUCCESS
}

export function isRegisteringWarnPopUp(state) {
    return state.alertType === REGISTERWARN
}