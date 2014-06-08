ig.module('game.server.entities.terrain')
.requires(
    'plugins.server',
    'game.atlas'
)
.defines(function() {

    EntityTerrain = EntityServer.extend({
        size: Atlas.entities.terrain.size,
        speed: 20, 
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            /*
            var self = this;
            var half = this.speed / 2;
            this.moveInterval = setInterval(function() {
                self.vel.x = Math.floor(Math.random() * self.speed - half);
                self.vel.y = Math.floor(Math.random() * self.speed - half);
            }, 2000);
            */
        },
        kill: function() {
            this.parent();
            //clearInterval(this.moveInterval);
        }
    });

});
