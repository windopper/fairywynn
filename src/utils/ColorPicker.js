import { nameColor } from "../home/content/EnumParts"

export function getColorFromTier(data) {
    return nameColor[data.tier]
}