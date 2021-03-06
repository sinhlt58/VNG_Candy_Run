/**
 * Created by Fresher on 13/01/2017.
 */
var StateObstacleNormal=  {
    actionTag : 0,
    onEnter: function (obstacle) {
        var currentCameraY = Camera.getCurrentCameraY();
        var defaultPos = obstacle.sprite.getPosition();
        var size = obstacle.sprite.getContentSize();
        var newY;

        if (defaultPos.y + size.height/2 < currentCameraY){
            newY = defaultPos.y - size.height;
        }else{
            newY = defaultPos.y + size.height/3;
        }

        var newPos = cc.p(defaultPos.x, newY);
        obstacle.sprite.setPosition(newPos);

        var appearAction = new cc.MoveTo(0.5, defaultPos);
        appearAction.setTag(this.actionTag);
        obstacle.sprite.runAction(appearAction);
    },
    update: function (dt, obstacle) {

    },
    onExit: function (obstacle) {
        obstacle.sprite.stopActionByTag(this.actionTag);
    }
    
};

