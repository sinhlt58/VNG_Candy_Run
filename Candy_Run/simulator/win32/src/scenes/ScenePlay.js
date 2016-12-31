/**
 * Created by Fresher on 12/29/2016.
 */
var ScenePlay = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new LayerPlayBackground());
        this.addChild(new LayerPlayAimation());
        this.scheduleUpdate();
    },
    init:function () {
        
    },
    update:function (dt) {
        
    }
});