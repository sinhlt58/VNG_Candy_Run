/**
 * Created by SinhBlack on 1/14/2017.
 */

var Camera = {
    animationLayer: null,
    initPosition: null,

    changeYShake: -8,
    countShakeTime: 0,
    maxShakeTime: 0,
    isPlusChangeYShake:0,

    currentState: 0,
    CAMERA_STATE_NORMAL: 0,
    CAMERA_STATE_SHAKE: 1,
    init: function (animationLayer) {
        this.animationLayer = animationLayer;
        var visibleSize = cc.view.getVisibleSize();
        this.initPosition = cc.p(visibleSize.width / 2, visibleSize.height / 2);
        this.currentState = this.CAMERA_STATE_NORMAL;
    },
    getCurrentCameraY: function () {
        return this.animationLayer.getCurrentCameraY();
    },
    shakeTheScreen: function (duration) {
        this.maxShakeTime = duration;
        this.countShakeTime = 0;
        this.currentState = this.CAMERA_STATE_SHAKE;
    },
    update: function (characterPos, characterInitPos, characterSize, dt) {
        if (this.currentState == this.CAMERA_STATE_SHAKE){
            this.isPlusChangeYShake = !this.isPlusChangeYShake;
            this.countShakeTime += dt;
            if (this.countShakeTime >= this.maxShakeTime){
                this.isPlusChangeYShake = false;
                this.currentState = this.CAMERA_STATE_NORMAL;
            }
        }

        var visibleSize = cc.view.getVisibleSize();
        var cameraPosX = (visibleSize.width / 2 - characterInitPos.x) + characterPos.x;
        var needToChangeY = this.animationLayer.getCameraNeedToChangeY();
        var cameraPosY = (visibleSize.height / 2) +
            parseInt(((characterPos.y + characterSize.height) / needToChangeY)) * needToChangeY;
        this.setPosition(cameraPosX, cameraPosY + this.isPlusChangeYShake*this.changeYShake);
    },
    setPosition: function (x, y) {
        var deltaX = x - this.initPosition.x;
        var deltaY = y - this.initPosition.y;
        this.animationLayer.setPosition(-deltaX, -deltaY);
    }
};