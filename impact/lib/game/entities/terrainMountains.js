ig.module('game.entities.terrainMountains')
.requires(
    'plugins.client',
    'game.atlas',
    'game.entities.terrain'
)
.defines(function() {

    EntityTerrainMountains = EntityTerrain.extend({
        animSheet: new ig.AnimationSheet('media/sprites/terrain-mountains.png', Atlas.entities.terrain.size.x, Atlas.entities.terrain.size.y),
    });
});
