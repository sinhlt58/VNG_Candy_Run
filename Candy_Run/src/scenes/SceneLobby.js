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

        this.scheduleUpdate();
    },
    init:function () {
        
    },
    update:function (dt) {
        
    }
});