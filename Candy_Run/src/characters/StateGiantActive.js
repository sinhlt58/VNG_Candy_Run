/**
 * Created by Fresher on 28/12/2016.
 */
var StateGiantActive = StateGiant.extend({
    maxGiantTime: null,
    currentCountTime: null,


    currentScaleSize: null,
    maxScaleSize: null,

    ctor: function () {
        this.maxScaleSize=1.5;
        this.currentCountTime=0;
        this.maxGiantTime=6;

    },


    update: function (dt, character) {
        this.currentCountTime += dt;

        // increasing scale size over the time
        if(this.currentScaleSize<this.maxScaleSize){
            this.currentScaleSize+= 2*dt;
        }else{
            this.currentScaleSize=this.maxScaleSize;
        }

        character.setScaleSize(this.currentScaleSize);

        if (this.currentCountTime >= this.maxGiantTime){
            character.stateMachine.changeState("stateGiant", new StateGiantDisactive());
        }
    },
    onEnter: function (character) {
        //character.setScaleSize(1.5);
        this.currentScaleSize= character.scaleSize;
    },
    onExit: function () {
        this.currentCountTime = 0;
    }
});