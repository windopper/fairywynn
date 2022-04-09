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
    additionalElementDamage = initialAdditionalElementDamage,
  
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
  
    transformed.damage += spellDamage
    if(isCritical) transformed.damage += 1
    transformed.damage = transformed.damage * (SkillPointToPercentage(statAssigned.strength) / 100 + 1)
    if (transformed.damage < 0) transformed.damage = 0;
  
    ENUM_DAMAGE.forEach((v, i) => {
      transformed[v] += elementDamage[v];
      transformed[v] += SkillPointToPercentage(statAssigned[ENUM_STATS[i]])/ 100
      transformed[v] += spellDamage;
      if (additionalElementDamage[v] !== undefined)
        transformed[v] += additionalElementDamage[v];
  
      if (isCritical) transformed[v] += 1;

      transformed[v] = transformed[v] * (SkillPointToPercentage(statAssigned.strength) / 100 + 1);

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
    conversion,
  ) {
  
      if(conversionOrder == undefined || conversionOrder.length === 0) return weaponDamages
  
      conversionOrder.forEach(v => {
          let minConversion = minOriginNeutralDamage * conversion[v]
          let maxConversion = maxOriginNeuturalDamage * conversion[v]
          if(weaponDamages.mindamage <= minConversion && weaponDamages.maxdamage <= maxConversion) {
              weaponDamages[`min${v}`] += weaponDamages.mindamage
              weaponDamages[`max${v}`] += weaponDamages.maxdamage
              weaponDamages.mindamage = 0
              weaponDamages.maxdamage = 0
          } else if(weaponDamages.mindamage > minConversion && weaponDamages.maxdamage > maxConversion) {
              weaponDamages[`min${v}`] += minConversion
              weaponDamages[`max${v}`] += maxConversion
              weaponDamages.mindamage -= minConversion
              weaponDamages.maxdamage -= maxConversion
          }
          weaponDamages[`min${v}`] = Math.floor(weaponDamages[`min${v}`])
          weaponDamages[`max${v}`] = Math.floor(weaponDamages[`max${v}`])
          weaponDamages.mindamage = Math.floor(weaponDamages.mindamage)
          weaponDamages.maxdamage = Math.floor(weaponDamages.maxdamage)
      })
  
  
      return weaponDamages
  
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
      weaponDamage[`min${v}`] = weaponDamage[`min${v}`] * damageModifier[v] * attackSpeedMultiplier * spellDamageMultiplier
      weaponDamage[`max${v}`] = weaponDamage[`max${v}`] * damageModifier[v] * attackSpeedMultiplier * spellDamageMultiplier
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
      ENUM_DAMAGE.forEach(v => {
          let min = computedDamage[`min${v}`]
          let max = computedDamage[`max${v}`]
          computedDamage[`min${v}`] = Math.floor(min)
          computedDamage[`max${v}`] = Math.floor(max)
      })
    return computedDamage
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
    const attackSpeedMultiplier = parseFloat(AttackSpeedMultipliers[weaponItem.attackSpeed]);

    let copiedWeaponDamage = deepCopy(weaponDamage)

    let convertedWeaponDamage = damageSpellConversion(
        minOriginNeutralDamage,
        maxOriginNeutralDamage,
        copiedWeaponDamage,
        conversionOrder,
        conversion
    )
    let modifier = DamageModifier(elementDamage, statAssigned, spellDamage, isCritical, additionalElementDamage)
    let computeDamage = computeFinalDamage(convertedWeaponDamage, modifier, attackSpeedMultiplier, spellDamageMultiplier)
    let computeSpellDamageRaw = spellDamageRaw > 0 ? spellDamageRaw * spellDamageMultiplier * SkillPointToPercentage(statAssigned.strength) : 0
    
    computeDamage.mindamage += computeSpellDamageRaw
    computeDamage.maxdamage += computeSpellDamageRaw

    computeDamage = roundDamage(computeDamage)

    return computeDamage
}