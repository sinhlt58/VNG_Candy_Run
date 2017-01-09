/**
 * Created by Fresher on 1/7/2017.
 */
var ItemEffectLetter = ItemEffect.extend({
    ctor:function () {
        this._super();
    },
    doEffect:function (game, world, item) {
        cc.log("Letter: ", item.letter);
    }
});