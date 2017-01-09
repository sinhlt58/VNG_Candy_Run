/**
 * Created by Fresher on 28/12/2016.
 */
var StateGiantDisactive= StateGiant.extend({

    onEnterCall: null,
    owner: null,

    ctor: function (owner) {
        this.owner= owner;
        this.onEnterCall=false;
    },
    update: function (dt) {
        if(this.onEnterCall==false){
            this.onEnter();
            this.onEnterCall=true;
        }else{
            //logic update here
        }


    },
    onEnter: function () {
        this.owner.setScaleSize(0.8);
    },
    onExit: function () {

    }
});