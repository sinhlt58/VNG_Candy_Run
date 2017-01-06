/**
 * Created by Fresher on 03/01/2017.
 */

var AnimationController = cc.Class.extend({
    owner: null,
    currentAnimation: null,
    currentTimeScale: 0.7,
    allAnimation: {
        crouch: 'crouch',
        die: 'die',
        doubleJump: 'doubleJump',
        enterFever: 'enterFever',
        fly: 'fly',
        highSpeed: 'highSpeed',
        jump: 'jump',
        reBorn: 'reBorn',
        reBorn1: 'reBorn1',
        run1: 'run1',
        run2: 'run2',
        shock: 'shock',
        slide: 'slide',
        spring: 'spring',
        tired: 'tired'
    },

    ctor: function (owner) {
        this.owner = owner;
        this.currentAnimation= this.allAnimation['run1'];
        this.owner.spAnimation.setAnimation(0, this.currentAnimation, true);
        this.owner.spAnimation.setTimeScale(this.currentTimeScale);
    },


    // set Animation String
    setAnimation: function (animationName, loop) {
        if(animationName==this.currentAnimation){
            return;
        }else{
            this.currentAnimation=animationName;
            this.owner.spAnimation.setAnimation(0, this.allAnimation[animationName],loop)
        }

    },
    
    updateAnimation: function (aniName, loop) {

    },
    setScale: function (scale) {
        this.owner.spAnimation.setScale(scale);
    }


});
