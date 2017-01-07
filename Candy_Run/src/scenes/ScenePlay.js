/**
 * Created by Fresher on 12/29/2016.
 */
var ScenePlay = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new LayerPlayBackground());
        var animationLayer = new LayerPlayAnimation();
        this.addChild(animationLayer);
        var debugLayer = new LayerPlayDebug(animationLayer);
        this.addChild(debugLayer);
        this.scheduleUpdate();
    },
    init:function () {
        
    },
    update:function (dt) {
        
    }
});