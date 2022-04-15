import { leafSet } from "../data/ItemV4_Sets"
import { BUILDEQUIPS } from "../home/reducer/itembuild"

export const computeSetStats = (itemBuildData, value) => {
    const setMap = new Map()
    BUILDEQUIPS.filter(v => itemBuildData[v]).filter(v => itemBuildData[v].item.set).forEach(v => {
        const item = itemBuildData[v].item
        const setName = item.set
        if(setMap.has(setName)) setMap.set(setName, [item])
        else setMap.set(setName, setMap.get(setName).push(item))
    })

    const sets = setMap.keys()
    for(let setName in sets) {
        let setPiece = setMap.get(setName).length

        switch(setName) {
            case 'Leaf': {
                return computefunction(leafSet, setPiece, value)
            }
            default: 0;
        }
    }

    const computefunction = (setJsonData, piece, v) => {
        if(setJsonData[piece]) {
            return setJsonData[piece][v]
        } else {
            return 0
        }
    }
}

