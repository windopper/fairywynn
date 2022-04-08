import { store } from "..";

export function exportData() {
    return new Buffer(store.getState().itembuild, 'base64')
}