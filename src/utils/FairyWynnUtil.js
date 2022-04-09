import { store } from "..";

export function exportData() {
    return new Buffer(store.getState().itembuild, 'base64')
}

export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
}