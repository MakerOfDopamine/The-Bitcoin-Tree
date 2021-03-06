function hasP(ID) {
	return hasUpgrade("p",ID)
}

let modInfo = {
	name: "The Bitcoin Tree",
	id: "bitcoin",
	author: "me",
	pointsName: "satoshi",
	discordName: "",
	discordLink: "",
	changelogLink: "https://github.com/MakerOfDopamine/The-Modding-Tree/blob/master/changelog.md",
    offlineLimit: 24,  // In hours
    initialStartPoints: new Decimal (100) // Used for hard resets and new players
}

// Set your version in num and name
let VERSION = {
	num: "0.1.1",
	name: "The Overclocker Update",
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(0)
	if (hasUpgrade("c",11)) gain = gain.plus(upgradeEffect("c",11))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("eeee10"))
}

function hasC(n) {
	return hasUpgrade("c",n)
}

// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600000*24) // Default is 1 hour which is just arbitrarily large
}