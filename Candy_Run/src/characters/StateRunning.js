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


            this.owner.offsetCollX= - this.owner.getContentSize().width/2;

            var currentPosX= this.owner.getPosition().x;
            var y= 90;
            this.owner.position= cc.p(currentPosX, y);
            //cc.log(y);


        }
    },

    //  fixme: set position and acceleration to running state
    onEnter: function () {


        /*this.offsetX = -40 * this.world.character.scaleSize;
        this.offsetY = 0; */



        this.owner.offsetCollX= - this.owner.getContentSize().width/2;
        this.owner.offsetCollY=0;





        this.owner.animationController.setAnimation('run1', true);
        console.log("On Enter Running");


        this.owner.body = {width: 90, height: 170};

        var currentPosX= this.owner.getPosition().x;
        var y= 90 ; //+ this.owner.getContentSize().height/2;

        //cc.log(y);

        this.owner.setPosition(cc.p(currentPosX, y));

        this.owner.setAcceleration(cc.p(0,0));
        this.owner.setVelocity((cc.p(300, 0)));

    },
    onExit: function () {

    }
});