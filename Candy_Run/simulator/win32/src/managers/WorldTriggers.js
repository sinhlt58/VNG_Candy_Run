/**
 * Created by SinhBlack on 1/2/2017.
 */
var WorldTriggers = cc.Class.extend({
    world:null,
    triggerEndMap:null,
    triggerBackToLoop:null,
    ctor:function (world) {
        this.world = world;
        this.triggerEndMap = new TriggerEndMap(world);
        this.triggerBackToLoop = new TriggerBackToLoop(world);
    },
    update:function (dt) {
        this.triggerEndMap.update(dt);
        this.triggerBackToLoop.update(dt);
    }
});