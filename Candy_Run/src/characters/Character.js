/**
 * Created by Fresher on 28/12/2016.
 */
var Character = cc.Class.extend({


    // fix spAnimation position by adding offsetX and Y
    offsetXSp: null,
    offsetYSp: null,





    //fix collision offset by adding offset collide offset

    offsetCollX: null,
    offsetCollY: null,


    hp: null,
    currentHP: 0,
    decreasingHPRate: 0.2,


    //fixme: grounded property should not place here (some where else) :))
    grounded: true,
    body: null,

    //this property be used for detecting collision
    rectangle: {},


    spAnimation: null,
    position: null,


    velocity: null,
    acceleration: null,


    stateMachine: null,

    animationController: null,


    initPosition: null,


    scaleSize: null,


    // debug arr static


    //arr[]


    ctor: function () {



        //cc.log(cc.sys.platform==cc.sys.DESKTOP_BROWSER);


        this.hp=1000;

        this.currentHP=this.hp;

        //todo: Replace with animation controller after
        this.spAnimation = new sp.SkeletonAnimation(res.zombie_json, res.zombie_atlas);
        this.body = {width: 90, height: 170};


        this.animationController = new AnimationController(this);

        this.animationController.setAnimation('run1', true);

        //console.log(this.spAnimation.getAnimationInfo('run1'));

        //this.spAnimation.setPosition(200, 300);


        this.spAnimation.anchorX = 0;
        this.spAnimation.anchorY = 0;

        // 1 is too big
        this.setScaleSize(0.7);


        this.animationController.setScale(this.scaleSize);

        //cc.log(this.spAnimation._contentSize);
        //this.spAnimation.setScale(1);


        //fixme: time scale will be set base on velocity
        //this.spAnimation.setTimeScale(0.7);
        //this.spAnimation.setPosition(cc.p(450, 200));


        // fixme: velocity is not set by that, it should be increasing by time
        this.velocity = cc.p(800, 0);
        this.acceleration = cc.p(0, 0);


        this.stateMachine = new StateMachineCharacter(this);


        //fixme: init position should be load from file or somewhere

        // 90 is height of the ground, and

        this.initPosition = cc.p(250, 90 );
        this.setPosition(this.initPosition);


        this.position = this.initPosition;

        //console.log(this.spAnimation.getContentSize(), this.spAnimation.getBoundingBox());
        //cc.log(this.spAnimation);

        //cc.log(cc.view.getVisibleSize());
    },

    // all the update about velocity, acceleration and state will be performed in state_machine, this function will only update position
    update: function (dt) {


        if(this.getPosition().y+this.getContentSize().height>=cc.view.getVisibleSize().height){
            cc.log("Higher Screen");
        }

        //if(this.getPosition().y>=cc.view.getVisibleSize());


        //cc.log(this.stateMachine.stateMovement);

        /*this.offsetXSp = - this.body.width*this.scaleSize;
        this.offsetYSp = - this.body.height*this.scaleSize;*/


        //update all state machine
        this.stateMachine.update(dt);
        var currentX = this.position.x;
        var currentY = this.position.y;

        /*currentX+=this.offsetXSp;
         currentY+=this.offsetYSp;*/


        var x = currentX + this.velocity.x * dt;  // + this.offsetXSp*dt;
        var y = currentY + this.velocity.y * dt;  // +this.offsetYSp*dt;

        this.position = cc.p(x, y);


        var spPosition = cc.p(x + this.offsetXSp, y + this.offsetYSp);


        this.setPosition(spPosition);



    },
    getPosition: function () {
        return this.position;
    },
    setPosition: function (position) {
        this.position = position;
        this.spAnimation.setPosition(position);
    },
    getInitPosition: function () {
        return this.initPosition;
    },
    //fixme : this function must return a rectangle for collision detecting base on state (ex. Giant state, slide state... )
    getContentSize: function () {
        return {
            width: this.body.width * this.scaleSize,
            height: this.body.height * this.scaleSize
        }
    },

    setAcceleration: function (acc) {
        this.acceleration = acc;
    },



    setVelocity: function (v) {
        this.velocity = v;
    },

    setAccelerationX: function (ax) {
      this.acceleration.x=ax;
    },

    setAccelerationY: function(ay){
        this.acceleration.y=ay;
    },
    setScaleSize: function (size) {

        //cc.log('set Scale size');
        this.scaleSize=size;
        this.animationController.setScale(size);
    },

    getHP: function () {
        return this.currentHP;
    },
    increaseHP: function (amount) {
        this.currentHP += amount;
    },
    getVelocity: function () {
        return this.velocity;
    },
    getAcceleration: function () {
        return this.acceleration;
    },
    setVelocityX: function (vx) {
        this.velocity.x=vx;
    },
    setVelocityY: function (vy) {
        this.velocity.y=vy;
    },

    decreaseHP: function (amount) {
        this.currentHP-=amount;
    },

    getMaxHP:function () {
        return this.hp;
    },
    isDead:function () {
        return (this.position.y <= -this.body.height || this.currentHP <= 0);
    }

});
