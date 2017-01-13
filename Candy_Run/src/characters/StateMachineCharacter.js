/**
 * Created by Fresher on 28/12/2016.
 */
var StateMachineCharacter = cc.Class.extend({

    // grounded property temporary move to character
    stateMovement: null,
    stateGiant: null,
    stateHP: null,
    stateVisible: null,
    stateMagnetic: null,
    owner: null,
    ctor: function (owner) {
        //owner is the Character
        this.owner = owner;
        //todo: create all the state
        this.stateMovement = new StateRunning();
        this.stateMovement.onEnter(this.owner);


        this.stateGiant = new StateGiantDisactive();
        this.stateGiant.onEnter(this.owner);



        this.stateVisible = new StateDeactiveInvisible();
        this.stateVisible.onEnter();



        this.stateHP = new StateDecreasingHP();
        this.stateHP.onEnter(this.owner);

        this.stateMagnetic = new StateDeactiveMagnetic();
        this.stateMagnetic.onEnter(this.owner);

    },


    //update acceleration and velocity of the owner
    update: function (dt) {
        //update velocity by acceleration

        var currentVeloX = this.owner.velocity.x;
        var currentVeloY = this.owner.velocity.y;

        currentVeloX += this.owner.acceleration.x * dt;
        currentVeloY += this.owner.acceleration.y * dt;

        this.owner.velocity = cc.p(currentVeloX, currentVeloY);



        this.stateMovement.update(dt, this.owner);
        this.stateGiant.update(dt, this.owner);
        this.stateVisible.update(dt, this.owner);
        this.stateHP.update(dt, this.owner);

        this.owner.currentHP = this.owner.currentHP > this.owner.hp ? this.owner.hp : this.owner.currentHP;
        if (this.owner.currentHP <= 0) {
            this.owner.currentHP = 0;
        }

    },


    changeState: function (groupStateName, nextState) {
        this[groupStateName].onExit(this.owner);
        this[groupStateName] = nextState;
        this[groupStateName].onEnter(this.owner);
    }


});