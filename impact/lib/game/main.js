ig.module( 
	'game.main' 
)
.requires(
    'plugins.client',
    'game.levels.field',
    'game.entities.player',
    'game.entities.drone',
    'game.entities.terrain',
    'game.entities.terrainDesert',
    'game.entities.terrainFields',
    'game.entities.terrainForest',
    'game.entities.terrainHills',
    'game.entities.terrainMountains',
    'game.entities.terrainPasture'
)
.defines(function() {

    // This handles all the network logic and is now seperated from the game class.
    // You can access this at ig.client.
    MyClient = Client.extend({

    });

    ClientFullBoard = GameClient.extend({
        init: function() {
            //this.loadLevel(LevelField);
        }
    });

    ClientPlayerHand = GameClient.extend({
        init: function() {
            this.loadLevel(LevelField);
        }
    });

    // serve "full gameboard" client to browser of board device
    // serve "user actions" client to browser of mobile device

    console.log('client presenting screen...');
    

    ig.main('#canvas', ClientFullBoard, 60, 1080, 1080, 1);
    ig.system.setClient(MyClient);

});
