/**
 * Created by Fresher on 10/01/2017.
 */
var StateFalling = StateMovement.extend({
    owner: null,

    onEnterCall: null,
    ctor: function (owner) {
        this.owner=owner;
        this.onEnterCall=false;
    },


    update: function (dt) {
      if(this.onEnterCall==false){
          this.onEnter();
          this.onEnterCall=true;
      }  else{
          //update logic here
      }
    },
    onEnter: function () {

    },
    onExit: function () {

    }
});
