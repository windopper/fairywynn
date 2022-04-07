import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { openPowderBuild } from '../../reducer/powderbuild'
import './HotButton.scss'

export default function AddPowderButton({item, type}) {

    const dispatch = useDispatch()
    const onClick = useCallback(() => {
        return dispatch(openPowderBuild(item))
    }, [dispatch])

    return (
        <div className="plusbutton" onClick={() => onClick()}>

        </div>
    )
}