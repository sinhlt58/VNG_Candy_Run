/**
 * Created by Fresher on 10/01/2017.
 */
var StateFalling = StateMovement.extend({


    fell: null,

    //vx: null,
    ctor: function (vx) {
        this.fell=false;
    },


    update: function (dt, character) {
        if(this.fell==false){

        }else{
            character.setVelocityY(-300);

        }


    },
    onEnter: function(ch) {

        ch.setAccelerationY(-500);

        //ch.setVelocityX(0);

    },
    onExit: function (ch) {

    }
});
