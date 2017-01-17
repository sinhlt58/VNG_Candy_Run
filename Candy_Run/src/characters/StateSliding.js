/**
 * Created by magic_000 on 09/01/2017.
 */
var StateSliding = StateMovement.extend({

    ctor: function (){

    },

    onEnter: function (character) {
        cc.log('On enter Sliding');
        character.animationController.setAnimation('slide', true);
        character.body = {width: 90, height: 80};

        character.setAcceleration(cc.p(0,0));

        var velocityX=character.velocity.x;
        character.setVelocity(cc.p(velocityX, 0));

        cc.audioEngine.playEffect(cr.sound_manager.getSoundUrlById(character.sound_slide));
    },

    onExit: function (character) {
        cc.log('exit sliding');
    },

    update:function (dt, character) {


    }




});