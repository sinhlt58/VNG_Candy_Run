/**
 * Created by Fresher on 29/12/2016.
 */
var StateIncreasingHP= StateHP.extend({

    increasingRate:null,

    ctor: function (increasingRate) {
        this.increasingRate=increasingRate;
    },


    update: function (dt, character) {
        character.increaseHP(this.increasingRate*dt);
    },
    onEnter: function (character) {
        
    },
    onExit: function (character) {
        
    }
}); 