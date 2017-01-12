/**
 * Created by Fresher on 1/7/2017.
 */
var ItemEffectInstantBonusTime = ItemEffect.extend({
    ctor:function () {
        this._super();
    },
    doEffect:function (game, world, item) {
        var currentStateMovement = world.character.stateMachine.stateMovement;
        if (!(currentStateMovement instanceof StateInHeaven)){
            world.character.stateMachine.changeState("stateMovement", new StateInHeaven());
        }
    }
});