/**
 * Created by SinhBlack on 12/30/2016.
 */
var Obstacle = ObjectGame.extend({

    stateMachineObstacle: null,


    damage:null,
    ctor:function (sprite) {
        this._super(sprite);

        this.stateMachineObstacle = new StateMachineObstacle(this);
    },
    update:function (dt, world) {
        this._super(dt, world);
        this.stateMachineObstacle.update(dt);
    },
    setDamage:function (damage) {
        this.damage = damage;
    },
    getDamage:function () {
        return this.damage;
    }
});