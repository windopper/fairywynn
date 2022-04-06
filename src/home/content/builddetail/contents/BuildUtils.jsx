import "./BuildUtils.scss";
import { BUILDEQUIPS } from "../../../reducer/itembuild";
import { statsMapping, statsUnit } from "../../EnumParts";

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
    air:"❋",
    thunder: "✦",
}

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
  const values = Filter(data, "health");
  const sum = values.reduce((ac, v) => ac + v);

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

export function HealthRegen({ data }) {
  const result = RawPercentCalculate(
    getMaxSum(data, "healthRegenRaw"),
    getMaxSum(data, "healthRegen")
  );

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

export function ManaRegen({ data }) {
  const result = getMaxSum(data, "manaRegen");
  return (
    <div
      className="buildutil manaRegen"
      style={{
        color: "RGB(70, 223, 223)",
      }}
    >
      <div>Mana Regen: </div>
      <REDOrGREEN v={result} content={"/4s"} />
    </div>
  );
}

export function ElementDefense({ data }) {
  const earthResult = RawPercentCalculate(
    getMaxSum(data, "earthDefense", true),
    getMaxSum(data, "bonusEarthDefense")
  );
  const thunderResult = RawPercentCalculate(
    getMaxSum(data, "thunderDefense", true),
    getMaxSum(data, "bonusThunderDefense")
  );
  const waterResult = RawPercentCalculate(
    getMaxSum(data, "waterDefense", true),
    getMaxSum(data, "bonusWaterDefense")
  );
  const fireResult = RawPercentCalculate(
    getMaxSum(data, "fireDefense", true),
    getMaxSum(data, "bonusFireDefense")
  );
  const airResult = RawPercentCalculate(
    getMaxSum(data, "airDefense", true),
    getMaxSum(data, "bonusAirDefense")
  );

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
    const sum = getMaxSum(data, v);
    if(sum === 0) return;
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

function GetElementsColorComponent({value}) {
    const lowercase = value.toLowerCase()
    const split = value.split(' ')
    let element = ''
    if(lowercase.includes('earth')) {
        element = 'earth'
    } else if(lowercase.includes('thunder')) {
        element = 'thunder'
    } else if(lowercase.includes('water')) {
        element= 'water'
    } else if(lowercase.includes('fire')) {
        element = 'fire'
    } else if(lowercase.includes('air')) {
        element = 'air'
    } else {
        <WHITE v={value} />
    }
    return (
        <div style={{
            color: `${element === '' ? 'white' : statTypeColor[element]}`
        }}>
            {elementEmoji[element]} {split[0]} <WHITE v={split[1]} />
        </div>
    )
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

    if(filtered.length === 0) return [0];
    return filtered
}

function getMaxSum(data, value, fixed = false) {
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

function isIDed(data) {
  const identified = "identified";
  return data[identified] == undefined || data[identified] == false
    ? false
    : true;
}
