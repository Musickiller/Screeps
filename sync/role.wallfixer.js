
var roleWallfixer = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    
	    const debug = true;
	    if (debug) { creep.memory.state = 0 }

	    if(creep.memory.building && creep.carry.energy == 0) {
		    creep.memory.building = false;
		    creep.say('HARVEST');
		    if (debug) { creep.memory.state = 1 }
	    } else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
		    creep.memory.building = true;
		    creep.say('FIX WALLS');
		    if (debug) { creep.memory.state = 2 }
	    } else if (creep.memory.building) {
		    if (debug) { creep.memory.state = 3 }
		    var walls = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) =>
					 {
			    return (structure.structureType == 'STRUCTURE_WALL')
		    			});
		    if (debug) { creep.memory.state = 4 }
		    var minHits = 90000
		    var target
		    for (var wall in walls) {
			    if ( wall.hits < minHits ) {
				    target = wall
				    minHits = wall.hits
			    }
		    }
		    if (debug) { creep.memory.state = 5 }
		    if (debug) { creep.memory.minHits = minHits }
		    if(target) {
			    if(creep.repair(target) == ERR_NOT_IN_RANGE) {
				    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
			    }
		    }
		    if (debug) { creep.memory.state = 6 }
	    } else {
		    var sources = creep.room.find(FIND_SOURCES);
		    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
			    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
			    if (debug) { creep.memory.state = 7 }
		    }
	    }
	}
};

module.exports = roleWallfixer;
