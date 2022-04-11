import { SkillPointToPercentage } from "./WynnMath";
import { AttackSpeedMultipliers } from "./WynnData";
import { deepCopy } from "./FairyWynnUtil";

const initialAdditionalElementDamage = {
  earthDamage: 0,
  thunderDamage: 0,
  waterDamage: 0,
  fireDamage: 0,
  airDamage: 0,
};

let skillDamages = {
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

export function DamageModifier(
  elementDamage, // 속성 데미지
  statAssigned, // 할당 된 스탯
  spellDamage = 0,
  isCritical = false,
  additionalElementDamage = initialAdditionalElementDamage
) {
  const ENUM_DAMAGE = [
    "earthDamage",
    "thunderDamage",
    "waterDamage",
    "fireDamage",
    "airDamage",
  ];
  const ENUM_STATS = [
    "strength",
    "dexterity",
    "intelligence",
    "defense",
    "agility",
  ];

  const transformed = {
    damage: 1, // neutral Damage
    earthDamage: 1,
    thunderDamage: 1,
    waterDamage: 1,
    fireDamage: 1,
    airDamage: 1,
  };

  let critical = 0
  if(isCritical) critical = 1

  transformed.damage += spellDamage;
  transformed.damage = transformed.damage  * ((1 + SkillPointToPercentage(statAssigned.strength) / 100) + critical)
  if (transformed.damage < 0) transformed.damage = 0;

  ENUM_DAMAGE.forEach((v, i) => {
    transformed[v] += spellDamage;
    transformed[v] += elementDamage[v];
    transformed[v] += Math.round(SkillPointToPercentage(statAssigned[ENUM_STATS[i]])) / 100
    if (additionalElementDamage[v] !== undefined)
      transformed[v] += additionalElementDamage[v];
    transformed[v] = transformed[v] * ((1 + SkillPointToPercentage(statAssigned.strength) / 100) + critical)
    if (transformed[v] < 0) transformed[v] = 0; // 오류 발생하면 수정 할 것
  });

  return transformed;
}

/**
 *
 * @param {minimum neutral damage of weapon} minOriginNeutralDamage
 * @param {maximum neutral damage of weapon} maxOriginNeuturalDamage
 * @param {the weapon damage applied powder} weaponDamages
 * @param {conversion order weapon should} conversionOrder
 * @param {conversion value of element} conversion
 */
export function damageSpellConversion(
  minOriginNeutralDamage,
  maxOriginNeuturalDamage,
  weaponDamages,
  conversionOrder,
  conversion
) {
  if (conversionOrder == undefined || conversionOrder.length === 0)
    return weaponDamages;
  conversionOrder.forEach((v) => {
    let minConversion = minOriginNeutralDamage * conversion[v];
    let maxConversion = maxOriginNeuturalDamage * conversion[v];
    if (
      weaponDamages.mindamage <= minConversion &&
      weaponDamages.maxdamage <= maxConversion
    ) {
      weaponDamages[`min${v}`] += Math.floor(weaponDamages.mindamage);
      weaponDamages[`max${v}`] += Math.floor(weaponDamages.maxdamage);
      weaponDamages.mindamage = 0;
      weaponDamages.maxdamage = 0;
    } else if (
      weaponDamages.mindamage > minConversion &&
      weaponDamages.maxdamage > maxConversion
    ) {
      weaponDamages[`min${v}`] += Math.floor(minConversion);
      weaponDamages[`max${v}`] += Math.floor(maxConversion);
      weaponDamages.mindamage = Math.floor(
        weaponDamages.mindamage - minConversion
      );
      weaponDamages.maxdamage = Math.floor(
        weaponDamages.maxdamage - maxConversion
      );
    }
  });

  return weaponDamages;
}

export function computeFinalDamage(
  weaponDamage,
  damageModifier,
  attackSpeedMultiplier,
  spellDamageMultiplier
) {
  const ENUM_DAMAGE = [
    "damage",
    "earthDamage",
    "thunderDamage",
    "waterDamage",
    "fireDamage",
    "airDamage",
  ];
  ENUM_DAMAGE.forEach((v) => {
    weaponDamage[`min${v}`] = weaponDamage[`min${v}`] * damageModifier[v] * attackSpeedMultiplier * spellDamageMultiplier;
    weaponDamage[`max${v}`] = weaponDamage[`max${v}`] * damageModifier[v] * attackSpeedMultiplier * spellDamageMultiplier;
  });
  return weaponDamage;
}

export function roundDamage(computedDamage) {
  const ENUM_DAMAGE = [
    "damage",
    "earthDamage",
    "thunderDamage",
    "waterDamage",
    "fireDamage",
    "airDamage",
  ];
  ENUM_DAMAGE.forEach((v) => {
    let min = computedDamage[`min${v}`];
    let max = computedDamage[`max${v}`];
    computedDamage[`min${v}`] = Math.floor(min);
    computedDamage[`max${v}`] = Math.floor(max);
  });
  return computedDamage;
}

export function computeBuildSpellDamage(
  weaponDamage,
  weaponItem,
  elementDamage,
  statAssigned,
  conversionOrder,
  conversion,
  spellDamage,
  spellDamageRaw,
  spellDamageMultiplier,
  isCritical = false,
  additionalElementDamage = initialAdditionalElementDamage
) {
  const originalNeutralDamage = weaponItem["damage"];
  const minOriginNeutralDamage = parseInt(originalNeutralDamage.split("-")[0]);
  const maxOriginNeutralDamage = parseInt(originalNeutralDamage.split("-")[1]);
  const attackSpeedMultiplier = parseFloat(
    AttackSpeedMultipliers[weaponItem.attackSpeed]
  );

  let copiedWeaponDamage = deepCopy(weaponDamage);
  let copiedCriticalWeaponDamage = deepCopy(weaponDamage);

  // console.log(elementDamage)

  // Non-critical
  let convertedWeaponDamage = damageSpellConversion(
    minOriginNeutralDamage,
    maxOriginNeutralDamage,
    copiedWeaponDamage,
    conversionOrder,
    conversion
  );
  let modifier = DamageModifier(
    elementDamage,
    statAssigned,
    spellDamage,
    false,
    additionalElementDamage
  );
  let computeDamage = computeFinalDamage(
    convertedWeaponDamage,
    modifier,
    attackSpeedMultiplier,
    spellDamageMultiplier
  );
  let computeSpellDamageRaw = spellDamageRaw * spellDamageMultiplier * (SkillPointToPercentage(statAssigned.strength) / 100 + 1)

  computeDamage.mindamage += computeSpellDamageRaw;
  computeDamage.maxdamage += computeSpellDamageRaw;

  if(computeDamage.mindamage <= 0) computeDamage.mindamage = 0;
  if(computeDamage.maxdamage <= 0) computeDamage.maxdamage = 0;

  // Critical
  let criticalConvertedWeaponDamage = damageSpellConversion(
    minOriginNeutralDamage,
    maxOriginNeutralDamage,
    copiedCriticalWeaponDamage,
    conversionOrder,
    conversion
  );
  let criticalModifier = DamageModifier(
    elementDamage,
    statAssigned,
    spellDamage,
    true,
    additionalElementDamage
  );
  let criticalComputeDamage = computeFinalDamage(
    criticalConvertedWeaponDamage,
    criticalModifier,
    attackSpeedMultiplier,
    spellDamageMultiplier
  );
  let criticalComputeSpellDamageRaw = spellDamageRaw * spellDamageMultiplier * (SkillPointToPercentage(statAssigned.strength) / 100 + 1 + 1);

  criticalComputeDamage.mindamage += criticalComputeSpellDamageRaw;
  criticalComputeDamage.maxdamage += criticalComputeSpellDamageRaw;
  if(criticalComputeDamage.mindamage <= 0) criticalComputeDamage.mindamage = 0
  if(criticalComputeDamage.maxdamage <= 0) criticalComputeDamage.maxdamage = 0

  computeDamage = roundDamage(computeDamage);
  criticalComputeDamage = roundDamage(criticalComputeDamage);

  return {
    nonCritical: computeDamage,
    critical: criticalComputeDamage,
  };
}


export function getMeleeDamage(weaponDamage, elementDamage, statAssigned, attackSpeedMultiplier, meleeDamage, meleeDamageRaw) {

  const ENUM_DAMAGE = [
    "earthDamage",
    "thunderDamage",
    "waterDamage",
    "fireDamage",
    "airDamage",
  ];

  const EXTENDED_ENUM_DAMAGE = [
    "damage",
    "earthDamage",
    "thunderDamage",
    "waterDamage",
    "fireDamage",
    "airDamage",
  ]

  const ENUM_STATS = [
    "strength",
    "dexterity",
    "intelligence",
    "defense",
    "agility",
  ];

  const getSumAverage = (damages) => {
    let sum = 0;
    EXTENDED_ENUM_DAMAGE.forEach(v => {
      let min = damages[`min${v}`]
      let max = damages[`max${v}`]
      sum += (min + max) / 2
    })
    return Math.round(sum)
  }

  const nonCriticalDamage = {
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

  const criticalDamage = {
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

  const strength = SkillPointToPercentage(statAssigned.strength) / 100
  const dexterity = SkillPointToPercentage(statAssigned.dexterity) / 100

  const neutralModifier = (1 + meleeDamage) * (1 + strength)
  nonCriticalDamage.mindamage = weaponDamage.mindamage * neutralModifier + meleeDamageRaw * (1 + strength)
  nonCriticalDamage.maxdamage = weaponDamage.maxdamage * neutralModifier + meleeDamageRaw * (1 + strength)

  const neutralCriticalModifier = (1 + meleeDamage) * (1 + strength + 1)
  criticalDamage.mindamage = weaponDamage.mindamage * neutralCriticalModifier + meleeDamageRaw * (1 + strength + 1)
  criticalDamage.maxdamage = weaponDamage.maxdamage * neutralCriticalModifier + meleeDamageRaw * (1 + strength + 1)
  
  ENUM_DAMAGE.forEach((v, i) => {
    // Apply Element Damage, Stat Element and Strength
    const modifier = (1 + elementDamage[v] + SkillPointToPercentage(statAssigned[ENUM_STATS[i]]) / 100 + meleeDamage) * (1 + strength)
    nonCriticalDamage[`min${v}`] = weaponDamage[`min${v}`] * modifier
    nonCriticalDamage[`max${v}`] = weaponDamage[`max${v}`] * modifier
  })

  ENUM_DAMAGE.forEach((v, i) => {
    // With Critical
    const modifier = (1 + elementDamage[v] + SkillPointToPercentage(statAssigned[ENUM_STATS[i]]) / 100 + meleeDamage) * (1 + strength + 1)
    criticalDamage[`min${v}`] = weaponDamage[`min${v}`] * modifier
    criticalDamage[`max${v}`] = weaponDamage[`max${v}`] * modifier
  })

  const nonCriticalSumAverage = getSumAverage(nonCriticalDamage);
  const criticalSumAverage = getSumAverage(criticalDamage);

  const averageDamagePerHit = (1 - dexterity) * nonCriticalSumAverage + dexterity * criticalSumAverage
  const averageDps = averageDamagePerHit * attackSpeedMultiplier

  console.log(attackSpeedMultiplier)

  return {
    nonCritical: roundDamage(nonCriticalDamage),
    nonCriticalAverage: nonCriticalSumAverage,
    critical: roundDamage(criticalDamage),
    criticalAverage: criticalSumAverage,
    averageDamagePerHit: Math.round(averageDamagePerHit),
    averageDps: Math.round(averageDps),
  }
}
