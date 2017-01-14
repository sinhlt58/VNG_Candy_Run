var StateMachineObstacle= cc.Class.extend({
    owner: null,

    stateObstacle: null,


    ctor: function (owner) {
        cc.log(owner);
        this.owner=owner;
        this.stateObstacle = StateObstacleNormal;

        //cant call onEnter here @@ because it depends on the init pos
        //this.stateObstacle.onEnter(this.owner);
    },

    update: function (dt) {
        this.stateObstacle.update(dt, this.owner);



    },
    changeState: function (newState) {
        this.stateObstacle.onExit(this.owner);
        this.stateObstacle= newState;
        this.stateObstacle.onEnter(this.owner);
    }



});