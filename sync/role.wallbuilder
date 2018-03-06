
var roleFixer = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            	creep.memory.building = false;
            	creep.say('HARVEST');
	    } else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('FIX');
	    } else if (creep.memory.building) {
	        var structs = creep.room.find(FIND_MY_STRUCTURES);
          var targets = new Array
          for (struct in structs) {
              if ( struct.hitsMax/struct.hits < 0.5 && struct.structureType != STRUCTURE_WALL ) {
                  targets.push(struct)
              }
          }
          if(targets.length) {
              if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
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

module.exports = roleFixer;
