import { useLocation } from "react-router-dom";
import { store } from "..";
import { itemV4 } from "../data/ItemV4";
import { BUILDEQUIPS, importbuild, manuallyupdatestat } from "../home/reducer/itembuild";

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

const REVERSEELEMENTMAP = {
    'f': "✹",
    'e': "✤",
    'w': "❉",
    'a': "❋",
    't': "✦"
}

const REVERSENUMBERCONVERTER = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI'
}

const SKILLPOINTS = ['strength', 'dexterity', 'intelligence', 'defense', 'agility']

export function exportData() {
    const itembuild = store.getState().itembuild;
    const BUILDEQUIPS = ['helmet', 'chestplate', 'leggings', 'boots', 'weapon', 'ring1', 'ring2', 'bracelet', 'necklace']
//              equip info                             powder information    manually assigned
//               v                                     v                   v
//               0                                     9                   14               18
    const data = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]

    BUILDEQUIPS.forEach((v, i) => {
        if(itembuild[v]) {
            data[i] = itemV4.items.findIndex(p => p.name === itembuild[v].item.name)
            let powderTrans = ''
            itembuild[v].powder.forEach(v2 => powderTrans += ELEMENTMAP[v2.charAt(0)]+NUMBERCONVERTER[v2.charAt(1)])
            data[i+5] = powderTrans
        }
    })

    for(let i = 14; i<=18; ++i) {
        let value = itembuild.settings.manuallyUpdateStat[SKILLPOINTS[i-14]]
        data[i] = value
    }

    let encoded = btoa(JSON.stringify(data))
    // console.log(data)
    return window.location.href+"#/importbuild/"+encoded
}

export function importData(encodedData) {

    console.log(encodedData)

    try {
        let ab = atob(encodedData)
        let decoded = JSON.parse(ab)
    
        const data = {
            'helmet': undefined,
            'chestplate': undefined,
            'leggings': undefined,
            'boots': undefined,
            'weapon': undefined,
            'ring1': undefined,
            'ring2': undefined,
            'bracelet': undefined,
            'necklace': undefined
        }
    
        const MUS = {
            'strength': 0,
            'dexterity': 0,
            'intelligence': 0,
            'defense': 0,
            'agility': 0
        }
    
        // Powder and Equips
        BUILDEQUIPS.forEach((v, i) => {
            
            if(decoded[i] !== -1 && i <= 8) {
                let powderParse = []
                if(decoded[i+5]) {
                    let encodedPowder = decoded[i+5]
                    while(encodedPowder.length > 0) {
                        let slice = encodedPowder.slice(0, 2)
                        encodedPowder = encodedPowder.slice(2)
                        powderParse.push(REVERSEELEMENTMAP[slice.charAt(0)]+REVERSENUMBERCONVERTER[slice.charAt(1)])
                    }
                }
                data[v] = {
                    'item': itemV4.items[decoded[i]],
                    'powder': powderParse
                }
            }
        })
    
        // Manually Update Stat
        for(let i = 14; i<=18; ++i) {
            let value = decoded[i]
            MUS[SKILLPOINTS[i-14]] = value
        }
    
    
        store.dispatch(importbuild(data))
        store.dispatch(manuallyupdatestat(MUS))
    }
    catch(e) {
        console.log(e)
        return false
    }
    return true
}

export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
}