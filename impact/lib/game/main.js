ig.module( 
	'game.main' 
)
.requires(
    'plugins.client',
    'game.levels.field',
    'game.entities.player',
    'game.entities.drone',
    'game.entities.terrain'
)
.defines(function() {

    // This handles all the network logic and is now seperated from the game class.
    // You can access this at ig.client.
    MyClient = Client.extend({

    });

    MyGame = GameClient.extend({
        init: function() {
            this.loadLevel(LevelField);
        }
    });

    ig.main('#canvas', MyGame, 60, 1080, 1080, 1);
    ig.system.setClient(MyClient);

});
