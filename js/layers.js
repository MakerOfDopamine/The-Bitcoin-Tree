addLayer("p", {
        name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
			points: new Decimal(0),
        }},
        color: "#00bfbf",
        requires: new Decimal(10), // Can be a function that takes requirement increases into account
        resource: "Prestige Points", // Name of prestige currency
        baseResource: "points", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.5, // Prestige currency exponent
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
            {key: "p", description: "Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
        upgrades: {
            rows: 4,
            cols: 7,
            11: {
                title: "Point Generation",
                description: "Get a point every second!",
                cost: new Decimal(1)
            },
            12: {
                title: "Point Generator",
                description: "Get two more points every second!",
                cost: new Decimal(1),
                unlocked() {
                    return hasP(11)
                }
            },
            13: {
                title: "Point Generation Robot",
                description: "Get six more points every second!",
                cost: new Decimal(2),
                unlocked() {
                    return hasP(12)
                }
            },
            14: {
                title: "Point Virtualiser",
                description: "Get twelve more points every second!",
                cost: new Decimal(3),
                unlocked() {
                    return hasP(13)
                }
            },
            15: {
                title: "Point Superaliser",
                description: "???",
                cost: new Decimal(1/0),
                unlocked() {
                    return false
                }
            },
            16: {
                title: "Point Ultraliser",
                description: "???",
                cost: new Decimal(1/0),
                unlocked() {
                    return false
                }
            },
            17: {
                title: "???",
                description: "???",
                cost: new Decimal(1/0),
                unlocked() {
                    return false
                }
            },
            21: {
                title: "Point Booster",
                description: "Get twice as much points!",
                cost: new Decimal(5),
            },
            31: {
                title: "Prestige Booster",
                description: "Get twice as much prestige points!",
                cost: new Decimal(20),
            },
            41: {
                title: "Point Reconstructor",
                description: "Get more points based on your current points!",
                cost: new Decimal(1e3),
            },
        }
})