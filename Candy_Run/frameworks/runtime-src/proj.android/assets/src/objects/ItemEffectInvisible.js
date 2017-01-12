/**
 * Created by Fresher on 1/7/2017.
 */
var ItemEffectInvisible = ItemEffect.extend({
    ctor:function () {
        this._super();
    },
    doEffect:function (game, world, item) {
        var stateInvisible = new StateActiveInvisible();
        stateInvisible.maxVisibleTime = 3;
        world.character.stateMachine.changeState("stateVisible", stateInvisible)
    }
});