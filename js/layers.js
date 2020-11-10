addLayer("c", {
        name: "computer", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
			points: new Decimal(0),
        }},
        color: "#cccc22",
        requires: new Decimal(100), // Can be a function that takes requirement increases into account
        resource: "hash", // Name of prestige currency
        baseResource: "satoshi", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.75, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = upgradeEffect("c",21)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            var exp = upgradeEffect("c",23)
            if (hasUpgrade("o",12)) exp = exp.times(upgradeEffect("o",12))
            return exp
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "c", description: "Reset for computers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
        upgrades: {
            rows: 2,
            cols: 6,
            11: {
                title: "1;1",
                description: "Start gaining satoshis.",
                cost: new Decimal(1),
                effect() {
                    var m = new Decimal(5)
                    if (hasC(12)) m = m.times(5)
                    if (hasC(13)) m = m.times(upgradeEffect("c",13))
                    if (hasC(14)) m = m.times(upgradeEffect("c",14))
                    return m
                },
                effectDisplay() {
                    return "+" + upgradeEffect("c",11).toFixed(3) + "/s."
                }
            },
            12: {
                title: "1;2",
                description: "Gain 5x as much satoshis.",
                cost: new Decimal(2),
                unlocked() {
                    return hasC(11)
                }
            },
            13: {
                title: "1;3",
                description: "Gain more satoshis based on your hashes.",
                cost: new Decimal(3),
                unlocked() {
                    return hasC(12)
                },
                effect() {
                    var eff13 = player.c.points.plus(2).sqrt().pow(hasC(15) && !hasC(16) ? 1.2 : 1)
                    var softcappedEff = eff13.gt(2) ? eff13.times(2).sqrt() : eff13
                    var doubleEff = eff13.gt(10) ? softcappedEff.div(10).add(10).log10().times(10) : softcappedEff
                    doubleEff = doubleEff.pow(hasC(16) ? 1.15 : 1)
                    return doubleEff
                },
                effectDisplay() {
                    return "*" + upgradeEffect("c",13).toFixed(3) + "." + (upgradeEffect("c",13) > 2 ? (" (softcapped" + (upgradeEffect("c",13) > 10 ? "^2)" : ")")) : "")
                }
            },
            14: {
                title: "1;4",
                description: "Gain more satoshis based on your satoshis.",
                cost: new Decimal(5),
                unlocked() {
                    return hasC(13)
                },
                effect() {
                    return player.points.plus(10).log10().pow(hasC(15) ? 1.2 : 1)
                },
                effectDisplay() {
                    return "*" + player.points.plus(10).log10().toFixed(3) + "."
                }
            },
            15: {
                title: "1;5",
                description: "Raise Upgrade 13 and 14 to the power of 6/5. (This applies before softcaps)",
                cost: new Decimal(10),
                unlocked() {
                    return hasC(14)
                },
                effect() {
                    return new Decimal(1.2)
                },
                effectDisplay() {
                    return "^" + upgradeEffect("c",15).toFixed(3) + "."
                }
            },
            16: {
                title: "1;6",
                description: "The Previous Upgrade applies after softcap, but the effect is reduced to ^23/20.",
                cost: new Decimal(50),
                unlocked() {
                    return hasC(15)
                }
            },
            21: {
                title: "2;1",
                description: "Gain more hashes.",
                cost: new Decimal(25),
                unlocked() {
                    return (hasC(16) && player.c.points.gt(100)) || hasC(21)
                },
                effect() {
                    var b = new Decimal(1)
                    if (hasC(21)) b = b.times(1.5)
                    if (hasC(22)) b = b.pow(2)
                    if (hasC(23)) b = b.pow(upgradeEffect("c",23))
                    if (hasC(23)) b = b.times(upgradeEffect("c",24))
                    return b
                },
                effectDisplay() {
                    return "*" + upgradeEffect("c",21).toFixed(3) + "."
                }
            },
            22: {
                title: "2;2",
                description: "The previous upgrade is squared.",
                cost: new Decimal(75),
                unlocked() {
                    return hasC(21)
                }
            },
            23: {
                title: "2;3",
                description: "Raise hash gain to a power based on satoshis.",
                cost: new Decimal(200),
                unlocked() {
                    return hasC(22)
                },
                effect() {
                    return player.points.plus(10).log10().plus(10).log10().plus(10).log10()
                },
                effectDisplay() {
                    return "^" + upgradeEffect("c", 23).toFixed(3) + "."
                }
            },
            24: {
                title: "2;4",
                description: "Boost hash gain based on hashes.",
                cost: new Decimal(1e3),
                unlocked() {
                    return hasC(23)
                },
                effect() {
                    return player.c.points.pow(2).plus(10).log10().sqrt()
                }
            },
            25: {
                title: "2;5",
                description: "Unlock overclockers.",
                cost: new Decimal(2e3),
                unlocked() {
                    return hasC(24)
                }
            },
        }
})
addLayer("o", {
    name: "overclockers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#444444",
    requires: new Decimal(1e4), // Can be a function that takes requirement increases into account
    resource: "clocks", // Name of prestige currency
    baseResource: "hash", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        var exp = new Decimal(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "Reset for overclockers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasC(25) || player.o.points.gt(0)},  
    upgrades: {
        rows: 1,
        cols: 3,
        11: {
            description: "clocks boost satoshi gain.",
            effect() {
                return player.o.points.plus(1).log10().pow(2).plus(1)
            },
            effectDisplay() {
                return "*" + upgradeEffect("o",11).toFixed(3) + "."
            }
        },
        12: {
            description: "clocks boost hash gain.",
            effect() {
                return player.o.points.plus(2).log10().plus(2).log10().plus(2).log10().plus(0.6267343971100877)
            },
            effectDisplay() {
                return "^" + upgradeEffect("o",12).toFixed(3) + "."
            }
        },
        13: {
            description: "Unlock more hash upgrades. [NOT FUNCTIONAL YET]",
            cost: new Decimal(2)
        }
    }
})