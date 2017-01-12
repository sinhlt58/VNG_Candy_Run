/**
 * Created by Fresher on 28/12/2016.
 */
var StateDecreasingHP= StateHP.extend({
    ctor: function () {

    },

    update: function (dt, character) {
        character.decreaseHP(character.decreasingHPRate);
    },
    onEnter: function (character) {
        
    },
    onExit: function (character) {
        
    }
});