/**
 * Created by Fresher on 13/01/2017.
 */
var StateDie= StateMovement.extend({
    ctor: function () {

    },
    update: function (dt, character) {

    },
    onEnter: function (character) {
        character.animationController.setAnimation('die', false);
        character.setVelocityX(0);
    },
    onExit: function (character) {

    }



});