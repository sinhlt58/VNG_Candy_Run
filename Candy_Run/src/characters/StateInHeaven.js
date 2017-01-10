/**
 * Created by Fresher on 10/01/2017.
 */
var StateInHeaven= StateMovement.extend({


    onEnterCall: null,
    owner: null,



    flewToHeaven: null,

    time: null,


    passedTime: null,

    ctor: function (owner) {
        this.owner= owner;
        this.onEnterCall=false;
        this.flewToHeaven= false;

        this.time= 10;

        this.passedTime=0;
    },

    update: function (dt) {

        cc.log(this.owner.position.y, this.owner.position.x);



        if(this.onEnterCall==false){
            this.onEnter();
            this.onEnterCall=true;
        }else{
            // logic here
            if(this.flewToHeaven==false){
                // flying up
                // set velocity to fly up

                this.owner.setVelocity(cc.p(0, 800));
                // 500 or some number
                if (this.owner.getPosition().y> 1150){
                    this.flewToHeaven=true;
                }
            }else{
                // flew
                // how to know if owner flew??
                // base on position y ???
                //todo: set velocity to fly horizontally, update passedTime


                this.owner.animationController.setAnimation('fly', true);
                this.passedTime+=dt;
                this.owner.setVelocity(cc.p(300, 0));



            }

        }

    },

    onEnter: function () {
        this.owner.animationController.setAnimation("enterFever", true);

    },
    onExit: function () {

    }
});