/**
 * Created by Fresher on 12/29/2016.
 */
var SceneLobby = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.init();


        var layerBG=  new LayerLobbyBackground();
        var layerSelectCharacter= new LayerLobbyCharacters();
        var layerSelectPets= new LayerLobbyPets();
        var layerStatusLobby= new LayerLobbyStatus(layerSelectCharacter, layerSelectPets);


        layerSelectCharacter.layerLobbyStatus= layerStatusLobby;
        layerSelectPets.layerLobbyStatus= layerStatusLobby;


        this.addChild(layerBG);
        this.addChild(layerStatusLobby);
        this.addChild(layerSelectPets);
        this.addChild(layerSelectCharacter);

        /*this.addChild(new LayerLobbyBackground());
        this.addChild(new LayerLobbyStatus());
        this.addChild(new LayerLobbyCharacters());
        this.addChild(new LayerLobbyPets());*/


        cc.audioEngine.playMusic(res.music_lobby_bgm_ogg, true);

        this.scheduleUpdate();
    },
    init:function () {
        var allImg= cc.spriteFrameCache;
        allImg.addSpriteFrames(res.main_lobby_plist, res.main_lobby_png);
        cc.spriteFrameCache.addSpriteFrames(res.character_lobby_plist, res.character_lobby_png);
        cc.spriteFrameCache.addSpriteFrames(res.pet_cookie_plist, res.pet_cookie_png);
        cc.spriteFrameCache.addSpriteFrames(res.pet_zombie_plist, res.pet_zombie_png);
    },
    update:function (dt) {
        
    }
});