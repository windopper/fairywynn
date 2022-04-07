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

export const statsMapping = {
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
    speed: 'Walk Speed',
    attackSpeedBonus: 'Attack Speed',
    poison: 'Poison',
    healthBonus: 'Health',
    soulPoints: 'Soul Point Regen',
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
    jumpHeight: 'Jump Height',
    spellCostPct1: '1st Spell Cost',
    spellCostPct3: '3rd Spell Cost',
    spellCostPct4: '4th Spell Cost',
    spellCostPct2: '2nd Spell Cost',
    spellCostRaw1: '1st Spell Cost',
    spellCostRaw2: '2nd Spell Cost',
    spellCostRaw3: '3rd Spell Cost',
    spellCostRaw4: '4th Spell Cost',
}

export const statsUnit = {
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
    jumpHeight: '',
    spellCostPct1: '%',
    spellCostPct3: '%',
    spellCostPct4: '%',
    spellCostPct2: '%',
    spellCostRaw1: '',
    spellCostRaw2: '',
    spellCostRaw3: '',
    spellCostRaw4: '',
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

                <div style={{
                    textAlign: 'center',
                    margin: '0px 3px',
                }}>{statsMapping[type]}</div>

                {ided || canIDed(type) ? <div style={{
                    color: `${value < 0 ? 'red' : 'rgb(0, 243, 0)'}`,

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

export const majorIdDescription = {
    'Cavalryman': 'You may cast spells and attack with a 70% damage penalty while on a horse',
    'Cherry Bombs': 'Your Smoke Bombs explode instantly on contact, dealing 110% damage each',
    'Entropy': 'Meteor falls three times faster',
    'Explosive Impact': 'Your "Exploding" ID can trigger when hitting mobs with your basic attack',
    'Fission': 'Explosions from your "Exploding" ID are twice as big and twice as strong',
    'Flashfreeze': 'Ice Snake is instant and freezes for longer at a reduced range',
    'Freerunner': 'Double your sprint speed when your sprint bar is under 30%',
    'Furious Effigy': 'Totem effects are twice as fast, but duration is halved',
    'Geocentrism': 'Aura radiates from you instead of your Totem and can be cast at any time',
    'Guardian': '50% of damage taken by nearby allies is redirected to you',
    'Greed': 'Picking up emeralds heals you and nearby players for 15% max health',
    'Hawkeye': 'Arrow Storm fires 5 arrows each dealing 80% damage',
    'Heart of the Pack': 'Nearby players gain 35% of the health you naturally regen',
    'Altruism': 'Nearby players gain 35% of the health you naturally regen',
    'Lightweight': 'You no longer take fall damage',
    'Madness': 'Casts a random ability every 3 seconds',
    'Magnet': 'Pulls items within an 8 block radius towards you',
    'Peaceful Effigy': 'Your totem will last twice as long',
    'Plague': 'Poisoned mobs spread their poison to nearby mobs',
    'Rally': 'Charge heals you by 10% and nearby allies by 15% on impact, but becomes harmless',
    'Roving Assassin': 'Vanish no longer drains mana while invisible',
    "Saviour's Sacrifice": 'While under 50% maximum health, nearby allies gain 30`% bonus damage and defense',
    "Hero": 'While under 50% maximum health, nearby allies gain 30`% bonus damage and defense',
    'Sorcery': '30% chance for spells and attacks to cast a second time at no additional cost',
    'Taunt': 'Mobs within 12 blocks target you upon casting War Scream',
    'Transcendence': '50% chance for spells to cost no mana when cast'
}

export function getMajorIds(data) {
    const majorId = data.majorIds
    if(majorId == undefined) return null
    let majorIdName = majorId[0].toLowerCase();
    let nameArray = majorIdName.split('_')
    let transformedName = ""

    for(let i in nameArray) {
        // console.log(nameArray[i])
        transformedName += nameArray[i].charAt(0).toUpperCase() + nameArray[i].slice(1)
        if(nameArray.length-1 > i) transformedName += ' ';
    }

    // console.log(transformedName)

    const description = majorIdDescription[transformedName]
    return (
        <div className="majorId" id="leftside">
            {`+${majorId[0]}:`} <span>{`${description}`}</span>
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