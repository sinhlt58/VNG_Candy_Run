/**
 * Created by Fresher on 28/12/2016.
 */
var StateJumping = StateMovement.extend({

    owner: null,

    onEnterCall: false,

    ctor: function (owner) {
        this.owner=owner;
    },

    update: function (dt) {
        if(this.onEnterCall==false){
            this.onEnter();
            this.onEnterCall=true;
        }else{
            //handle logic here


        }
    },
    onEnter: function () {
        //todo: set velocity and acceleration for owner
        console.log("On Jumping running");

        this.owner.animationController.setAnimation('jump', false);
        var currentVelo= this.owner.velocity;
        this.owner.setVelocity(cc.p(currentVelo.x, 500));
        this.owner.setAcceleration(cc.p(0, -1000));
    },
    onExit: function () {

    }
});