import { useState, useRef, useCallback, useEffect } from "react";
import { SkillPointToPercentage } from "../../../../utils/WynnMath";
import { BUILDEQUIPS, manuallyupdatestat, reCalculateBuildAndUpdate, updatebuild, updateStat } from "../../../reducer/itembuild";
import { getMaxSum } from "./BuildUtils";
import "./BuildRequirements.scss";
import { StatAssignCalculateFunction } from "./StatRemain";
import { batch, useDispatch, useSelector } from "react-redux";
import { deepCopy } from "../../../../utils/FairyWynnUtil";
import useBuildUpdate from "../../../hooks/useBuildUpdate";

const statTypeColor = {
  neutral: "RGB(252, 165, 14)",
  defense: "RGB(255, 85, 83)",
  strength: "RGB(4, 155, 5)",
  intelligence: "RGB(70, 223, 223)",
  agility: "RGB(228, 226, 227)",
  dexterity: "RGB(255, 255, 85)",
};

const statTypeEmoji = {
  damage: "✤",
  defense: "✹",
  strength: "✤",
  intelligence: "❉",
  agility: "❋",
  dexterity: "✦",
};

const statType = [
  "strength",
  "dexterity",
  "intelligence",
  "defense",
  "agility",
];

export default function BuildRequirements({ data }) {

  return (
    <div className="buildrequirements">
      {statType.map((v, i) => (
        <>
        <RequirementsGetter _statType={v} data={data} key={i}/>
        </>
      ))}
    </div>
  );
}

function RequirementsGetter({ _statType, data }) {

  const MUS = useSelector((state) => state.itembuild.settings.manuallyUpdateStat)
  const manuallyAssigned = deepCopy(MUS)
  const statAssigned = useSelector(state => state.itembuild.currentBuild.statAssigned)
  const buildCode = useBuildUpdate()

  useEffect(() => {
    ref.current.value = statAssigned.finalStatTypePoints[_statType]
    inputValue.current = statAssigned.finalStatTypePoints[_statType]
  }, [buildCode])

  useEffect(() => {
    return () => {
      if(warnTimeOut.current) {
        clearTimeout(warnTimeOut.current)
        warnTimeOut.current = undefined
      }
  }}, [])

  
  const [change, setChange] = useState(false)

  const [lower, setLower] = useState(false)
  const warnTimeOut = useRef(undefined)

  const dispatch = useDispatch()
  const inputValue = useRef(statAssigned.finalStatTypePoints[_statType])
  const ref = useRef()

  const buildUpdate = () => {

    if(!isNaN(parseInt(inputValue.current, 10))) {

      if(manuallyAssigned[_statType] + parseInt(inputValue.current, 10) - statAssigned.finalStatTypePoints[_statType] >= 0) {
        manuallyAssigned[_statType] += parseInt(inputValue.current, 10) - statAssigned.finalStatTypePoints[_statType]
  
        // Manually Assigned should be positive     
        dispatch(manuallyupdatestat(manuallyAssigned))  
        reCalculateBuildAndUpdate(data) 
      }
      else {
        ref.current.value = ref.current.defaultValue
        onStatLowWarn()
      }
    } 
  }

  const onStatLowWarn = () => {
    setLower(true)
    warnTimeOut.current = setTimeout(() => {
      setLower(false)
    }, 2000)
  }
  
  const onChange = (e) => {
    inputValue.current = e.target.value
    if(e.target.value === e.target.defaultValue) {
      setChange(false)
    } 
    else {
      setChange(true)
    }
  }

  let percent = 0
  if (statAssigned.finalStatTypePoints[_statType] > 0) percent = SkillPointToPercentage(statAssigned.finalStatTypePoints[_statType]);
  
  return (
    <div
      className={`${_statType} individual-stat`}
    >
      <div className="stat-text">
        <div
          style={{
            color: statTypeColor[_statType],
          }}
        >
          {statTypeEmoji[_statType]}
        </div>
        <div
          style={{
            color: statTypeColor[_statType],
          }}
        >
          {_statType}
        </div>
        <input
          defaultValue={statAssigned.finalStatTypePoints[_statType]}
          style={{
            color: statTypeColor[_statType],
          }}
          ref={ref}
          onChange={e => onChange(e)}
          onKeyDown={(e) => {
            if(e.key == 'Enter') {
              buildUpdate()
              setChange(false)
            }
          }}
        ></input>
        {change ? <button 
        onClick={() => {
          buildUpdate()
          setChange(false)
        }}><i className="fa-solid fa-check"></i></button> : null}
        {lower ? <div className="stat-warn-low">can't lower than the original stat</div> : null}
      </div>
    </div>
  );
}
