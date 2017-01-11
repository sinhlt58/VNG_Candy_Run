/**
 * Created by Fresher on 28/12/2016.
 */
var StateGiantDisactive= StateGiant.extend({



    ctor: function (owner) {

    },
    update: function (dt, character) {


    },
    onEnter: function (character) {
        character.setScaleSize(0.8);
    },
    onExit: function () {

    }
});