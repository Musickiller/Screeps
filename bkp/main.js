// MAIN FUNCTION

// INIT
var roleHarvester = require('role.harvester');
var roleFixer = require('role.fixer')
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleWallfixer = require('role.wallfixer');
var visualCtl = require('roomctl.visual');


module.exports.loop = function () {
	
	// CONTROL CONSTS
	
	const room = 'E41N49';
	const max_builders = 1;
	const max_fixers = 1;
	const max_harvesters = 1;
	const max_upgraders = 3;
	const max_wallfixers = 0;
	
	
	/*
	if ( room.energyCapacityAvailable < 600 )
	{
		const max_tools = [WORK,CARRY,MOVE];
	} else {
		const max_tools = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
	}
	*/
	
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
	if ( Game.rooms[room].energyAvailable > 299 )
	{
		// harvesters
		if ( /*Game.rooms[room].energyAvailable < Game.rooms[room].energyCapacityAvailable && */ harvesters.length < max_harvesters)
		{
			var newName = 'Harvester' + Game.time;
			// spawn a small harvester if that's all you can do
			if (Game.rooms[room].energyAvailable < 600) {
				Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
								 {memory: {role: 'harvester'}});
			}
			// or a big one if that's possible
			else {
				Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
								 {memory: {role: 'harvester'}});
			}
		}
		// upgraders
		else if (upgraders.length < max_upgraders)
		{
			var newName = 'Upgrader' + Game.time;
			Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
							 {memory: {role: 'upgrader'}});
		}
		// builders
			else if (builders.length < max_builders)
			{
				var newName = 'Builder' + Game.time;
				Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
							 {memory: {role: 'builder'}});
			}
			else if (fixers.length < max_fixers)
			{
				var newName = 'Fixer' + Game.time;
				Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
								 {memory: {role: 'fixer'}});
			}
			else if (wallfixers.length < max_wallfixers)
			{
				var newName = 'Wallfixer' + Game.time;
				Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
								 {memory: {role: 'wallfixer'}});
			}
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
