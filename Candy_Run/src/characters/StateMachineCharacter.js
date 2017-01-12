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
        this.stateMovement= new StateRunning();
        this.stateGiant= new StateGiantDisactive();

        //example state
        this.stateVisible = new StateDeactiveInvisible();
        this.stateHP = new StateDecreasingHP();

    },


    //update acceleration and velocity of the owner
    update: function (dt) {
        //update velocity by acceleration

        var currentVeloX= this.owner.velocity.x;
        var currentVeloY=this.owner.velocity.y;

        currentVeloX+= this.owner.acceleration.x*dt;
        currentVeloY+=this.owner.acceleration.y*dt;

        this.owner.velocity= cc.p(currentVeloX, currentVeloY);



        //todo : run update function from  states above

        // fixme: instantiate origin state and run update
        /*this.stateMovement.update(dt);
         this.stateGiant.update(dt);
         this.stateHP.update(dt);
         this.stateVisible.update(dt);
         this.stateMagnetic.update(dt);*/



        this.stateMovement.update(dt, this.owner);
        //this.stateGiant.update(dt, this.owner);

        //example
        this.stateVisible.update(dt, this.owner);
        this.stateHP.update(dt, this.owner);

        this.owner.currentHP = this.owner.currentHP > this.owner.hp ? this.owner.hp: this.owner.currentHP;
        if (this.owner.currentHP <= 0){
            this.owner.currentHP = 0;
        }

        /*if(this.owner.spAnimation.getPosition().y<90 + this.owner.getContentSize().height/2
            && this.stateMovement instanceof StateRunning==false ) {

            //console.log(this.owner.spAnimation.getPosition().y+" "+ (90 + this.owner.spAnimation.getContentSize().height/2));
            this.setStateMovement(new StateRunning(this.owner));


            console.log("State turn back to running");
        }*/


    },

    // fix me
    //example
    changeState: function (groupStateName, nextState) {
        this[groupStateName].onExit(this.owner);
        this[groupStateName] = nextState;
        this[groupStateName].onEnter(this.owner);
    }











});