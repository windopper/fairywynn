export const powderDefenseConvert = {
    "✤I": {
        earthDefense: 2,
        airDefense: -1
    },
    "✤II": {
        earthDefense: 4,
        airDefense: -2
    },
    "✤III": {
        earthDefense: 8,
        airDefense: -3
    },
    "✤IV": {
        earthDefense: 14,
        airDefense: -5
    },
    "✤V": {
        earthDefense: 22,
        airDefense: -9
    },
    "✤VI": {
        earthDefense: 30,
        airDefense: -13
    },
    "✹I": {
        fireDefense: 3,
        waterDefense: -1
    },
    "✹II": {
        fireDefense: 5,
        waterDefense: -2
    },
    "✹III": {
        fireDefense: 9,
        waterDefense: -3
    },
    "✹IV": {
        fireDefense: 16,
        waterDefense: -5
    },
    "✹V": {
        fireDefense: 25,
        waterDefense: -9
    },
    "✹VI": {
        fireDefense: 36,
        waterDefense: -13
    },
    "❉I": {
        waterDefense: 3,
        thunderDefense: -1
    },
    "❉II": {
        waterDefense: 6,
        thunderDefense: -1
    },
    "❉III": {
        waterDefense: 11,
        thunderDefense: -2
    },
    "❉IV": {
        waterDefense: 18,
        thunderDefense: -4
    },
    "❉V": {
        waterDefense: 28,
        thunderDefense: -7
    },
    "❉VI": {
        waterDefense: 40,
        thunderDefense: -10
    },
    "❋I": {
        airDefense: 3,
        fireDefense: -1
    },
    "❋II": {
        airDefense: 6,
        fireDefense: -2
    },
    "❋III": {
        airDefense: 10,
        fireDefense: -3
    },
    "❋IV": {
        airDefense: 16,
        fireDefense: -5
    },
    "❋V": {
        airDefense: 24,
        fireDefense: -9
    },
    "❋VI": {
        airDefense: 34,
        fireDefense: -13
    },
    "✦I": {
        thunderDefense: 3,
        earthDefense: -1
    },
    "✦II": {
        thunderDefense: 5,
        earthDefense: -1
    },
    "✦III": {
        thunderDefense: 9,
        earthDefense: -2
    },
    "✦IV": {
        thunderDefense: 14,
        earthDefense: -4
    },
    "✦V": {
        thunderDefense: 20,
        earthDefense: -7
    },
    "✦VI": {
        thunderDefense: 28,
        earthDefense: -10
    },
}


export const powderDamageConvert = {
    "✤I": {
        fromNeutral: 0.17,
        plus:"3-6"
    },
    "✤II": {
        fromNeutral: 0.21,
        plus:"5-8"
    },
    "✤III": {
        fromNeutral: 0.25,
        plus:"6-10"
    },
    "✤IV": {
        fromNeutral: 0.31,
        plus:"7-10"
    },
    "✤V": {
        fromNeutral: 0.38,
        plus:"9-11"
    },
    "✤VI": {
        fromNeutral: 0.46,
        plus:"11-13"
    },
    "✹I": {
        fromNeutral: 0.14,
        plus:"2-5"
    },
    "✹II": {
        fromNeutral: 0.16,
        plus:"4-8"
    },
    "✹III": {
        fromNeutral: 0.19,
        plus:"5-9"
    },
    "✹IV": {
        fromNeutral: 0.24,
        plus:"6-9"
    },
    "✹V": {
        fromNeutral: 0.30,
        plus:"8-10"
    },
    "✹VI": {
        fromNeutral: 0.37,
        plus:"10-12"
    },
    "❉I": {
        fromNeutral: 0.13,
        plus:"3-4"
    },
    "❉II": {
        fromNeutral: 0.15,
        plus:"4-6"
    },
    "❉III": {
        fromNeutral: 0.17,
        plus:"5-8"
    },
    "❉IV": {
        fromNeutral: 0.21,
        plus:"6-8"
    },
    "❉V": {
        fromNeutral: 0.26,
        plus:"7-10"
    },
    "❉VI": {
        fromNeutral: 0.32,
        plus:"9-11"
    },
    "❋I": {
        fromNeutral: 0.11,
        plus:"2-6"
    },
    "❋II": {
        fromNeutral: 0.14,
        plus:"3-10"
    },
    "❋III": {
        fromNeutral: 0.17,
        plus:"4-11"
    },
    "❋IV": {
        fromNeutral: 0.22,
        plus:"5-11"
    },
    "❋V": {
        fromNeutral: 0.28,
        plus:"7-12"
    },
    "❋VI": {
        fromNeutral: 0.35,
        plus:"8-14"
    },
    "✦I": {
        fromNeutral: 0.9,
        plus:"1-8"
    },
    "✦II": {
        fromNeutral: 0.11,
        plus:"1-12"
    },
    "✦III": {
        fromNeutral: 0.13,
        plus:"2-15"
    },
    "✦IV": {
        fromNeutral: 0.17,
        plus:"3-15"
    },
    "✦V": {
        fromNeutral: 0.22,
        plus:"4-17"
    },
    "✦VI": {
        fromNeutral: 0.28,
        plus:"5-20"
    },
}

export const CLASSSKILLS = {
    "warrior": {
        '1': {

        },
        '2': {

        },
        '3': {

        },
        '4': {

        },
    },
    "assasin": {
        '1': {
            'name': 'Spin Attack',
            'grade1': {
                'level': 1,
                'mana': 6,
                'damage': 1.5,
                'conversionOrder': ['thunderDamage'],
                'conversion': {
                    'thunderDamage': 0.2
                }
            },
            'grade2': {
                'level': 16,
                'mana': 6,
                'damage': 1.5,
                'conversionOrder': ['thunderDamage'],
                'conversion': {
                    'thunderDamage': 0.25
                },
                'lore': [
                    'Disease: Stun enemies hit for 1 second'
                ]
            },
            'grade3': {
                'level': 36,
                'mana': 6,
                'damage': 1.5,
                'conversionOrder': ['thunderDamage'],
                'conversion': {
                    'thunderDamage': 0.3
                },
                'lore': [
                    'Disease: Stun enemies hit for 1 second',
                    'Vampire: Steal all the positive effects the enemies hit have, and cleanse all the negative ones you have'
                ]
            },
        },
        '2': {
            'name': 'Vanish',
            'grade1': {
                'level': 11,
                'mana': 1,
                'duration': '5s',
            },
            'grade2': {
                'level': 26,
                'mana': 1,
                'duration': '5s',
                'lore': [
                    'Stealth Attack: Grants a 80% damage and 15% resistance boost while vanished. The bonus lasts an additional 2 seconds after you exit invisbility'
                ]
            },
            'grade3': {
                'level': 46,
                'mana': 1,
                'duration': '5s',
                'lore': [
                    'Stealth Attack: Grants a 80% damage and 15% resistance boost while vanished. The bonus lasts an additional 2 seconds after you exit invisbility',
                    'Shadow Travel: Grants speed 5 while vanished'
                ]
            },
        },
        '3': {
            // 스텟 부정확함 수정 요망
            'name': 'MultiHit',
            'grade1': {
                'level': 21,
                'mana': 8,
                'damage': 0.27,
                'hits': 10,
                'conversionOrder': ['thunderDamage'],
                'conversion': {
                    'thunderDamage': 0.2
                }
            },
            'grade2': {
                'level': 36,
                'mana': 8,
                'damage': 0.27,
                'hits': 10,
                'fatalityDamage': 1.2,
                'conversionOrder': ['thunderDamage, waterDamage'],
                'conversion': {
                    'thunderDamage': 0.3,
                    'waterDamage': 0.15
                },
                'lore': [
                    'Fatality: hit another time at the end, knockbacking the enemy and causing 120% damage'
                ]
            },
            'grade3': {
                'level': 56,
                'mana': 8,
                'damage': 0.27,
                'hits': 10,
                'fatalityDamage': 1.2,
                'conversionOrder': ['thunderDamage, waterDamage'],
                'conversion': {
                    'thunderDamage': 0.3,
                    'waterDamage': 0.5,
                },
                'lore': [
                    'Force: You can move the enemies trapped in your Multihit by moving your head left or right',
                    'Fatality: hit another time at the end, knockbacking the enemy and causing 120% damage'
                ]
            },
        },
        '4': {
            'name': 'Smoke Bomb',
            'grade1': {
                'level': 31,
                'mana': 8,
                'damage': 1.2,
                'duration': '5s',
                'conversionOrder': ['earthDamage', 'airDamage'],
                'conversion': {
                    'earthDamage': 0.15,
                    'airDamage': 0.2
                }
            },
            'grade2': {
                'level': 46,
                'mana': 8,
                'damage': 1.2,
                'duration': '5s',
                'conversionOrder': ['earthDamage', 'airDamage'],
                'conversion': {
                    'earthDamage': 0.25,
                    'airDamage': 0.2
                },
                'lore': [
                    'Choke: Enemies in the smoke are greatly slowed'
                ]
            },
            'grade3': {
                'level': 66,
                'mana': 8,
                'damage': 1.2,
                'duration': '5s',
                'conversionOrder': ['earthDamage', 'airDamage'],
                'conversion': {
                    'earthDamage': 0.25,
                    'airDamage': 0.25
                },
                'lore': [
                    'Choke: Enemies in the smoke are greatly slowed',
                    'Wall of Smoke: Throw three smoke bombs at the same time instead of one, creating a large wall of smoke'
                ]
            },
        },
    },
    "mage": {
        '1': {

        },
        '2': {

        },
        '3': {

        },
        '4': {

        },
    },
    "shaman": {
        '1': {

        },
        '2': {

        },
        '3': {

        },
        '4': {

        },
    },
    "archer": {
        '1': {
            'name': 'Arrow Storm',
            'grade1': {
                'level': 1,
                'mana': 6,
                'damage': 0.3,
                'arrows': 10,
                'conversionOrder': ['fireDamage'],
                'conversion': {
                    'fireDamage': 0.15
                }
            },
            'grade2': {
                'level': 16,
                'mana': 6,
                'damage': '0.2',
                'arrows': 20,
                'conversionOrder': ['fireDamage', 'thunderDamage'],
                'conversion': {
                    'fireDamage': 0.15,
                    'thunderDamage': 0.25,
                },
                'lore': [
                    'Haste: Double the amount of arrows and the firerate'
                ]
            },
            'grade3': {
                'level': 36,
                'mana': 6,
                'damage': 0.1,
                'arrows': 60,
                'conversionOrder': ['fireDamage', 'thunderDamage'],
                'conversion': {
                    'fireDamage': 0.15,
                    'thunderDamage': 0.25
                },
                'lore': [
                    'Haste: Double the amount of arrows and the firerate',
                    'Triple Shot: Triple the amount of arrows you shoot and fire them in an arc'
                ]
            },
        },
        '2': {
            'name': 'Escape',
            'grade1': {
                'level': 11,
                'mana': 3,
            },
            'grade2': {
                'level': 26,
                'mana': 3,
                'lore': [
                    'Speed: Grants speed 3 for 3 minutes to the player and nearby allies upon casting Escape'
                ]
            },
            'grade3': {
                'level': 46,
                'mana': 3,
                'damage': 1,
                'conversionOrder': ['airDamage'],
                'conversion': {
                    'airDamage': 0.5
                },
                'lore': [
                    'Speed: Grants speed 3 to the player and nearby allies upon casting Escape',
                    'Surprise Strike: Holding Shift while falling will now damage nearby enemies for 100% damage upon landing and blind them for 1 second'
                ]
            },
        },
        '3': {
            'name': 'Bomb Arrow',
            'grade1': {
                'level': 21,
                'mana': 8,
                'damage': 2.5,
                'conversionOrder': ['earthDamage', 'fireDamage'],
                'conversion': {
                    'earthDamage': 0.15,
                    'fireDamage': 0.15,
                }
            },
            'grade2': {
                'level': 36,
                'mana': 8,
                'damage': 2.5,
                'conversionOrder': ['earthDamage', 'fireDamage'],
                'conversion': {
                    'earthDamage': 0.25,
                    'fireDamage': 0.15,
                },
                'lore': [
                    'Leg Breaking: Enemies hit are heavily slowed and cannot jump for 4 seconds',
                ]
            },
            'grade3': {
                'level': 56,
                'mana': 8,
                'damage': 2.5,
                'conversionOrder': ['earthDamage', 'fireDamage'],
                'conversion': {
                    'earthDamage': 0.25,
                    'fireDamage': 0.15,
                },
                'lore': [
                    'Leg Breaking: Enemies hit are heavily slowed and cannot jump for 4 seconds',
                    'Bounce: After impacting, Bomb Arrow will bounce off of enemies and terrain up to 2 more times'
                ]
            },
        },
        '4': {
            'name': 'After Shield',
            'grade1': {
                'level': 31,
                'mana': 8,
                'damage': 1.5,
                'conversionOrder': ['airDamage'],
                'conversion': {
                    'airDamage': 0.3
                }
            },
            'grade2': {
                'level': 46,
                'mana': 9,
                'damage': 1,
                'conversionOrder': ['airDamage'],
                'conversion': {
                    'airDamage': 0.3
                },
                'lore': [
                    'Charges: Arrow Shield can be triggered up to three times without disappearing',
                ]
            },
            'grade3': {
                'level': 66,
                'mana': 10,
                'shieldDamage': 2.5,
                'shieldDamageConversionOrder': ['airDamage'],
                'shieldDamageConversion': {
                    'airDamage': 0.3
                },
                'rainDamage': 2,
                'rainArrows': 100,
                'rainDamageConversionOrder': ['airDamage'],
                'rainDamageConversion': {
                    'airDamage': 0.3
                },
                'lore': [
                    'Charges: Arrow Shield can be triggered up to three times without disappearing',
                    'Arrow Rain: When you take damage, summon a hail of arrows from the sky that deal 200% damage per arrow that land on enemies nearby'
                ]
            },
        },
    }
}

export const BOOSTS = {

    // Wind Prison Only Boosts Air Damage
    'Wind Prison': {
        4: 4,
        4.5: 4.5,
        5: 5,
        5.5: 5.5,
        6: 6
    },
    'Courage': {
        4: 0.7,
        4.5: 0.9,
        5: 1.1,
        5.5: 1.3,
        6: 1.5,
    },
    'Curse': {
        4: 0.9,
        4.5: 1.2,
        5: 1.5,
        5.5: 1.8,
        6: 2.1
    },
    'Rage': 4,
    'KillStreak': 2,
    'Concentration': 1.5,
    'Endurance': 2,
    'Dodge': 1.5
}

export const AttackSpeedMultipliers = {
    'SUPER_FAST': 4.3,
    'VERY_FAST': 3.1,
    'FAST': 2.5,
    'NORMAL': 2.05,
    'SLOW': 1.5,
    'VERY_SLOW': 0.83,
    'SUPER_SLOW': 0.51
}
