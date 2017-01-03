/**
 * Created by Fresher on 1/3/2017.
 */
var CollisionDetector = cc.Class.extend({
    world:null,
    callBack:null,
    contextCallBack:null,
    ctor:function (world) {
        this.world = world;
    },
    update:function (dt) {
       // cc.log("inside collision update");
    },
    registerCallBack:function (callBack, context) {
        this.callBack = callBack;
        this.contextCallBack = context;
    }
});