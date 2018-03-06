// CREEPS
// list creeps
for (var crp in Game.creeps) { console.log(crp) }
// spawn
Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Builder' + Game.time, {memory: {role: 'builder'}})

// ROOMS
// room help:
for (h in Game.rooms['E41N49']) { console.log(h) }
// energy
console.log(Game.rooms['E41N49'].energyAvailable + " / " + Game.rooms['E41N49'].energyCapacityAvailable)
// fing in rooms:
Game.rooms['E41N49'].find(FIND_CONSTRUCTION_SITES)


// STRUCTURES
// help on construction sites
for (prpt in Game.rooms['E41N49'].find(FIND_CONSTRUCTION_SITES)[0]) { console.log(prpt) }
// find structures
for (struct in Game.rooms['E41N49'].find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == 'STRUCTURE_WALL') } })) {console.log(struct)}
//get type
Game.rooms['E41N49'].find(FIND_STRUCTURES)[0].structureType //road
