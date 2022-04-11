import { store } from "..";

const ELEMENTMAP = {
    "✹": "f",
    "✤": "e",
    "❉": "w",
    "❋": "a",
    "✦": "t"
}
const NUMBERCONVERTER = {
    "I": 1,
    "II": 2,
    "III": 3,
    "IV": 4,
    "V": 5,
    "VI": 6
}

export function exportData() {
    const itembuild = store.getState().itembuild;
    const BUILDEQUIPS = ['helmet', 'chestplate', 'leggings', 'boots', 'weapon', 'ring1', 'ring2', 'bracelet', 'necklace']
    const data = {
        0: undefined,
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
        6: undefined,
        7: undefined,
        8: undefined
    }
    BUILDEQUIPS.forEach((v, i) => {
        if(itembuild[v]) {
            data[i] = {
                'n': itembuild[v].item.name,
                'p': itembuild[v].powder.map(v => {
                    let element = v.charAt(0)
                    return ELEMENTMAP[element]+NUMBERCONVERTER[v.slice(1)]
                })
            }
        }
    })
    let encoded = btoa(JSON.stringify(data))
    return encoded
}

export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
}