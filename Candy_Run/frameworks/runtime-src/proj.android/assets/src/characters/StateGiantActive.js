/**
 * Created by Fresher on 28/12/2016.
 */
var StateGiantActive = StateGiant.extend({
    maxGiantTime: 3,
    currentCountTime: 0,

    ctor: function () {

    },


    update: function (dt, character) {
        this.currentCountTime += dt;
        cc.log(this.currentCountTime);
        if (this.currentCountTime >= this.maxGiantTime){
            character.stateMachine.changeState("stateGiant", new StateGiantDisactive());
        }
    },
    onEnter: function (character) {
        character.setScaleSize(1.5);
    },
    onExit: function () {
        this.currentCountTime = 0;
    }
});