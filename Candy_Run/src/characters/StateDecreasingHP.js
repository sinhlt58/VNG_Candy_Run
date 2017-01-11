/**
 * Created by Fresher on 28/12/2016.
 */
var StateDecreasingHP= StateHP.extend({
    update: function (dt, character) {
        character.currentHP -= character.decreasingHPRate;
    },
    onEnter: function (character) {
        
    },
    onExit: function (character) {
        
    }
});