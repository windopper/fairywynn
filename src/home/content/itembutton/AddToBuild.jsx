import { useCallback } from 'react'
import { batch, useDispatch } from 'react-redux'
import { additem } from '../../reducer/itembuild'
import { showCheckingPopUps } from '../../reducer/popup'
import './ItemButton.scss'

export default function AddToBuild(props) {

    const dispatch = useDispatch()

    const dispatchCallBack = useCallback(() => {

        return batch(() => {
            dispatch(additem(props.data))
            showCheckingPopUps(props.data.name, 3000)
        })

    }, [dispatch])

    const onclick = () => {
        dispatchCallBack()
    }

    return (
        <div className="itembutton build" onClick={() => onclick()}>
            ADD ITEM TO BUILD
        </div>
    )
}