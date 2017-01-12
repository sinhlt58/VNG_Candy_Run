/**
 * Created by Fresher on 29/12/2016.
 */
var StateIncreasingHP= StateHP.extend({
    ctor: function () {
    },

    update: function (dt, character) {
        var currentStateHP = character.stateMachine.stateHP;
        if (!(currentStateHP instanceof StateDecreasingHP)){
            character.stateMachine.changeState("stateHP", new StateDecreasingHP());
        }
    },
    onEnter: function (character) {
        character.increaseHP(50);
    },
    onExit: function (character) {
        
    }
}); 