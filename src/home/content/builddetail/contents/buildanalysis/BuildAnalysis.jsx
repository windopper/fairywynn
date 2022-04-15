import { Radar} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    defaults,
  } from 'chart.js';
import { getComputedManaCost, getTotalEHP, getTotalHealth } from '../../../../../utils/WynnUtils';
import { getMaxSum } from '../BuildUtils';
import { EHPLIMIT, SPELLDAMAGELIMIT } from '../../../../../utils/WynnAnlaysis';
import { getAttackSpeed } from '../../../EnumParts';
import { computeAttackSpeed, getAverageDamage, RawPercentCalculate } from '../../../../../utils/WynnMath';
import { AverageSpellDamage, getMeleeDamage } from '../../../../../utils/WynnDamageCalculation';
import { useEffect, useRef, useState } from 'react';
import useOnScreen from '../../../../hooks/useOnScreen';
import './BuildAnalysis.scss'
import { BUILDEQUIPS } from '../../../../reducer/itembuild';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

const WEAPONTOCLASS = {
    bow: "archer",
    dagger: "assasin",
    relik: "shaman",
    spear: "warrior",
    wand: "mage",
  };

  const attackSpeedEnum = {
    'SUPER_FAST': 6,
    'VERY_FAST': 5,
    'FAST': 4,
    'NORMAL': 3,
    'SLOW': 2,
    'VERY_SLOW': 1,
    'SUPER_SLOW': 0,
  }

  const defaultData = {
    borderColor: 'rgba(255, 99, 132, 1)',
    labels: ['Health', 'SpellDamage', 'MeleeDamage', 'HealthRecovery', 'SpellCost', 'ManaRecovery'],
    datasets: [
      {
        label: 'Score',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 3,
      },
    ],
  };

  const options = {
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        radialLinear: {
            max: 100,
            grid: {
                
                color: 'rgb(220, 220, 220, 0.2)',
            },
            angleLines: {
                color: 'rgb(220, 220, 220, 0.2)',
            },
            pointLabels: {
                // backdropColor: 'white',
                color: 'rgb(210, 210, 210)',
                font: {
                    size: 10,
                    style: 'italic',
                    weight: 600,
                }
            },
            ticks: {
                showLabelBackdrop: false,
                color: 'rbga(255, 255, 255, 0)',
                font: {
                    size: 0,
                }
            }
        }
    },
}

export default function BuildAnalysis({itemBuildData, computedMeleeDamage, computedSpellDamage}) {



    if (!itemBuildData.weapon)
      return (
        <div className="buildanalysis-wrapper buildanalysis-row-container">
          <div className="container row-center-container">
            <div className="canvas-wrapper">
              <Radar data={defaultData} options={options} />
            </div>
          </div>
        </div>
      );

    const weaponItem = itemBuildData.weapon.item
    const classType = WEAPONTOCLASS[itemBuildData.weapon.item.type.toLowerCase()]
    const statAssigned = itemBuildData.currentBuild.statAssigned

    const hs = HealthScore()
    const sds = SpellDamageScore()
    const mds = MeleeDamageScore()
    const hrs = HealthRecoveryScore()
    const scs = SpellCostScore()
    const mrs = ManaRecoveryScore()

    const data = {
        borderColor: 'rgba(255, 99, 132, 1)',
        labels: ['Health', 'SpellDamage', 'MeleeDamage', 'HealthRecovery', 'SpellCost', 'ManaRecovery'],
        datasets: [
          {
            label: 'Score',
            data: [hs, sds, mds, hrs, scs, mrs],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 3,
          },
        ],
      };



    return (
      <div className="buildanalysis-wrapper buildanalysis-row-container"> 
        <div className="container row-center-container" >
            <div className="canvas-wrapper" >
                <Radar data={data} options={options}/>
            </div>
        </div>
      </div>
    );

    function HealthScore() {
        const totalEHPHealth = getTotalEHP(itemBuildData)
        const ehplimit = EHPLIMIT[classType]
        return getScore(ehplimit, totalEHPHealth)
    }

    function SpellDamageScore() {
        const keys = Object.keys(computedSpellDamage[3])
        let nonCritAverage = 0;
        let critAverage = 0;
        if(keys[0] === 'nonCritical') {
            nonCritAverage = AverageSpellDamage(computedSpellDamage[3].nonCritical)
            critAverage = AverageSpellDamage(computedSpellDamage[3].critical)
        }
        else {
            nonCritAverage = AverageSpellDamage(computedSpellDamage[3][keys[0]].nonCritical)
            critAverage = AverageSpellDamage(computedSpellDamage[3][keys[0]].critical)
        }

       
        const spellAverage = getAverageDamage(nonCritAverage, critAverage, statAssigned.finalStatTypePoints.dexterity)
        return getScore(SPELLDAMAGELIMIT[classType], spellAverage)
    }

    function MeleeDamageScore() {
        const perHit = computedMeleeDamage.averageDps;
        return getScore(40000, perHit)
    }

    function ManaRecoveryScore() {
        const totalManaRegen = getMaxSum(itemBuildData, 'manaRegen');
        const totalManaSteal = getMaxSum(itemBuildData, 'manaSteal')
        const attackSpeedValue = 6 - attackSpeedEnum[computeAttackSpeed(weaponItem.attackSpeed, getMaxSum(itemBuildData, 'attackSpeedBonus'))]


        if(totalManaRegen >= totalManaSteal) {
            return getScore(9, totalManaRegen)
        } else {
            if(attackSpeedValue === 0) return getScore(7, totalManaSteal)
            else if(attackSpeedValue === 1) return getScore(9, totalManaSteal)
            else return getScore(11, totalManaSteal)
        }
    }

    function HealthRecoveryScore() {
      if(BUILDEQUIPS.filter(v => itemBuildData[v]).filter(v => itemBuildData[v].item.majorIds).filter(v => itemBuildData[v].item.majorIds[0] == 'RALLY').length >=1) return 100
        const healthRegenRaw = getMaxSum(itemBuildData, 'healthRegenRaw');
        const healthRegenPct = getMaxSum(itemBuildData, 'healthRegen')
        const computed = RawPercentCalculate(healthRegenRaw, healthRegenPct)
        return getScore(500, computed)
    }

    function SpellCostScore() {
        const firstComputedCost = getComputedManaCost(classType, 1, itemBuildData)
        const thirdComputedCost = getComputedManaCost(classType, 3, itemBuildData)
        const fourthComputedConst = getComputedManaCost(classType, 4, itemBuildData)
        const costList = [firstComputedCost, thirdComputedCost, fourthComputedConst]
        const costSum = costList.reduce((a, s) => a + s)
        return Math.round(Math.max(0, Math.min(100, 100 - ((costSum - 3) / 15) * 100)))
    }
}

function getScore(limitScore, baseScore) {
    return Math.max(Math.min(100, baseScore / limitScore * 100), 0)
}

