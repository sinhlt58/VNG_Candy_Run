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
        this.stateMovement= new StateRunning(this.owner);


    },


    //update acce and velo of the owner
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
        this.stateMovement.update(dt);



        //fixme: change state should not be handled here, it should be handle at collision detection

        if(this.owner.spAnimation.getPosition().y<90 + this.owner.getContentSize().height/2
            && this.stateMovement instanceof StateRunning==false ) {

            //console.log(this.owner.spAnimation.getPosition().y+" "+ (90 + this.owner.spAnimation.getContentSize().height/2));
            this.setStateMovement(new StateRunning(this.owner));


            console.log("State turn back to running");
        }


    },
    changeState: function () {

    },


    setStateMovement: function (stateMovement) {
        this.stateMovement = stateMovement
    },

    setStateGiant: function (stateGiant) {
        this.stateGiant = stateGiant;
    },
    setStateVisible: function (stateVisible) {
        this.stateVisible = stateVisible;
    },
    setStateMagnetic: function (stateMag) {
        this.stateMagnetic = stateMag
    },
    setStateHP: function (stateHP) {
        this.stateHP= stateHP;
    }






});