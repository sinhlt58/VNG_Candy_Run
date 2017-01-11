/**
 * Created by Fresher on 10/01/2017.
 */
var StateInHeaven= StateMovement.extend({



    flewToHeaven: null,
    time: null,
    passedTime: null,

    ctor: function () {
        this.flewToHeaven= false;
        this.time= 10;
        this.passedTime=0;
    },

    update: function (dt, character) {

        cc.log(character.position.y, character.position.x);



        if(this.onEnterCall==false){
            this.onEnter();
            this.onEnterCall=true;
        }else{
            // logic here
            if(this.flewToHeaven==false){
                // flying up
                // set velocity to fly up

                character.setVelocity(cc.p(0, 800));
                // 500 or some number
                if (character.getPosition().y> 1150){
                    this.flewToHeaven=true;
                }
            }else{
                // flew
                // how to know if owner flew??
                // base on position y ???
                //todo: set velocity to fly horizontally, update passedTime


                character.animationController.setAnimation('fly', true);
                this.passedTime+=dt;
                character.setVelocity(cc.p(300, 0));



            }

        }

    },

    onEnter: function (character) {
        this.owner.animationController.setAnimation("enterFever", true);

    },
    onExit: function (character) {

    }
});