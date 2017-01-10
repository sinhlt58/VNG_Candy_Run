/**
 * Created by Fresher on 29/12/2016.
 */
var StateFlying = StateMovement.extend({



    time: null,
    timePass: null,


    isGoingUp:null,



    owner: null,
    onEnterCall: null,


    ctor: function (owner) {
        this.owner=owner;
        this.onEnterCall=false;
        this.isGoingUp= true;

        this.time=15;
        this.timePass=0;
    },

    update: function (dt) {

        //cc.log(this.owner.getPosition().y);
        if(this.onEnterCall==false){
            this.onEnter();
            this.onEnterCall=true;
        }else{





            if(this.owner.getPosition().y>=200){
                this.isGoingUp=false
            }
            // went up
            if(this.isGoingUp==false){
                this.owner.setVelocity(cc.p(300, 0));
                this.timePass=+dt;
                if(this.timePass>this.time){

                    cc.log("exit flying");

                    this.owner.stateMachine.setStateMovement(new StateRunning(this.owner));
                }


            }


        }
    }, 
    onEnter: function () {



        if(this.owner.stateMachine.stateMovement instanceof StateFlying==false){
            this.owner.setVelocity(cc.p(300, 400))
            this.owner.animationController.setAnimation('fly', true);
            cc.log('on enter flying');
        }

        //this.owner.setVelocity(cc.p(300, 400))
        this.owner.animationController.setAnimation('fly', true);
        cc.log('on enter flying');



    },
    onExit: function () {
        
    }
});