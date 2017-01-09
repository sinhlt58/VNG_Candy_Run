var StateMachineObstacle= cc.Class.extend({
    isCollided: null,

    isKicking: null,

    ownerObstacle: null,

    ctor: function (owner) {
        this.ownerObstacle=owner;
        this.isCollided=false;
        this.isKicking= false;
    },

    update: function (dt) {

    }



});