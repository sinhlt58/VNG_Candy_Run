/**
 * Created by Fresher on 28/12/2016.
 */
var StateRunning = StateMovement.extend({


    ctor: function (owner) {

    },
    update: function (dt, character) {

        // entered update logic


        character.offsetCollX = -character.getContentSize().width / 2;

        var currentPosX = character.getPosition().x;
        var y = 90;
        character.position = cc.p(currentPosX, y);
        //cc.log(y);


    },

    //  fixme: set position and acceleration to running state
    onEnter: function (character) {



        character.offsetCollX = - character.getContentSize().width / 2;
        character.offsetCollY = 0;


        character.animationController.setAnimation('run1', true);
        console.log("On Enter Running");


        character.body = {width: 90, height: 170};

        var currentPosX = character.getPosition().x;
        var y = 90; //+ this.owner.getContentSize().height/2;

        //cc.log(y);

        character.setPosition(cc.p(currentPosX, y));

        character.setAcceleration(cc.p(0, 0));
        character.setVelocity((cc.p(300, 0)));

    },
    onExit: function (character) {

    }
});