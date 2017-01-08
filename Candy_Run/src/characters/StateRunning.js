/**
 * Created by Fresher on 28/12/2016.
 */
var StateRunning= StateMovement.extend({
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
            // entered update logic

            // fixme: set acceleration to (x, 0)





        }
    },

    //  fixme: set position and acceleration to running state
    onEnter: function () {







        this.owner.animationController.setAnimation('run1', true);
        console.log("On Enter Running");

        var currentPosX= this.owner.getPosition().x;
        var y= this.owner.getInitPosition().y;

        this.owner.setPosition(cc.p(currentPosX, y));

        this.owner.setAcceleration(cc.p(0,0));
        this.owner.setVelocity((cc.p(300, 0)));

    },
    onExit: function () {

    }
});