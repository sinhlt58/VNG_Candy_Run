/**
 * Created by Fresher on 12/29/2016.
 */
var LayerPlayBackground = cc.Layer.extend({
    ctor:function () {
        this._super();

        var testBackground2 = new cc.Sprite(res.test_background2_png);
        var testBackground1 = new cc.Sprite(res.test_background1_png);
        testBackground1.setAnchorPoint(cc.p(0, 0));
        testBackground2.setAnchorPoint(cc.p(0, 0));
        this.addChild(testBackground1);
        this.addChild(testBackground2);
        /*var spAnimation= new sp.SkeletonAnimation(res.zombie_json, res.zombie_atlas);
        spAnimation.setAnimation(0, 'run1', true);
        spAnimation.setPosition(cc.p(200, 200));
        this.addChild(spAnimation);*/
    }
});