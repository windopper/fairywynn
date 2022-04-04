export const category = ['all', 'helmet', 'chestplate', 'leggings', 'boots', 'wand', 'dagger', 'spear', 'bow', 'relik', 'ring', 'bracelet', 'ring', 'necklace']
export const rarity = ['Normal', 'Unique', 'Rare', 'Set', 'Legendary', 'Mythic', 'Fabled']

export const nameColor = {
    Normal: 'white',
    Unique: 'RGB(255, 250, 84)',
    Rare: 'RGB(246, 92, 234)',
    Set: 'Green',
    Legendary: 'rgb(4, 214, 214)',
    Mythic: 'RGB(155, 8, 162)',
    rare: 'RGB(246, 92, 234)',
    unique: 'RGB(255, 250, 84)',
    legendary: 'rgb(4, 214, 214)',
    Fabled: 'RGB(243, 90, 91)'
}

export const damages = ['damage', 'fireDamage', 'waterDamage', 'airDamage', 'thunderDamage', 'earthDamage']

export const damageColor = {
    damage: "RGB(252, 165, 14)",
    fireDamage: "RGB(255, 85, 83)",
    earthDamage: "RGB(4, 155, 5)",
    waterDamage: "RGB(70, 223, 223)",
    airDamage:"RGB(228, 226, 227)",
    thunderDamage: "RGB(255, 255, 85)",
}

export const damageEmoji = {
    damage: "✤",
    fireDamage: "✹",
    earthDamage: "✤",
    waterDamage: "❉",
    airDamage:"❋",
    thunderDamage: "✦",
}

export function getDamage(data) {

    const divs = []
    for(let damage in damages) {
        let type = damages[damage]
        if(data[type] === "0-0" || data[type] == undefined) {
            continue;
        }
        divs.push(
        <div style={{
            color: damageColor[type],
            display: "flex",
            justifyContent: 'center'
        }}
        key={damage}>
            {damageEmoji[type] + " " + type +": "+data[type]}
        </div>)
    }

    return (
        <div>
            {divs}
        </div>
    )
}

export const defenses = ['health', 'fireDefense', 'waterDefense', 'airDefense', 'thunderDefense', 'earthDefense']

export const defenseColor = {
    health: 'red',
    fireDefense: "RGB(255, 85, 83)",
    earthDefense: "RGB(4, 155, 5)",
    waterDefense: "RGB(70, 223, 223)",
    airDefense:"RGB(228, 226, 227)",
    thunderDefense: "RGB(255, 255, 85)",
}

export const defenseEmoji = {
    health: "♥",
    fireDefense: "✹",
    earthDefense: "✤",
    waterDefense: "❉",
    airDefense:"❋",
    thunderDefense: "✦",
}

export function getDefense(data) {
    const divs = []
    for(let defense in defenses) {
        let type = defenses[defense]
        if(data[type] == undefined || data[type] == 0) {
            continue;
        }
        divs.push(
        <div style={{
            color: defenseColor[type],
            display: "flex",
            justifyContent: 'center'
        }}>
            {defenseEmoji[type] + " " + type +": "+data[type]}
        </div>)
    }

    return (
        <div>
            {divs}
        </div>
    )
}

export function getPowderSockets(num) {
    return (
        <div style={{
            color: 'gray',
        }}>
            {`[0/${num}] Powder Slots`}
        </div>
    )
}

export function getAttackSpeed(data) {
    if(data.attackSpeed == undefined) return
    let as = data.attackSpeed
    let split = as.toLowerCase().split("_")
    split = split.map(v => v.charAt(0).toUpperCase()+v.slice(1)+" ")
    return <div style={{
        color: 'gray'
    }}>{split}</div>;
}

export const requires = ['level', 'quest', 'type', 'strength', 'dexterity', 'intelligence', 'agility', 'defense']
const requireMapping = {
    level: 'Level Req',
    quest: 'Quest Req',
    type: 'Class Req',
    strength: 'Stength Min',
    dexterity: 'Dexterity Min',
    intelligence: 'Intelligence Min',
    defense: 'Defense Min',
    agility: 'Agility Min'
}
const weaponMapToClass = {
    relik: 'Shaman/Skyseer',
    Relik: 'Shaman/Skyseer',
    spear: 'Warrior/Knight',
    Spear: 'Warrior/Knight',
    dagger: 'Assassin/Ninja',
    Dagger: 'Assassin/Ninja',
    Bow: 'Archer/Hunter',
    bow: 'Archer/Hunter',
    wand: 'Mage/Dark Wizard',
    Wand: 'Mage/Dark Wizard'
}

const itemTypeCheck = ['Chestplate', 'Leggings', 'Boots', 'Helmet']

export function getRequires(data) {
    const divs = [];
    for(let req in requires) {
        let type = requires[req]
        if(data[type] == undefined || data[type] == 0) continue;
        let rm = data[type]

        if(weaponMapToClass[rm] != undefined) rm = weaponMapToClass[rm]
        if(itemTypeCheck.includes(rm)) continue;

        divs.push(
            <div key={req}>
                {`✔️ ${requireMapping[type]}: ${rm}`}
            </div>
        )
    }
    return (
        <div className="requirements">
            {divs}
        </div>
        
    )
}

const identified = 'identified'

export const stats = [
  "healthRegen",
  "manaRegen",
  "spellDamage",
  "damageBonus",
  "lifeSteal",
  "manaSteal",
  "xpBonus",
  "lootBonus",
  "reflection",
  "strengthPoints",
  "dexterityPoints",
  "intelligencePoints",
  "agilityPoints",
  "defensePoints",
  "thorns",
  "exploding",
  "speed",
  "attackSpeedBonus",
  "poison",
  "healthBonus",
  "soulPoints",
  "emeraldStealing",
  "healthRegenRaw",
  "spellDamageRaw",
  "damageBonusRaw",
  "bonusFireDamage",
  "bonusWaterDamage",
  "bonusAirDamage",
  "bonusThunderDamage",
  "bonusEarthDamage",
  "bonusFireDefense",
  "bonusWaterDefense",
  "bonusAirDefense",
  "bonusThunderDefense",
  "bonusEarthDefense",
];

const statsMapping = {
    healthRegen: "Heath Regen",
    manaRegen: "Mana Regen",
    spellDamage: "Spell Damage",
    damageBonus: "Main Attack Damage",
    lifeSteal: "Life Steal",
    manaSteal: "Mana Steal",
    xpBonus: "Xp Bonus",
    lootBonus: "Loot Bonus",
    reflection: "Reflection",
    strengthPoints: "Strength",
    dexterityPoints: "Dexterity",
    intelligencePoints: "Intelligence",
    agilityPoints: "Agility",
    defensePoints: "Defense",
    thorns: 'Thorns',
    exploding: 'Exploding',
    speed: 'Speed',
    attackSpeedBonus: 'Attack Speed',
    poison: 'Poison',
    healthBonus: 'Health',
    soulPoints: 'SoulPoints',
    emeraldStealing: 'Stealing',
    healthRegenRaw: 'Health Regen',
    spellDamageRaw: 'Spell Damage',
    damageBonusRaw: 'Main Attack Damage',
    bonusFireDamage: 'Fire Damage',
    bonusWaterDamage: 'Water Damage',
    bonusAirDamage: 'Air Damage',
    bonusThunderDamage: 'Thunder Damage',
    bonusEarthDamage: 'Earth Damage',
    bonusFireDefense: 'Fire Defense',
    bonusWaterDefense: 'Water Defense',
    bonusAirDefense: 'Air Defense',
    bonusThunderDefense: 'Thunder Defense',
    bonusEarthDefense: 'Earth Defense',
}

const statsUnit = {
    healthRegen: "%",
    manaRegen: "/4s",
    spellDamage: "%",
    damageBonus: "%",
    lifeSteal: "/4s",
    manaSteal: "/4s",
    xpBonus: "%",
    lootBonus: "%",
    reflection: "%",
    strengthPoints: "",
    dexterityPoints: "",
    intelligencePoints: "",
    agilityPoints: "",
    defensePoints: "",
    thorns: '%',
    exploding: '%',
    speed: '%',
    attackSpeedBonus: ' tier',
    poison: '/3s',
    healthBonus: '',
    soulPoints: '%',
    emeraldStealing: '%',
    healthRegenRaw: '',
    spellDamageRaw: '',
    damageBonusRaw: '',
    bonusFireDamage: '%',
    bonusWaterDamage: '%',
    bonusAirDamage: '%',
    bonusThunderDamage: '%',
    bonusEarthDamage: '%',
    bonusFireDefense: '%',
    bonusWaterDefense: '%',
    bonusAirDefense: '%',
    bonusThunderDefense: '%',
    bonusEarthDefense: '%',
}

export function getStats(data) {

    const ided = data[identified] == undefined || data[identified] == false ? false : true
    const divs = []

    for(let stat in stats) {
        let type = stats[stat]
        let value = data[type]
        if(value == 0 || value == undefined) continue;

        let calStat = calculateStat(value)

        divs.push(
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                justifyItems: 'center',
                flexDirection: 'row',
                paddingRight: '10px',
                paddingLeft: '10px',
            }} key={stat}>
                {ided || canIDed(type) ? 
                <div style={{
                    color: 'gray',
                }}>-</div> : <div style={{
                    color: `${calStat[0] < 0 ? 'red' : 'rgb(0, 243, 0)'}`
                }}>{calStat[0]+statsUnit[type]}</div>}

                <div>{statsMapping[type]}</div>

                {ided || canIDed(type) ? <div style={{
                    color: `${value < 0 ? 'red' : 'rgb(0, 243, 0)'}`
                }}>{value+statsUnit[type]}</div> : <div style={{
                    color: `${calStat[1] < 0 ? 'red' : 'rgb(0, 243, 0)'}`
                }}>{calStat[1]+statsUnit[type]}</div>}
                
            </div>
        )
    }
    return (
        <div className="stat">
            {divs}
        </div>
    )
}

function calculateStat(base) {
    let min
    let max
    if(base > 0) {
        max = base * 1.3
        min = base * 0.3
        if(min < 1) min = 1
    } else {
        max = base * 0.7
        min = base * 1.3
        if(max > -1) max = -1
    }

    max = Math.round(max)
    min = Math.round(min)

    return [min, max]
}

function canIDed(value) {
    const list = ["strengthPoints","dexterityPoints","intelligencePoints","agilityPoints","defensePoints"]
    return list.filter(v => v == value).length > 0
}