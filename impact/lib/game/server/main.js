ig.module( 
	'game.server.main' 
)
.requires(
    'plugins.server',
    'game.levels.field',
    'game.server.entities.player',
    'game.server.entities.drone',
    'game.server.entities.terrain',
    'game.server.entities.terrainDesert',
    'game.server.entities.terrainFields',
    'game.server.entities.terrainForest',
    'game.server.entities.terrainHills',
    'game.server.entities.terrainMountains',
    'game.server.entities.terrainPasture',
    //'impact.debug.debug',
    'game.atlas',
    'game.utils'
)
.defines(function() {

    // This handles all the network logic and is now seperated from the game class.
    // You can access this instance at ig.server.
    MyServer = Server.extend({
        clientConnected: function(socket) {
            // Must call the parent class to intialize the network functionality.
            this.parent(socket);
            ig.game.spawnEntity(EntityPlayer, 50, 50, { socket: socket });
        }
    });

    MyGame = GameServer.extend({
        init: function() {
            this.loadLevel(LevelField);
            ig.game.spawnEntity(EntityDrone, 100, 100);


            // setup positions

            setupTerrain();

            function setupTerrain() {

                var origin = {x:0,y:0};

                var xSpacing = Atlas.global.gridSpacing.x;
                var ySpacing = Atlas.global.gridSpacing.y;

                var rows = [3, 4, 5, 4, 3];
                var origins = [];

                var terrain = [];

                rows.forEach(function(rowLength,rowIndex){
                    origins = origins.concat(generateTerrainOrigins(origin,rowLength));
                    
                    // shift origin for next row
                    var newX,newY=origin.y+ySpacing*1.5;

                    if (rowIndex<2) {
                        newX = origin.x-xSpacing;
                    } else {
                        newX = origin.x+xSpacing;
                    }

                    origin = {x:newX,y:newY};                    
                });
                
                ig.log(origins);


                generateTerrain();
                placeTerrain(origins);


                function generateTerrain() {

                    var defaultOrigin = {x:0,y:0};

                    spawnTerrain(EntityTerrainDesert,1);
                    spawnTerrain(EntityTerrainHills,3);
                    spawnTerrain(EntityTerrainMountains,3);
                    spawnTerrain(EntityTerrainFields,4);
                    spawnTerrain(EntityTerrainPasture,4);
                    spawnTerrain(EntityTerrainForest,4);

                    function spawnTerrain(type,count) {
                        for (var i=0;i<count;i++) {
                            ig.log(type);
                            ig.game.spawnEntity(type, defaultOrigin.x, defaultOrigin.y);
                        }
                    }
                    
                    
                }

                    
                function generateTerrainOrigins(rowOrigin,rowLength){

                    var origins = [];

                    for (var i=0;i<rowLength;i++) {
                        origins.push({x:rowOrigin.x+i*xSpacing*2,y:rowOrigin.y}); 
                    }

                    return origins;
                }
                // setup terrain

                function placeTerrain(origins) {

                    var terrain = ig.game.getEntitiesByType(EntityTerrain);
                    terrain = Utils.shuffle(terrain);
                    //var terrain = ig.game.getEntitiesBy(EntityTerrain);

                    origins.forEach(function(origin,originIndex){
                        // place terrain at origin
                        //
                        terrain[originIndex].pos.x = origin.x;
                        terrain[originIndex].pos.y = origin.y;
                        // TODO animate terrain with predetermined type to origin
                    });

                }

            }
            
        }
    });

    ig.main('#canvas', MyGame, 60, 320, 240, 2);
    ig.system.setServer(MyServer);

});
