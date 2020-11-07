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
                    return player.c.points.plus(2).sqrt()
                },
                effectDisplay() {
                    return "*" + player.c.points.plus(2).sqrt().toFixed(3) + "."
                }
            },
            14: {
                description: "Gain more satoshis based on your satoshis.",
                cost: new Decimal(5),
                unlocked() {
                    return hasC(13)
                },
                effect() {
                    return player.points.plus(10).log10()
                },
                effectDisplay() {
                    return "*" + player.points.plus(10).log10().toFixed(3) + "."
                }
            },
        }
})