import { store } from "../index.js"
import { importData } from '../utils/FairyWynnUtil.js'
import { reCalculateBuildAndUpdate } from '../home/reducer/itembuild.js'

console.log(window.location)

const importUrl = window.location.pathname
const importcode = importUrl.split('/')[3]

if(importUrl.includes('importbuild')) {
    const succeed = importData(importcode)
    if(succeed) {
        console.log('navigate!')
        window.location.href = window.location.origin+'/fairywynn'
        setTimeout(() => {
            reCalculateBuildAndUpdate(store.getState().itembuild)
            store.dispatch(showBuildDetail)
        }, 1000)
    } else {
        window.location.href = window.location.origin+'/fairywynn'
    }
}