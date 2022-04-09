import {
  AttackSpeedMultipliers,
  CLASSSKILLS,
  powderDamageConvert,
  powderDefenseConvert,
} from "./WynnData";
import {
  damageEmojiReverse,
  defenseEmojiReverse,
} from "../home/content/EnumParts";
import { hasItemInBuild, hasItemTypeInBuild } from "../home/reducer/itembuild";
import { deepCopy } from "./FairyWynnUtil";
import { damageSpellConversion, DamageModifier, computeFinalDamage, computeBuildSpellDamage } from "./WynnDamageCalculation";

const BUILDEQUIPS = [
  "helmet",
  "chestplate",
  "leggings",
  "boots",
  "weapon",
  "ring1",
  "ring2",
  "bracelet",
  "necklace",
];
const ENUM_GRADE = ["grade1", "grade2", "grade3"];

export function SkillPointToPercentage(x) {
  let sum = 0;
  if (x <= 0) return 0;
  for (let i = 1; i <= x; i++) {
    sum += 0.9908 ** i;
  }
  const round = Math.round(sum * 10) / 10;
  // console.log(round)
  return round;
}

export function GetWeaponDamageWithPowder(equipType, state) {
  const itembuild = state[equipType];
  if (equipType !== "weapon") {
    return null;
  }
  if (itembuild === undefined) {
    return {
      damage: "0-0",
      earthDamage: "0-0",
      thunderDamage: "0-0",
      waterDamage: "0-0",
      fireDamage: "0-0",
      airDamage: "0-0",
    };
  }

  const item = itembuild.item;
  const powders = itembuild.powder;
  const neutralDamage = itembuild.item["damage"];

  const minNeutralDamage = parseInt(neutralDamage.split("-")[0]);
  const maxNeutralDamage = parseInt(neutralDamage.split("-")[1]);

  let currentMinNeutralDamage = minNeutralDamage;
  let currentMaxNeutralDamage = maxNeutralDamage;

  let converted = 0.0;

  const weaponDamage = {
    damage: item.damage,
    earthDamage: item.earthDamage,
    thunderDamage: item.thunderDamage,
    waterDamage: item.waterDamage,
    fireDamage: item.fireDamage,
    airDamage: item.airDamage,
  };

  for (const _ in powders) {
    let currentTypePowder = powders[_];
    const currentElement = damageEmojiReverse[currentTypePowder.charAt(0)];
    let currentDamageData = weaponDamage[currentElement];
    let mincurrentDamage = parseFloat(currentDamageData.split("-")[0]);
    let maxcurrentDamage = parseFloat(currentDamageData.split("-")[1]);

    if (converted <= 1) {
      if (converted + powderDamageConvert[currentTypePowder].fromNeutral >= 1) {
        mincurrentDamage += currentMinNeutralDamage;
        maxcurrentDamage += currentMaxNeutralDamage;
        currentMinNeutralDamage = 0;
        currentMaxNeutralDamage = 0;
      } else {
        mincurrentDamage +=
          powderDamageConvert[currentTypePowder].fromNeutral * minNeutralDamage;
        maxcurrentDamage +=
          powderDamageConvert[currentTypePowder].fromNeutral * maxNeutralDamage;
        currentMinNeutralDamage -=
          powderDamageConvert[currentTypePowder].fromNeutral * minNeutralDamage;
        currentMaxNeutralDamage -=
          powderDamageConvert[currentTypePowder].fromNeutral * maxNeutralDamage;
      }
    }

    mincurrentDamage += parseFloat(
      powderDamageConvert[currentTypePowder].plus.split("-")[0]
    );
    maxcurrentDamage += parseFloat(
      powderDamageConvert[currentTypePowder].plus.split("-")[1]
    );

    mincurrentDamage = Math.floor(mincurrentDamage);
    maxcurrentDamage = Math.floor(maxcurrentDamage);
    currentMaxNeutralDamage = Math.floor(currentMaxNeutralDamage);
    currentMinNeutralDamage = Math.floor(currentMinNeutralDamage);

    if (mincurrentDamage <= 0) mincurrentDamage = 0;
    if (maxcurrentDamage <= 0) maxcurrentDamage = 0;
    weaponDamage[currentElement] = mincurrentDamage + "-" + maxcurrentDamage;
    converted += parseFloat(powderDamageConvert[currentTypePowder].fromNeutral);
  }

  if (currentMaxNeutralDamage <= 0) currentMaxNeutralDamage = 0;
  if (currentMinNeutralDamage <= 0) currentMinNeutralDamage = 0;
  if(currentMinNeutralDamage > currentMaxNeutralDamage) {
      let temp = currentMaxNeutralDamage
      currentMaxNeutralDamage = currentMinNeutralDamage
      currentMinNeutralDamage = temp
  }
  weaponDamage.damage = currentMinNeutralDamage + "-" + currentMaxNeutralDamage;

  return weaponDamage;
}

export function GetArmorDefenseWithPowder(equipType, state) {
  const itembuild = state[equipType];
  if (equipType == "weapon") return null;
  if (itembuild === undefined) return null;

  const item = itembuild.item;
  const powders = itembuild.powder;

  const armorDefense = {
    earthDefense: item.earthDefense,
    thunderDefense: item.thunderDefense,
    waterDefense: item.waterDefense,
    fireDefense: item.fireDefense,
    airDefense: item.airDefense,
  };

  for (const _ in powders) {
    let currentTypePowder = powders[_];

    if (powderDefenseConvert[currentTypePowder].earthDefense !== undefined) {
      armorDefense.earthDefense +=
        powderDefenseConvert[currentTypePowder].earthDefense;
    }
    if (powderDefenseConvert[currentTypePowder].thunderDefense !== undefined) {
      armorDefense.thunderDefense +=
        powderDefenseConvert[currentTypePowder].thunderDefense;
    }
    if (powderDefenseConvert[currentTypePowder].waterDefense !== undefined) {
      armorDefense.waterDefense +=
        powderDefenseConvert[currentTypePowder].waterDefense;
    }
    if (powderDefenseConvert[currentTypePowder].fireDefense !== undefined) {
      armorDefense.fireDefense +=
        powderDefenseConvert[currentTypePowder].fireDefense;
    }
    if (powderDefenseConvert[currentTypePowder].airDefense !== undefined) {
      armorDefense.airDefense +=
        powderDefenseConvert[currentTypePowder].airDefense;
    }
  }

  return armorDefense;
}

export function StatAssignCalculateFunction(itembuildData) {
  const statType = [
    "strength",
    "dexterity",
    "intelligence",
    "defense",
    "agility",
  ];

  let requireStatTypePoints = {
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    defense: 0,
    agility: 0,
  };

  let additionalStatTypePoints = {
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    defense: 0,
    agility: 0,
  };

  let finalStatTypePoints = {
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    defense: 0,
    agility: 0,
  };

  let finalStatTypePointsWithoutWeapon = {
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    defense: 0,
    agility: 0,
  };

  let properStatAssign = {
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    defense: 0,
    agility: 0,
  };

  statType.forEach((s) => {
    let maxValue = 0;

    let filtered = BUILDEQUIPS.filter(
      (b) => itembuildData[b] !== undefined
    ).map((b) => itembuildData[b].item[s]);

    if (filtered.length >= 1) maxValue = Math.max.apply(null, filtered);
    requireStatTypePoints[s] = maxValue;
  });

  statType.forEach((s) => {
    BUILDEQUIPS.filter((b) => itembuildData[b] !== undefined)
      .sort((s1, s2) => {
        let v1 = itembuildData[s1].item[s];
        let v2 = itembuildData[s2].item[s];
        return v1 - v2;
      })
      .forEach((b) => {
        let additionalPoint = itembuildData[b].item[s + "Points"];
        additionalStatTypePoints[s] = additionalPoint;

        let requirePoint = itembuildData[b].item[s];

        if (finalStatTypePointsWithoutWeapon[s] < requirePoint) {
          let needToAssignMore =
            requirePoint - finalStatTypePointsWithoutWeapon[s];
          if (needToAssignMore >= 0) {
            finalStatTypePointsWithoutWeapon[s] += needToAssignMore;
            finalStatTypePoints[s] += needToAssignMore;
            properStatAssign[s] += needToAssignMore;
          }
        }
        if (s !== "weapon") {
          finalStatTypePointsWithoutWeapon[s] += additionalPoint;
        }
        finalStatTypePoints[s] += additionalPoint;
      });
  });

  let remainStatPoints =
    200 - `${statType.map((v) => properStatAssign[v]).reduce((a, s) => a + s)}`;

  return {
    requireStatTypePoints: requireStatTypePoints,
    additionalStatTypePoints: additionalStatTypePoints,
    finalStatTypePoints: finalStatTypePoints,
    finalStatTypePointsWithoutWeapon: finalStatTypePointsWithoutWeapon,
    properStatAssign: properStatAssign,
    remainStatPoints: remainStatPoints,
  };
}

export function getMaxSum(itembuildData, targetValue, fixed = false) {
  let filtered = BUILDEQUIPS.filter(
    (v) => itembuildData[v] !== undefined
  ).filter(
    (v) =>
      itembuildData[v].item[targetValue] !== undefined &&
      itembuildData[v].item[targetValue] !== 0
  );

  if (filtered.length === 0) return 0;

  return filtered
    .map((v) => {
      // 자동 감정 된 것은 제외
      if (isIDed(itembuildData[v].item) || fixed)
        return itembuildData[v].item[targetValue];
      else {
        return getMaxValue(itembuildData[v].item[targetValue]);
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

export function getMaxValue(base) {
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

export function getBuildDamages(itembuildData) {
  let finalSkillDamages = {
    1: {
      mindamage: 0,
      maxdamage: 0,
      minearthDamage: 0,
      maxearthDamage: 0,
      minthunderDamage: 0,
      maxthunderDamage: 0,
      minwaterDamage: 0,
      maxwaterDamage: 0,
      minfireDamage: 0,
      maxfireDamage: 0,
      minairDamage: 0,
      maxairDamage: 0,
    },
    2: {
      mindamage: 0,
      maxdamage: 0,
      minearthDamage: 0,
      maxearthDamage: 0,
      minthunderDamage: 0,
      maxthunderDamage: 0,
      minwaterDamage: 0,
      maxwaterDamage: 0,
      minfireDamage: 0,
      maxfireDamage: 0,
      minairDamage: 0,
      maxairDamage: 0,
    },
    3: {
      mindamage: 0,
      maxdamage: 0,
      minearthDamage: 0,
      maxearthDamage: 0,
      minthunderDamage: 0,
      maxthunderDamage: 0,
      minwaterDamage: 0,
      maxwaterDamage: 0,
      minfireDamage: 0,
      maxfireDamage: 0,
      minairDamage: 0,
      maxairDamage: 0,
    },
    4: {
      mindamage: 0,
      maxdamage: 0,
      minearthDamage: 0,
      maxearthDamage: 0,
      minthunderDamage: 0,
      maxthunderDamage: 0,
      minwaterDamage: 0,
      maxwaterDamage: 0,
      minfireDamage: 0,
      maxfireDamage: 0,
      minairDamage: 0,
      maxairDamage: 0,
    },
  };

  const weaponDamageSplitter = (value) => {
    const ENUM_DAMAGE = [
      "damage",
      "earthDamage",
      "thunderDamage",
      "waterDamage",
      "fireDamage",
      "airDamage",
    ];
    const wd = {
      mindamage: 0,
      maxdamage: 0,
      minearthDamage: 0,
      maxearthDamage: 0,
      minthunderDamage: 0,
      maxthunderDamage: 0,
      minwaterDamage: 0,
      maxwaterDamage: 0,
      minfireDamage: 0,
      maxfireDamage: 0,
      minairDamage: 0,
      maxairDamage: 0,
    };
    ENUM_DAMAGE.forEach((v) => {
      let split = value[v].split("-");
      wd[`min${v}`] = parseInt(split[0]);
      wd[`max${v}`] = parseInt(split[1]);
    });
    return wd;
  };

  if (!hasItemTypeInBuild("weapon")) return finalSkillDamages;

  const weaponItem = itembuildData.weapon.item;
  const weaponType = weaponItem.type.toLowerCase()


  const attackSpeedMultiplier = parseFloat(AttackSpeedMultipliers[weaponItem.attackSpeed]);

  const elementDamage = {
    earthDamage: getMaxSum(itembuildData, "bonusEarthDamage") / 100,
    thunderDamage: getMaxSum(itembuildData, "bonusThunderDamage") / 100,
    waterDamage: getMaxSum(itembuildData, "bonusWaterDamage") / 100,
    fireDamage: getMaxSum(itembuildData, "bonusFireDamage") / 100,
    airDamage: getMaxSum(itembuildData, "bonusAirDamage") / 100,
  };

  const spellDamage = getMaxSum(itembuildData, 'spellDamage')

  const spellDamageRaw = getMaxSum(itembuildData, 'spellDamageRaw')

  const weaponDamageSplit = weaponDamageSplitter(
    GetWeaponDamageWithPowder("weapon", itembuildData)
  );

  const statAssigned = StatAssignCalculateFunction(itembuildData);


  switch(weaponType) {
      case 'bow': {
        finalSkillDamages = computeAsArcher(
            weaponDamageSplit,
            statAssigned.finalStatTypePoints,
            elementDamage,
            spellDamage,
            spellDamageRaw,
            finalSkillDamages,
            itembuildData,
            weaponItem
          );
          break;
      }
      case 'dagger': {
        finalSkillDamages = computeAsAssasin(
            weaponDamageSplit,
            statAssigned.finalStatTypePoints,
            elementDamage,
            spellDamage,
            spellDamageRaw,
            finalSkillDamages,
            itembuildData,
            weaponItem
          );
        break;
      }
      case 'wand': {
          break;
      }
      case 'spear': {
        break;
      }
      case 'relik': {
        break;
      }
      default: break;
  }

  return finalSkillDamages;
}



// If Weapon Type is Bow
function computeAsArcher(
  weaponDamage,
  statAssigned,
  elementDamage,
  spellDamage,
  spellDamageRaw,
  finalSkillDamage,
  itemBuildData,
  weaponItem
) {
  const currentLevel = itemBuildData.settings.level;

  for (let i = 1; i < 4; i++) {
    let selectedGrade = "";
    // 스킬 등급 선택
    ENUM_GRADE.forEach((v) => {
      if (CLASSSKILLS.archer[i][v].level < currentLevel) selectedGrade = v;
    });

    const selectedAbility = CLASSSKILLS.archer[i][selectedGrade]

    if(i == 4 && selectedGrade == 'grade3') {
        continue;
        // let shieldSpellMultiplier = selectedAbility.shieldDamage;
        // let rainSpellMultiplier = selectedAbility.rainDamage;
        // let shieldConversionOrder = selectedAbility.shieldDamageConversionOrder
        // let shieldConversion = selectedAbility.shieldDamageConversion
        // let rainConversionOrder = selectedAbility.rainDamageConversionOrder
        // let rainConversion = selectedAbility.rainDamageConversion

    
        // finalSkillDamage[i] = finalDamage

    } else {
        let spellMultiplier = selectedAbility.damage;
        let conversionOrder = selectedAbility.conversionOrder
        let conversion = selectedAbility.conversion
        let finalDamage = computeBuildSpellDamage(
            weaponDamage,
            weaponItem,
            elementDamage,
            statAssigned,
            conversionOrder,
            conversion,
            spellDamage,
            spellDamageRaw,
            spellMultiplier,
        )
    
        finalSkillDamage[i] = finalDamage
    }
  }

  return finalSkillDamage;
}

function computeAsAssasin(
    weaponDamage,
    statAssigned,
    elementDamage,
    spellDamage,
    spellDamageRaw,
    finalSkillDamage,
    itemBuildData,
    weaponItem
  ) {
    const currentLevel = itemBuildData.settings.level;

    for (let i = 1; i < 5; i++) {
      let selectedGrade = "";
      // 스킬 등급 선택
      ENUM_GRADE.forEach((v) => {
        if (CLASSSKILLS.assasin[i][v].level < currentLevel) selectedGrade = v;
      });
  
      const selectedAbility = CLASSSKILLS.assasin[i][selectedGrade]


      if(i==2) continue;

    //   if(i==3 && (selectedGrade == 'grade2' || selectedGrade == 'grade3')) {
    //     let spellMultiplier = selectedAbility.fatalityDamage;
    //     let conversionOrder = selectedAbility.conversionOrder
    //     let conversion = selectedAbility.conversion
    //     let finalDamage = computeBuildSpellDamage(
    //         weaponDamage,
    //         weaponItem,
    //         elementDamage,
    //         statAssigned,
    //         conversionOrder,
    //         conversion,
    //         spellDamage,
    //         spellDamageRaw,
    //         spellMultiplier,
    //     )
    
    //     finalSkillDamage[i] = {
    //         ...finalSkillDamage[i],
    //         fatality: {
    //             finalDamage
    //         }
    //     }
    //   }

      let spellMultiplier = selectedAbility.damage;
      let conversionOrder = selectedAbility.conversionOrder
      let conversion = selectedAbility.conversion

      let finalDamage = computeBuildSpellDamage(
          weaponDamage,
          weaponItem,
          elementDamage,
          statAssigned,
          conversionOrder,
          conversion,
          spellDamage,
          spellDamageRaw,
          spellMultiplier,
      )
  
      finalSkillDamage[i] = finalDamage

    }

    return finalSkillDamage
}


