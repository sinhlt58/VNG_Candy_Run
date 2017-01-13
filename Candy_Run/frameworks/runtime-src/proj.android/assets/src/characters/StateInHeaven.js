/**
 * Created by Fresher on 10/01/2017.
 */
var StateInHeaven = StateMovement.extend({


    //fixme: use acceleration


    flewToHeaven: null,
    time: null,
    passedTime: null,

    ctor: function () {
        this.flewToHeaven = false;
        this.time = 5;
        this.passedTime = 0;
    },

    update: function (dt, character) {


        // logic here
        if (this.flewToHeaven == false) {
            // flying up
            // set velocity to fly up

            character.setVelocity(cc.p(0, 400));
            // 500 or some number
            if (character.getPosition().y > 1150) {
                this.flewToHeaven = true;
                character.setVelocityY(0);
                character.setAccelerationY(-500);
            }
        } else {
            // flew to heaven
            // how to know if owner flew??
            // base on position y ??
            //todo: set velocity to fly horizontally, update passedTime


            character.animationController.setAnimation('fly', true);
            this.passedTime += dt;
            character.setVelocityX(300);

            if (this.passedTime >= this.time) {
                // use acceleration y here
                character.setAccelerationY(-500);

            }


        }


    },

    onEnter: function (character) {
        character.animationController.setAnimation("enterFever", true);

        //character.setAccelerationY()

    },
    onExit: function (character) {

    }
});