/**
 * Created by Fresher on 1/7/2017.
 */
var ItemEffectScore = ItemEffect.extend({
    ctor:function () {
        this._super();
    },
    doEffect:function (game, character, item) {
        cc.log("Inside ItemEffectScore");
    }
});