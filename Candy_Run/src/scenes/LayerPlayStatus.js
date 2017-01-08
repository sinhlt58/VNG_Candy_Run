/**
 * Created by Fresher on 12/29/2016.
 */
var LayerPlayStatus= cc.Layer.extend({
    TEST_BUTTON_PAUSE:null,
    TEST_BUTTON_DIE:null,
    isGamePause:false,
    ctor:function () {
        this._super();
        
        this.init();
    },
    init:function () {
        //todo: remove later
        this.TEST_BUTTON_PAUSE = new ccui.Button(res.pause_button);
        var visibleSize = cc.view.getVisibleSize();
        var size = this.TEST_BUTTON_PAUSE.getContentSize();
        this.TEST_BUTTON_PAUSE.setPosition(cc.p(visibleSize.width - size.width/2 - 10, visibleSize.height - size.height/2 - 5));
        this.addChild(this.TEST_BUTTON_PAUSE);
        this.TEST_BUTTON_PAUSE.addTouchEventListener(this.handleButtonEvents, this);

        //todo: remove later
        this.TEST_BUTTON_DIE = new ccui.Button(res.pause_button);
        visibleSize = cc.view.getVisibleSize();
        size = this.TEST_BUTTON_DIE.getContentSize();
        this.TEST_BUTTON_DIE.setPosition(cc.p(visibleSize.width - size.width*1.5 - 20,
            visibleSize.height - size.height/2 - 5));
        this.addChild(this.TEST_BUTTON_DIE);
        this.TEST_BUTTON_DIE.addTouchEventListener(this.handleButtonEvents, this);
    },
    handleButtonEvents:function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED){
            if (sender == this.TEST_BUTTON_PAUSE){
                this.isGamePause = !this.isGamePause;
                if(this.isGamePause){
                    cc.director.pause();
                }else{
                    cc.director.resume();
                }
            }else if(sender == this.TEST_BUTTON_DIE){
                cc.director.popScene();
            }
        }
    }
});