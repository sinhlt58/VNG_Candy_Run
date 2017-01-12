/**
 * Created by Fresher on 29/12/2016.
 */


//fixme: use gravity here to simulation falling


var StateFlying = StateMovement.extend({


    time: null,
    timePass: null,


    isGoingUp: null,
    isResetVy: null,




    ctor: function (owner) {

        this.isGoingUp = true;

        this.time = 5;
        this.timePass = 0;
        this.isResetVy=false;
    },


    //todo : fix logic here,
    update: function (dt, character) {



        //cc.log(character.getPosition().y);


        // went up
        if (character.getPosition().y >= 250) {
            this.isGoingUp = false;
            character.setAccelerationY(-500);


        }
        //went up and going down
        if (this.isGoingUp == false) {


            this.timePass+=dt;
            // not reset vy
                this.isResetVy=true;
                if(this.isResetVy==false){
                    character.setVelocityY(0);
            }
            // vy reset
            else{

            }


        }
        // going up
        else {

        }


    },
    onEnter: function (character) {


        //character.setVelocity(cc.p(300, 400));
        character.animationController.setAnimation('fly', true);
        cc.log('on enter flying');

        character.setAccelerationY(500);




        //this.owner.setVelocity(cc.p(300, 400))
        /*character.animationController.setAnimation('fly', true);
         cc.log('on enter flying');*/


    },
    onExit: function () {

    }
});