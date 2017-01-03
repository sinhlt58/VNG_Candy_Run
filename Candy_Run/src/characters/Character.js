/**
 * Created by Fresher on 28/12/2016.
 */
var Character = cc.Class.extend({
    spAnimation: null,
    position: null,


    velocity: null,
    acceleration: null,


    stateMachine: null,



    ctor: function () {


        //todo: Replace with animation controller after
        this.spAnimation = new sp.SkeletonAnimation(res.princess_json, res.princess_atlas);
        this.spAnimation.setAnimation(0, 'run1', true);

        //this.spAnimation.setPosition(200, 300);

        this.spAnimation.anchorX = 0.5;
        this.spAnimation.anchorY = 0.5;

        //this.spAnimation.setScale(1);


        //fixme: time scale will be set base on velocity
        this.spAnimation.setTimeScale(0.7);
        this.spAnimation.setPosition(cc.p(200, 200));



        // fixme: velocity is not set by that
        this.velocity = cc.p(300, 0);
        this.acceleration = cc.p(0, 0);



        this.stateMachine= new StateMachineCharacter(this);



    },

    // all the update about velocity and acceleration wil be perform in state_machine
    update: function (dt) {

        //update velo and acce
        this.stateMachine.update(dt);
        var currentX = this.spAnimation.getPosition().x;
        var currentY = this.spAnimation.getPosition().y;

        var x = currentX + this.velocity.x * dt;
        var y = currentY + this.velocity.y * dt;

        this.spAnimation.setPosition(cc.p(x,y));

    }
});
