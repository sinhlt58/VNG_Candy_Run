/**
 * Created by Fresher on 1/7/2017.
 */
var ItemEffectHeal = ItemEffect.extend({
    ctor:function () {
        this._super();
    },
    doEffect:function (game, world, item) {
        world.character.stateMachine.changeState("stateHP", new StateIncreasingHP());
    }
});