import "./BuildUtils.scss";
import { BUILDEQUIPS } from "../../../reducer/itembuild";
import { majorIdDescription, statsMapping, statsUnit } from "../../EnumParts";
import { useStore } from "react-redux";
import { getDefaultDefense, getDefaultHealth, getMinSum, SkillPointToPercentage} from "../../../../utils/WynnMath";

const statTypeColor = {
  neutral: "RGB(252, 165, 14)",
  fire: "RGB(255, 85, 83)",
  earth: "RGB(4, 155, 5)",
  water: "RGB(70, 223, 223)",
  air: "RGB(228, 226, 227)",
  thunder: "RGB(255, 255, 85)",
};

const elementEmoji = {
  damage: "✤",
  fire: "✹",
  earth: "✤",
  water: "❉",
  air: "❋",
  thunder: "✦",
};

const extrastats = [
  "spellDamage",
  "damageBonus",
  "xpBonus",
  "lootBonus",
  "reflection",
  "thorns",
  "exploding",
  "speed",
  "attackSpeedBonus",
  "poison",
  "healthBonus",
  "soulPoints",
  "emeraldStealing",
  "spellDamageRaw",
  "damageBonusRaw",
  "bonusEarthDamage",
  "bonusThunderDamage",
  "bonusWaterDamage",
  "bonusFireDamage",
  "bonusAirDamage",
  "bonusAirDefense",
  "bonusEarthDefense",
  "bonusThunderDefense",
  "bonusWaterDefense",
  "bonusFireDefense",
  "jumpHeight",
  "spellCostPct1",
  "spellCostPct2",
  "spellCostPct3",
  "spellCostPct4",
  "spellCostRaw1",
  "spellCostRaw2",
  "spellCostRaw3",
  "spellCostRaw4",
];

const stateReverse = [
  "spellCostPct1",
  "spellCostPct2",
  "spellCostPct3",
  "spellCostPct4",
  "spellCostRaw1",
  "spellCostRaw2",
  "spellCostRaw3",
  "spellCostRaw4",
];

const WHITE = ({ v }) => (
  <span
    style={{
      color: "white",
    }}
  >
    {v}
  </span>
);

const REDOrGREEN = ({ v, content = "" }) => (
  <div
    style={{
      color: `${v < 0 ? "rgb(255, 79, 79)" : "rgb(0, 232, 0)"}`,
      alignSelf: "flex-end",
    }}
  >
    {v}
    {content}
  </div>
);

const ReverseREDOrGREEN = ({ v, content = "" }) => (
  <span
    style={{
      color: `${v > 0 ? "rgb(255, 79, 79)" : "rgb(0, 232, 0)"}`,
    }}
  >
    {v}
    {content}
  </span>
);

export function Health({ data }) {
  const defaultHealth = getDefaultHealth(data.settings.level)
  const health = Filter(data, "health");
  const healthBonus = getMaxSum(data, 'healthBonus')
  const sum = health.reduce((ac, v) => ac + v) + healthBonus + defaultHealth

  return (
    <div
      className="buildutil health"
      style={{
        color: "rgb(255, 79, 79)",
      }}
    >
      <div>♥ Health:</div> <div>{sum}</div>
    </div>
  );
}

export function EffectiveHealth({ data }) {
  const defaultHealth = getDefaultHealth(data.settings.level)
  const defaultDefense = getDefaultDefense(data)
  const health = Filter(data, "health").reduce((ac, v) => ac + v);
  const healthBonus = getMaxSum(data, 'healthBonus')
  const healthSum = health + healthBonus + defaultHealth
  const defense = SkillPointToPercentage(data.currentBuild.statAssigned.finalStatTypePoints.defense) / 100
  const agility = SkillPointToPercentage(data.currentBuild.statAssigned.finalStatTypePoints.agility) / 100
  const effectHealth = healthSum / ((1 - defense) * (1 - agility) * (2 - defaultDefense))
  const nonAgilityEffectiveHealth = healthSum / ((1 - defense) * (2 - defaultDefense))
  return (
    <>
        <div
      className="buildutil health"
      style={{
        color: "rgb(255, 79, 79)",
      }}
    >
      <div>♥ Effective Health:</div> <div>{Math.round(effectHealth)}</div>
    </div>
    <div
      className="buildutil health"
      style={{
        color: "rgb(255, 79, 79)",
      }}
    >
      <div>♥ Non-Agility EHP:</div> <div>{Math.round(nonAgilityEffectiveHealth)}</div>
    </div>
    </>

  );
}

export function HealthRegen({ data }) {
  const result = RawPercentCalculate(
    getMaxSum(data, "healthRegenRaw"),
    getMaxSum(data, "healthRegen")
  ).toFixed(1);

  return (
    <div
      className="buildutil healthRegen"
      style={{
        color: "rgb(255, 79, 79)",
      }}
    >
      <div>♥ Health Regen:</div> <REDOrGREEN v={result} content={"/4s"} />
    </div>
  );
}

export function EffectiveHealthRegen({data}) {
  const result = RawPercentCalculate(
    getMaxSum(data, "healthRegenRaw"),
    getMaxSum(data, "healthRegen")
  ).toFixed(1);
  const defaultDefense = getDefaultDefense(data)
  const defense = SkillPointToPercentage(data.currentBuild.statAssigned.finalStatTypePoints.defense) / 100
  const agility = SkillPointToPercentage(data.currentBuild.statAssigned.finalStatTypePoints.agility) / 100
  const effectiveHPR = result / ((1 - defense) * (1 - agility) * (2 - defaultDefense))

  return (
    <div
      className="buildutil healthRegen"
      style={{
        color: "rgb(255, 79, 79)",
      }}
    >
      <div>♥ Effective HPR:</div> <REDOrGREEN v={effectiveHPR.toFixed(1)} content={"/4s"} />
    </div>
  );
}

export function ManaRegen({ data }) {
  const result = getMaxSum(data, "manaRegen");
  return (
    <div
      className="buildutil manaRegen"
      style={{
        color: "RGB(70, 223, 223)",
      }}
    >
      <div>
        <i className="mana-icon" /> Mana Regen:{" "}
      </div>
      <REDOrGREEN v={result} content={"/4s"} />
    </div>
  );
}

export function ElementDefense({ data }) {
  const store = useStore();
  const filteredArmorDefenses = BUILDEQUIPS.filter(
    (v) =>
      store.getState().itembuild[v] !== undefined &&
      store.getState().itembuild[v].armorDefense != null
  );

  const elementDefenseSum = (element) => {
    if (filteredArmorDefenses.length == 0) {
      return 0;
    }
    return filteredArmorDefenses
      .map((v) => store.getState().itembuild[v].armorDefense[element])
      .reduce((a, s) => a + s);
  };

  const earthResult = RawPercentCalculate(
    elementDefenseSum("earthDefense"),
    getMaxSum(data, "bonusEarthDefense")
  ).toFixed(1);
  const thunderResult = RawPercentCalculate(
    elementDefenseSum("thunderDefense"),
    getMaxSum(data, "bonusThunderDefense")
  ).toFixed(1);
  const waterResult = RawPercentCalculate(
    elementDefenseSum("waterDefense"),
    getMaxSum(data, "bonusWaterDefense")
  ).toFixed(1);
  const fireResult = RawPercentCalculate(
    elementDefenseSum("fireDefense"),
    getMaxSum(data, "bonusFireDefense")
  ).toFixed(1);
  const airResult = RawPercentCalculate(
    elementDefenseSum("airDefense"),
    getMaxSum(data, "bonusAirDefense")
  ).toFixed(1);

  return (
    <>
      <div className="buildutil" style={{ color: statTypeColor.earth }}>
        <div>
          ✤ Earth <WHITE v={"Defense: "} />
        </div>{" "}
        <REDOrGREEN v={earthResult} />
      </div>
      <div className="buildutil" style={{ color: statTypeColor.thunder }}>
        <div>
          ✦ Thunder <WHITE v={"Defense: "} />
        </div>{" "}
        <REDOrGREEN v={thunderResult} />
      </div>
      <div className="buildutil" style={{ color: statTypeColor.water }}>
        <div>
          ❉ Water <WHITE v={"Defense: "} />
        </div>{" "}
        <REDOrGREEN v={waterResult} />
      </div>
      <div className="buildutil" style={{ color: statTypeColor.fire }}>
        <div>
          ✹ Fire <WHITE v={"Defense: "} />
        </div>{" "}
        <REDOrGREEN v={fireResult} />
      </div>
      <div className="buildutil" style={{ color: statTypeColor.air }}>
        <div>
          ❋ Air <WHITE v={"Defense: "} />
        </div>{" "}
        <REDOrGREEN v={airResult} />
      </div>
    </>
  );
}

export function AdditionalStats({ data }) {
  const strength = getMaxSum(data, "strengthPoints", true);
  const dexterity = getMaxSum(data, "dexterityPoints", true);
  const intelligence = getMaxSum(data, "intelligencePoints", true);
  const defense = getMaxSum(data, "defensePoints", true);
  const agility = getMaxSum(data, "agilityPoints", true);

  return (
    <>
      <div className="buildutil" style={{ color: statTypeColor.earth }}>
        <div>✤ Strength</div> <REDOrGREEN v={strength} />
      </div>
      <div className="buildutil" style={{ color: statTypeColor.thunder }}>
        <div>✦ Dexterity</div> <REDOrGREEN v={dexterity} />
      </div>
      <div className="buildutil" style={{ color: statTypeColor.water }}>
        <div>❉ Intelligence</div> <REDOrGREEN v={intelligence} />
      </div>
      <div className="buildutil" style={{ color: statTypeColor.fire }}>
        <div>✹ Defense</div> <REDOrGREEN v={defense} />
      </div>
      <div className="buildutil" style={{ color: statTypeColor.air }}>
        <div>❋ Agility</div> <REDOrGREEN v={agility} />
      </div>
    </>
  );
}

export function LifeSteal({ data }) {
  const lifeSteal = getMaxSum(data, "lifeSteal");

  return (
    <div className="buildutil">
      <div style={{ color: "rgb(255, 79, 79)" }}>Life Steal: </div>
      <REDOrGREEN v={lifeSteal} content={"/3s"} />
    </div>
  );
}

export function ManaSteal({ data }) {
  const manaSteal = getMaxSum(data, "manaSteal");
  return (
    <div className="buildutil">
      <div style={{ color: "RGB(70, 223, 223)" }}>Mana Steal: </div>
      <REDOrGREEN v={manaSteal} content={"/3s"} />
    </div>
  );
}

export function ExtraStats({ data }) {
  let divs = null;
  divs = extrastats.map((v) => {
    let sum = getMaxSum(data, v);
    if (stateReverse.includes(v)) sum = getMinSum(data, v);
    if (sum === 0) return;
    return (
      <div className="buildutil">
        <GetElementsColorComponent value={statsMapping[v]} />
        {stateReverse.includes(v) ? (
          <ReverseREDOrGREEN v={sum} content={statsUnit[v]} />
        ) : (
          <REDOrGREEN v={sum} content={statsUnit[v]} />
        )}
      </div>
    );
  });
  return <>{divs}</>;
}

export function MajorIds({ data }) {
  const filtered = Filter(data, "majorIds");
  const overlap = [];
  return (
    <>
      {filtered.map((v) => {
        if (v === 0) return null;
        if (overlap.includes(v[0])) return null;
        overlap.push(v[0]);
        let name = v[0].toLowerCase();
        name = name.split("_");
        let resultName = "";
        for (let i in name) {
          resultName += name[i].charAt(0).toUpperCase() + name[i].slice(1);
          if (name.length - 1 > i) resultName += " ";
        }
        // console.log(majorIdDescription[resultName]);
        return (
          <div className="majorId smallfont">
            <span
              style={{
                color: "RGB(100, 247, 252)",
              }}
            >
              {resultName}: {}
            </span>
            <span
              style={{
                color: "RGB(16, 163, 161)",
              }}
            >
              {majorIdDescription[resultName]}
            </span>
          </div>
        );
      })}
    </>
  );
}

function GetElementsColorComponent({ value }) {
  const lowercase = value.toLowerCase();
  const split = value.split(" ");
  let element = "";
  if (lowercase.includes("earth")) {
    element = "earth";
  } else if (lowercase.includes("thunder")) {
    element = "thunder";
  } else if (lowercase.includes("water")) {
    element = "water";
  } else if (lowercase.includes("fire")) {
    element = "fire";
  } else if (lowercase.includes("air")) {
    element = "air";
  } else {
    <WHITE v={value} />;
  }
  return (
    <div
      style={{
        color: `${element === "" ? "white" : statTypeColor[element]}`,
      }}
    >
      {elementEmoji[element]} {split[0]} <WHITE v={split[1]} />
    </div>
  );
}

function RawPercentCalculate(raw, percent) {
  if (raw === 0) return 0;
  else if (percent === 0) return raw;
  if (raw > 0 && percent > 0) {
    return (raw * (percent + 100)) / 100;
  } else if (raw > 0 && percent < 0) {
    if (percent <= -100) return 0;
    return (raw * (percent + 100)) / 100;
  } else if (raw < 0 && percent > 0) {
    if (percent >= 100) return 0;
    return (raw * (100 - percent)) / 100;
  } else if (raw < 0 && percent < 0) {
    return (raw * (-percent + 100)) / 100;
  }
}

function getMaxValue(base) {
  let max;
  if (base > 0) {
    max = base * 1.3;
  } else {
    max = base * 0.7;
    if (max > -1) max = -1;
  }
  max = Math.round(max);
  return max;
}

function Filter(data, value) {
  let filtered = BUILDEQUIPS.filter((v) => data[v] !== undefined)
    .filter(
      (v) => data[v].item[value] !== undefined && data[v].item[value] !== 0
    )
    .map((v) => data[v].item[value]);

  if (filtered.length === 0) return [0];
  return filtered;
}

export function getMaxSum(data, value, fixed = false) {
  let filtered = BUILDEQUIPS.filter((v) => data[v] !== undefined).filter(
    (v) => data[v].item[value] !== undefined && data[v].item[value] !== 0
  );

  if (filtered.length === 0) return 0;

  return filtered
    .map((v) => {
      // 자동 감정 된 것은 제외
      if (isIDed(data[v].item) || fixed) return data[v].item[value];
      else {
        return getMaxValue(data[v].item[value]);
      }
    })
    .reduce((ac, v) => ac + v);
}

export function isIDed(data) {
  const identified = "identified";
  return data[identified] == undefined || data[identified] == false
    ? false
    : true;
}
