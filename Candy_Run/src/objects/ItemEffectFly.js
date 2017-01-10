/**
 * Created by Fresher on 1/7/2017.
 */
var ItemEffectFly = ItemEffect.extend({
    ctor:function () {
        this._super();
    },
    doEffect:function (game, world, item) {
        world.character.stateMachine.setStateMovement(new StateFlying( world.character));
    }
});