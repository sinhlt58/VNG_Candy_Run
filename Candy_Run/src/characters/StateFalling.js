/**
 * Created by Fresher on 10/01/2017.
 */
var StateFalling = StateMovement.extend({


    fell: null,

    //vx: null,

    fixedPos: null,

    duration: null,

    timePass: null,

    ctor: function () {

        this.fell=false;

        this.fixedPos=false;
        this.duration=2;
        this.timePass=0
    },


    update: function (dt, character) {

        this.timePass+=dt;

        if(this.timePass>this.duration){

            cc.log("enter die");

            character.stateMachine.changeState("stateMovement", new StateDie());



        }

        if(this.fell==false){

        }else{

            //character.setVelocityY(-300);

            if(this.fixedPos==false){
                var cx= character.getPosition().x;
                //cc.log(cx);
                cx=cx - (800*dt);

                //cc.log(cx);

                character.setPositionX(cx);
                this.fixedPos=true;
            }

        }


    },
    onEnter: function(ch) {

        ch.setAccelerationY(-500);


        cc.log("enter falling");

        //ch.setVelocityX(0);

    },
    onExit: function (ch) {

    }
});
