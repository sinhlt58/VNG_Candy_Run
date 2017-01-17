/**
 * Created by Fresher on 28/12/2016.
 */
var StateGiantDisactive= StateGiant.extend({

    minScaleSize: null,
    currentScaleSize: null,



    ctor: function () {

        this.minScaleSize=0.8;

    },
    update: function (dt, character) {

        if(this.currentScaleSize<=this.minScaleSize){
            this.currentScaleSize=this.minScaleSize;
            //character.setScaleSize(this.minScaleSize);
        }else{
            this.currentScaleSize-=2*dt;

        }
        character.setScaleSize(this.currentScaleSize);



    },
    onEnter: function (character) {

        this.currentScaleSize=character.scaleSize;
        //character.setScaleSize(0.8);
    },
    onExit: function () {

    }
});