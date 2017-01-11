/**
 * Created by Fresher on 28/12/2016.
 */
var StateDecreasingHP= StateHP.extend({
    decreasingRate: null,

    ctor: function (rate) {
        this.decreasingRate=rate;
    },

    update: function (dt, character) {
        character.decreasingHP(this.decreasingRate*dt);
    },
    onEnter: function (character) {
        
    },
    onExit: function (character) {
        
    }
});