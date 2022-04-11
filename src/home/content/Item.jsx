import "./Content.scss";

import {
    nameColor,
    getDamage,
    getPowderSockets,
    getDefense,
    getAttackSpeed,
    getRequires,
    getStats,
    getMajorIds,
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
}

export function Item({d, i}) {

  const [state, setState] = useState(false)

  return <div className="item" key={i} onMouseEnter={() => setState(true)} onMouseLeave={() => setState(false)} >
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
  {getMajorIds(d)}
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


export function DisplayItem({d}) {

  return <div className="item">
  <div
    className="name"
    style={{
      color: getColorFromTier(d),
    }}
  >
    {d.name}
  </div>
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
  {getMajorIds(d)}
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

export function DisplayItemWithPowder({equipsData}) {

  const element = ['earth', 'thunder', 'water', 'fire', 'air']

  const elementColor = {
    "✹": "RGB(255, 85, 83)",
    "✤": "RGB(4, 155, 5)",
    "❉": "RGB(70, 223, 223)",
    "❋": "RGB(228, 226, 227)",
    "✦": "RGB(255, 255, 85)",
  };

  const item = equipsData.item
  const powder = equipsData.powder

  return <div className="item">
  <div
    className="name"
    style={{
      color: getColorFromTier(item),
    }}
  >
    {item.name}
  </div>
  <Gap />
  {getAttackSpeed(item)}
  <Gap />
  <div className="damage">{getDamage(item)}</div>
  <div className="defense">{getDefense(item)}</div>
  <Gap />
  {getRequires(item)}
  <Gap />
  {getStats(item)}
  <Gap />
  <Gap />
  {getMajorIds(item)}
  <Gap />
  <div className="lore">{item.addedLore}</div>
  <Gap />
  <div className="powder" id="leftside">
    {`[${powder.map(v => <span style={{
    color: elementColor[v.charAt(0)]
  }}>{v.charAt(0)}</span>)}]`}
  </div>
  <div
    className="typetier"
    style={{
      color: nameColor[item.tier],
    }}
    id="leftside"
  >
    {item.tier + " " + `${item.type == undefined ? item.accessoryType : item.type}`}
  </div>
  <div className="restriction" id="leftside">
    {item.restrictions}
  </div>
</div>
}

function Gap() {
    return <div className="gap"></div>;
}
