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
        cc.log('On enter Sliding');
        this.owner.animationController.setAnimation('slide', true);
        this.owner.body = {width: 90, height: 80};

        this.owner.setAcceleration(cc.p(0,0));

        var velocityX=this.owner.velocity.x;
        this.owner.setVelocity(cc.p(velocityX, 0));


        this.owner.offsetCollY=-40;
    },

    onExit: function () {

    },

    update:function (dt) {
        if(this.onEnterCall==false){
            this.onEnter();
            this.onEnterCall=true;
        }else{
            //logic here
        }
    }




});