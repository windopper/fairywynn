import { nameColor } from "../home/content/EnumParts"

export function getColorFromTier(data) {
    return nameColor[data.tier]
}

export function getColorFromElementDamage(data) {
    const damageColor = {
        damage: "RGB(252, 165, 14)",
        fireDamage: "RGB(255, 85, 83)",
        earthDamage: "RGB(4, 155, 5)",
        waterDamage: "RGB(70, 223, 223)",
        airDamage:"RGB(228, 226, 227)",
        thunderDamage: "RGB(255, 255, 85)",
    }
    return damageColor[data]
}

export function getEmojiFromElementDamage(data){
    const damageEmoji = {
        damage: "✤",
        fireDamage: "✹",
        earthDamage: "✤",
        waterDamage: "❉",
        airDamage:"❋",
        thunderDamage: "✦",
    }
    return damageEmoji[data]
}