/**
 * Created by SinhBlack on 12/30/2016.
 */
var Item = ObjectGame.extend({
    stateMachineItem: null,
    score:0,
    money:0,
    effects:null,
    ctor:function () {
        this._super();
        this.effects = [];
    },

    update:function (dt, world) {
        this._super(dt, world);
        cc.log("Inside udpate item");
    },

    doEffects:function (game, world) {
        for (var i=0; i<this.effects.length; i++){
            this.effects[i].doEffect(game, world, this);
        }
    },



    addAEffect:function (effect) {
        this.effects.push(effect);
    },


    clearEffects:function () {
        this.effects = [];
    }
});