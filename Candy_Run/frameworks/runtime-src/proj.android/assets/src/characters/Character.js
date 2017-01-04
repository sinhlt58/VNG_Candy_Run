/**
 * Created by Fresher on 28/12/2016.
 */
var Character = cc.Class.extend({
    spAnimation: null,
    position: null,


    velocity: null,
    acceleration: null,


    stateMachine: null,

    animationController: null,


    initPosition: null,


    ctor: function () {


        //todo: Replace with animation controller after
        this.spAnimation = new sp.SkeletonAnimation(res.princess_json, res.princess_atlas);
        this.spAnimation.setAnimation(0, 'run1', true);

        //this.spAnimation.setPosition(200, 300);

        this.spAnimation.anchorX = 0.5;
        this.spAnimation.anchorY = 0.5;


        //cc.log(this.spAnimation._contentSize);
        //this.spAnimation.setScale(1);


        //fixme: time scale will be set base on velocity
        this.spAnimation.setTimeScale(0.7);
        //this.spAnimation.setPosition(cc.p(450, 200));



        // fixme: velocity is not set by that
        this.velocity = cc.p(300, 0);
        this.acceleration = cc.p(0, 0);



        this.animationController= new AnimationController(this);
        this.stateMachine= new StateMachineCharacter(this);


        //fixme: init position should be load from file or somewhere
        //this.initPosition = cc.p(250, 90 + this.spAnimation._contentSize.height/2); @@ amazing bug
        this.initPosition = cc.p(250, 90 + this.spAnimation.getContentSize().height/2);
        this.setPosition(this.initPosition);

        cc.log(this.spAnimation);
    },

    // all the update about velocity, acceleration and state will be performed in state_machine
    update: function (dt) {

        //update all
        this.stateMachine.update(dt);
        var currentX = this.spAnimation.getPosition().x;
        var currentY = this.spAnimation.getPosition().y;

        var x = currentX + this.velocity.x * dt;
        var y = currentY + this.velocity.y * dt;

        this.spAnimation.setPosition(cc.p(x,y));

    },
    getPosition: function(){
        return this.spAnimation.getPosition();
    },
    setPosition: function (position) {
        this.spAnimation.setPosition(position);
    },


    getInitPosition: function(){
        return this.initPosition;
    },

    getContentSize: function () {
        return this.spAnimation.getContentSize();
    }






});
