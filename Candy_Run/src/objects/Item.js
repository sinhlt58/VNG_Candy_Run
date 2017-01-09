/**
 * Created by SinhBlack on 12/30/2016.
 */
var Item = ObjectGame.extend({
    score:0,
    money:0,
    effects:null,
    ctor:function () {
        this._super();
        this.effects = [];
    },
    doEffects:function (game, world) {
        for (var i=0; i<this.effects.length; i++){
            this.effects[i].doEffect(game, world, this);
        }
    },
    addAEffect:function (effect) {
        this.effects.push(effect);
    }
});