/**
 * Created by SinhBlack on 12/30/2016.
 */
var Obstacle = ObjectGame.extend({

    stateMachineObstacle: null,


    damage:null,
    ctor:function () {
        this._super();
    },
    update:function (dt, world) {
        this._super(dt, world);
    },
    setDamage:function (damage) {
        this.damage = damage;
    },
    getDamage:function () {
        return this.damage;
    }
});