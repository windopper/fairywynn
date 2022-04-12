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
import {
  damageSpellConversion,
  DamageModifier,
  computeFinalDamage,
  computeBuildSpellDamage,
  getMeleeDamage,
} from "./WynnDamageCalculation";
import { getMajorIds, getTotalHealth } from "./WynnUtils";

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
  return sum;
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
  if (currentMinNeutralDamage > currentMaxNeutralDamage) {
    let temp = currentMaxNeutralDamage;
    currentMaxNeutralDamage = currentMinNeutralDamage;
    currentMinNeutralDamage = temp;
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
        if (b !== "weapon") {
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

export function ComputeArmorWearSequence(itemBuildData) {

  const statType = [
    "strength",
    "dexterity",
    "intelligence",
    "defense",
    "agility",
  ];

  const requireStatTypePoints = itemBuildData.currentBuild.statAssigned.requireStatTypePoints
  const properStatAssign = itemBuildData.currentBuild.statAssigned.properStatAssign

  let armorSequence = BUILDEQUIPS.filter(v => itemBuildData[v]).map(v => itemBuildData[v].item)
  let notPassing = true
  let currentArmor = null

  let currentStat = {
    'strength': properStatAssign.strength,
    'dexterity': properStatAssign.dexterity,
    'intelligence': properStatAssign.intelligence,
    'defense': properStatAssign.defense,
    'agility': properStatAssign.agility
  }

  let i=0; 
  while(i<armorSequence.length) {
    currentArmor = armorSequence[i]
    let pass = true;
    for(let j in statType) {
      const type = statType[j]
      if(currentStat[type] < currentArmor[type]) {
        pass = false;
        break;
      }
    }
    if(pass) {
      statType.forEach(v => {
        currentStat[v] += currentArmor[`${v}Points`]
      })
      i++;
    }
    else {
      let temp = armorSequence.splice(i, 1)
      armorSequence.push(temp[0])
    }
  }

  return armorSequence
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

export function getMinSum(itembuildData, targetValue, fixed = false) {
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
        return getMinValue(itembuildData[v].item[targetValue]);
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

export function getMinValue(base) {
  let min;
  if(base > 0) {
    min = base * 0.3
    if(min < 1) min = 1;
  } else {
    min = base * 1.3
    if(min > -1) min = -1;
  }
  min = Math.round(min)
  return min;
}

export function getDefaultHealth(level) {
  return 5 + 5 * level;
}

export function getDefaultDefense(itembuild) {
  if(!itembuild.weapon) return 1
  switch(itembuild.weapon.item.type.toLowerCase()) {
    case 'bow': return 0.6
    case 'spear': return 1.2
    case 'mage': return 0.8
    case 'dagger': return 1
    case 'relik': return 0.5
    default: return 1
  }
}

export function computePoisonDamage(basePoison, strengthPoint) {
  return Math.max(0, basePoison * (1 + SkillPointToPercentage(strengthPoint) / 100))
}

export function getValidStat(level) {
  return level <= 100 ? (level - 1) * 2 : 200;
}

export function getManaUsed(baseMana, intelligentPoint, spellCostRaw, spellCostPct) {
  return Math.max(1, Math.floor(Math.ceil(baseMana * (1 - SkillPointToPercentage(intelligentPoint) / 100) + spellCostRaw) * (1 + spellCostPct / 100)))
}

export function computeAttackSpeed(weaponsAttackSpeed, attackSpeedBonusSum) {
  const attackSpeedEnum = {
    'SUPER_FAST': 6,
    'VERY_FAST': 5,
    'FAST': 4,
    'NORMAL': 3,
    'SLOW': 2,
    'VERY_SLOW': 1,
    'SUPER_SLOW': 0,
  }

  const value = attackSpeedEnum[weaponsAttackSpeed]
  const computedValue = value + attackSpeedBonusSum
  if(computedValue <= 0) return 'SUPER_SLOW'
  else if(computedValue === 1) return 'VERY_SLOW'
  else if(computedValue === 2) return 'SLOW'
  else if(computedValue === 3) return 'NORMAL'
  else if(computedValue === 4) return 'FAST'
  else if(computedValue === 5) return 'VERY_FAST'
  else if(computedValue >= 6) return 'SUPER_FAST'
}

export function getAverageDamage(nonCritDamage, critDamage, dexterityPoint) {
  const dexterityPercent = SkillPointToPercentage(dexterityPoint) / 100;
  return (1 - dexterityPercent) * nonCritDamage + dexterityPercent * critDamage
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

  if (!hasItemTypeInBuild("weapon")) return {
    'spell': finalSkillDamages,
    'melee': {
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
  }

  const weaponItem = itembuildData.weapon.item;
  const weaponType = weaponItem.type.toLowerCase();

  const attackSpeedMultiplier = parseFloat(
    AttackSpeedMultipliers[weaponItem.attackSpeed]
  );

  const attackSpeedMultiplierForMelee = parseFloat(
    AttackSpeedMultipliers[computeAttackSpeed(weaponItem.attackSpeed, getMaxSum(itembuildData, 'attackSpeedBonus', true))]
  )

  const meleeDamage = getMaxSum(itembuildData, 'damageBonus') / 100;
  const meleeDamageRaw = getMaxSum(itembuildData, 'damageBonusRaw');

  const elementDamage = {
    earthDamage: getMaxSum(itembuildData, "bonusEarthDamage") / 100,
    thunderDamage: getMaxSum(itembuildData, "bonusThunderDamage") / 100,
    waterDamage: getMaxSum(itembuildData, "bonusWaterDamage") / 100,
    fireDamage: getMaxSum(itembuildData, "bonusFireDamage") / 100,
    airDamage: getMaxSum(itembuildData, "bonusAirDamage") / 100,
  };

  const spellDamage = getMaxSum(itembuildData, "spellDamage") / 100;

  const spellDamageRaw = getMaxSum(itembuildData, "spellDamageRaw");

  const weaponDamageSplit = weaponDamageSplitter(
    GetWeaponDamageWithPowder("weapon", itembuildData)
  );

  const statAssigned = StatAssignCalculateFunction(itembuildData);

  const meleeFinalDamage = getMeleeDamage(
    weaponDamageSplit,
    elementDamage,
    statAssigned.finalStatTypePoints,
    attackSpeedMultiplierForMelee,
    meleeDamage,
    meleeDamageRaw
  );

  switch (weaponType) {
    case "bow": {
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
    case "dagger": {
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
    case "wand": {
      finalSkillDamages = computeAsMage(
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
    case "spear": {
      finalSkillDamages = computeAsWarrior(
        weaponDamageSplit,
        statAssigned.finalStatTypePoints,
        elementDamage,
        spellDamage,
        spellDamageRaw,
        finalSkillDamages,
        itembuildData,
        weaponItem
      )
      break;
    }
    case "relik": {
      finalSkillDamages = computeAsShaman(
        weaponDamageSplit,
        statAssigned.finalStatTypePoints,
        elementDamage,
        spellDamage,
        spellDamageRaw,
        finalSkillDamages,
        itembuildData,
        weaponItem
      )
      break;
    }
    default:
      break;
  }

  return {
    spell: finalSkillDamages,
    melee: meleeFinalDamage,
  }
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
  let isHawkEye = getMajorIds(itemBuildData).includes('HAWKEYE')


  for (let i = 1; i < 5; i++) {
    let selectedGrade = "";
    // 스킬 등급 선택
    ENUM_GRADE.forEach((v) => {
      if (CLASSSKILLS.archer[i][v].level < currentLevel) selectedGrade = v;
    });

    const selectedAbility = CLASSSKILLS.archer[i][selectedGrade];

    if (i == 1) {
      let spellMultiplier = selectedAbility.damage;
      if(isHawkEye) spellMultiplier = selectedAbility.hawkEyeDamage
      let conversionOrder = selectedAbility.conversionOrder;
      let conversion = selectedAbility.conversion;

      let spellTotalSpellMultiplier =
        selectedAbility.damage * selectedAbility.arrows;
      if(isHawkEye) spellTotalSpellMultiplier = selectedAbility.hawkEyeDamage * 5;

      let finalDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        conversionOrder,
        conversion,
        spellDamage,
        spellDamageRaw,
        spellMultiplier
      );

      let totalArrowDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        conversionOrder,
        conversion,
        spellDamage,
        spellDamageRaw,
        spellTotalSpellMultiplier
      );

      finalSkillDamage[i] = {
        perArrow: finalDamage,
        totalArrow: totalArrowDamage,
      };
    } 
    else if (i == 2 && (selectedGrade == "grade1" || selectedGrade == "grade2"))
      continue;
    else if (i == 4 && selectedGrade == "grade3") {
      let shieldSpellMultiplier = selectedAbility.shieldDamage;
      let rainSpellMultiplier = selectedAbility.rainDamage;
      let shieldConversionOrder = selectedAbility.shieldDamageConversionOrder;
      let shieldConversion = selectedAbility.shieldDamageConversion;
      let rainConversionOrder = selectedAbility.rainDamageConversionOrder;
      let rainConversion = selectedAbility.rainDamageConversion;

      let shieldFinalDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        shieldConversionOrder,
        shieldConversion,
        spellDamage,
        spellDamageRaw,
        shieldSpellMultiplier
      );

      let rainFinalDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        rainConversionOrder,
        rainConversion,
        spellDamage,
        spellDamageRaw,
        rainSpellMultiplier
      );
      finalSkillDamage[i] = {
        shieldFinalDamage: shieldFinalDamage,
        rainFinalDamage: rainFinalDamage,
      };
    } else {
      let spellMultiplier = selectedAbility.damage;
      let conversionOrder = selectedAbility.conversionOrder;
      let conversion = selectedAbility.conversion;
      let finalDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        conversionOrder,
        conversion,
        spellDamage,
        spellDamageRaw,
        spellMultiplier
      );

      finalSkillDamage[i] = finalDamage;
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
  let isCherryBomb = getMajorIds(itemBuildData).includes('CHERRY_BOMBS')

  for (let i = 1; i < 5; i++) {
    let selectedGrade = "";
    // 스킬 등급 선택
    ENUM_GRADE.forEach((v) => {
      if (CLASSSKILLS.assasin[i][v].level < currentLevel) selectedGrade = v;
    });

    const selectedAbility = CLASSSKILLS.assasin[i][selectedGrade];

    if (i == 2) continue;
    else if(i==3) {

      let conversionOrder = selectedAbility.conversionOrder;
      let conversion = selectedAbility.conversion;
      
      let hits = selectedAbility.hits;
      let spellMultiplier = selectedAbility.damage;

      let HitDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        [],
        {},
        spellDamage,
        spellDamageRaw,
        spellMultiplier
      );

      let totalHitDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        [],
        {},
        spellDamage,
        spellDamageRaw,
        spellMultiplier * hits
      )

      switch(selectedGrade) {
        case 'grade1': {
          finalSkillDamage[i] = {
            'hitDamage': HitDamage,
            'totalHitDamage': totalHitDamage
          }
          break;
        }
        case 'grade2':
        case 'grade3': {

          let fatalitySpellMultiplier = selectedAbility.lastDamage
          let fatalityDamage = computeBuildSpellDamage(
            weaponDamage,
            weaponItem,
            elementDamage,
            statAssigned,
            conversionOrder,
            conversion,
            spellDamage,
            spellDamageRaw,
            fatalitySpellMultiplier
          );
          finalSkillDamage[i] = {
            'hitDamage': HitDamage,
            'totalHitDamage': totalHitDamage,
            'fatalityDamage': fatalityDamage,
          }
          break;
        }
      }
      continue;
    }
    else if(i==4) {

      let spellMultiplier = selectedAbility.damage;
      if(isCherryBomb) {
        spellMultiplier = selectedAbility.cherryBombDamage;
      }
      let conversionOrder = selectedAbility.conversionOrder;
      let conversion = selectedAbility.conversion;
      let totalHits = selectedAbility.totalCount
      if(isCherryBomb) {
        totalHits = 3
      }
  
      let oneHitDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        conversionOrder,
        conversion,
        spellDamage,
        spellDamageRaw,
        spellMultiplier
      );

      let totalHitDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        conversionOrder,
        conversion,
        spellDamage,
        spellDamageRaw,
        spellMultiplier * totalHits
      );

      finalSkillDamage[i] = {
        'hitDamage': oneHitDamage,
        'totalHitDamage': totalHitDamage,
      }

      continue;
    } else {
      let spellMultiplier = selectedAbility.damage;
      let conversionOrder = selectedAbility.conversionOrder;
      let conversion = selectedAbility.conversion;
  
      let finalDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        conversionOrder,
        conversion,
        spellDamage,
        spellDamageRaw,
        spellMultiplier
      );
  
      finalSkillDamage[i] = finalDamage;
    }
  }

  return finalSkillDamage;
}

function getMageWaterHealRate(waterDamage) {
  return Math.max(0.5, Math.min(1.75, 1 + 0.5 * waterDamage));
}

function getShamanWaterHealRate(waterDamage) {
  return Math.max(0, Math.min(1.75, 1 + 0.5 * waterDamage));
}

function computeAsMage(
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
  const currentHealth =
    getMaxSum(itemBuildData, "health", true) + getDefaultHealth(currentLevel) + getMaxSum(itemBuildData, "healthBonus", true);

  for (let i = 1; i < 5; i++) {
    let selectedGrade = "";
    // 스킬 등급 선택
    ENUM_GRADE.forEach((v) => {
      if (CLASSSKILLS.mage[i][v].level < currentLevel) selectedGrade = v;
    });

    const selectedAbility = CLASSSKILLS.mage[i][selectedGrade];

    if (i == 1) {
      let waterDamageRate = elementDamage.waterDamage;
      let computedMageWaterHealRate = getMageWaterHealRate(waterDamageRate);

      switch (selectedGrade) {
        case "grade1":
        case "grade2": {
          let firstPulse =
            currentHealth *
            selectedAbility.healConversion *
            computedMageWaterHealRate;
          let firstAllyPulse =
            currentHealth *
            selectedAbility.healAllyConversion *
            computedMageWaterHealRate;
          firstAllyPulse = Math.round(firstAllyPulse);
          firstPulse = Math.round(firstPulse);
          finalSkillDamage[i] = {
            firstPulse: firstPulse,
            firstAllyPulse: firstAllyPulse,
          };
          break;
        }
        case "grade3": {
          let firstPulse =
            currentHealth *
            selectedAbility.firstPulseHealConversion *
            computedMageWaterHealRate;
          let firstAllyPulse =
            currentHealth *
            selectedAbility.firstPulseHealAllyConversion *
            computedMageWaterHealRate;
          let afterPulse =
            currentHealth *
            selectedAbility.afterPulseHealConversion *
            computedMageWaterHealRate;
          let afterAllyPulse =
            currentHealth *
            selectedAbility.afterPulseHealAllyConversion *
            computedMageWaterHealRate;
          firstPulse = Math.round(firstPulse);
          firstAllyPulse = Math.round(firstAllyPulse);
          afterPulse = Math.round(afterPulse);
          afterAllyPulse = Math.round(afterAllyPulse);
          finalSkillDamage[i] = {
            firstPulse: firstPulse,
            firstAllyPulse: firstAllyPulse,
            afterPulse: afterPulse,
            afterAllyPulse: afterAllyPulse,
          };
          break;
        }
      }
    } else if (i == 3 && selectedGrade == "grade3") {
      //Meteor Burning Damage

      let spellMultiplier = selectedAbility.damage;
      let meteorBurningMultiplier = selectedAbility.burnDamage;
      let conversionOrder = selectedAbility.conversionOrder;
      let conversion = selectedAbility.conversion;

      let finalDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        conversionOrder,
        conversion,
        spellDamage,
        spellDamageRaw,
        spellMultiplier
      );

      let finalMeteorBurnDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        [],
        {},
        spellDamage,
        spellDamageRaw,
        meteorBurningMultiplier
      );

      finalSkillDamage[i] = {
        blastDamage: finalDamage,
        burningDamage: finalMeteorBurnDamage,
      };
    } else {
      let spellMultiplier = selectedAbility.damage;
      let conversionOrder = selectedAbility.conversionOrder;
      let conversion = selectedAbility.conversion;

      let finalDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        conversionOrder,
        conversion,
        spellDamage,
        spellDamageRaw,
        spellMultiplier
      );

      finalSkillDamage[i] = finalDamage;
    }
  }

  return finalSkillDamage;
}

function computeAsWarrior(
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
  const isRally = getMajorIds(itemBuildData).includes('RALLY')
  const currentHealth = getTotalHealth(itemBuildData)

  for (let i = 1; i < 5; i++) {
    let selectedGrade = "";
    // 스킬 등급 선택
    ENUM_GRADE.forEach((v) => {
      if (CLASSSKILLS.warrior[i][v].level < currentLevel) selectedGrade = v;
    });

    const selectedAbility = CLASSSKILLS.warrior[i][selectedGrade];

    if (i == 1) {
      if (selectedGrade == "grade2" || selectedGrade == "grade3") {
        let spellMultiplier = selectedAbility.damage;
        let conversionOrder = selectedAbility.conversionOrder;
        let conversion = selectedAbility.conversion;

        let firstExplosionDamage = computeBuildSpellDamage(
          weaponDamage,
          weaponItem,
          elementDamage,
          statAssigned,
          conversionOrder,
          conversion,
          spellDamage,
          spellDamageRaw,
          spellMultiplier
        );

        let secondExplosionDamage = computeBuildSpellDamage(
          weaponDamage,
          weaponItem,
          elementDamage,
          statAssigned,
          [],
          {},
          spellDamage,
          spellDamageRaw,
          spellMultiplier
        );

        finalSkillDamage[i] = {
          firstDamage: firstExplosionDamage,
          secondDamage: secondExplosionDamage,
        };
        continue;
      }
    }
    else if(i == 2 && isRally) {
      const waterDamage = elementDamage.waterDamage
      console.log(waterDamage)
      console.log(currentHealth)
      const selfHeal = currentHealth * 0.1 * getMageWaterHealRate(waterDamage)
      const allyHeal = currentHealth * 0.15 * getMageWaterHealRate(waterDamage)
      finalSkillDamage[i] = {
        'selfHeal': selfHeal,
        'allyHeal': allyHeal
      }
      continue;
    }
    else if (i == 3) {
      if (selectedGrade == "grade2") {
        let firstSpellMultiplier = selectedAbility.firstDamage;
        let firstConversionOrder = selectedAbility.firstConversionOrder;
        let firstConversion = selectedAbility.firstConversion;

        let secondSpellMultiplier = selectedAbility.secondDamage;
        let secondConversionOrder = selectedAbility.secondConversionOrder;
        let secondConversion = selectedAbility.secondConversion;

        let firstDamage = computeBuildSpellDamage(
          weaponDamage,
          weaponItem,
          elementDamage,
          statAssigned,
          firstConversionOrder,
          firstConversion,
          spellDamage,
          spellDamageRaw,
          firstSpellMultiplier
        );

        let secondDamage = computeBuildSpellDamage(
          weaponDamage,
          weaponItem,
          elementDamage,
          statAssigned,
          secondConversionOrder,
          secondConversion,
          spellDamage,
          spellDamageRaw,
          secondSpellMultiplier
        );

        finalSkillDamage[i] = {
          firstDamage: firstDamage,
          secondDamage: secondDamage,
        };
        continue;
      } else if (selectedGrade == "grade3") {
        let firstSpellMultiplier = selectedAbility.firstDamage;
        let firstConversionOrder = selectedAbility.firstConversionOrder;
        let firstConversion = selectedAbility.firstConversion;

        let secondSpellMultiplier = selectedAbility.secondDamage;
        let secondConversionOrder = selectedAbility.secondConversionOrder;
        let secondConversion = selectedAbility.secondConversion;

        let thirdSpellMultiplier = selectedAbility.thirdDamage;
        let thirdConversionOrder = selectedAbility.thirdConversionOrder;
        let thirdConversion = selectedAbility.thirdConversion;

        let firstDamage = computeBuildSpellDamage(
          weaponDamage,
          weaponItem,
          elementDamage,
          statAssigned,
          firstConversionOrder,
          firstConversion,
          spellDamage,
          spellDamageRaw,
          firstSpellMultiplier
        );

        let secondDamage = computeBuildSpellDamage(
          weaponDamage,
          weaponItem,
          elementDamage,
          statAssigned,
          secondConversionOrder,
          secondConversion,
          spellDamage,
          spellDamageRaw,
          secondSpellMultiplier
        );

        let thirdDamage = computeBuildSpellDamage(
          weaponDamage,
          weaponItem,
          elementDamage,
          statAssigned,
          thirdConversionOrder,
          thirdConversion,
          spellDamage,
          spellDamageRaw,
          thirdSpellMultiplier
        );

        finalSkillDamage[i] = {
          firstDamage: firstDamage,
          secondDamage: secondDamage,
          thirdDamage: thirdDamage,
        };
        continue;
      }
    }
    else if (i == 4) {
      if(selectedGrade == 'grade2' || selectedGrade == 'grade3') {
        let firstSpellMultiplier = selectedAbility.firstDamage;
        let firstConversionOrder = selectedAbility.firstConversionOrder;
        let firstConversion = selectedAbility.firstConversion;

        let afterSpellMultiplier = selectedAbility.afterDamage;
        let afterConversionOrder = selectedAbility.afterConversionOrder;
        let afterConversion = selectedAbility.afterConversion;
    
        let firstDamage = computeBuildSpellDamage(
          weaponDamage,
          weaponItem,
          elementDamage,
          statAssigned,
          firstConversionOrder,
          firstConversion,
          spellDamage,
          spellDamageRaw,
          firstSpellMultiplier
        );

        let afterDamage = computeBuildSpellDamage(
          weaponDamage,
          weaponItem,
          elementDamage,
          statAssigned,
          afterConversionOrder,
          afterConversion,
          spellDamage,
          spellDamageRaw,
          afterSpellMultiplier
        );

        finalSkillDamage[i] = {
          'firstDamage': firstDamage,
          'afterDamage': afterDamage,
        }
      }
      continue;
    }

    let spellMultiplier = selectedAbility.damage;
    let conversionOrder = selectedAbility.conversionOrder;
    let conversion = selectedAbility.conversion;

    let finalDamage = computeBuildSpellDamage(
      weaponDamage,
      weaponItem,
      elementDamage,
      statAssigned,
      conversionOrder,
      conversion,
      spellDamage,
      spellDamageRaw,
      spellMultiplier
    );

    finalSkillDamage[i] = finalDamage;
  }

  return finalSkillDamage
}

function computeAsShaman(
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
      if (CLASSSKILLS.shaman[i][v].level < currentLevel) selectedGrade = v;
    });
    
    if(selectedGrade === "") continue;

    const selectedAbility = CLASSSKILLS.shaman[i][selectedGrade];

    if(i==1 && selectedGrade == 'grade3') {
      let spellMultiplier = selectedAbility.damage;
      let conversionOrder = selectedAbility.conversionOrder;
      let conversion = selectedAbility.conversion;

      let smashSpellMultiplier = selectedAbility.smashDamage;
      let smashConversionOrder = selectedAbility.smashConversionOrder
      let smashConversion = selectedAbility.smashConversion

      let smashDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        smashConversionOrder,
        smashConversion,
        spellDamage,
        spellDamageRaw,
        smashSpellMultiplier
      )
  
      let finalDamage = computeBuildSpellDamage(
        weaponDamage,
        weaponItem,
        elementDamage,
        statAssigned,
        conversionOrder,
        conversion,
        spellDamage,
        spellDamageRaw,
        spellMultiplier
      );

      finalSkillDamage[i] = {
        'smashDamage': smashDamage,
        'tickDamage': finalDamage,
      }


  
      continue;
    }
    else if(i==2 && selectedGrade == 'grade1') continue;

    let spellMultiplier = selectedAbility.damage;
    let conversionOrder = selectedAbility.conversionOrder;
    let conversion = selectedAbility.conversion;

    let finalDamage = computeBuildSpellDamage(
      weaponDamage,
      weaponItem,
      elementDamage,
      statAssigned,
      conversionOrder,
      conversion,
      spellDamage,
      spellDamageRaw,
      spellMultiplier
    );

    finalSkillDamage[i] = finalDamage;
  }

  if(currentLevel >= 16) {
    const waterDamage = elementDamage.waterDamage;
    const currentHealth = getTotalHealth(itemBuildData)
    const healRate = getShamanWaterHealRate(waterDamage)
    const heal = 0.03 * currentHealth * healRate
    finalSkillDamage[1] = {
      ...finalSkillDamage[1],
      'Heal': heal
    }
  }
  console.log(finalSkillDamage)
  return finalSkillDamage
}
