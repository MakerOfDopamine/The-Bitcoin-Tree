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
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            var exp = new Decimal(1)
            return exp
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "c", description: "Reset for computers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
        upgrades: {
            rows: 1,
            cols: 6,
            11: {
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
                description: "Gain 5x as much satoshis.",
                cost: new Decimal(2),
                unlocked() {
                    return hasC(11)
                }
            },
            13: {
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
                    return "*" + upgradeEffect("c",13).toFixed(3) + "." + (upgradeEffect("c",13) > 2 ? " (softcapped)" : "")
                }
            },
            14: {
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
                description: "The Previous Upgrade applies after softcap, but the effect is reduced to ^23/20.",
                cost: new Decimal(50),
                unlocked() {
                    return hasC(15)
                }
            },
        }
})