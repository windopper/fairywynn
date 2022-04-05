import "./Content.scss";

import {
    nameColor,
    getDamage,
    getPowderSockets,
    getDefense,
    getAttackSpeed,
    getRequires,
    getStats,
  } from "./EnumParts";
  import { filtering } from "../reducer/filter";
import { useRef, useState } from "react";
import ItemButtonContainer from "./itembutton/ItemButtonContainer";
import { getColorFromTier } from "../../utils/ColorPicker";

export default function Items(data) {

  return data.map((d, i) => {
    return (
        <Item d={d} i={i}/>
    );
  });

  function Item({d, i}) {

    const [state, setState] = useState(false)

    return <div className="item" key={i} onMouseEnter={() => setState(true)} onMouseLeave={() => setState(false)}>
    <div
      className="name"
      style={{
        color: getColorFromTier(d),
      }}
    >
      {d.name}
    </div>
    {state ? <ItemButtonContainer data={d}/> : null}
    <Gap />
    {getAttackSpeed(d)}
    <Gap />
    <div className="damage">{getDamage(d)}</div>
    <div className="defense">{getDefense(d)}</div>
    <Gap />
    {getRequires(d)}
    <Gap />
    {getStats(d)}
    <Gap />
    <Gap />
    <div className="lore">{d.addedLore}</div>
    <Gap />
    <div className="powder" id="leftside">
      {getPowderSockets(d.sockets)}
    </div>
    <div
      className="typetier"
      style={{
        color: nameColor[d.tier],
      }}
      id="leftside"
    >
      {d.tier + " " + `${d.type == undefined ? d.accessoryType : d.type}`}
    </div>
    <div className="restriction" id="leftside">
      {d.restrictions}
    </div>
  </div>
}
}

function Gap() {
    return <div className="gap"></div>;
}
