import { nameColor } from "../EnumParts";
import RemoveButton from "./RemoveButton";
import { useEffect, useState } from "react";
import useBuildItemUpdate from "../../hooks/useBuildItemUpdate";
import { getColorFromTier } from "../../../utils/ColorPicker";
import { DisplayItem } from "../Item";
import AddPowderButton from "./AddPowderButton";

export default function BuildItems({ v, itembuild }) {

  const [hover, setHover] = useState(false)

  const onMouseEnter = () => setHover(true)
  const onMouseLeave = () => {
    setHover(false)
  }

  const item = useBuildItemUpdate(v)
  let result;

  // console.log(itembuild[v])

  // console.log(itembuild[v])
  if (itembuild[v]) {
    result = (
      <div
        className="smallitemlist"
        style={{
          color: getColorFromTier(itembuild[v].item),
        }}
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseLeave()}
      >
        {hover ? <div className="item-show-wrapper"><DisplayItem d={itembuild[v].item}/></div> : null}
        <RemoveButton type={v} item={itembuild[v].item}/>
        <AddPowderButton item={itembuild[v].item} type={v} />
        {itembuild[v].item.name}
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
