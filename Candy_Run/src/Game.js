/**
 * Created by Fresher on 28/12/2016.
 */
var Game = cc.Class.extend({
    player: null,
    ctor: function () {

    },
    getPlayer: function () {
        return this.player;
    },
    save: function () {
        //todo: do somethings to save data of player to persistent (disk or ...server)
    },
    init:function () {
        //read file here
        this.player = new Player();
        this.player.currentCharacterId = 0;
        this.player.currentPetId = 0;
        this.player.characters = [0 , 1];
        this.player.pets = [0, 1];
    }
});