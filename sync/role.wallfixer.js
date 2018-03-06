
var roleWallfixer = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
		    creep.memory.building = false;
		    creep.say('HARVEST');
	    } else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
		    creep.memory.building = true;
		    creep.say('FIX WALLS');
	    } else if (creep.memory.building) {
		    var walls = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => structure.structureType == 'STRUCTURE_WALL');
		    var minHits = 90000
		    var target
		    for (var wall in walls) {
			    if ( wall.hits < minHits ) {
				    target = wall
				    minHits = wall.hits
			    }
		    }
		    if(target) {
			    if(creep.repair(target) == ERR_NOT_IN_RANGE) {
				    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
			    }
		    }
	    } else {
		    var sources = creep.room.find(FIND_SOURCES);
		    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
			    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            	}
	    }
	}
};

module.exports = roleWallfixer;
