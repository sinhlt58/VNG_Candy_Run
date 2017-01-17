/**
 * Created by Fresher on 28/12/2016.
 */
var StateJumping = StateMovement.extend({

    ctor: function () {

    },

    update: function (dt, character ) {

    },
    onEnter: function (character){
        //todo: set velocity and acceleration for owner
        //console.log("On Jumping running");

        character.animationController.setAnimation('jump', false);
        var currentVelo= character.velocity;
        character.setVelocity(cc.p(currentVelo.x, 500));
        character.setAcceleration(cc.p(0, -1000));

        //todo: change later to shake the screen when giant and from jump to running.
        if(character.stateMachine.stateGiant instanceof StateGiantActive)
            Camera.shakeTheScreen(0.2);

        var characterPos = character.getPosition();
        cr.game.world.spawnEffectAt(globals.EFFECT_JUMP, cc.p(characterPos.x, characterPos.y));
        cr.game.world.spawnEffectAt(globals.EFFECT_JUMP, cc.p(characterPos.x - 40, characterPos.y));
        cr.game.world.spawnEffectAt(globals.EFFECT_JUMP, cc.p(characterPos.x + 40, characterPos.y));

        if (character.stateMachine.stateGiant instanceof StateGiantActive){
            cc.audioEngine.playEffect(cr.sound_manager.getSoundUrlById(globals.SOUND_TYPE_GIANT_LAND));
        }else{
            cc.audioEngine.playEffect(cr.sound_manager.getSoundUrlById(character.sound_jump));
        }
    },
    onExit: function (character) {

    }
});