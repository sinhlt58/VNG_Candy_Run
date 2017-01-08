/**
 * Created by magic_000 on 09/01/2017.
 */
var StateSliding = StateMovement.extend({
    owner: null,
    onEnterCall: null,

    ctor: function (owner) {
        this.onEnterCall=false;
        this.owner=owner
    },

    onEnter: function () {

    },

    onExit: function () {

    },

    update:function (dt) {
        if(this.onEnterCall==false){
            this.onEnter();
            this.onEnterCall=false;
        }else{
            //logic here
        }
    }




});