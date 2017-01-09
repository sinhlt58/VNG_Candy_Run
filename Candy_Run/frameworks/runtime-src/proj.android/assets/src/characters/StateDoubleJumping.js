/**
 * Created by Fresher on 28/12/2016.
 */
var StateDoubleJumping = StateMovement.extend({
    owner: null,
    onEnterCall: null,

    ctor: function (owner) {
        this.owner=owner;
        this.onEnterCall=false;
    },
    update: function (dt) {
        if(this.onEnterCall==false){
            this.onEnter();
            this.onEnterCall=true;
        }else{
            //logic here

        }


    },
    onEnter: function () {
        cc.log('enter double jumping');

        this.owner.animationController.setAnimation('doubleJump', false);
        var currentVelo= this.owner.velocity;
        this.owner.setVelocity(cc.p(currentVelo.x, 500));


    },
    onExit: function () {

    }
});