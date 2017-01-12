/**
 * Created by Fresher on 29/12/2016.
 */
var StateActiveInvisible= StateVisible.extend({
    currentVisibleCount:0,
    maxVisibleTime:1,//seconds
    actionTag: 1,
    defaultVisibleTime: 1,

    update: function (dt, character) {
        this.currentVisibleCount += dt;
        if (this.currentVisibleCount >= this.maxVisibleTime){
            character.stateMachine.changeState("stateVisible", new StateDeactiveInvisible());//actually singleton here.
        }
    },
    onEnter: function (character) {
        this.currentVisibleCount = 0;
        var blinkAction = new cc.Blink(this.maxVisibleTime, 10);
        blinkAction.setTag(this.actionTag);
        character.spAnimation.runAction(blinkAction);
        character.decreasingHPRate = 0;
    },
    onExit: function (character) {
        character.spAnimation.stopActionByTag(this.actionTag);
        var currentStateHP = character.stateMachine.stateHP;
        character.decreasingHPRate = 0.2;
        if (!(currentStateHP instanceof StateDecreasingHP)){
            character.stateMachine.changeState("stateHP", new StateDecreasingHP());
        }
        this.maxVisibleTime = this.defaultVisibleTime;
    }
});