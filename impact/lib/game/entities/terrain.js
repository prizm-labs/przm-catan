ig.module('game.entities.terrain')
.requires(
    'plugins.client',
    'game.atlas'
)
.defines(function() {

    EntityTerrain = EntityClient.extend({
        //name: 'terrain',
        animSheet: new ig.AnimationSheet('media/sprites/terrain-desert.png', Atlas.entities.terrain.size.x, Atlas.entities.terrain.size.y),
        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('only', 0.3, [0]);
            this.currentAnim = this.anims.only;

        }
    });
});
