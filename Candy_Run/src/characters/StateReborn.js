/**
 * Created by Fresher on 13/01/2017.
 */

// can only move to this state from die
    // after duration, character will come back to running
var StateReborn = StateMovement.extend({

    duration: null,
    timePass: null,


    ctor: function () {
        this.duration = 1;
        this.timePass = 0;

    },
    onEnter: function (character) {
        character.animationController.setAnimation("reborn", false);


    },
    onExit: function (character) {

    },
    update: function (dt, character) {
        this.timePass+=dt;
        if(this.timePass>=this.duration){
            character.stateMachine.changeState("stateMovement", new StateRunning());
        }



    }
});