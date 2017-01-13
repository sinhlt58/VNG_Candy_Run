/**
 * Created by Fresher on 09/01/2017.
 */
var StateMachineItem = cc.Class.extend({

    stateItem: null,

    owner: null,


    ctor: function (item) {
        this.owner = item;
        this.stateItem= new StateItemNormal();
        this.stateItem.onEnter();
    },


    update: function (dt) {
        this.stateItem.update(dt, this.owner);
    },

    changeState: function (newState) {
        this.stateItem.onExit(this.owner);
        this.stateItem= newState;
        this.stateItem.onEnter(this.owner);
    }


});