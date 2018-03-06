// MAIN FUNCTION

// INIT
var roleHarvester = require('role.harvester');
var roleFixer = require('role.fixer')
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleWallFixer = require('role.wallfixer');
var visualCtl = require('roomctl.visual');


module.exports.loop = function () {

    // Clear the memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // Find all creeps (should use memory for that, by the way...)
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var fixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var wallfixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallfixer');

    // Create new creeps if needed
    if(harvesters.length < 1) {
        var newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});
    } else if(builders.length < 3) {
        var newName = 'Builder' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'builder'}});
    } else if (upgraders.length < 2) {
        var newName = 'Upgrader' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    } else if (fixers.length < 1) {
        var newName = 'Fixer' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'fixer'}});
    } else if (wallfixers.length < 1) {
        var newName = 'Wallfixer' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'wallfixer'}});
    }
    
    // ACT as programmed
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else if (creep.memory.role == 'fixer') {
            roleFixer.run(creep);
        } else if (creep.memory.role == 'wallfixer') {
            roleWallfixer.run(creep);
        }
    }
}
