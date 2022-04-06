import usePopUpShow from "../home/hooks/usePopUpShow"
import { isRegisteringPopUp, isRegisteringWarnPopUp, isRemovingPopUp } from "../home/reducer/popup"
import AlreadyBuildAlert from "./AlreadyInBuildAlert"
import RegisteringAlert from "./RegisteringAlert"
import RemoveAlert from "./RemoveAlert"

export default function Alerts() {

    const state = usePopUpShow()

    return (
        <>
        {isRegisteringPopUp(state) ? <RegisteringAlert state={state}/> : null}
        {isRemovingPopUp(state) ? <RemoveAlert state={state}/> : null}
        {isRegisteringWarnPopUp(state) ? <AlreadyBuildAlert state={state}/> : null}
        </>
    )
}