/**
 * Created by Fresher on 12/26/2016.
 */
var Character = cc.Class.extend({
    spAnimation: null,
    sprite: null,
    jumpingAction:null,
    movingAction:null,
    ctor: function () {
        this.spAnimation = new sp.SkeletonAnimation(res.princess_json, res.princess_atlas);
        this.sprite = new cc.Sprite();
        this.spAnimation.setPosition(cc.p(200, 200));
        this.spAnimation.setAnimation(0, "run1", true);
        this.spAnimation.anchorX = 0.5;
        this.spAnimation.anchorY = 0.5;
        //console.log(this.spAnimation.getAnchor());
        //console.log(this.sprite);
        this.sprite.setPosition(cc.p(200, 200));

        this.jumpingAction = new cc.JumpBy(0.54, cc.p(0, 0), 100, 1);
        var moveBy = new cc.MoveBy(2, cc.p(500, 0));
        this.movingAction = new cc.RepeatForever(moveBy);
        this.sprite.runAction(this.movingAction);

        console.log(this.spAnimation);
    },
    update:function (dt) {
        this.spAnimation.setPosition(this.sprite.getPosition());
    }
});