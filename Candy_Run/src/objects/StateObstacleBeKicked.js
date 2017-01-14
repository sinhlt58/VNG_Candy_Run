/**
 * Created by Fresher on 13/01/2017.
 */
var StateObstacleBeKicked = {
    actionTag:1,
    onEnter: function (obstacle) {
        var currentPos = obstacle.sprite.getPosition();
        var kickedPos = cc.p(currentPos.x + 5000, currentPos.y);
        var moveToAction = new cc.MoveTo(2, kickedPos);
        moveToAction.setTag(this.actionTag);
        obstacle.sprite.runAction(moveToAction);
    },
    update: function (dt, obstacle) {

    },
    onExit: function (obstacle) {

    }


};