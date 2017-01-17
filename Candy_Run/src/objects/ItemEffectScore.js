/**
 * Created by Fresher on 1/7/2017.
 */
var ItemEffectScore = ItemEffect.extend({
    ctor:function () {
        this._super();
    },
    doEffect:function (game, world, item) {

        //cc.log("item score: ", item.score);
        game.getPlayer().increaseScore(item.score);
        world.spawnEffectAt(1015, item.sprite.getPosition());
    }
});