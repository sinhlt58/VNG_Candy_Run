/**
 * Created by Fresher on 28/12/2016.
 */
var StateDoubleJumping = StateMovement.extend({


    ctor: function () {

    },
    update: function (dt, character) {

    },
    onEnter: function (character) {
       // cc.log('enter double jumping');

        character.animationController.setAnimation('doubleJump', false);
        var currentVelo= character.velocity;
        character.setVelocity(cc.p(currentVelo.x, 500));

        var characterPos = character.getPosition();
        Game.world.spawnEffectAt(globals.EFFECT_JUMP, cc.p(characterPos.x, characterPos.y));
        Game.world.spawnEffectAt(globals.EFFECT_JUMP, cc.p(characterPos.x - 40, characterPos.y - 5));
        Game.world.spawnEffectAt(globals.EFFECT_JUMP, cc.p(characterPos.x + 40, characterPos.y - 5));
    },
    onExit: function (character) {
        //cc.log("exit double jumping");
    }
});