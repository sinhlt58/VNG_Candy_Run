/**
 * Created by Fresher on 10/01/2017.
 */
var StateInHeaven = StateMovement.extend({


    //fixme: use acceleration


    flewToHeaven: null,
    time: null,
    passedTime: null,

    freeFlyTime: null,
    passedFreeFlyTime: null,


    ctor: function () {
        this.flewToHeaven = false;
        this.time = 15;
        this.passedTime = 0;
        this.freeFlyTime=3;
        this.passedFreeFlyTime=0;


    },

    update: function (dt, character) {


        if(character.getPosition().y>=1450){
            character.setVelocityY(0);
            character.setPositionY(1449);
        }


        if(this.passedTime<this.time){
            if(character.getPosition().y<1100){
                character.setPositionY(1100);
                character.setVelocityY(0);
            }



        }


        cc.log(character.getPosition().y);


        // logic here
        if (this.flewToHeaven == false) {
            // flying up
            // set velocity to fly up

            character.setVelocity(cc.p(0, 300));
            // 500 or some number
            if (character.getPosition().y > 1200) {
                this.flewToHeaven = true;
                character.setVelocityY(0);


                //character.setAccelerationY(-500);
            }
        } else {
            // flew to heaven
            // how to know if owner flew??
            // base on position y ??
            //todo: set velocity to fly horizontally, update passedTime

            character.animationController.setAnimation('fly', true);
            this.passedTime += dt;
            character.setVelocityX(500);


            if(this.passedTime>= this.freeFlyTime){

                character.setAccelerationY(-500);

                if (this.passedTime >= this.time) {
                    // use acceleration y here
                    character.setAccelerationY(-500);

                }
            }

            /*if (this.passedTime >= this.time) {
                // use acceleration y here
                character.setAccelerationY(-500);

            }*/


        }


    },

    onEnter: function (character) {
        cc.log("Enter heaven");
        character.animationController.setAnimation("enterFever", true);
        character.setVelocity(cc.p(0, 300));

        character.setAccelerationY(0);


        //character.setAccelerationY()
        cc.audioEngine.playEffect(cr.sound_manager.getSoundUrlById(globals.SOUND_TYPE_FEVER));
    },
    onExit: function (character) {

    }
});