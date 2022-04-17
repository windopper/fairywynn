import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { importData } from "../utils/FairyWynnUtil"
import { useDispatch, useStore } from "react-redux"
import { showBuildDetail } from "../home/reducer/builddetail"
import { reCalculateBuildAndUpdate } from "../home/reducer/itembuild"
import { showBuildImportFailPopUps } from "../home/reducer/popup"

export default function useImportBuild(importUrl) {

    const importcode = importUrl.split('/')[2]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const store = useStore()
    
    useEffect(() => {
        if(importUrl.includes('importbuild')) {
            const succeed = importData(importcode)
            if(succeed) {
                console.log('navigate!')
                navigate('../')
                setTimeout(() => {
                    reCalculateBuildAndUpdate(store.getState().itembuild)
                    dispatch(showBuildDetail)
                }, 1000)
            } else {
                navigate('../')
                showBuildImportFailPopUps('.', 2000)
            }
        }
    })
    
}