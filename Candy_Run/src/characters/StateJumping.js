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
    },
    onExit: function (character) {

    }
});