import { nameColor } from "../EnumParts";
import RemoveButton from "./RemoveButton";
import { useEffect, useState } from "react";
import useBuildItemUpdate from "../../hooks/useBuildItemUpdate";
import { getColorFromTier } from "../../../utils/ColorPicker";
import { DisplayItem } from "../Item";

export default function BuildItems({ v, equips }) {

  const [hover, setHover] = useState(false)
  const [click, setClick] = useState(false)

  const onMouseEnter = () => setHover(true)
  const onMouseLeave = () => {
    setHover(false)
    setClick(false)
  }
  const onClick = () => setClick(true)

  const item = useBuildItemUpdate(v)

  let result;

  if (equips[v] !== undefined) {
    result = (
      <div
        className="smallitemlist"
        style={{
          color: getColorFromTier(equips[v].item),
        }}
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseLeave()}
        onClick={() => onClick()}
      >
        {click ? <div className="item-show-wrapper"><DisplayItem d={equips[v].item}/></div> : null}
        <RemoveButton type={v} item={equips[v].item}/>
        {equips[v].item.name}
      </div>
    );
  } else {
    result = (
      <div
        className="smallitemlist"
        style={{
          color: "gray",
        }}
      >
        {v}
      </div>
    );
  }

  return result;
}
