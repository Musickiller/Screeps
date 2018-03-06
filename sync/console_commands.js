// CREEPS
// list creeps
for (var crp in Game.creeps) { console.log(crp) }
// spawn
Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Builder' + Game.time, {memory: {role: 'builder'}})

// ROOMS
// room help:
for (h in Game.rooms['E41N49']) { console.log(h) }
// fing in rooms:
Game.rooms['E41N49'].find(FIND_CONSTRUCTION_SITES)


// STRUCTURES
// help on construction sites
for (prpt in Game.rooms['E41N49'].find(FIND_CONSTRUCTION_SITES)[0]) { console.log(prpt) }
