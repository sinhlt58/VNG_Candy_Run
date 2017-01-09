/**
 * Created by Fresher on 29/12/2016.
 */
var StateFlying = StateMovement.extend({

    time: null,
    timePass: null,






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
        }else{

        }
    }, 
    onEnter: function () {
        var currentPosCharacterX= this.owner.getPosition().x;


        // fixme y should be fix

        var y= this.owner.initPosition.y;

        y+=100;

        this.owner.position= cc.p(currentPosCharacterX, y);
        //this.owner.setPosition(cc.p(currentPosCharacterX, y));

        this.owner.animationController.setAnimation('fly', true);


        //fixme set body

    },
    onExit: function () {
        
    }
});