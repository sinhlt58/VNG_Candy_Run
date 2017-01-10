/**
 * Created by Fresher on 09/01/2017.
 */
var StateMachineItem= cc.Class.extend({

    ownerItem: null,

    isCollided: null,

    isAttracted: null,


    ctor: function (item) {
        this.isCollided= false;
        this.ownerItem=item;
    },


    update: function (dt) {
        //todo: move item to character or somethings...



    }




});