/**
 * Created by Fresher on 28/12/2016.
 */
var StateMachineCharacter = cc.Class.extend({
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



    },


    //update acce and velo of the owner
    update: function (dt) {
        //todo : run update function from  states above


        // fixme: instantiate origin state and run update
        /*this.stateMovement.update(dt);
         this.stateGiant.update(dt);
         this.stateHP.update(dt);
         this.stateVisible.update(dt);
         this.stateMagnetic.update(dt);*/
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