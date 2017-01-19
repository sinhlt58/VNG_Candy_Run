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
        character.setVelocity(cc.p(currentVelo.x, 700));

        character.setAcceleration(cc.p(0, -1600));
        var characterPos = character.getPosition();
        cr.game.world.spawnEffectAt(globals.EFFECT_JUMP, cc.p(characterPos.x, characterPos.y));
        cr.game.world.spawnEffectAt(globals.EFFECT_JUMP, cc.p(characterPos.x - 40, characterPos.y - 5));
        cr.game.world.spawnEffectAt(globals.EFFECT_JUMP, cc.p(characterPos.x + 40, characterPos.y - 5));

        cc.audioEngine.playEffect(cr.sound_manager.getSoundUrlById(character.sound_jump));
    },
    onExit: function (character) {
        //cc.log("exit double jumping");
    }
});