/**
 * Created by Fresher on 28/12/2016.
 */
var StateTakingDamage= StateHP.extend({
    update: function (dt, character) {

    },
    onEnter: function (character) {
        character.decreaseHP(50);
    },
    onExit: function(character){

    }

});