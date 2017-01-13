/**
 * Created by Fresher on 1/11/2017.
 */
var SkillCharacterMagnetic = cc.Class.extend({
    radius: 200,
    ctor:function () {
        
    },
    init:function (character) {

    },
    update:function (character) {
        var inRadiusItems = character.world.getObjectItemsInRadius(character.getPosition(), this.radius);
        for (var i=0; i<inRadiusItems.length; i++){
            if (!(inRadiusItems[i].stateMachineItem == StateItemBeAttracted)){
                inRadiusItems[i].stateMachineItem.changeState( StateItemBeAttracted );
            }
        }
    }
});