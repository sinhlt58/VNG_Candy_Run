/**
 * Created by Fresher on 29/12/2016.
 */
var StateActiveMagnetic= StateMagnetic.extend({
    maxTimeCount:4,
    currentTimeCount:0,
    radius: 380,
    soundId:null,

    update: function (dt, character) {

        /*
         todo: find all the item in the screen, get character above and pass it to item, item change state here
        */
        this.currentTimeCount += dt;
        if (this.currentTimeCount >= this.maxTimeCount){
            character.stateMachine.changeState("stateMagnetic", new StateDeactiveMagnetic());
        }

        var inRadiusItems = character.world.getObjectItemsInRadius(character.getPosition(), this.radius);
        for (var i=0; i<inRadiusItems.length; i++){
            if (!(inRadiusItems[i].stateMachineItem == StateItemBeAttracted)){
                inRadiusItems[i].stateMachineItem.changeState( StateItemBeAttracted );
            }
        }

    }, 
    onEnter: function (character) {
        // this.soundId = cc.audioEngine.playEffect(cr.sound_manager.getSoundUrlById(globals.SOUND_TYPE_MAGNETIC), true);
    },
    onExit: function (character) {
        // cc.audioEngine.stopEffect(character.soundId);
        this.currentTimeCount = 0;
    }
});