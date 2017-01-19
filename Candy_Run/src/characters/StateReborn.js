/**
 * Created by Fresher on 13/01/2017.
 */

// can only move to this state from die
    // after duration, character will come back to running
var StateReborn = StateMovement.extend({






        durationToReborn: null,
        timeToReborn: null,


        prepareTime: null,
        passedTime: null,


        setRun1: null,


        ctor: function () {
            this.durationToReborn = 0.1;
            this.timeToReborn = 0;
            this.prepareTime = 3;
            this.passedTime = 0;
            this.setRun1=false;

        },
        onEnter: function (character) {
            character.currentHP= character.hp/2;

            cc.log("enter reborn");
            character.animationController.setAnimation("reBorn", false);

            character.setAccelerationY(0);

            character.stateMachine.changeState("stateVisible", new StateActiveInvisible());

        },
        onExit: function (character) {

        },
        update: function (dt, character) {

            //cc.log(this.timeToReborn, this.passedTime);


            this.timeToReborn += dt;

            if (this.timeToReborn >= this.durationToReborn) {


                // start count time
                this.passedTime+=dt;
                if(this.setRun1==false){
                    character.animationController.setAnimation("run1", true);
                }

                if(this.passedTime>this.prepareTime){
                    character.stateMachine.changeState("stateMovement", new StateRunningNotFalling());
                }
            }


        }
    });