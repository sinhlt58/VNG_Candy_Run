var StateMachineObstacle= cc.Class.extend({
    owner: null,

    stateObstacle: null,


    ctor: function (owner) {
        this.owner=owner;
    },

    update: function (dt) {
        this.stateObstacle.update(dt, this.owner);



    },
    changeState: function (newState) {

    }



});