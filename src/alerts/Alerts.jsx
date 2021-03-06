import usePopUpShow from "../home/hooks/usePopUpShow"
import { isBuildImportFailPopUp, isRegisteringPopUp, isRegisteringWarnPopUp, isRemovingPopUp } from "../home/reducer/popup"
import AlreadyBuildAlert from "./AlreadyInBuildAlert"
import RegisteringAlert from "./RegisteringAlert"
import RemoveAlert from "./RemoveAlert"
import ImportBuildFailAlert from "./ImportBuildFailAlert"

export default function Alerts() {

    const state = usePopUpShow()

    return (
        <>
        {isRegisteringPopUp(state) ? <RegisteringAlert state={state}/> : null}
        {isRemovingPopUp(state) ? <RemoveAlert state={state}/> : null}
        {isRegisteringWarnPopUp(state) ? <AlreadyBuildAlert state={state}/> : null}
        {isBuildImportFailPopUp(state) ? <ImportBuildFailAlert state={state}/> : null}
        </>
    )
}