/**
 * Created by SinhBlack on 12/30/2016.
 */
var Item = ObjectGame.extend({
    stateMachineItem: null,
    score:0,
    money:0,
    effects:null,
    ctor:function (sprite) {
        this._super(sprite);
        this.effects = [];
        this.stateMachineItem= new StateMachineItem(this);

    },

    update:function (dt, world) {
        this._super(dt, world);

        //pass character to update function of stateMachine
        this.stateMachineItem.update(dt, world.character);
    },

    doEffects:function (game, world) {
        for (var i=0; i<this.effects.length; i++){
            this.effects[i].doEffect(game, world, this);
        }

        //play sound if exit
        if (this.sound != null){
            cc.audioEngine.playEffect(cr.sound_manager.getSoundUrlById(this.sound));
        }
    },
    addAEffect:function (effect) {
        this.effects.push(effect);
    },
    clearEffects:function () {
        this.effects = [];
    }
});