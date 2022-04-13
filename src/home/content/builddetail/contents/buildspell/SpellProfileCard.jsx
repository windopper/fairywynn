import { useStore } from "react-redux";
import {
  getColorFromElementDamage,
  getEmojiFromElementDamage,
} from "../../../../../utils/ColorPicker";
import { CLASSSKILLS } from "../../../../../utils/WynnData";
import { getAverageDamage, getManaUsed, getMinSum, StatAssignCalculateFunction } from "../../../../../utils/WynnMath";
import { getComputedManaCost, getMajorIds } from "../../../../../utils/WynnUtils";
import { getMaxSum } from "../BuildUtils";
import "./BuildSpellStyle.scss";

const WEAPONTOCLASS = {
  bow: "archer",
  dagger: "assasin",
  relik: "shaman",
  spear: "warrior",
  wand: "mage",
};

const SDKeys = [
  "mindamage",
  "maxdamage",
  "minearthDamage",
  "maxearthDamage",
  "minthunderDamage",
  "maxthunderDamage",
  "minwaterDamage",
  "maxwaterDamage",
  "minfireDamage",
  "maxfireDamage",
  "minairDamage",
  "maxairDamage",
];

const elementDamages = [
  "damage",
  "earthDamage",
  "thunderDamage",
  "waterDamage",
  "fireDamage",
  "airDamage",
];

export default function SpellProfileCard({
  spellNumber,
  spellDamageData,
  weaponType,
  currentLevel,
}) {
  const store = useStore()
  const itemBuildData = store.getState().itembuild
  const selectedClass = WEAPONTOCLASS[weaponType];

  const selectedGrade = getSelectedGrade(spellNumber, currentLevel);
  
  const selectedSkill = CLASSSKILLS[selectedClass][spellNumber];
  const skillName = selectedSkill.name;
  const skillLore = selectedSkill[selectedGrade].lore;

  const computedCost = getComputedManaCost(selectedClass, spellNumber, itemBuildData)

  const weaponItem = itemBuildData.weapon.item

  return (
    <div className="spellprofilecard-container">
      <div className="spellskillname">{skillName}</div>
      <div className="spellcost">{computedCost} <i className="mana-icon"/></div>
      <SpellProfileInfo />
    </div>
  );

  function SpellProfileInfo() {
    // General Type
    if (spellDamageData.critical && spellDamageData.nonCritical) {
      return <GeneralSpell spellDamageData={spellDamageData} />;
    }

    // Shaman Type
    if(weaponType == 'relik') {
      if (spellDamageData.smashDamage && spellDamageData.tickDamage && spellDamageData.Heal) {
        return (
          <>
            <ShamanHealContainerDesign warriorRallyData={spellDamageData} />
            <div className="spelldetaildamagename">SmashDamage</div>
            <GeneralSpell spellDamageData={spellDamageData.smashDamage} />
            <div className="spelldetaildamagename">TickDamage</div>
            <GeneralSpell spellDamageData={spellDamageData.tickDamage} />
          </>
        );
      }
      if (spellDamageData.smashDamage && spellDamageData.tickDamage) {
        return (
          <>
            <div className="spelldetaildamagename">SmashDamage</div>
            <GeneralSpell spellDamageData={spellDamageData.smashDamage} />
            <div className="spelldetaildamagename">TickDamage</div>
            <GeneralSpell spellDamageData={spellDamageData.tickDamage} />
          </>
        );
      }
    }
    // Warrior Type
    else if (weaponType == "spear") {
      
      // Bash
      if (spellDamageData.firstDamage && spellDamageData.secondDamage && spellNumber === 1) {
        return (
          <>
            <div className="spelldetaildamagename">First Explosion</div>
            <GeneralSpell spellDamageData={spellDamageData.firstDamage} />
            <div className="spelldetaildamagename">Second Explosion</div>
            <GeneralSpell spellDamageData={spellDamageData.secondDamage} />
          </>
        );
      }
      // Charge Rally
      if(spellDamageData.selfHeal && spellDamageData.allyHeal && spellNumber == 2) {
        return (
          <>
          <div className="spelldetaildamagename">Rally</div>
          <RallyHealContainerDesign warriorRallyData={spellDamageData} />
          </>
        )
      }
      // UpperCut
      else if (spellDamageData.firstDamage && spellDamageData.secondDamage && spellNumber === 3 && currentLevel < 56) {
        return (
          <>
              <div className="spelldetaildamagename">First Explosion</div>
              <GeneralSpell spellDamageData={spellDamageData.firstDamage} />
              <div className="spelldetaildamagename">Firework Damage</div>
              <GeneralSpell spellDamageData={spellDamageData.secondDamage} />
          </>
        );
      }
      // UpperCut grade3
      else if(spellDamageData.firstDamage && spellDamageData.secondDamage && spellDamageData.thirdDamage && selectedGrade === 'grade3') {
        return (
            <>
              <div className="spelldetaildamagename">First Explosion</div>
              <GeneralSpell spellDamageData={spellDamageData.firstDamage} />
              <div className="spelldetaildamagename">Firework Damage</div>
              <GeneralSpell spellDamageData={spellDamageData.secondDamage} />
              <div className="spelldetaildamagename">Crash Damage</div>
              <GeneralSpell spellDamageData={spellDamageData.thirdDamage} />
            </>
          );
      }
      // WarScream
      else if(spellDamageData.firstDamage && spellDamageData.afterDamage) {
        return (
            <>
              <div className="spelldetaildamagename">Area Hit</div>
              <GeneralSpell spellDamageData={spellDamageData.firstDamage} />
              <div className="spelldetaildamagename">Air Shout</div>
              <GeneralSpell spellDamageData={spellDamageData.afterDamage} />
            </>
          );
      }
    }
    // Mage Type
    else if(weaponType == 'wand') {
        // Meteor grade3
        if(spellDamageData.blastDamage && spellDamageData.burningDamage) {
            return (
                <>
                  <div className="spelldetaildamagename">Blast Damage</div>
                  <GeneralSpell spellDamageData={spellDamageData.blastDamage} />
                  <div className="spelldetaildamagename">Burning Damage</div>
                  <GeneralSpell spellDamageData={spellDamageData.burningDamage} />
                </>
            );
        }
        else if(spellNumber === 1) {
            return (
                <>
                <MageHealContainerDesign magePulseData={spellDamageData} />
                </>
            )
        }
    }
    // Assasin Type
    else if(weaponType == 'dagger') {
        if(spellDamageData.hitDamage && spellDamageData.totalHitDamage && selectedGrade == 'grade1' && spellNumber == 3) {
            return (
                <>
                  <div className="spelldetaildamagename">1st to 10th Hit</div>
                  <GeneralSpell spellDamageData={spellDamageData.hitDamage} />
                </>
              );
        }
        else if(spellDamageData.hitDamage && spellDamageData.totalHitDamage && spellDamageData.fatalityDamage) {
            return (
                <>
                  <div className="spelldetaildamagename">1st to 10th Hit</div>
                  <GeneralSpell spellDamageData={spellDamageData.hitDamage} />
                  <div className="spelldetaildamagename">Fatality</div>
                  <GeneralSpell spellDamageData={spellDamageData.fatalityDamage} />
                </>
              );
        }
        else if(spellDamageData.hitDamage && spellDamageData.totalHitDamage && spellNumber == 4) {
          if(getMajorIds(itemBuildData).includes('CHERRY_BOMBS')) {
            return (
              <>
                <div className="spelldetaildamagename">Cherry Blossom ( 3 Hits )</div>
                <GeneralSpell spellDamageData={spellDamageData.totalHitDamage} />
                <div className="spelldetaildamagename">Cherry Blossom ( Per Bomb )</div>
                <GeneralSpell spellDamageData={spellDamageData.hitDamage} />
              </>
            );
          }
            return (
                <>
                  <div className="spelldetaildamagename">Tick Damage</div>
                  <GeneralSpell spellDamageData={spellDamageData.hitDamage} />
                  <div className="spelldetaildamagename">Total Damage ( 10 Hits )</div>
                  <GeneralSpell spellDamageData={spellDamageData.totalHitDamage} />
                </>
              );
        }
    }
    // Archer Type
    else if(weaponType == 'bow') {
        if(spellDamageData.perArrow && spellDamageData.totalArrow && spellNumber == 1) {
          if(getMajorIds(itemBuildData).includes('HAWKEYE')) {
            return (
              <>
              <div className="spelldetaildamagename">(Hawk Eye) Total Arrow</div>
              <GeneralSpell spellDamageData={spellDamageData.totalArrow} />
              <div className="spelldetaildamagename">(Hawk Eye) Per Arrow</div>
              <GeneralSpell spellDamageData={spellDamageData.perArrow} />
            </>
            )
          }
            return (
                <>
                  <div className="spelldetaildamagename">Total Arrow</div>
                  <GeneralSpell spellDamageData={spellDamageData.totalArrow} />
                  <div className="spelldetaildamagename">Per Arrow</div>
                  <GeneralSpell spellDamageData={spellDamageData.perArrow} />
                </>
            );
        }
        else if(spellDamageData.shieldFinalDamage && spellDamageData.rainFinalDamage) {
            return (
                <>
                  <div className="spelldetaildamagename">Shield Damage</div>
                  <GeneralSpell spellDamageData={spellDamageData.shieldFinalDamage} />
                  <div className="spelldetaildamagename">Arrow Rain Damage</div>
                  <GeneralSpell spellDamageData={spellDamageData.rainFinalDamage} />
                </>
            );
        }
    }

    // Seperate spellDamageData
    return <div></div>;
  }
}

function getSelectedGrade(spellNumber, currentLevel) {
  const ENUM_GRADE = ["grade1", "grade2", "grade3"];
  let selectedGrade = "";
  ENUM_GRADE.forEach((v) => {
    if (CLASSSKILLS.archer[spellNumber][v].level < currentLevel)
      selectedGrade = v;
  });
  return selectedGrade;
}

function GeneralSpell({ spellDamageData }) {

    const store = useStore()
    const statAssigned = StatAssignCalculateFunction(store.getState().itembuild)
    // const nonCritAverage = spellDamageData.nonCriticalAverage;
    const nonCritAverage = AverageSpellDamage(spellDamageData.nonCritical);
    const critAverage = AverageSpellDamage(spellDamageData.critical)
    const totalAverage = getAverageDamage(nonCritAverage, critAverage, statAssigned.finalStatTypePoints.dexterity)

  return (
    <>
    <div className="critical-info">total Average</div>
    <div className="totalAverage-info">{Math.round(totalAverage)}</div>
      <div className="group-row-container">
        <div className="group-row">
          <div className="critical-info">nonCrit Average</div>
          <div>{`${nonCritAverage}`}</div>
          <div className="critical-info">nonCritical</div>
          <DamageContainerDesign
            spellMinMaxData={spellDamageData.nonCritical}
          />
        </div>
        <div className="group-row">
        <div className="critical-info">crit Average</div>
          <div>{`${critAverage}`}</div>
          <div className="critical-info">critical</div>
          <DamageContainerDesign
            spellMinMaxData={spellDamageData.critical}
          />
        </div>
      </div>
    </>
  );
}

export function DamageContainerDesign({ spellMinMaxData }) {
  let filteredKey = [];
  elementDamages.forEach((v) => {
    if (!(spellMinMaxData[`min${v}`] == 0 && spellMinMaxData[`max${v}`] == 0)) {
      filteredKey.push(`min${v}`);
      filteredKey.push(`max${v}`);
    }
  });
  return elementDamages
    .filter((v) => filteredKey.includes(`min${v}`))
    .map((v) => {
      const color = getColorFromElementDamage(v);
      const emoji = getEmojiFromElementDamage(v);
      const min = spellMinMaxData[`min${v}`];
      const max = spellMinMaxData[`max${v}`];
      return (
        <div
          style={{
            color: color,
          }}
        >
          {`${emoji} ${min} - ${max}`}
        </div>
      );
    });
}

function AverageSpellDamage(spellMinMaxData) {
    let average = 0
    elementDamages.forEach(v => {
        const min = spellMinMaxData[`min${v}`];
        const max = spellMinMaxData[`max${v}`];
        average += (min + max) / 2
    })
    return Math.round(average)
}

function MageHealContainerDesign({magePulseData}) {
    let keys = ['firstPulse', 'afterPulse', 'firstAllyPulse', 'afterAllyPulse']
    return keys.filter(v => magePulseData[v]).map((v) => {
        const value = magePulseData[v]
        return (
            <>
            <div className="critical-info">{v.slice(0, 1).toUpperCase()+v.slice(1)}</div>
            <div style={{
                color: 'rgb(256, 100, 100)',
            }}>
                
                {`♥ ${value}`}
            </div>
            </>
        )
    })
}
function RallyHealContainerDesign({warriorRallyData}) {
  let keys = ['selfHeal', 'allyHeal']
  return keys.filter(v => warriorRallyData[v]).map((v) => {
      const value = warriorRallyData[v]
      return (
          <>
          <div className="critical-info">{v.slice(0, 1).toUpperCase()+v.slice(1)}</div>
          <div style={{
              color: 'rgb(256, 100, 100)',
          }}>
              
              {`♥ ${Math.round(value)}`}
          </div>
          </>
      )
  })
}

function ShamanHealContainerDesign({warriorRallyData}) {
  let keys = ['Heal']
  return keys.filter(v => warriorRallyData[v]).map((v) => {
      const value = warriorRallyData[v]
      return (
          <>
          <div className="critical-info">{v.slice(0, 1).toUpperCase()+v.slice(1)}</div>
          <div style={{
              color: 'rgb(256, 100, 100)',
          }}>
              {`♥ ${Math.round(value)}`}
          </div>
          </>
      )
  })
}
