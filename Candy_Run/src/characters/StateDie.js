/**
 * Created by Fresher on 13/01/2017.
 */
var StateDie = StateMovement.extend({


    duration: null,

    timePass: null,


    grounded: null,

    setAnimation: null,

    ctor: function () {
        this.duration = 1;


        this.timePass = 0;
        this.grounded = false;
        this.setAnimation=false;

    },
    update: function (dt, character) {
        if (character.getPosition().y <= 90) {
            this.grounded = true;
        }
        if (this.grounded = true) {
            this.timePass += dt;
            character.setPositionY(90);
            character.setAccelerationY(0);

            // not play die animation
            if(this.setAnimation==false){
                character.animationController.setAnimation("die", false);
            }
            // animation was set
            else{

            }




        }


    },
    onEnter: function (character) {
        //character.animationController.setAnimation('die', false);

        //stop the character
        character.setVelocityX(0);



        // make character fall
        if (character.getPosition().x > 90) {
            this.character.setAccelerationY(-300);
        }


    },
    onExit: function (character) {

    }


});