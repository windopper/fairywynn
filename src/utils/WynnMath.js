export function SkillPointToPercentage(x) {
    let sum = 0;
    if(x <= 0) return 0
    for(let i=1; i<=x; i++) {
        sum += 0.9908 ** i
    }
    const round = Math.round(sum * 10) / 10
    // console.log(round)
    return round
}