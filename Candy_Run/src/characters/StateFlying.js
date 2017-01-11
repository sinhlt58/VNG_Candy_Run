/**
 * Created by Fresher on 29/12/2016.
 */
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

        if (character.getPosition().y >= 250) {
            this.isGoingUp = false
        }
        //went up
        if (this.isGoingUp == false) {
            //character.setVelocity(cc.p(300, 0));

            if(this.isResetVy==false){
                character.setVelocityY(-200);
                this.isResetVy=true;
            }else{

                //character.setVelocityY(-200);
                this.timePass = +dt;
                if (this.timePass > this.time) {
                    //todo : use new API to set new state
                    character.stateMachine.changeState('stateMovement', new StateRunning());
                }
            }

            //character



        }


    },
    onEnter: function (character) {


        character.setVelocity(cc.p(300, 400));
        character.animationController.setAnimation('fly', true);
        cc.log('on enter flying');




        //this.owner.setVelocity(cc.p(300, 400))
        /*character.animationController.setAnimation('fly', true);
         cc.log('on enter flying');*/


    },
    onExit: function () {

    }
});