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
        this.effects.push(new ItemEffectMoney());
        this.effects.push(new ItemEffectScore());
    },
    doEffects:function () {
        for (var i=0; i<this.effects.length; i++){
            this.effects[i].doEffect();
        }
    }
});