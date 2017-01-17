/**
 * Created by Fresher on 1/17/2017.
 */
var Effect = ObjectGame.extend({
    ctor:function (sprite) {
        this._super(sprite);
    },
    
    appearAtPosition:function (animation, position, world) {
        var animationAction = new cc.Animate(animation);
        var sequence = new cc.Sequence(animationAction,
            new cc.CallFunc(this.autoReleaseWhenFinishedAction, this, world));
        this.sprite.setPosition(position);
        this.sprite.runAction(sequence);
    },
    
    autoReleaseWhenFinishedAction:function (effectSprite, world) {
        this.sprite.removeFromParent();
        world.factory.releaseObject(this);
    }
});