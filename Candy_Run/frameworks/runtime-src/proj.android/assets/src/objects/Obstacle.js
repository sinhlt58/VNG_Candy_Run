/**
 * Created by SinhBlack on 12/30/2016.
 */
var Obstacle = ObjectGame.extend({
    damage:0,
    ctor:function (objectTypeId) {
        this._super(objectTypeId);
    },
    setDamage:function (damage) {
        this.damage = damage;
    },
    getDamage:function () {
        return this.damage;
    }
});