/**
 * Created by Fresher on 1/7/2017.
 */
var ItemEffectMoney = ItemEffect.extend({
    ctor:function () {
        this._super();
    },
    doEffect:function (game, world, item) {
        cc.log("item money: ", item.money);
        game.getPlayer().increaseMoney(item.money);
    }
});