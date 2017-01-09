/**
 * Created by Fresher on 28/12/2016.
 */
var StateGiantActive = StateGiant.extend({

    onEnterCall: null,



    owner: null,
    ctor: function (owner) {
        this.owner=owner;
        this.onEnterCall=false;
    },


    update: function (dt) {
        if(this.onEnterCall==false){
            this.onEnter();
        }else{

        }
    },
    onEnter: function () {
        this.owner.setScaleSize(1.5);
    },
    onExit: function () {

    }
});