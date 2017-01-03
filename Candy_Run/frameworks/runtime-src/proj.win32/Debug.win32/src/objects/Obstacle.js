/**
 * Created by SinhBlack on 12/30/2016.
 */
var Obstacle = ObjectGame.extend({
    damage:0,
    ctor:function () {
        this._super();
    },
    setDamage:function (damage) {
        this.damage = damage;
    },
    getDamage:function () {
        return this.damage;
    }
});