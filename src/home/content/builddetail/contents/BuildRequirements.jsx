import { useState, useRef } from "react";
import { SkillPointToPercentage } from "../../../../utils/WynnMath";
import { BUILDEQUIPS } from "../../../reducer/itembuild";
import "./BuildRequirements.scss";

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
      {statType.map((v) => (
        <RequirementsGetter _statType={v} data={data} />
      ))}
    </div>
  );
}

function RequirementsGetter({ _statType, data }) {
  const [show, setShow] = useState(false);

  let maximumStatValue = Math.max.apply(
    null,
    BUILDEQUIPS.filter((v) => data[v] !== undefined).map((v) => {
      return data[v].item[_statType];
    })
  );
  if(maximumStatValue == -Infinity) maximumStatValue = 0
  let percent = SkillPointToPercentage(maximumStatValue);

  return (
    <div
      className={`${_statType} individual-stat`}
      onMouseLeave={() => setShow(false)}
      onMouseEnter={() => setShow(true)}
    >
      <div
      className="stat-text"
        style={{
          filter: `${show ? "blur(3px)" : ""}`,
        }}
      >
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
        <div
          style={{
            color: statTypeColor[_statType],
          }}
        >
          {maximumStatValue}
        </div>
      </div>
      {show ? (
        <div className="stat-info">
          <div>{percent}%</div>
          <div>Percentage Value</div>
        </div>
      ) : null}
    </div>
  );
}
