import { useCallback, useState } from "react";
import { batch, useDispatch, useStore } from "react-redux";
import { getBuildDamages, StatAssignCalculateFunction } from "../../../../utils/WynnMath";
import useBuildSettingReset from "../../../hooks/useBuildSettingReset";
import { addabilityboost, addboost, adddefenseboost, reCalculateBuildAndUpdate, removeabilityboost, removeboost, removedefenseboost, updatebuild } from "../../../reducer/itembuild";
import "./BuildBoosts.scss";

export default function BuildBoosts() {
  const resetCode = useBuildSettingReset()
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

    const store = useStore()
    const itemBuildData = store.getState().itembuild;
    // const [click, setClick] = useState(false);
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

    return (
      <div className="switch-button-wrapper buildboosts-column-container">
          <div className="buildboost-title">{text}<span className="buildboost-value">&nbsp;+{value*100}%</span></div>
        <label className="switch-button">
          <input type="checkbox" onChange={(e) => click(e)}/>{" "}
          <span className="onoff-switch"></span>
        </label>
      </div>
    );
  }
}
