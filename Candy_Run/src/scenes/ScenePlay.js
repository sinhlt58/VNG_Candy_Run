/**
 * Created by Fresher on 12/29/2016.
 */
var ScenePlay = cc.Scene.extend({
    onEnter:function () {
        this._super();

        for (var i=0; i<sprite_sheets_background.length-1; i+=2){
            cc.spriteFrameCache.addSpriteFrames(sprite_sheets_background[i], sprite_sheets_background[i+1]);
        }

        cr.sound_manager.init(cc.loader.getRes(res.sound_json));

        var animationLayer = new LayerPlayAnimation();
        this.addChild(animationLayer);
        var debugLayer = new LayerPlayDebug(animationLayer);
        this.addChild(debugLayer);
        this.addChild(new LayerPlayStatus(animationLayer));

        this.addChild(new LayerPlayBackground2());
        this.addChild(new LayerPlayBackground1());

        cc.audioEngine.playMusic(res.music_main_bgm_ogg, true);
        this.scheduleUpdate();
    },
    init:function () {
        
    },
    update:function (dt) {
        
    }
});