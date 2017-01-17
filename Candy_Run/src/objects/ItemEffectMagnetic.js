/**
 * Created by Fresher on 1/7/2017.
 */
var ItemEffectMagnetic = ItemEffect.extend({
    ctor:function () {
        this._super();
    },
    doEffect:function (game, world, item) {
        world.character.stateMachine.changeState("stateMagnetic", new StateActiveMagnetic());
        world.spawnEffectAt(1005, item.sprite.getPosition());
    }
});