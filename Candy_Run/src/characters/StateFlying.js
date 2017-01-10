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

            if(this.isGoingUp==false){
                this.owner.setVelocity(cc.p(300, 0));
            }


        }
    }, 
    onEnter: function () {

        this.owner.setVelocity(cc.p(300, 400))
        this.owner.animationController.setAnimation('fly', true);


    },
    onExit: function () {
        
    }
});