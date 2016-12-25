/**
 * Created by SinhBlack on 12/25/2016.
 */

var ScenePlay = cc.Scene.extend({
    onEnter:function () {
        this._super();

        this.addChild(new LayerBackground());
        this.addChild(new LayerAnimation());

        this.scheduleUpdate();
    },
    
    update:function (dt) {

    }
});