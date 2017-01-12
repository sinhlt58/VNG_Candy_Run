/**
 * Created by Fresher on 10/01/2017.
 */
var StateFalling = StateMovement.extend({


    fell: null,

    //vx: null,

    fixedPos: null,
    ctor: function (vx) {
        this.fell=false;

        this.fixedPos=false;
    },


    update: function (dt, character) {
        if(this.fell==false){

        }else{
            character.setVelocityY(-300);

            if(this.fixedPos==false){


                var cx= character.getPosition().x;


                cc.log(cx);


                cx=cx - (800*dt);

                cc.log(cx);

                character.setPositionX(cx);



                this.fixedPos=true;
            }

        }


    },
    onEnter: function(ch) {

        ch.setAccelerationY(-500);

        //ch.setVelocityX(0);

    },
    onExit: function (ch) {

    }
});
