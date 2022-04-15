import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { importData } from "../utils/FairyWynnUtil"
import { useDispatch, useStore } from "react-redux"
import { showBuildDetail } from "../home/reducer/builddetail"
import { reCalculateBuildAndUpdate } from "../home/reducer/itembuild"

export default function ImportBuild({match}) {
    const { importcode } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const store = useStore()
    
    useEffect(() => {
        importData(importcode)
        navigate('../')
        setTimeout(() => {
            reCalculateBuildAndUpdate(store.getState().itembuild)
            dispatch(showBuildDetail)
        }, 1000)
    })
    return (
        <>
        </>
    )
}