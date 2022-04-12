import { useCallback, useState } from "react";
import { batch, useDispatch, useStore } from "react-redux";
import { getBuildDamages, StatAssignCalculateFunction } from "../../../../utils/WynnMath";
import { addabilityboost, removeabilityboost, updatebuild } from "../../../reducer/itembuild";
import "./BuildBoosts.scss";

export default function BuildBoosts() {
  return (
    <div className="buildboosts-wrapper row-container">
      <div className="container row-container">
        <ToggleButton text={'Vanish'} value={0.8}/>
        <ToggleButton text={'War Scream'} value={0.1}/>
        <ToggleButton text={'Your Totem'} value={0.3}/>
        <ToggleButton text={'Ally Totem'} value={0.15}/>
        <ToggleButton text={'Bash'} value={0.5}/>
      </div>
    </div>
  );

  function ToggleButton({text, value}) {

    const store = useStore()
    const itemBuildData = store.getState().itembuild;
    const [click, setClick] = useState(false);
    const dispatch = useDispatch()

    const addAbilitykDispatch = useCallback(() => batch(() => {
        dispatch(addabilityboost(value, text))
        dispatch(updatebuild(getBuildDamages(itemBuildData), StatAssignCalculateFunction(itemBuildData)))
    }), [dispatch])

    const removeAbilitykDispatch = useCallback(() => batch(() => {
        dispatch(removeabilityboost(value, text))
        dispatch(updatebuild(getBuildDamages(itemBuildData), StatAssignCalculateFunction(itemBuildData)))
    }), [dispatch])

    if(click) {
        addAbilitykDispatch()

    } else {
        removeAbilitykDispatch()
    }

    return (
      <div className="switch-button-wrapper column-container">
          <div className="buildboost-title">{text}<span className="buildboost-value">&nbsp;+{value*100}%</span></div>
        <label className="switch-button">
          <input type="checkbox" onChange={(e) => setClick(e.target.checked)}/>{" "}
          <span className="onoff-switch"></span>
        </label>
      </div>
    );
  }
}
