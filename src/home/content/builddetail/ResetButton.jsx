import { useState } from "react"
import { useDispatch, useStore } from "react-redux"
import { reCalculateBuildAndUpdate, resetsetting } from "../../reducer/itembuild"

export default function ResetButton() {

    const [hover, setHover] = useState(false)
    const store = useStore()

    const dispatch = useDispatch()
    const reset = () => {
        dispatch(resetsetting())
        reCalculateBuildAndUpdate(store.getState().itembuild)
    }

    return (
      <div
        className="resetbutton-wrapper"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => reset()}
      >
        <i
          className="fa-solid fa-rotate"
          style={{
            animationName: `${hover ? "infinite-loop" : ""}`,
          }}
        ></i>
        <div>Reload Build</div>
      </div>
    );
}