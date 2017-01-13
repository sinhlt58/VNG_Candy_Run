/**
 * Created by Fresher on 29/12/2016.
 */
var StateActiveMagnetic= StateMagnetic.extend({
    maxTimeCount:100,
    currentTimeCount:0,


    update: function (dt, character) {

        /*
         todo: find all the item in the screen, get character above and pass it to item, item change state here
        */
        this.currentTimeCount += dt;
        if (this.currentTimeCount >= this.maxTimeCount){
            character.stateMachine.changeState("stateMagnetic", new StateDeactiveMagnetic(character));
        }

        var inRadiusItems = character.world.getObjectItemsInRadius(character.getPosition(), 380);
        for (var i=0; i<inRadiusItems.length; i++){
            if (!(inRadiusItems[i].stateMachineItem == StateItemBeAttracted)){
                inRadiusItems[i].stateMachineItem.changeState( StateItemBeAttracted );
            }
        }

    }, 
    onEnter: function (character) {

    },
    onExit: function (character) {
        this.currentTimeCount = 0;
    }
});