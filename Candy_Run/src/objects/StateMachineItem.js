/**
 * Created by Fresher on 09/01/2017.
 */
var StateMachineItem = cc.Class.extend({

    stateItem: null,

    owner: null,

    character: null,


    ctor: function (item) {
        this.owner = item;
        this.stateItem= new StateItemNormal();
        this.stateItem.onEnter(this.owner);


        //cc.log(cr);
        //cc.log(this.owner instanceof Item);
    },


    update: function (dt, character) {
        this.stateItem.update(dt, this.owner, character);
    },

    changeState: function (newState) {
        this.stateItem.onExit(this.owner);
        this.stateItem= newState;
        this.stateItem.onEnter(this.owner);
    }


});