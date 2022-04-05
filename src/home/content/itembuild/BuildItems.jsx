import { nameColor } from "../EnumParts";
import RemoveButton from "./RemoveButton";
import { useState } from "react";
import useBuildItemUpdate from "../../hooks/useBuildItemUpdate";
import { getColorFromTier } from "../../../utils/ColorPicker";

export default function BuildItems({ v, equips }) {

  const item = useBuildItemUpdate(v)

  let result;

  if (equips[v] !== undefined) {
    result = (
      <div
        className="smallitemlist"
        style={{
          color: getColorFromTier(equips[v].item),
        }}
      >
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
