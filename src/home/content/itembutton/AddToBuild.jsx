import { useCallback } from 'react'
import { batch, useDispatch } from 'react-redux'
import { additem, hasItemInBuild } from '../../reducer/itembuild'
import { showCheckingPopUps, showWarningPopUps } from '../../reducer/popup'
import './ItemButton.scss'

export default function AddToBuild(props) {

    const dispatch = useDispatch()

    const dispatchCallBack = useCallback(() => {

        return batch(() => {
            console.log(hasItemInBuild(props.data))
            if(hasItemInBuild(props.data)) {
                console.log('warn')
                showWarningPopUps(props.data.name, 3000)
            } else {
                console.log('check')
                showCheckingPopUps(props.data.name, 3000)
            }
            dispatch(additem(props.data))
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