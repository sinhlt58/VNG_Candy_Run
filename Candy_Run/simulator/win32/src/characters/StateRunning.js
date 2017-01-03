/**
 * Created by Fresher on 28/12/2016.
 */
var StateRunning= StateMovement.extend({
    owner: null,
    onEnterCall: false,

    ctor: function (owner) {
        this.owner=owner;
    },
    update: function (dt) {
        if(this.onEnterCall==false){
            this.onEnter();
            this.onEnterCall=true;
        }else{
            // entered update logic


            var currentVeloX= this.owner.velocity.x;
            var currentVeloY=this.owner.velocity.y;

            currentVeloX+= this.owner.acceleration.x;
            currentVeloY+=this.owner.acceleration.y;

            this.owner.velocity= cc.p(currentVeloX, currentVeloY);
        }
    },
    onEnter: function () {
        
    },
    onExit: function () {

    }
});