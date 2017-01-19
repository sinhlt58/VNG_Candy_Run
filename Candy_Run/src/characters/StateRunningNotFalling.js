/**
 * Created by Fresher on 18/01/2017.
 */
var StateRunningNotFalling= StateMovement.extend({

    duration: null,
    timePass: null,

    ctor: function () {
        this.duration=3;
        this.timePass=0;
    },
    update: function (dt, character) {


        if(this.timePass<this.duration){
            this.timePass+=dt;
        }else{
            character.stateMachine.changeState("stateMovement", new StateRunning());
        }

        // entered update logic
        character.offsetCollX = -character.getContentSize().width / 2;

        var currentPosX = character.getPosition().x;
        var y = 90;
        character.position = cc.p(currentPosX, y);
        //cc.log(y);
    },

    //
    onEnter: function (character) {



        character.offsetCollX = - character.getContentSize().width / 2;
        character.offsetCollY = 0;
        character.animationController.setAnimation('run1', true);
        console.log("On Enter Running not falling");


        character.body = {width: 90, height: 170};

        var currentPosX = character.getPosition().x;
        var y = 90; //+ this.owner.getContentSize().height/2;

        //cc.log(y);

        character.setPosition(cc.p(currentPosX, y));

        character.setAcceleration(cc.p(0, 0));
        character.setVelocity((cc.p(700, 0)));

    },
    onExit: function (character) {

    }
});