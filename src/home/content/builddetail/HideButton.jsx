import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { hideBuildDetail } from "../../reducer/builddetail"
import { removeitem } from "../../reducer/itembuild"
import { showRemovingPopUps } from "../../reducer/popup"

export default function HideButton() {

    const dispatch = useDispatch()

    const dispatchCallback = useCallback(() => dispatch(hideBuildDetail), [dispatch])

    return (
        <div className="hidebutton" onClick={() => dispatchCallback()}>

        </div>
    )
}