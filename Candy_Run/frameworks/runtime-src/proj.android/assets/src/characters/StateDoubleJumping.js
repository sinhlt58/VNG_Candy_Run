/**
 * Created by Fresher on 28/12/2016.
 */
var StateDoubleJumping = StateMovement.extend({


    ctor: function () {

    },
    update: function (dt, character) {

    },
    onEnter: function (character) {
        cc.log('enter double jumping');

        character.animationController.setAnimation('doubleJump', false);
        var currentVelo= character.velocity;
        character.setVelocity(cc.p(currentVelo.x, 500));


    },
    onExit: function (character) {
        cc.log("exit double jumping");
    }
});