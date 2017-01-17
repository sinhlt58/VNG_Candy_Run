/**
 * Created by Fresher on 12/29/2016.
 */
var SceneLobby = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.init();

        this.addChild(new LayerLobbyBackground());
        this.addChild(new LayerLobbyStatus());
        this.addChild(new LayerLobbyCharacters());
        this.addChild(new LayerLobbyPets());

        cc.audioEngine.playMusic(res.music_lobby_bgm_ogg, true);

        this.scheduleUpdate();
    },
    init:function () {
        var allImg= cc.spriteFrameCache;
        allImg.addSpriteFrames(res.main_lobby_plist, res.main_lobby_png);
    },
    update:function (dt) {
        
    }
});