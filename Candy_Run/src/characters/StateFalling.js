/**
 * Created by Fresher on 10/01/2017.
 */
var StateFalling = StateMovement.extend({

    ctor: function () {

    },


    update: function (dt, character) {

    },
    onEnter: function(ch) {

        ch.setAccelerationY(-500);

    },
    onExit: function (ch) {

    }
});
