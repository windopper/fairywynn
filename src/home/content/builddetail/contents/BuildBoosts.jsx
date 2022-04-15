import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import useBuildSettingReset from "../../../hooks/useBuildSettingReset";
import { addboost, reCalculateBuildAndUpdate, removeboost } from "../../../reducer/itembuild";
import "./BuildBoosts.scss";

export default function BuildBoosts() {
  return (
    <div className="buildboosts-wrapper buildboosts-row-container">
      <div className="buildboosts-container buildboosts-row-container">
        <ToggleButton text={'Vanish'} value={0.8} defenseValue={0.15}/>
        <ToggleButton text={'War Scream'} value={0.1} defenseValue={0.2}/>
        <ToggleButton text={'Your Totem'} value={0.3}/>
        <ToggleButton text={'Ally Totem'} value={0.15}/>
        <ToggleButton text={'Bash'} value={0.5}/>
      </div>
    </div>
  );

  function ToggleButton({text, value, defenseValue = 0}) {

    const resetCode = useBuildSettingReset()
    
    const ref = useRef()
    const store = useStore()
    const itemBuildData = store.getState().itembuild;
    const dispatch = useDispatch()

    const addAbilityDispatch = useCallback(() => {
      dispatch(addboost(value, defenseValue, text))
      reCalculateBuildAndUpdate(itemBuildData)
    }, [dispatch])

    const removeAbilityDispatch = useCallback(() => {
      dispatch(removeboost(value, defenseValue, text))
      reCalculateBuildAndUpdate(itemBuildData)
    }, [dispatch])

    const click = (e) => {
      if(e.target.checked) {
        addAbilityDispatch()
      } else {
        removeAbilityDispatch()
      }
    }

    useEffect(() => {
      ref.current.checked = false
    }, [resetCode])

    return (
      <div className="switch-button-wrapper buildboosts-column-container">
          <div className="buildboost-title">{text}<span className="buildboost-value">&nbsp;+{value*100}%</span></div>
        <label className="switch-button">
          <input type="checkbox" onChange={(e) => click(e)} ref={ref}/>
          <span className="onoff-switch"></span>
        </label>
      </div>
    );
  }
}
