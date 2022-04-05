import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { removeitem } from "../../reducer/itembuild"
import { showRemovingPopUps } from "../../reducer/popup"

export default function RemoveButton({type, item}) {

    const [hover, setHover] = useState(false)
    const dispatch = useDispatch()

    const dispatchCallback = useCallback(() => dispatch(removeitem(type)), [dispatch])

    const onclick = () => {
        dispatchCallback()
        showRemovingPopUps(item.name, 3000)
    }

    return (
        <div className="removeitem" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => onclick()}>

        </div>
    )
}