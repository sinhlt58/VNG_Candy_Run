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
    }
});